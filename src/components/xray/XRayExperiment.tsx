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
    <div className="p-4 sm:p-6 bg-slate-950 rounded-2xl border border-border/80 h-full flex flex-col">
      <div className="mb-6">
        <h4 className="font-mono text-xs text-accent uppercase font-bold tracking-wider mb-1">
          {experiment.title}
        </h4>
        <p className="font-sans text-sm text-muted-foreground">
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
                  opacity: isActive || isNext ? 1 : 0.2, 
                  y: 0,
                  scale: isNext ? 1.05 : 1
                }}
                className={`w-full p-4 rounded-xl border ${
                  isActive ? 'bg-secondary/80 border-border/80 text-foreground' : 
                  isNext ? 'bg-accent/10 border-accent/40 text-foreground shadow-[0_0_15px_-3px_rgba(var(--accent),0.2)]' : 
                  'bg-transparent border-border/30 text-muted-foreground/50'
                } transition-colors duration-300`}
              >
                <div className="font-mono text-[10px] uppercase font-semibold mb-1 opacity-80">
                  {step.label}
                </div>
                <div className="font-sans text-sm">
                  {step.detail}
                </div>
              </motion.div>

              {idx < experiment.steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0.1 }}
                  className="py-2"
                >
                  <ArrowDown className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-border'}`} />
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
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-mono text-xs font-bold hover:bg-accent/90 transition-colors"
          >
            <Play className="w-4 h-4" />
            {currentStep === 0 ? 'RUN EXPERIMENT' : 'NEXT STEP'}
          </button>
        ) : (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-secondary text-foreground font-mono text-xs hover:bg-secondary/80 border border-border transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            RESET
          </button>
        )}
      </div>
    </div>
  );
}
