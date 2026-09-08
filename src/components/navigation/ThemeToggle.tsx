'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full border border-border/40" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative w-9 h-9 rounded-full border border-border/70 bg-card/60 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors shadow-xs"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-emerald-400" />
      ) : (
        <Moon className="w-4 h-4 text-sky-600" />
      )}
    </motion.button>
  );
}
