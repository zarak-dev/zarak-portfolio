'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Activity, Bot, ArrowDown, Sparkles } from 'lucide-react';
import { PROJECT_XRAYS, type XRayLayer, type ProjectXRay as ProjectXRayData } from '@/data/xray';
import { CASE_STUDIES } from '@/data/projects';
import XRayExperiment from './XRayExperiment';

interface ProjectXRayProps {
  projectId: string | null;
  onClose: () => void;
  onAskAI: (contextMsg: string) => void;
}

export default function ProjectXRay({ projectId, onClose, onAskAI }: ProjectXRayProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'experiment'>('architecture');
  const [activeLayer, setActiveLayer] = useState<XRayLayer | null>(null);

  if (!projectId) return null;

  const xrayData = PROJECT_XRAYS.find(x => x.projectId === projectId);
  const projectInfo = CASE_STUDIES.find(p => p.id === projectId);

  if (!xrayData || !projectInfo) return null;

  const handleAskAI = () => {
    onClose(); // Close the modal
    // Pass context to AskZarak
    onAskAI(`Tell me about the engineering architecture of ${projectInfo.title}.`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl h-[85vh] bg-[#0a0a0e] border border-accent/30 rounded-2xl shadow-[0_0_50px_-12px_rgba(var(--accent),0.3)] overflow-hidden z-10 flex flex-col glow-border"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] text-accent tracking-widest uppercase">X-Ray Analysis Mode</span>
              </div>
              <h2 className="font-display font-bold text-xl text-white">
                {projectInfo.title}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Mode Toggle */}
              {xrayData.experiments && xrayData.experiments.length > 0 && (
                <div className="hidden sm:flex bg-white/5 rounded-lg p-1 border border-white/10">
                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`px-4 py-1.5 rounded-md font-mono text-xs flex items-center gap-2 transition-colors ${activeTab === 'architecture' ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Architecture
                  </button>
                  <button
                    onClick={() => setActiveTab('experiment')}
                    className={`px-4 py-1.5 rounded-md font-mono text-xs flex items-center gap-2 transition-colors ${activeTab === 'experiment' ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    Experiment
                  </button>
                </div>
              )}
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
            
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
                            ? 'bg-white/10 border-accent shadow-[0_0_30px_-5px_rgba(var(--accent),0.4)]' 
                            : 'bg-black/40 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {/* Glow effect */}
                        {isActive && (
                          <div className={`absolute top-0 left-0 w-1 h-full ${layer.color}`} />
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <span className="font-mono text-[10px] text-white/50 tracking-wider block mb-1">
                              {layer.tech}
                            </span>
                            <span className={`font-display font-bold tracking-widest ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                              {layer.label}
                            </span>
                          </div>
                          
                          <div className={`w-3 h-3 rounded-full ${layer.color} ${isActive ? 'animate-pulse shadow-[0_0_10px_currentColor]' : 'opacity-40'}`} />
                        </div>
                        
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              className="text-left overflow-hidden"
                            >
                              <p className="font-sans text-sm text-white/70 border-t border-white/10 pt-3">
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
                          className="w-px bg-gradient-to-b from-white/20 to-white/5 my-1 relative flex justify-center"
                        >
                          <ArrowDown className="w-3 h-3 text-white/20 absolute -bottom-2 bg-[#0a0a0e]" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Experiment or AI Panel */}
            <div className={`w-full md:w-[400px] border-t md:border-t-0 md:border-l border-white/10 bg-black/30 p-6 flex flex-col ${activeTab === 'architecture' ? 'hidden md:flex' : 'flex'}`}>
              {activeTab === 'experiment' && xrayData.experiments ? (
                <XRayExperiment experiment={xrayData.experiments[0]} />
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    Analyze with Aimmyyy AI
                  </h3>
                  <p className="font-sans text-sm text-white/50 mb-8 leading-relaxed">
                    Have questions about why these specific technologies were chosen or how the architecture scales?
                  </p>
                  
                  <button
                    onClick={handleAskAI}
                    className="w-full py-3 rounded-xl bg-white text-black font-mono text-sm font-bold hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                  >
                    <Sparkles className="w-4 h-4 text-accent" />
                    Ask Aimmyyy About This Project
                  </button>
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
