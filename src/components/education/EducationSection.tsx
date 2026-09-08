'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, MapPin, Award } from 'lucide-react';
import { EDUCATION_DATA } from '@/data/education';

export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 border-b border-border/70 relative z-10 bg-secondary/10"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>// 07 — Academic Foundation</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground tracking-tight">
            Education &amp; Computer Science Theory
          </h2>
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-md shadow-xs glow-border"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-border/60">
            <div>
              <span className="font-mono text-xs text-accent font-semibold block mb-1">
                {EDUCATION_DATA.degree}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                {EDUCATION_DATA.field}
              </h3>
              <p className="font-display font-semibold text-base text-muted-foreground mt-0.5">
                {EDUCATION_DATA.institution}
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground self-start md:self-auto">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary border border-border">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                {EDUCATION_DATA.period}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary border border-border">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {EDUCATION_DATA.location}
              </span>
            </div>
          </div>

          <p className="font-sans text-sm text-muted-foreground leading-relaxed my-5">
            {EDUCATION_DATA.description}
          </p>

          {/* Capstone Mention */}
          <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/30 font-mono text-xs text-accent flex items-center gap-2 mb-6">
            <Award className="w-4 h-4 shrink-0" />
            <span>{EDUCATION_DATA.capstoneHighlight}</span>
          </div>

          {/* Verified Coursework */}
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-accent" />
              Verified Core Coursework:
            </span>
            <div className="flex flex-wrap gap-2">
              {EDUCATION_DATA.coursework.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 rounded-lg font-mono text-xs bg-secondary/80 border border-border text-foreground/90"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
