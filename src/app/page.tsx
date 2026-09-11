'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

import ScrollProgress from '@/components/navigation/ScrollProgress';
import Navigation from '@/components/navigation/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import Recommendations from '@/components/sections/Recommendations';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import FramerBackdrop from '@/components/background/FramerBackdrop';
import { CASE_STUDIES, type CaseStudy } from '@/data/projects';
import Preloader from '@/components/ui/Preloader';

// Lazy-load heavy interactive overlays on demand to optimize initial page performance
const AskZarak = dynamic(() => import('@/components/ai/AskZarak'), { ssr: false });
const ProjectXRay = dynamic(() => import('@/components/xray/ProjectXRay'), { ssr: false });
const CaseStudyModal = dynamic(() => import('@/components/projects/CaseStudyModal'), { ssr: false });
const CommandPalette = dynamic(() => import('@/components/command/CommandPalette'), { ssr: false });
const EasterEggModal = dynamic(() => import('@/components/easter-egg/EasterEggModal'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [xrayProject, setXrayProject] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [aiContextMessage, setAiContextMessage] = useState<string | null>(null);

  const handleOpenAimmy = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-aimmyyy-ai'));
    }
  }, []);

  const handleOpenCaseStudy = useCallback((projectId: string) => {
    const study = CASE_STUDIES.find((cs) => cs.id === projectId);
    if (study) setSelectedCaseStudy(study);
  }, []);

  // Keyboard shortcut: CMD+K / Ctrl+K for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Developer Easter Egg: typing "zarak" triggers the developer terminal
  useEffect(() => {
    const sequence = ['z', 'a', 'r', 'a', 'k'];
    let currentIndex = 0;

    const handleKeyStroke = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key.toLowerCase() === sequence[currentIndex]) {
        currentIndex++;
        if (currentIndex === sequence.length) {
          setEasterEggOpen(true);
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyStroke);
    return () => window.removeEventListener('keydown', handleKeyStroke);
  }, []);

  return (
    <div className="relative min-h-screen bg-surface text-ink font-sans antialiased selection:bg-rose selection:text-white">
      {/* Initial load screen with building monogram animation */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Whisper-quiet ambient motion background */}
      <FramerBackdrop />

      {/* Top scroll indicator */}
      <ScrollProgress />

      {/* Clean Navigation Bar */}
      <Navigation
        onOpenAimmy={handleOpenAimmy}
        onOpenCommand={() => setCommandOpen(true)}
      />

      {/* Main Portfolio Sections */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects
          onOpenXRay={setXrayProject}
          onOpenCaseStudy={handleOpenCaseStudy}
        />
        <Skills />
        <Education />
        <Recommendations />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Aimmyy AI Assistant Drawer */}
      <AskZarak
        onOpenXRay={setXrayProject}
        onOpenCaseStudy={handleOpenCaseStudy}
        initialContextMessage={aiContextMessage}
        onClearContextMessage={() => setAiContextMessage(null)}
      />

      {/* Interactive Project Architecture X-Ray */}
      <ProjectXRay
        projectId={xrayProject}
        onClose={() => setXrayProject(null)}
        onAskAI={(msg) => {
          setAiContextMessage(msg);
          handleOpenAimmy();
        }}
      />

      {/* Project Case Study Deep-Dive Modal */}
      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenXRay={(id) => {
          setSelectedCaseStudy(null);
          setXrayProject(id);
        }}
      />

      {/* Command Palette (CMD/Ctrl + K) */}
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onTriggerEasterEgg={() => setEasterEggOpen(true)}
      />

      {/* Developer Terminal Easter Egg */}
      <EasterEggModal
        open={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />
    </div>
  );
}
