import Link from 'next/link';
import { Terminal, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-background text-foreground font-sans">
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 font-mono text-xs text-accent">
          <Terminal className="w-3.5 h-3.5" />
          <span>STATUS: 404_PAGE_NOT_FOUND</span>
        </div>

        <h1 className="font-display font-black text-6xl sm:text-7xl text-foreground tracking-tighter">
          404
        </h1>

        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          The requested route or module does not exist in Zarak&apos;s Developer Operating System.
        </p>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-mono text-xs font-semibold hover:bg-accent/90 transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Operating System</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
