'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FolderGit2, ArrowRight, ExternalLink, Sparkles, Activity, Layers, Github } from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';
import { CASE_STUDIES, type CaseStudy } from '@/data/projects';

interface ProjectsSectionProps {
  onOpenXRay?: (projectId: string) => void;
}

export default function ProjectsSection({ onOpenXRay }: ProjectsSectionProps = {}) {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const dentally = CASE_STUDIES.find((p) => p.id === 'dentally') || CASE_STUDIES[0];
  const otherProjects = CASE_STUDIES.filter((p) => p.id !== 'dentally');

  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 border-b border-border/70 relative z-10"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>// 02 — Selected Work &amp; Engineering Projects</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight">
              Featured Work
            </h2>
          </div>
          <p className="font-mono text-xs text-muted-foreground max-w-md">
            Production software, client applications, and academic capstones with verified live URLs and screenshots.
          </p>
        </motion.div>

        {/* 1. Star Flagship Project: DENTALLY */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 rounded-3xl border border-accent/40 bg-card/85 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl glow-border relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Real Screenshot */}
            <div
              onClick={() => setSelectedStudy(dentally)}
              className="lg:col-span-7 cursor-pointer group relative rounded-2xl overflow-hidden border border-border/80 bg-slate-950 shadow-xl"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-white/10 text-white/50 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-white/70">Registration Dashboard / Dentally</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">
                  PRODUCTION AI TELEPHONY
                </span>
              </div>

              <div className="relative aspect-[16/9] md:aspect-[2.03/1] w-full overflow-hidden bg-slate-950 flex items-center justify-center p-1.5 sm:p-2.5">
                <Image
                  src={dentally.image}
                  alt="Dentally Dashboard"
                  fill
                  className="object-contain object-top group-hover:scale-[1.01] transition-transform duration-500 rounded-lg"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              <div className="p-3 bg-slate-900/95 border-t border-white/10 font-mono text-[11px] text-white/60 flex items-center justify-between">
                <span>Recent Calls Telemetry · 333 Total Calls · 85 Successful</span>
                <span className="text-accent group-hover:underline flex items-center gap-1 font-semibold">
                  Inspect Architecture <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Right Column: Narrative & Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/40 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    FLAGSHIP PRODUCTION PROJECT
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground">
                  Dentally
                </h3>
                <p className="font-mono text-xs text-accent font-semibold mt-1">
                  AI-Powered Receptionist Platform for Automated Calls &amp; Booking
                </p>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                  Engineered the frontend architecture at <strong className="text-foreground">Smart Forum</strong> using Next.js, TypeScript, and Redux Toolkit. Handles real-time operator call queues, automated dental patient bookings, and responsive UI components connected via RESTful APIs.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-secondary/40 border border-border">
                  <span className="text-muted-foreground block text-[10px] uppercase">Current Role</span>
                  <span className="font-bold text-foreground">Jr. Software Engineer</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border">
                  <span className="text-muted-foreground block text-[10px] uppercase">Stack</span>
                  <span className="font-bold text-foreground">Next.js · TypeScript</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border">
                  <span className="text-muted-foreground block text-[10px] uppercase">State Management</span>
                  <span className="font-bold text-foreground">Redux Toolkit (RTK)</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border">
                  <span className="text-muted-foreground block text-[10px] uppercase">Design System</span>
                  <span className="font-bold text-foreground">shadcn/ui + Tailwind</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setSelectedStudy(dentally)}
                  className="px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-mono text-xs font-semibold hover:bg-accent/90 transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {onOpenXRay && (
                  <button
                    onClick={() => onOpenXRay(dentally.id)}
                    className="px-6 py-2.5 rounded-xl bg-secondary text-foreground border border-border font-mono text-xs font-semibold hover:bg-secondary/80 transition-colors shadow-sm flex items-center gap-2"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Project X-Ray</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Secondary Projects: Exynos Cooky, MoneyFlow, FYP Connect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group rounded-2xl border border-border/80 bg-card backdrop-blur-md hover:border-accent/60 transition-all duration-300 p-5 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-accent/5 glow-border"
            >
              <div>
                {/* Card Header: Category Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/30">
                    {project.category}
                  </span>
                  {project.liveUrl && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </span>
                  )}
                </div>

                {/* Visual Thumbnail Window with contained image */}
                <div
                  onClick={() => setSelectedStudy(project)}
                  className="group/img relative rounded-xl overflow-hidden bg-slate-950/95 mb-5 border border-border/70 cursor-pointer shadow-inner"
                >
                  {/* Browser Bar */}
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="ml-2 font-mono text-[10px] text-white/45 truncate">
                      {project.liveUrl ? project.liveUrl.replace('https://', '') : project.title}
                    </span>
                  </div>

                  {/* Fully Contained Image */}
                  <div className="relative aspect-[16/10] w-full bg-slate-950 flex items-center justify-center p-1.5 sm:p-2">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain object-center rounded transition-transform duration-500 group-hover/img:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>

                {/* Title & Subhead */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                    onClick={() => setSelectedStudy(project)}
                    className="font-display font-bold text-xl text-foreground group-hover:text-accent transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <button
                    onClick={() => setSelectedStudy(project)}
                    className="text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1"
                    aria-label="Inspect project"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <p className="font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                  {project.subtitle}
                </p>

                {/* Key Metric Highlight */}
                {project.metrics && project.metrics[0] && (
                  <div className="mb-4 p-2.5 rounded-lg bg-secondary/50 border border-border/60 font-mono text-[11px] flex items-center justify-between">
                    <span className="text-muted-foreground">{project.metrics[0].label}:</span>
                    <span className="font-semibold text-foreground">{project.metrics[0].value}</span>
                  </div>
                )}
              </div>

              {/* Technologies list & Live Links */}
              <div className="pt-4 border-t border-border/60 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded font-mono text-[10px] bg-secondary/70 text-foreground/80 border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center justify-between pt-1 font-mono text-xs">
                  <button
                    onClick={() => setSelectedStudy(project)}
                    className="text-muted-foreground hover:text-accent transition-colors text-[11px]"
                  >
                    Case Study →
                  </button>
                  {onOpenXRay && (
                    <button
                      onClick={() => onOpenXRay(project.id)}
                      className="text-muted-foreground hover:text-accent transition-colors text-[11px] flex items-center gap-1"
                    >
                      <Layers className="w-3 h-3" />
                      X-Ray
                    </button>
                  )}

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-border bg-secondary hover:text-accent transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-accent/15 border border-accent/40 text-accent font-semibold text-[11px] hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <span>Live App</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        study={selectedStudy}
        onClose={() => setSelectedStudy(null)}
        onOpenXRay={onOpenXRay}
      />
    </section>
  );
}
