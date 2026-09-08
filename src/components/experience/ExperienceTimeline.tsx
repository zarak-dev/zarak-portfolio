'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Sparkles, Building2 } from 'lucide-react';
import { EXPERIENCES, type ExperienceItem } from '@/data/experience';

export default function ExperienceTimeline() {
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCES[0].id);
  const selectedExp = EXPERIENCES.find((e) => e.id === selectedId) || EXPERIENCES[0];

  return (
    <section
      id="experience"
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
            <Briefcase className="w-3.5 h-3.5" />
            <span>// 03 — Career Engineering Timeline</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight">
            Growth through real-world engineering.
          </h2>
          <p className="font-mono text-xs text-muted-foreground mt-2 max-w-xl">
            From foundation to production lead on AI telephony platforms. Select any career era below to examine technical responsibilities and project contexts.
          </p>
        </motion.div>

        {/* Timeline Interaction Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Year / Role Selector */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {EXPERIENCES.map((exp) => {
              const isSelected = exp.id === selectedId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col gap-1.5 ${
                    isSelected
                      ? 'border-accent bg-card shadow-lg shadow-accent/5'
                      : 'border-border/70 bg-card/50 hover:bg-card/80 hover:border-border'
                  }`}
                >
                  {/* Selected Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="timeline-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent"
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent">
                      {exp.year}
                    </span>
                    {exp.current && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold uppercase tracking-wider">
                        CURRENT
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-base text-foreground">
                    {exp.role}
                  </h3>

                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mt-1">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3 h-3 text-accent" />
                      {exp.company}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90 text-accent' : 'opacity-40'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep-Dive Era Details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedExp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 rounded-2xl border border-border/90 bg-card shadow-xl glow-border relative"
              >
                {/* Era Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/70 gap-3">
                  <div>
                    <span className="font-mono text-xs text-accent font-semibold block mb-1">
                      {selectedExp.type} · {selectedExp.location}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                      {selectedExp.role}
                    </h3>
                    <p className="font-display font-semibold text-base text-accent mt-0.5">
                      {selectedExp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-secondary border border-border font-mono text-xs text-muted-foreground self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>{selectedExp.period}</span>
                  </div>
                </div>

                {/* Highlight banner if present */}
                {selectedExp.highlight && (
                  <div className="my-5 p-3 rounded-xl bg-accent/10 border border-accent/30 font-mono text-xs text-accent flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span className="font-medium">{selectedExp.highlight}</span>
                  </div>
                )}

                {/* Narrative Summary */}
                <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed my-5">
                  {selectedExp.summary}
                </p>

                {/* Detailed Responsibilities Checklist */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Core Engineering Deliverables:
                  </h4>
                  {selectedExp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-foreground/90 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies used */}
                <div className="pt-5 border-t border-border/60">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider block mb-2.5">
                    Technologies Utilized:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md font-mono text-xs bg-secondary border border-border text-foreground font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
