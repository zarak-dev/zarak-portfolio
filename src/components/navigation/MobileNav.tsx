'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Terminal,
  Sparkles,
  FolderGit2,
  Briefcase,
  Wrench,
  Layers,
  FileText,
  Mail,
  GraduationCap,
  Quote,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { IDENTITY } from '@/data/identity';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  onOpenCommand: () => void;
}

const NAV_ITEMS = [
  { name: 'Projects', href: '#projects', icon: FolderGit2, badge: 'Featured' },
  { name: 'Timeline', href: '#experience', icon: Briefcase },
  { name: 'Tech Map', href: '#skills', icon: Wrench },
  { name: 'Workflow', href: '#workflow', icon: Layers },
  { name: 'GitHub Profile', href: '#github', icon: Terminal },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Recommendations', href: '#recommendations', icon: Quote },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function MobileNav({ open, onClose, onOpenCommand }: MobileNavProps) {
  const handleNavClick = (href: string) => {
    onClose();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[110] lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-card border-l border-border/70 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
                <div>
                  <span className="font-display font-bold text-sm tracking-tight text-foreground block">
                    {IDENTITY.name}
                  </span>
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase">
                    Developer OS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl border border-border/70 text-muted-foreground hover:text-foreground"
                    aria-label="Close navigation"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Command Palette Trigger */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCommand();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-accent/30 bg-accent/5 text-accent font-mono text-xs mb-6 hover:bg-accent/10 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  Open Command Menu
                </span>
                <span className="text-[10px] bg-accent/20 px-1.5 py-0.5 rounded">⌘K</span>
              </button>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-accent/70" />
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-accent/15 text-accent border border-accent/30">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Status */}
            <div className="pt-6 border-t border-border/60 mt-6 font-mono text-[11px] text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>{IDENTITY.status.availability}</span>
              </div>
              <p className="text-[10px] text-muted-foreground/70">
                Next.js · TypeScript · Redux · Tailwind
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
