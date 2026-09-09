'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
      <p
        className={cn(
          'flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand',
          centered && 'justify-center',
        )}
      >
        <span aria-hidden="true" className="h-px w-5 bg-brand-line" />
        {eyebrow}
      </p>

      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
        {title}
      </h2>

      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-ink-mute sm:text-[15px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
