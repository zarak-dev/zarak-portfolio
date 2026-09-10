'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime exception:', error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-background text-foreground font-sans">
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/30 font-mono text-xs text-destructive">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>STATUS: 500_RUNTIME_EXCEPTION</span>
        </div>

        <h1 className="font-display font-black text-5xl sm:text-6xl text-foreground tracking-tighter">
          System Fault
        </h1>

        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          An unexpected error interrupted the execution flow.
          {error.digest && (
            <span className="block mt-1 text-xs opacity-75 font-mono">
              Error Digest: {error.digest}
            </span>
          )}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-mono text-xs font-semibold hover:bg-accent/90 transition-colors shadow-md cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Attempt Recovery</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card/50 text-foreground font-mono text-xs font-semibold hover:bg-card transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Root</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
