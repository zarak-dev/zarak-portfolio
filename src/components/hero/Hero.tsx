'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles, FolderGit2, ChevronDown, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import MagneticButton from './MagneticButton';
import { IDENTITY } from '@/data/identity';

export default function Hero({ onOpenCommand }: { onOpenCommand: () => void }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Vision Statement & Identity */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Strong Primary Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.12] tracking-[-0.035em] text-foreground">
              Building interfaces that feel as good as they function.
            </h1>
          </motion.div>

          {/* Positioning Subhead */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-l-2 border-accent/70 pl-4 py-1.5"
          >
            <p className="font-display font-bold text-xl sm:text-2xl text-foreground">
              {IDENTITY.name}
            </p>
            <p className="font-mono text-sm sm:text-base text-accent font-semibold tracking-wide">
              {IDENTITY.role}
            </p>
            <p className="font-sans text-sm sm:text-base text-muted-foreground mt-2 max-w-xl leading-relaxed">
              Specialized in modern frontend architecture, state-heavy React applications, and AI-powered interfaces.
              Currently building production software at <strong className="text-foreground font-semibold">Smart Forum</strong>.
            </p>
          </motion.div>

          {/* Magnetic CTA Action Suite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <MagneticButton strength={15}>
              <button
                onClick={() => scrollTo('dentally')}
                className="h-12 px-7 rounded-full bg-accent text-accent-foreground font-mono text-sm font-semibold hover:bg-accent/90 transition-all flex items-center gap-2 shadow-md hover:shadow-accent/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>Dentally Assist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>

            <MagneticButton strength={15}>
              <button
                onClick={() => scrollTo('projects')}
                className="h-12 px-7 rounded-full border border-border bg-card/70 text-foreground font-mono text-sm font-medium hover:border-accent/60 hover:text-accent transition-all flex items-center gap-2 shadow-xs"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Selected Work</span>
              </button>
            </MagneticButton>

            <button
              onClick={onOpenCommand}
              className="h-12 px-5 rounded-full border border-dashed border-border/80 bg-secondary/30 text-muted-foreground font-mono text-xs hover:text-foreground hover:border-accent transition-colors flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 rounded text-[11px] bg-background border border-border text-foreground font-mono">
                ⌘K
              </kbd>
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-border/50 text-xs font-mono"
          >
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">Industry Role</span>
              <span className="text-foreground font-semibold">Jr. Software Eng.</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">Company</span>
              <span className="text-accent font-semibold">Smart Forum</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">Key Projects</span>
              <span className="text-foreground font-semibold">Dentally &amp; Appointlo</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">Core Stack</span>
              <span className="text-foreground font-semibold">React 18 · Redux-Saga</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Hero Profile Portrait Showcase */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[360px] sm:max-w-[400px] rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-3.5 shadow-2xl glow-border relative group transition-all duration-300 hover:border-accent/60 hover:shadow-accent/15"
          >
            {/* Main Portrait Frame */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-secondary border border-border/60 shadow-inner">
              <Image
                src="/images/zarak-portrait.jpg"
                alt="Zarak Qaisar - Software Engineer"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />

              {/* Subtle Gradient Shade at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/90 via-background/30 to-transparent pointer-events-none" />
            </div>

            {/* Profile Info Card Anchored */}
            <div className="p-4 pt-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-foreground text-xl tracking-tight">
                    {IDENTITY.name}
                  </h3>
                  <CheckCircle2 className="w-4.5 h-4.5 text-accent shrink-0" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/70 px-2 py-0.5 rounded border border-border/70">
                  Verified
                </span>
              </div>

              <p className="font-mono text-xs text-accent font-medium">
                Software Engineer @ Smart Forum
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-border/50 text-muted-foreground font-mono text-[11px]">
                <span>Islamabad, PK</span>
                <a
                  href={IDENTITY.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  @{IDENTITY.contacts.githubUsername}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center mt-12 gap-1 pointer-events-none text-muted-foreground"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase opacity-60">
          scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-accent/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
