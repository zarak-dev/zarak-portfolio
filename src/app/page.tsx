'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/navigation/Navigation';
import Hero from '@/components/hero/Hero';
import ProjectsSection from '@/components/projects/ProjectsSection';
import ExperienceTimeline from '@/components/experience/ExperienceTimeline';
import TechnologyMap from '@/components/skills/TechnologyMap';
import EngineeringWorkflow from '@/components/workflow/EngineeringWorkflow';
import GitHubSection from '@/components/github/GitHubSection';
import EducationSection from '@/components/education/EducationSection';
import RecommendationsSection from '@/components/recommendations/RecommendationsSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/footer/Footer';
import CommandPalette from '@/components/command/CommandPalette';
import EasterEggModal from '@/components/easter-egg/EasterEggModal';
import dynamic from 'next/dynamic';

// Lazy load heavy interactive features
const AskZarak = dynamic(() => import('@/components/ai/AskZarak'), { ssr: false });
const ProjectXRay = dynamic(() => import('@/components/xray/ProjectXRay'), { ssr: false });

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  
  // AI & X-Ray State
  const [xrayProject, setXrayProject] = useState<string | null>(null);
  const [aiContextMessage, setAiContextMessage] = useState<string | null>(null);

  // Global CMD+K / Ctrl+K keyboard shortcut listener
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

  // Tasteful Easter Egg listener: Typing "zarak" anywhere on page
  useEffect(() => {
    const sequence = ['z', 'a', 'r', 'a', 'k'];
    let currentIndex = 0;

    const handleKeyStroke = (e: KeyboardEvent) => {
      // Ignore keystrokes inside input or textarea elements
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
    <div className="relative w-full min-h-screen text-foreground selection:bg-accent selection:text-accent-foreground font-sans">
      {/* OS Navigation Header */}
      <Navigation onOpenCommand={() => setCommandOpen(true)} />

      {/* Main Developer Experience Sequence */}
      <main className="relative z-10">
        <Hero onOpenCommand={() => setCommandOpen(true)} />
        <ProjectsSection onOpenXRay={setXrayProject} />
        <ExperienceTimeline />
        <TechnologyMap />
        <EngineeringWorkflow />
        <GitHubSection />
        <EducationSection />
        <RecommendationsSection />
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Signature Command Palette (CMD/Ctrl + K) */}
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onTriggerEasterEgg={() => setEasterEggOpen(true)}
      />

      {/* Tasteful Developer Terminal Easter Egg */}
      <EasterEggModal
        open={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />

      {/* AI Agent Experience */}
      <AskZarak 
        onOpenXRay={setXrayProject}
        initialContextMessage={aiContextMessage}
        onClearContextMessage={() => setAiContextMessage(null)}
      />

      {/* Interactive Project X-Ray */}
      <ProjectXRay
        projectId={xrayProject}
        onClose={() => setXrayProject(null)}
        onAskAI={setAiContextMessage}
      />
    </div>
  );
}
