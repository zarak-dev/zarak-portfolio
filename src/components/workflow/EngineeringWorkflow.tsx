'use client';

import { motion } from 'framer-motion';
import { Layers, CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STAGES } from '@/data/workflow';

export default function EngineeringWorkflow() {
  return (
    <section
      id="workflow"
      className="py-28 md:py-36 px-4 sm:px-6 lg:px-12 border-b border-border/70 relative z-10 bg-secondary/15"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>// 05 — Engineering Mindset &amp; Process</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight">
            How I build frontend systems.
          </h2>
          <p className="font-mono text-xs text-muted-foreground mt-2 max-w-xl">
            A disciplined, 6-stage engineering process from requirement deconstruction to verified production deployment.
          </p>
        </motion.div>

        {/* 6-Stage Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKFLOW_STAGES.map((stage, idx) => (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.4, delay: idx * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
              className="p-6 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md flex flex-col justify-between shadow-xs hover:border-accent/60 transition-colors duration-300 glow-border group cursor-pointer hover:shadow-xl hover:shadow-accent/5"
            >
              <div>
                {/* Step Indicator */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
                  <span className="font-mono font-black text-2xl text-accent/60 group-hover:text-accent transition-colors">
                    {stage.step}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                    STAGE {stage.step}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-1">
                  {stage.title}
                </h3>
                <span className="font-mono text-xs text-accent block mb-3">
                  {stage.tagline}
                </span>

                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  {stage.description}
                </p>
              </div>

              {/* Action Points */}
              <div className="space-y-2 pt-4 border-t border-border/50 text-xs font-mono text-foreground/85">
                {stage.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span className="font-sans leading-tight text-muted-foreground">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
