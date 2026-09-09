/**
 * Audio streaming utilities for Gemini Live API.
 * Handles microphone capture (16kHz 16-bit PCM mono) and native audio playback (24kHz 16-bit PCM mono)
 * with instant interruption cancellation.
 */

export function int16ToBase64(int16: Int16Array): string {
  const bytes = new Uint8Array(int16.buffer, int16.byteOffset, int16.byteLength);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToInt16(base64: string): Int16Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Int16Array(bytes.buffer);
}

function downsampleTo16k(buffer: Float32Array, inputSampleRate: number): Int16Array {
  if (inputSampleRate === 16000) {
    const pcm16 = new Int16Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      const s = Math.max(-1, Math.min(1, buffer[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return pcm16;
  }

  const ratio = inputSampleRate / 16000;
  const newLength = Math.round(buffer.length / ratio);
  const result = new Int16Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;

  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }
    const sample = count > 0 ? accum / count : 0;
    const s = Math.max(-1, Math.min(1, sample));
    result[offsetResult] = s < 0 ? s * 0x8000 : s * 0x7fff;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }
  return result;
}

export class PCMRecorder {
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private processorNode: ScriptProcessorNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private onChunkCallback: ((base64Pcm16: string) => void) | null = null;
  private isMuted = false;

  async start(onChunk: (base64Pcm16: string) => void) {
    this.onChunkCallback = onChunk;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    this.mediaStream = stream;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    this.audioContext = ctx;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const source = ctx.createMediaStreamSource(stream);
    this.sourceNode = source;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.4;
    this.analyserNode = analyser;

    // Buffer size 4096 gives ~85-92ms latency chunks at 44.1k/48k, ideal for Gemini Live
    const processor = ctx.createScriptProcessor(4096, 1, 1);
    this.processorNode = processor;

    processor.onaudioprocess = (e) => {
      if (this.isMuted) return;

      const inputData = e.inputBuffer.getChannelData(0);
      const pcm16 = downsampleTo16k(inputData, ctx.sampleRate);
      if (pcm16.length > 0 && this.onChunkCallback) {
        const base64 = int16ToBase64(pcm16);
        this.onChunkCallback(base64);
      }
    };

    source.connect(analyser);
    analyser.connect(processor);
    processor.connect(ctx.destination);
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.mediaStream) {
      this.mediaStream.getAudioTracks().forEach((track) => {
        track.enabled = !muted;
      });
    }
  }

  getVolume(): number {
    if (!this.analyserNode || this.isMuted) return 0;
    const data = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteFrequencyData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return Math.min(1, (sum / data.length) / 128);
  }

  stop() {
    if (this.processorNode) {
      this.processorNode.onaudioprocess = null;
      try {
        this.processorNode.disconnect();
      } catch {}
      this.processorNode = null;
    }
    if (this.sourceNode) {
      try {
        this.sourceNode.disconnect();
      } catch {}
      this.sourceNode = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch {}
      this.audioContext = null;
    }
    this.onChunkCallback = null;
  }
}

export class PCMPlayer {
  private audioContext: AudioContext | null = null;
  private analyserNode: AnalyserNode | null = null;
  private scheduledSources: AudioBufferSourceNode[] = [];
  private nextPlayTime = 0;
  private isPlaying = false;

  private ensureContext(): AudioContext {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      // Gemini Live native audio is 24000Hz mono
      this.audioContext = new AudioContextClass({ sampleRate: 24000 });
      this.nextPlayTime = this.audioContext.currentTime;

      const analyser = this.audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.4;
      this.analyserNode = analyser;
      analyser.connect(this.audioContext.destination);
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  playChunk(base64Pcm24: string) {
    try {
      const ctx = this.ensureContext();
      const pcm16 = base64ToInt16(base64Pcm24);
      if (pcm16.length === 0) return;

      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768.0;
      }

      const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.copyToChannel(float32, 0, 0);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;

      if (this.analyserNode) {
        source.connect(this.analyserNode);
      } else {
        source.connect(ctx.destination);
      }

      const currentTime = ctx.currentTime;
      // Schedule smoothly back-to-back
      if (this.nextPlayTime < currentTime) {
        this.nextPlayTime = currentTime + 0.02; // Tiny safety lead
      }

      source.start(this.nextPlayTime);
      this.isPlaying = true;
      this.nextPlayTime += audioBuffer.duration;
      this.scheduledSources.push(source);

      source.onended = () => {
        const index = this.scheduledSources.indexOf(source);
        if (index > -1) {
          this.scheduledSources.splice(index, 1);
        }
        if (this.scheduledSources.length === 0) {
          this.isPlaying = false;
        }
      };
    } catch (err) {
      console.warn('Error playing audio chunk in PCMPlayer:', err);
    }
  }

  /**
   * Stop immediately and clear all scheduled audio buffers upon user interruption.
   */
  stopAndClear() {
    for (const source of this.scheduledSources) {
      try {
        source.stop(0);
        source.disconnect();
      } catch {}
    }
    this.scheduledSources = [];
    if (this.audioContext) {
      this.nextPlayTime = this.audioContext.currentTime;
    }
    this.isPlaying = false;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  getVolume(): number {
    if (!this.analyserNode || !this.isPlaying) return 0;
    const data = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteFrequencyData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return Math.min(1, (sum / data.length) / 128);
  }

  close() {
    this.stopAndClear();
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch {}
      this.audioContext = null;
    }
  }
}
