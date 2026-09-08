'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import IdentityCard from './IdentityCard';

export default function About() {
  return (
    <section
      id="about"
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
            <Terminal className="w-3.5 h-3.5" />
            <span>// 01 — Developer Profile</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight">
            Engineering from first principles.
          </h2>
        </motion.div>

        {/* Two-Column Layout: Story & Identity Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-muted-foreground font-sans text-base sm:text-lg leading-relaxed"
          >
            <p className="text-foreground font-medium text-lg sm:text-xl leading-snug">
              I am a software engineer focused on modern frontend architecture, state-heavy React systems, and AI-assisted interfaces.
            </p>

            <p>
              My engineering approach centers around building web applications that are robust under the hood and exceptional to interact with. In my current role as a{' '}
              <strong className="text-foreground font-semibold">Junior Software Engineer at Smart Forum</strong>, I engineer the frontend for{' '}
              <a href="#dentally" className="text-accent underline font-mono text-sm hover:text-accent/80">
                Dentally
              </a>
              —an automated receptionist platform where real-time call transcription, voice telemetry, and appointment booking must stay synchronized with zero friction.
            </p>

            <p>
              Prior to my current position, I sharpened my frontend fundamentals through the{' '}
              <strong className="text-foreground font-semibold">PSEB Apprenticeship at Smart Forum</strong> and as a{' '}
              <strong className="text-foreground font-semibold">Jr. Web Developer at Trustech Solutions</strong>, translating complex business requirements into clean, type-safe interfaces.
            </p>

            <p>
              I graduated with a Bachelor of Science in Software Engineering from{' '}
              <strong className="text-foreground font-semibold">Sarhad University of Science & Information Technology</strong>, where our capstone project,{' '}
              <span className="text-foreground font-medium">FYP Connect</span>, earned an <span className="text-accent font-mono font-bold">A+</span> for pairing Next.js and Supabase with Google Gemini AI to tackle South Asian diabetes management.
            </p>
          </motion.div>

          {/* Right: Interactive Technical Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <IdentityCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
