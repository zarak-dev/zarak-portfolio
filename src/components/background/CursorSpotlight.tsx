'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorSpotlight() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Detect touch device or mobile screen
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      setIsTouch(true);
      return;
    }

    let rafId: number;
    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (spotRef.current) {
          spotRef.current.style.background = `radial-gradient(550px circle at ${e.clientX}px ${e.clientY}px, hsla(var(--accent) / 0.045), transparent 80%)`;
        }
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  if (!mounted || isTouch) return null;

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 hidden md:block"
      style={{
        background: `radial-gradient(550px circle at -500px -500px, hsla(var(--accent) / 0.045), transparent 80%)`,
      }}
      aria-hidden="true"
    />
  );
}

