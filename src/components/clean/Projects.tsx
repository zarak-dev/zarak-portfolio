'use client';

import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Cpu,
  ExternalLink,
  FileText,
  Sparkles,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import SectionHeading from './SectionHeading';
import { PROJECTS, type Project } from '@/data/profile';
import { chipIn, EASE, fadeUp, stagger, VIEWPORT } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ProjectsProps {
  onOpenXRay?: (projectId: string) => void;
  onOpenCaseStudy?: (projectId: string) => void;
}

export default function Projects({ onOpenXRay, onOpenCaseStudy }: ProjectsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Auto-expand if URL hash matches #projects, or when user clicks any link to #projects
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#projects') {
      setIsExpanded(true);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#projects') {
        setIsExpanded(true);
      }
    };

    const handleNavClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href*="#projects"]');
      if (target) {
        setIsExpanded(true);
      }
    };

    const handleCustomExpand = () => {
      setIsExpanded(true);
    };

    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('click', handleNavClick);
    window.addEventListener('expand-projects', handleCustomExpand);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleNavClick);
      window.removeEventListener('expand-projects', handleCustomExpand);
    };
  }, []);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="border-b border-line bg-surface-2 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected work"
          title="Production platforms, enterprise AI dashboards, and live systems."
          description="A cross-section of production software — enterprise telephony operations at Smart Forum, live SaaS applications, and intelligent systems."
        />

        {/* Option 1: Expandable Project Showcase Teaser Hub */}
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-line bg-surface/85 backdrop-blur-xl p-6 sm:p-8 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.35)] transition-all duration-300 dark:border-white/10 dark:bg-[#0c1222]/90">
          {/* Subtle ambient decorative gradient orbs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-mint/10 blur-3xl"
          />

          {/* Top Row: Metadata Badges (Left) & Professional CTA Button (Right) */}
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3">
              {/* Project Tags Pill Row */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {PROJECTS.map((project) => (
                  <span
                    key={project.title}
                    className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11px] font-medium text-ink-mute dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                  >
                    {project.title}
                  </span>
                ))}
              </div>

              {/* Status & Category Highlight Badges (Industry Standard Tokens) */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint-soft px-3.5 py-1.5 font-mono text-[11px] font-medium text-mint">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
                  </span>
                  {PROJECTS.length} Production Platforms
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-soft px-3.5 py-1.5 font-mono text-[11px] font-medium text-brand">
                  <Sparkles className="h-3 w-3" />
                  AI Telecom &amp; SaaS
                </span>
              </div>
            </div>

            {/* Professional High-Contrast Action Button */}
            <button
              type="button"
              onClick={handleToggleExpand}
              aria-expanded={isExpanded}
              aria-controls="projects-expanded-content"
              className="group relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand hover:shadow-md active:scale-[0.98] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
            >
              <span>
                {isExpanded
                  ? 'Collapse Projects Showcase'
                  : `Explore Projects & Systems (${PROJECTS.length})`}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5',
                  isExpanded && 'rotate-180 group-hover:-translate-y-0.5',
                )}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Bottom Row: Miniature Browser Previews */}
          <div className="relative z-10 mt-6 border-t border-line/70 pt-5 dark:border-white/10">
            <div className="mb-3 flex items-center justify-between font-mono text-xs text-ink-faint">
              <span className="flex items-center gap-1.5 text-ink-mute">
                <Layers className="h-3.5 w-3.5 text-brand" />
                Live Systems Preview
              </span>
              <span className="hidden font-sans text-[11px] font-medium text-ink-mute dark:text-ink-soft sm:inline">
                {isExpanded ? 'Click collapse button or card to close' : 'Click any card or button to inspect full architecture'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {PROJECTS.map((project) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="group/card flex flex-col overflow-hidden rounded-xl border border-line bg-surface-2 p-2.5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-brand-line hover:shadow-md dark:border-white/10 dark:bg-[#101726]"
                  aria-label={`View details for ${project.title}`}
                >
                  {/* Mini window header */}
                  <div className="flex items-center justify-between gap-1 border-b border-line/40 pb-1.5 dark:border-white/5">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="max-w-[65px] truncate font-mono text-[9px] text-ink-faint">
                      {project.year}
                    </span>
                  </div>

                  {/* Thumbnail snippet */}
                  <div className="relative my-2 aspect-[16/10] w-full overflow-hidden rounded-lg border border-line/30 bg-surface-3 dark:border-white/5 dark:bg-slate-900">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover object-top opacity-85 transition-transform duration-300 group-hover/card:scale-105 group-hover/card:opacity-100"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-mono text-[10px] text-ink-faint">
                        System UI
                      </div>
                    )}
                  </div>

                  {/* Mini Caption */}
                  <div className="mt-auto">
                    <p className="truncate font-display text-xs font-bold text-ink transition-colors group-hover/card:text-brand">
                      {project.title}
                    </p>
                    <p className="truncate font-mono text-[10px] text-ink-faint">
                      {project.category.split('·')[0].trim()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Expanded Content: Full 5-Project Production Grid */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id="projects-expanded-content"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.15 }
                  : { duration: 0.45, ease: EASE }
              }
              className="overflow-hidden"
            >
              {/* Header Bar within Expanded View */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-xs font-medium text-ink-mute">
                    Showing all {PROJECTS.length} production platforms &amp; live architectures
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCollapse}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3.5 py-1.5 font-mono text-xs font-medium text-ink-mute transition-colors hover:border-brand-line hover:bg-brand-soft hover:text-brand dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                  <span>Collapse Projects</span>
                </button>
              </div>

              {/* Full Project Grid */}
              <motion.div
                className="mt-8 grid gap-6 lg:grid-cols-2"
                initial="hidden"
                animate="show"
                variants={stagger(0.08)}
              >
                {PROJECTS.map((project: Project) => (
                  <motion.article
                    key={project.title}
                    variants={fadeUp}
                    whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-brand-line hover:shadow-[0_24px_60px_-40px_rgba(79,70,229,0.5)] sm:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                    />

                    {/* Project preview image if available */}
                    {project.image && (
                      <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-xl border border-line bg-surface-2">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    )}

                    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
                        {project.category}
                      </span>
                      <span className="font-mono text-[11px] text-ink-faint">{project.year}</span>
                    </motion.div>

                    <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink sm:text-[1.4rem]">
                      {project.title}
                    </h3>

                    <motion.p
                      variants={fadeUp}
                      className="mt-3 text-[15px] leading-relaxed text-ink-mute"
                    >
                      {project.description}
                    </motion.p>

                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <motion.li
                          key={tech}
                          variants={chipIn}
                          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                          className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-mute"
                        >
                          {tech}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div
                      variants={fadeUp}
                      className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-6"
                    >
                      <div className="flex flex-wrap items-center gap-4">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
                          >
                            Visit Live
                            <ExternalLink
                              className="h-4 w-4 transition-transform group-hover:scale-110"
                              aria-hidden="true"
                            />
                          </a>
                        )}

                        {project.codeUrl && (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-brand"
                          >
                            GitHub
                            <ArrowUpRight
                              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {project.xrayId && onOpenCaseStudy && (
                          <button
                            type="button"
                            onClick={() => onOpenCaseStudy(project.xrayId!)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 font-mono text-[11px] font-medium text-ink-mute transition-colors hover:border-brand-line hover:bg-brand-soft hover:text-brand"
                          >
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            Case Study
                          </button>
                        )}

                        {project.xrayId && onOpenXRay && (
                          <button
                            type="button"
                            onClick={() => onOpenXRay(project.xrayId!)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 font-mono text-[11px] font-medium text-ink-mute transition-colors hover:border-brand-line hover:bg-brand-soft hover:text-brand"
                          >
                            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                            Inspect X-Ray
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </motion.article>
                ))}
              </motion.div>

              {/* Bottom Collapse Controls */}
              <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-line/70 pt-8 dark:border-white/10">
                <p className="font-mono text-xs text-ink-faint">
                  Done reviewing Zarak&apos;s production platforms?
                </p>
                <button
                  type="button"
                  onClick={handleCollapse}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-xs font-semibold text-ink shadow-sm transition-all hover:border-brand hover:text-brand dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <ChevronUp className="h-4 w-4" />
                  <span>Collapse Projects Showcase</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

