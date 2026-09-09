'use client';

import { ArrowUpRight, Cpu, ExternalLink, FileText, Github } from 'lucide-react';

import SectionHeading from './SectionHeading';
import { PROJECTS, type Project } from '@/data/profile';
import { chipIn, EASE, fadeUp, stagger, VIEWPORT } from '@/lib/animations';
import { motion } from 'framer-motion';

interface ProjectsProps {
  onOpenXRay?: (projectId: string) => void;
  onOpenCaseStudy?: (projectId: string) => void;
}

export default function Projects({ onOpenXRay, onOpenCaseStudy }: ProjectsProps) {
  return (
    <section id="projects" className="border-b border-line bg-surface-2 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected work"
          title="Production platforms, enterprise AI dashboards, and live systems."
          description="A cross-section of production software — enterprise telephony operations at Smart Forum, live SaaS applications, and intelligent systems."
        />

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.1)}
        >
          {PROJECTS.map((project: Project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
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
                    whileHover={{ y: -2 }}
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
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" />
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
      </div>
    </section>
  );
}
