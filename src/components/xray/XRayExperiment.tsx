import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Play, RotateCcw } from 'lucide-react';
import type { XRayExperimentData } from '@/data/xray';

interface XRayExperimentProps {
  experiment: XRayExperimentData;
}

export default function XRayExperiment({ experiment }: XRayExperimentProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < experiment.steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="p-4 sm:p-6 bg-white/40 dark:bg-slate-950/80 backdrop-blur-md rounded-2xl border border-black/[0.08] dark:border-white/10 h-full flex flex-col shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
      <div className="mb-6">
        <h4 className="font-mono text-xs text-zinc-800 dark:text-accent uppercase font-bold tracking-wider mb-1">
          {experiment.title}
        </h4>
        <p className="font-sans text-sm text-zinc-600 dark:text-muted-foreground">
          {experiment.description}
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-4">
        {experiment.steps.map((step, idx) => {
          const isActive = idx < currentStep;
          const isNext = idx === currentStep;

          return (
            <div key={idx} className="w-full max-w-sm flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: isActive || isNext ? 1 : 0.25, 
                  y: 0,
                  scale: isNext ? 1.04 : 1
                }}
                className={`w-full p-4 rounded-xl border transition-all duration-300 ${
                  isActive ? 'bg-black/[0.05] dark:bg-white/10 border-black/15 dark:border-white/20 text-zinc-900 dark:text-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]' : 
                  isNext ? 'bg-white/80 dark:bg-white/15 border-black/30 dark:border-white/40 text-zinc-950 dark:text-foreground shadow-[0_4px_16px_rgba(0,0,0,0.06),_inset_0_1px_1px_rgba(255,255,255,1)]' : 
                  'bg-transparent border-black/[0.06] dark:border-white/[0.08] text-zinc-400 dark:text-muted-foreground/50'
                }`}
              >
                <div className="font-mono text-[10px] uppercase font-semibold mb-1 text-zinc-500 dark:text-white/60">
                  {step.label}
                </div>
                <div className="font-sans text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {step.detail}
                </div>
              </motion.div>

              {idx < experiment.steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0.15 }}
                  className="py-2"
                >
                  <ArrowDown className={`w-4 h-4 ${isActive ? 'text-zinc-800 dark:text-accent' : 'text-zinc-300 dark:text-border'}`} />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        {currentStep < experiment.steps.length ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4" />
            {currentStep === 0 ? 'RUN EXPERIMENT' : 'NEXT STEP'}
          </button>
        ) : (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/[0.05] text-zinc-800 hover:bg-black/[0.1] border border-black/10 dark:bg-white/10 dark:text-white dark:border-white/15 font-mono text-xs transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            RESET
          </button>
        )}
      </div>
    </div>
  );
}
