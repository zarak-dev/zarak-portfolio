'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Activity, Bot, ArrowDown, Sparkles } from 'lucide-react';
import { PROJECT_XRAYS, type XRayLayer } from '@/data/xray';
import { CASE_STUDIES } from '@/data/projects';
import XRayExperiment from './XRayExperiment';
import { useScrollLock } from '@/hooks/useScrollLock';

interface ProjectXRayProps {
  projectId: string | null;
  onClose: () => void;
  onAskAI: (contextMsg: string) => void;
}

export default function ProjectXRay({ projectId, onClose, onAskAI }: ProjectXRayProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'experiment'>('architecture');
  const [activeLayer, setActiveLayer] = useState<XRayLayer | null>(null);

  const xrayData = projectId ? PROJECT_XRAYS.find(x => x.projectId === projectId) : null;
  const projectInfo = projectId ? CASE_STUDIES.find(p => p.id === projectId) : null;
  const isOpen = Boolean(projectId && xrayData && projectInfo);

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleAskAI = () => {
    if (!projectInfo) return;
    onClose(); // Close the modal
    // Pass context to AskZarak
    onAskAI(`Tell me about the engineering architecture of ${projectInfo.title}.`);
  };

  return (
    <AnimatePresence>
      {isOpen && projectInfo && xrayData && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 dark:bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl h-[85dvh] bg-white/65 dark:bg-[#0a0a0e]/85 backdrop-blur-2xl sm:backdrop-blur-3xl border border-white/80 dark:border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_24px_70px_-12px_rgba(0,0,0,0.12),_inset_0_1.5px_2px_rgba(255,255,255,0.95),_0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden z-10 flex flex-col glow-border"
          >
            {/* Glass specular refraction highlights */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-44 w-96 rounded-full bg-white/50 dark:bg-white/5 blur-2xl"
            />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.08] dark:border-white/10 bg-white/45 dark:bg-black/40 backdrop-blur-xl relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-accent animate-pulse" />
                  <span className="font-mono text-[10px] text-zinc-600 dark:text-accent tracking-widest uppercase font-semibold">X-Ray Analysis Mode</span>
                </div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white">
                  {projectInfo.title}
                </h2>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Mode Toggle */}
                {xrayData.experiments && xrayData.experiments.length > 0 && (
                  <div className="hidden sm:flex bg-black/[0.04] dark:bg-white/5 rounded-xl p-1 border border-black/[0.08] dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                    <button
                      onClick={() => setActiveTab('architecture')}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-colors ${
                        activeTab === 'architecture'
                          ? 'bg-white text-zinc-950 shadow-sm border border-black/[0.06] dark:bg-white/15 dark:text-white dark:border-white/10'
                          : 'text-zinc-600 hover:text-zinc-950 dark:text-white/50 dark:hover:text-white/80'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Architecture
                    </button>
                    <button
                      onClick={() => setActiveTab('experiment')}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-colors ${
                        activeTab === 'experiment'
                          ? 'bg-white text-zinc-950 shadow-sm border border-black/[0.06] dark:bg-white/15 dark:text-white dark:border-white/10'
                          : 'text-zinc-600 hover:text-zinc-950 dark:text-white/50 dark:hover:text-white/80'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5" />
                      Experiment
                    </button>
                  </div>
                )}
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl border border-black/[0.06] dark:border-white/10 bg-white/60 dark:bg-white/5 text-zinc-600 dark:text-white/60 hover:text-zinc-950 dark:hover:text-white hover:bg-white/90 dark:hover:bg-white/10 transition-colors shadow-sm"
                  aria-label="Close X-Ray"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative z-10">
              
              {/* Left/Center: Architecture Diagram */}
              <div className={`flex-1 p-6 md:p-10 overflow-y-auto flex flex-col items-center ${activeTab === 'experiment' ? 'hidden md:flex opacity-50 pointer-events-none' : ''}`}>
                <div className="w-full max-w-md space-y-2 py-8">
                  {xrayData.layers.map((layer, index) => {
                    const isActive = activeLayer?.id === layer.id;
                    
                    return (
                      <div key={layer.id} className="flex flex-col items-center">
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setActiveLayer(isActive ? null : layer)}
                          className={`w-full p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                            isActive 
                              ? 'bg-white/85 dark:bg-white/15 border-black/30 dark:border-white/30 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.1),_inset_0_1px_1.5px_rgba(255,255,255,1)] dark:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]' 
                              : 'bg-white/40 dark:bg-black/40 border-black/[0.08] dark:border-white/10 hover:border-black/25 dark:hover:border-white/30 hover:bg-white/65 dark:hover:bg-white/[0.07] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),_0_2px_8px_rgba(0,0,0,0.02)]'
                          }`}
                        >
                          {/* Glow effect */}
                          {isActive && (
                            <div className={`absolute top-0 left-0 w-1 h-full ${layer.color}`} />
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <span className="font-mono text-[10px] text-zinc-500 dark:text-white/50 tracking-wider block mb-1 font-medium">
                                {layer.tech}
                              </span>
                              <span className={`font-display font-bold tracking-widest ${isActive ? 'text-zinc-950 dark:text-white' : 'text-zinc-800 dark:text-white/80 group-hover:text-zinc-950 dark:group-hover:text-white'}`}>
                                {layer.label}
                              </span>
                            </div>
                            
                            <div className={`w-3 h-3 rounded-full ${layer.color} ${isActive ? 'animate-pulse shadow-[0_0_10px_currentColor]' : 'opacity-60 dark:opacity-40'}`} />
                          </div>
                          
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                className="text-left overflow-hidden"
                              >
                                <p className="font-sans text-sm text-zinc-600 dark:text-white/70 border-t border-black/[0.08] dark:border-white/10 pt-3 leading-relaxed">
                                  {layer.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>

                        {/* Connector Line */}
                        {index < xrayData.layers.length - 1 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 24, opacity: 1 }}
                            transition={{ delay: (index * 0.1) + 0.1 }}
                            className="w-px bg-gradient-to-b from-black/20 to-black/5 dark:from-white/20 dark:to-white/5 my-1 relative flex justify-center"
                          >
                            <ArrowDown className="w-3 h-3 text-black/30 dark:text-white/20 absolute -bottom-2 bg-white/90 dark:bg-[#0a0a0e] rounded-full" />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Experiment or AI Panel */}
              <div className={`w-full md:w-[400px] border-t md:border-t-0 md:border-l border-black/[0.08] dark:border-white/10 bg-white/35 dark:bg-black/30 backdrop-blur-md p-6 flex flex-col ${activeTab === 'architecture' ? 'hidden md:flex' : 'flex'}`}>
                {activeTab === 'experiment' && xrayData.experiments ? (
                  <XRayExperiment experiment={xrayData.experiments[0]} />
                ) : (
                  <div className="h-full flex flex-col justify-center items-center text-center p-6 sm:p-8">
                    <div className="w-16 h-16 rounded-2xl bg-black/[0.04] dark:bg-white/10 border border-black/[0.08] dark:border-white/15 flex items-center justify-center mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                      <Sparkles className="w-8 h-8 text-zinc-900 dark:text-white" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white mb-2">
                      Analyze with Aimmyy AI
                    </h3>
                    <p className="font-sans text-sm text-zinc-600 dark:text-white/50 mb-8 leading-relaxed">
                      Have questions about why these specific technologies were chosen or how the architecture scales?
                    </p>
                    
                    <button
                      onClick={handleAskAI}
                      className="w-full py-3 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-black font-mono text-sm font-bold hover:bg-zinc-800 dark:hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Sparkles className="w-4 h-4 text-white dark:text-black" />
                      Ask Aimmyy About This Project
                    </button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
