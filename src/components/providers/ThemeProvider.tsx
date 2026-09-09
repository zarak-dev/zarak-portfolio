'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

// Suppress React 19 false-positive warning for next-themes' inline script in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const origError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }
    origError.apply(console, args);
  };
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

