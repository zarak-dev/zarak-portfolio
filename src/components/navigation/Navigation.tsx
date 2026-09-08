'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, Terminal, FileDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import MobileNav from './MobileNav';
import { IDENTITY } from '@/data/identity';

interface NavigationProps {
  onOpenCommand: () => void;
}

const DESKTOP_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Timeline', href: '#experience' },
  { name: 'Tech Map', href: '#skills' },
  { name: 'Workflow', href: '#workflow' },
  { name: 'Reviews', href: '#recommendations' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation({ onOpenCommand }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect current section in view
      const sectionIds = ['about', 'projects', 'experience', 'skills', 'workflow', 'github', 'recommendations', 'contact'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-accent via-indigo-500 to-sky-400 origin-left z-[70] pointer-events-none"
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border/70 py-3 shadow-sm'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo / OS Identity */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/40 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-200">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-foreground flex items-center gap-1.5">
                {IDENTITY.name}
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </span>
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Animated Active Pill */}
          <nav className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-card/70 border border-border/70 backdrop-blur-md">
            {DESKTOP_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-mono transition-colors duration-200 whitespace-nowrap ${
                    isActive ? 'text-accent font-semibold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-accent/15 border border-accent/40"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Suite: CMD+K, Resume, Theme */}
          <div className="flex items-center gap-2.5">
            {/* Command palette trigger */}
            <button
              onClick={onOpenCommand}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-card/60 backdrop-blur-md text-xs font-mono text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors shadow-xs"
              aria-label="Open command palette"
            >
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span className="hidden md:inline">Command</span>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-secondary border border-border text-foreground font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Resume CTA */}
            <a
              href="#resume"
              onClick={(e) => handleNavClick(e, '#resume')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-mono text-xs font-semibold hover:bg-accent/90 transition-colors shadow-xs"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            <ThemeToggle />

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-border/70 text-muted-foreground hover:text-foreground"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenCommand={onOpenCommand}
      />
    </>
  );
}
