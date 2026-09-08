'use client';

import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Code2 } from 'lucide-react';
import { GITHUB_DATA } from '@/data/github';

export default function GitHubSection() {
  return (
    <section
      id="github"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 border-b border-border/70 relative z-10"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl shadow-lg glow-border flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-foreground shrink-0 shadow-xs">
              <Github className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl text-foreground">
                  {GITHUB_DATA.displayName}
                </h3>
                <span className="font-mono text-xs text-accent">@{GITHUB_DATA.username}</span>
              </div>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                {GITHUB_DATA.bio}
              </p>
              <p className="font-mono text-xs text-muted-foreground/80 mt-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-accent" />
                Frontend architecture, interactive UI experiments, and open-source contributions.
              </p>
            </div>
          </div>

          <a
            href={GITHUB_DATA.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-mono text-xs font-semibold hover:bg-foreground/90 transition-all shrink-0 shadow-md group"
          >
            <span>Visit GitHub Profile</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
