'use client';

import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
  monogram?: 'Z' | 'M';
}

const STAGES = [
  { target: 20, duration: 160 },
  { target: 45, duration: 220 },
  { target: 68, duration: 200 },
  { target: 85, duration: 200 },
  { target: 96, duration: 180 },
  { target: 100, duration: 150 },
];

export default function Preloader({ onComplete, monogram = 'Z' }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState<'loading' | 'finishing' | 'done'>('loading');

  useEffect(() => {
    // Lock scroll while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let timer: NodeJS.Timeout;
    let index = 0;

    const runStages = () => {
      if (index >= STAGES.length) {
        setStatus('finishing');
        timer = setTimeout(() => {
          setStatus('done');
          // Allow 400ms for scale-and-fade exit transition before unmounting
          setTimeout(() => {
            document.body.style.overflow = originalOverflow;
            onComplete();
          }, 400);
        }, 180);
        return;
      }

      const stage = STAGES[index];
      setPercent(stage.target);
      index++;
      timer = setTimeout(runStages, stage.duration);
    };

    timer = setTimeout(runStages, 80);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  // Stroke path:
  // 'Z': Custom Z monogram centered in 48x48 (16 16.5 -> 32 16.5 -> 16 31.5 -> 32 31.5)
  // 'M': Exact building path from reference portfolio (16 32 -> 16 16 -> 24 26 -> 32 16 -> 32 32)
  const pathD =
    monogram === 'M'
      ? 'M16 32V16l8 10 8-10v16'
      : 'M16 16.5h16L16 31.5h16';

  return (
    <div
      className={`loading-screen ${status === 'done' ? 'loading-screen--exit' : ''}`}
      aria-hidden={status === 'done'}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Ambient background grain and center rose glow */}
      <div className="loading-bg-grain" />
      <div className="loading-glow" />

      <div className="loading-content">
        {/* Animated SVG Logo: Squircle draws, then letter builds inside */}
        <div className="loading-logo">
          <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            className="loading-logo-svg"
            aria-hidden="true"
          >
            {/* Squircle frame */}
            <rect
              x="4"
              y="4"
              width="40"
              height="40"
              rx="12"
              stroke="var(--color-rose)"
              strokeWidth="2"
              strokeDasharray="160"
              strokeDashoffset="160"
              className="loading-logo-rect"
            />
            {/* Building Monogram */}
            <path
              d={pathD}
              stroke="var(--color-rose)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset="60"
              className="loading-logo-path"
            />
          </svg>
        </div>

        {/* Identity Text */}
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="loading-name">Zarak Qaisar</h1>
          <p className="loading-title">Software Engineer</p>
        </div>

        {/* Shimmering Progress Bar (GPU scaleX transform) */}
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ transform: `scaleX(${percent / 100})` }}
          />
        </div>

        {/* Meta Status and Percentage */}
        <div className="loading-meta">
          <span className="loading-status">
            {percent < 100 ? 'Initializing portfolio...' : 'Ready'}
          </span>
          <span className="loading-percent">{percent}%</span>
        </div>
      </div>
    </div>
  );
}

