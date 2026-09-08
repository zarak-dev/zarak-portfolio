'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, CheckCircle2, ArrowUpRight, Cpu, Layers, Code2, Globe, Shield } from 'lucide-react';
import { TECHNOLOGIES, type TechnologyEvidence } from '@/data/skills';

export default function TechnologyMap() {
  const [activeTech, setActiveTech] = useState<TechnologyEvidence>(TECHNOLOGIES[0]);

  const categories = [
    'All Technologies',
    'Core Frontend',
    'Architecture & State',
    'Styling & UI Systems',
    'Integration & Cloud',
    'Engineering Tools',
  ] as const;

  const [selectedCategory, setSelectedCategory] = useState<string>('All Technologies');

  const filteredTech =
    selectedCategory === 'All Technologies'
      ? TECHNOLOGIES
      : TECHNOLOGIES.filter((t) => t.category === selectedCategory);

  return (
    <section
      id="skills"
      className="py-28 md:py-36 px-4 sm:px-6 lg:px-12 border-b border-border/70 relative z-10"
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
            <Wrench className="w-3.5 h-3.5" />
            <span>// 04 — Interactive Technology Map</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight">
            Frontend engineering first. Proven by evidence.
          </h2>
          <p className="font-mono text-xs text-muted-foreground mt-2 max-w-xl">
            No empty skill meters or arbitrary percentage bars. Select any technology to inspect where Zarak utilized it professionally and what architectural challenges it solved.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-colors ${
                selectedCategory === cat
                  ? 'bg-accent text-accent-foreground font-semibold shadow-xs'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Two-Column Grid: Tech Constellation on Left, Active Evidence Inspector on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Grid of Skills */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTech.map((tech) => {
              const isActive = activeTech.name === tech.name;
              return (
                <button
                  key={tech.name}
                  onClick={() => setActiveTech(tech)}
                  onMouseEnter={() => setActiveTech(tech)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 ${
                    isActive
                      ? 'border-accent bg-accent/10 shadow-md shadow-accent/5 glow-border'
                      : 'border-border/80 bg-card/60 hover:bg-card hover:border-border'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-display font-bold text-base text-foreground">
                      {tech.name}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-accent text-accent-foreground font-bold'
                          : 'bg-secondary text-muted-foreground border border-border/60'
                      }`}
                    >
                      {tech.category}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {tech.summary}
                  </p>

                  <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground pt-2 border-t border-border/40">
                    <span className="text-accent font-medium">
                      {tech.usedIn.length} Evidence {tech.usedIn.length === 1 ? 'Project' : 'Projects'}
                    </span>
                    <span className="text-muted-foreground">Click to inspect →</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Evidence Inspector Card */}
          <div className="lg:col-span-5 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 rounded-2xl border border-accent/40 bg-card/90 backdrop-blur-xl shadow-2xl relative overflow-hidden glow-border"
              >
                {/* Header */}
                <div className="pb-5 border-b border-border/70">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
                    <span className="uppercase text-accent tracking-wider font-semibold">
                      // Evidence Inspector
                    </span>
                    <span className="px-2 py-0.5 rounded bg-secondary border border-border">
                      {activeTech.importance}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                    {activeTech.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {activeTech.summary}
                  </p>
                </div>

                {/* Applied Project Evidence */}
                <div className="mt-5 space-y-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
                    Verified Usage In Projects:
                  </span>

                  {activeTech.usedIn.map((usage, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-secondary/40 border border-border/70 space-y-1.5"
                    >
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="font-bold text-foreground flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                          {usage.project}
                        </span>
                        <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/25">
                          {usage.role}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                        {usage.application}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>Source: CV &amp; Codebase Truth</span>
                  <span className="text-accent">100% Verified</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
