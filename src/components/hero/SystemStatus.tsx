'use client';

import { motion } from 'framer-motion';
import { Activity, Sparkles, Code2, Server, ArrowUpRight } from 'lucide-react';
import { IDENTITY } from '@/data/identity';

export default function SystemStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl p-5 sm:p-6 shadow-xl overflow-hidden glow-border"
    >
      {/* Top Bar / Telemetry Indicator */}
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-accent">
            Telemetry: Live Operational
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded border border-border">
          STATUS // READY
        </span>
      </div>

      {/* Grid of Status Attributes */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Current Active Project */}
        <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-accent" />
              Active Project
            </span>
            <a
              href="#dentally"
              className="text-[10px] font-mono text-accent hover:underline flex items-center gap-0.5"
            >
              Case Study <ArrowUpRight className="w-2.5 h-2.5" />
            </a>
          </div>
          <p className="font-display font-bold text-foreground text-sm tracking-tight">
            {IDENTITY.status.currentBuilding}
          </p>
          <span className="font-mono text-[10px] text-muted-foreground mt-1">
            Production Telephony & Booking
          </span>
        </div>

        {/* Current Role */}
        <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5">
              <Server className="w-3 h-3 text-cyan-400" />
              Current Role
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">Smart Forum</span>
          </div>
          <p className="font-display font-bold text-foreground text-sm tracking-tight">
            Junior Software Engineer
          </p>
          <span className="font-mono text-[10px] text-muted-foreground mt-1">
            June 2026 – Present
          </span>
        </div>
      </div>

      {/* Core Technology Constellation */}
      <div className="mt-4 pt-3.5 border-t border-border/50">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-3 h-3 text-accent" />
            Core Stack Verification
          </span>
          <span className="font-mono text-[10px] text-accent">Strict TypeScript</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {IDENTITY.status.coreStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md font-mono text-[11px] bg-background/80 border border-border/80 text-foreground/90 hover:border-accent/60 hover:text-accent transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
