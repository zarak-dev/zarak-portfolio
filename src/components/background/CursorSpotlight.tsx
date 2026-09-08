'use client';

import { useEffect, useState } from 'react';

export default function CursorSpotlight() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!mounted || isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 hidden md:block"
      style={{
        background: `radial-gradient(550px circle at ${pos.x}px ${pos.y}px, hsla(var(--accent) / 0.045), transparent 80%)`,
      }}
      aria-hidden="true"
    />
  );
}
