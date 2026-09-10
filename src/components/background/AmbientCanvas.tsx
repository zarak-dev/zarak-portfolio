'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  speed: number;
}

interface Pulse {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  isCyan: boolean;
}

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Skip heavy canvas animation on mobile touch devices or if reduced motion is requested
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isRunning = true;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasSize();

    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, isHovering: false };
    const isDark = resolvedTheme !== 'light';

    // Node density calibrated for aesthetic elegance
    const count = Math.min(Math.max(Math.floor((width * height) / 12000), 50), 95);
    const nodes: Node3D[] = [];

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 0.75 + 0.25; // Depth from 0.25 to 1.0
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx: (Math.random() - 0.5) * 0.45 * (1.1 - z * 0.3),
        vy: (Math.random() - 0.5) * 0.45 * (1.1 - z * 0.3),
        radius: (Math.random() * 2.2 + 1.8) * z,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.025,
      });
    }

    const pulses: Pulse[] = [];
    const maxPulses = 24;

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const onMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.isHovering = false;
    };

    const onResize = () => {
      setupCanvasSize();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animId);
      } else if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      // Mouse smoothing
      if (mouse.isHovering && mouse.targetX > -1000) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.phase += n.speed;
        n.x += n.vx + Math.sin(n.phase) * 0.25;
        n.y += n.vy + Math.cos(n.phase) * 0.25;

        // Interactive mouse gentle repulsion
        if (mouse.x > -1000) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 170 && dist > 1) {
            const force = (1 - dist / 170) * 0.8;
            n.x += (dx / dist) * force * 2.5;
            n.y += (dy / dist) * force * 2.5;
          }
        }

        // Screen wrap
        if (n.x < -30) n.x = width + 30;
        if (n.x > width + 30) n.x = -30;
        if (n.y < -30) n.y = height + 30;
        if (n.y > height + 30) n.y = -30;
      }

      // Connections between nodes
      const maxDistance = 165;
      const activeConnections: { i: number; j: number }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            activeConnections.push({ i, j });
            const depthFactor = (a.z + b.z) * 0.5;
            const distRatio = 1 - dist / maxDistance;

            // Subtle, elegant alpha for ambient network
            const alpha = isDark
              ? distRatio * 0.14 * depthFactor
              : distRatio * 0.16 * depthFactor;

            ctx.beginPath();
            if (isDark) {
              ctx.strokeStyle = `rgba(189, 195, 199, ${alpha})`;
            } else {
              // Rich slate line in light mode
              ctx.strokeStyle = `rgba(52, 73, 94, ${alpha})`;
            }
            ctx.lineWidth = depthFactor * (isDark ? 0.95 : 1.05);
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Connect node to mouse cursor if within range
        if (mouse.x > -1000) {
          const n = nodes[i];
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 190) {
            const mRatio = 1 - mDist / 190;
            const mAlpha = isDark ? mRatio * 0.25 : mRatio * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(189, 195, 199, ${mAlpha})`
              : `rgba(52, 73, 94, ${mAlpha})`;
            ctx.lineWidth = mRatio * 1.2;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw subtle interactive cursor focal ring
      if (mouse.x > -1000) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(189, 195, 199, 0.6)' : 'rgba(52, 73, 94, 0.6)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(189, 195, 199, 0.25)' : 'rgba(52, 73, 94, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Spawn electrical firing pulses
      if (pulses.length < maxPulses && activeConnections.length > 0 && Math.random() < 0.16) {
        const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
        pulses.push({
          sourceIdx: conn.i,
          targetIdx: conn.j,
          progress: 0,
          speed: 0.012 + Math.random() * 0.02,
          isCyan: Math.random() > 0.45,
        });
      }

      // Render & update pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const a = nodes[pulse.sourceIdx];
        const b = nodes[pulse.targetIdx];
        if (!a || !b) {
          pulses.splice(p, 1);
          continue;
        }

        const px = a.x + (b.x - a.x) * pulse.progress;
        const py = a.y + (b.y - a.y) * pulse.progress;
        const pulseAlpha = Math.sin(pulse.progress * Math.PI) * (isDark ? 0.55 : 0.45);

        ctx.beginPath();
        const pulseRadius = 2.2 * ((a.z + b.z) * 0.5);
        ctx.arc(px, py, pulseRadius, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = pulse.isCyan
            ? `rgba(236, 240, 241, ${pulseAlpha})`
            : `rgba(189, 195, 199, ${pulseAlpha})`;
          ctx.shadowColor = pulse.isCyan ? '#ECF0F1' : '#BDC3C7';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = pulse.isCyan
            ? `rgba(44, 62, 80, ${pulseAlpha})`
            : `rgba(52, 73, 94, ${pulseAlpha})`;
          ctx.shadowColor = pulse.isCyan ? '#2C3E50' : '#34495E';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render Nodes with classic distinct core & soft outer ring
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulseScale = 0.85 + Math.sin(n.phase * 2) * 0.2;
        const currentRadius = n.radius * pulseScale;

        // Outer ambient glow ring (gentle and low-prominence)
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 1.6, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `rgba(189, 195, 199, ${0.05 * n.z})`;
        } else {
          ctx.fillStyle = `rgba(52, 73, 94, ${0.05 * n.z})`;
        }
        ctx.fill();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        if (isDark) {
          const coreAlpha = Math.min(0.28 + n.z * 0.22, 0.5);
          ctx.fillStyle = i % 3 === 0
            ? `rgba(236, 240, 241, ${coreAlpha})`
            : `rgba(189, 195, 199, ${coreAlpha})`;
        } else {
          const coreAlpha = Math.min(0.32 + n.z * 0.2, 0.52);
          ctx.fillStyle = i % 3 === 0
            ? `rgba(44, 62, 80, ${coreAlpha})`
            : `rgba(52, 73, 94, ${coreAlpha})`;
        }
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-500 hidden md:block"
      aria-hidden="true"
    />
  );
}
