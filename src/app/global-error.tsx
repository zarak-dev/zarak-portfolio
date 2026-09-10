'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Fatal global runtime exception:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white font-mono min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs text-red-400">
            CRITICAL_SYSTEM_FAULT
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Kernel Panic</h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            A fatal error occurred at the root application layout level.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Reload System
          </button>
        </div>
      </body>
    </html>
  );
}
