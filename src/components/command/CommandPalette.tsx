'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Terminal,
  FolderGit2,
  Briefcase,
  User,
  Wrench,
  GraduationCap,
  Mail,
  FileText,
  SunMoon,
  Sparkles,
  ArrowRight,
  CornerDownLeft,
  X,
  Layers,
  Quote,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useScrollLock } from '@/hooks/useScrollLock';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  icon: typeof Terminal;
  action: () => void;
}

export default function CommandPalette({
  open,
  onOpenChange,
  onTriggerEasterEgg,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTriggerEasterEgg?: () => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();

  useScrollLock(open);

  const navigateTo = (id: string) => {
    onOpenChange(false);
    setQuery('');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const commands: CommandItem[] = [
      {
        id: 'aimmyyy-ai',
        title: 'Open Aimmyyy AI (Portfolio Agent)',
        category: 'AI Assistant',
        shortcut: '/aimmyyy',
        icon: Sparkles,
        action: () => {
          onOpenChange(false);
          // Small delay to allow command palette to close gracefully
          setTimeout(() => {
            const btn = document.querySelector('[data-aimmyyy-trigger]');
            if (btn) (btn as HTMLButtonElement).click();
          }, 100);
        },
      },
      {
        id: 'dentally',
        title: 'View Dentally Case Study (Hero Project)',
        category: 'Featured Work',
        shortcut: '/dentally',
        icon: Sparkles,
        action: () => navigateTo('dentally'),
      },
      {
        id: 'projects',
        title: 'Explore Case Studies (FYP Connect, MoneyFlow, Exynos Cooky)',
        category: 'Featured Work',
        shortcut: '/projects',
        icon: FolderGit2,
        action: () => navigateTo('projects'),
      },
      {
        id: 'about',
        title: 'Developer Profile & Technical Identity',
        category: 'Profile',
        shortcut: '/about',
        icon: User,
        action: () => navigateTo('about'),
      },
      {
        id: 'experience',
        title: 'Career Timeline (Smart Forum & Trustech)',
        category: 'Career',
        shortcut: '/experience',
        icon: Briefcase,
        action: () => navigateTo('experience'),
      },
      {
        id: 'skills',
        title: 'Interactive Technology Map & Evidence',
        category: 'Engineering',
        shortcut: '/skills',
        icon: Wrench,
        action: () => navigateTo('skills'),
      },
      {
        id: 'workflow',
        title: 'Engineering Mindset ("How I Build")',
        category: 'Engineering',
        shortcut: '/workflow',
        icon: Layers,
        action: () => navigateTo('workflow'),
      },
      {
        id: 'github',
        title: 'Verified Open Source Repositories (@zarak-dev)',
        category: 'Code',
        shortcut: '/github',
        icon: Terminal,
        action: () => navigateTo('github'),
      },
      {
        id: 'education',
        title: 'Academic Foundation (Sarhad University BS SE)',
        category: 'Background',
        shortcut: '/education',
        icon: GraduationCap,
        action: () => navigateTo('education'),
      },
      {
        id: 'recommendations',
        title: 'Recommendations & Peer Endorsements',
        category: 'Endorsements',
        shortcut: '/reviews',
        icon: Quote,
        action: () => navigateTo('recommendations'),
      },
      {
        id: 'contact',
        title: 'Direct Contact & Communications',
        category: 'Connect',
        shortcut: '/contact',
        icon: Mail,
        action: () => navigateTo('contact'),
      },
      {
        id: 'resume',
        title: 'View Condensed Resume / Curriculum Vitae',
        category: 'Document',
        shortcut: '/resume',
        icon: FileText,
        action: () => {
          onOpenChange(false);
          const resumeSection = document.getElementById('resume');
          if (resumeSection) {
            resumeSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            navigateTo('about');
          }
        },
      },
      {
        id: 'theme',
        title: `Switch Theme to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode`,
        category: 'Preferences',
        shortcut: '/theme',
        icon: SunMoon,
        action: () => {
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          onOpenChange(false);
        },
      },
      {
        id: 'easter-egg',
        title: 'Developer Easter Egg: Digital Operating Terminal',
        category: 'System',
        shortcut: '/matrix',
        icon: Terminal,
        action: () => {
          onOpenChange(false);
          if (onTriggerEasterEgg) onTriggerEasterEgg();
        },
      },
  ];

  const q = query.trim().toLowerCase();
  const filtered = q
    ? commands.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.shortcut?.toLowerCase().includes(q)
      )
    : commands;

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside command palette
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filtered, selectedIndex, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 sm:pt-28 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Zarak Command Palette"
            className="relative w-full max-w-2xl bg-card border border-border/80 shadow-2xl rounded-2xl overflow-hidden z-10 glow-border"
          >
            {/* Header / Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/70 bg-secondary/30">
              <Terminal className="w-4 h-4 text-accent shrink-0" />
              <div className="flex-1 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground select-none">ZARAK.OS /</span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search sections... (/dentally, /skills, /projects)"
                  autoFocus
                  className="w-full bg-transparent border-none outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-0"
                />
              </div>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded text-muted-foreground hover:text-foreground text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono border border-border bg-background text-muted-foreground">
                ESC to close
              </span>
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Search className="w-6 h-6 mx-auto mb-2 opacity-40" />
                  <p className="text-xs font-mono">No commands matching &quot;{query}&quot;</p>
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl font-mono text-xs transition-colors text-left ${
                        isSelected
                          ? 'bg-accent text-accent-foreground shadow-xs'
                          : 'text-foreground/90 hover:bg-secondary/70'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-accent-foreground' : 'text-accent'}`} />
                        <span className="truncate font-sans font-medium">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {item.shortcut && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                              isSelected
                                ? 'bg-black/20 text-accent-foreground'
                                : 'bg-secondary border border-border text-muted-foreground'
                            }`}
                          >
                            {item.shortcut}
                          </span>
                        )}
                        <span className="opacity-60 text-[10px] hidden sm:inline">
                          {isSelected ? <CornerDownLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-border/50 bg-secondary/20 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>Navigate: <kbd className="px-1 py-0.5 bg-background rounded border border-border">↑</kbd> <kbd className="px-1 py-0.5 bg-background rounded border border-border">↓</kbd></span>
                <span>Select: <kbd className="px-1 py-0.5 bg-background rounded border border-border">↵</kbd></span>
              </div>
              <span className="text-accent font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                SYSTEM READY
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
