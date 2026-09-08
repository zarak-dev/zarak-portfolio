'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, MapPin, Cpu, Compass, Layers, Check } from 'lucide-react';
import { IDENTITY } from '@/data/identity';

export default function IdentityCard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'focus' | 'interests'>('profile');

  return (
    <div className="rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl p-6 sm:p-8 shadow-xl relative overflow-hidden glow-border">
      {/* OS Card Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="font-mono text-xs text-muted-foreground ml-2">identity.config.ts</span>
        </div>
        <span className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/30">
          TYPE: DEVELOPER_IDENTITY
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mt-5 mb-6">
        {[
          { id: 'profile', label: 'Identity Matrix' },
          { id: 'focus', label: 'Frontend Focus' },
          { id: 'interests', label: 'Interests & AI' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors ${
              activeTab === tab.id
                ? 'bg-accent text-accent-foreground font-semibold shadow-xs'
                : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4 font-mono text-xs">
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60 flex items-start gap-3">
              <Compass className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="text-muted-foreground uppercase text-[10px] tracking-wider block">
                  Core Specialization
                </span>
                <span className="font-bold text-foreground text-sm">
                  Modern Frontend Engineering
                </span>
                <p className="text-muted-foreground font-sans text-xs mt-0.5">
                  Scalable React/Next.js architectures with atomic design and strict TypeScript typings.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60 flex items-start gap-3">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-muted-foreground uppercase text-[10px] tracking-wider block">
                  Current Technology Engine
                </span>
                <span className="font-bold text-foreground text-sm">
                  Next.js · React · TypeScript · Redux Toolkit
                </span>
                <p className="text-muted-foreground font-sans text-xs mt-0.5">
                  Active stack used in production at Smart Forum for telephony and clinical workflows.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-muted-foreground uppercase text-[10px] tracking-wider block">
                  Geographic Base & Timezone
                </span>
                <span className="font-bold text-foreground text-sm">
                  Pakistan (PKT / UTC+5)
                </span>
                <p className="text-muted-foreground font-sans text-xs mt-0.5">
                  Available for full-time on-site, hybrid, or remote AI-associated frontend and fullstack roles.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'focus' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {[
              {
                title: 'State-Heavy React Interfaces',
                desc: 'Designing predictable state machines with Redux Toolkit for complex asynchronous event cycles and audio buffers.',
              },
              {
                title: 'High-Density Design Systems',
                desc: 'Composing unstyled Radix UI primitives with Tailwind CSS to build ergonomic, accessible operator dashboards.',
              },
              {
                title: 'REST API & Telephony Integration',
                desc: 'Connecting frontend clients to low-latency APIs with optimistic mutations and resilient error boundaries.',
              },
            ].map((f) => (
              <div key={f.title} className="p-3 rounded-xl bg-secondary/30 border border-border/60">
                <span className="text-accent font-semibold block text-xs mb-1 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> {f.title}
                </span>
                <p className="text-muted-foreground font-sans text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'interests' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60">
              <span className="text-foreground font-semibold block text-xs mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-accent" /> AI-Powered Product Experiences
              </span>
              <p className="text-muted-foreground font-sans text-xs leading-relaxed">
                Building human-first interfaces that make artificial intelligence (telephony agents in Dentally, Gemini diet reasoning in FYP Connect) intuitive and actionable.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60">
              <span className="text-foreground font-semibold block text-xs mb-1 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Micro-Interaction Craft
              </span>
              <p className="text-muted-foreground font-sans text-xs leading-relaxed">
                Fine-tuning spring curves, keyboard shortcuts, and tactile feedback to make business software enjoyable to use every day.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
