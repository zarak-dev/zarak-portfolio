'use client';

import { Terminal, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { IDENTITY } from '@/data/identity';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#experience' },
    { name: 'Technology Map', href: '#skills' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Education', href: '#education' },
    { name: 'Recommendations', href: '#recommendations' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-12 bg-card/60 border-t border-border/70 relative z-10 font-sans">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/60">
          {/* Brand & Bio */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl text-foreground">
                {IDENTITY.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-mono text-xs text-accent">{IDENTITY.role}</span>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Available for AI Associated Frontend as well as Fullstack</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">
              Connect
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href={IDENTITY.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5 text-accent" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={IDENTITY.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${IDENTITY.contacts.email}`}
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{IDENTITY.contacts.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${IDENTITY.contacts.workEmail}`}
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{IDENTITY.contacts.workEmail}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {IDENTITY.name}. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 hover:border-accent hover:text-foreground transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
