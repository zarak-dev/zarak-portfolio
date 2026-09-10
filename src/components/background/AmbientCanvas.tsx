'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  speed: number;
}

interface Pulse {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  isCyan: boolean;
}

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Skip heavy canvas animation on mobile touch devices or if reduced motion is requested
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isRunning = true;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasSize();

    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, isHovering: false };
    const isDark = resolvedTheme !== 'light';

    // Node density calibrated for aesthetic elegance and performance
    const count = Math.min(Math.max(Math.floor((width * height) / 14000), 45), 85);
    const nodes: Node3D[] = [];

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 0.75 + 0.25; // Depth from 0.25 to 1.0
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx: (Math.random() - 0.5) * 0.4 * (1.1 - z * 0.3),
        vy: (Math.random() - 0.5) * 0.4 * (1.1 - z * 0.3),
        radius: (Math.random() * 2.2 + 1.8) * z,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.025,
      });
    }

    const pulses: Pulse[] = [];
    const maxPulses = 18;
    const maxDistance = 160;
    const maxDistanceSq = maxDistance * maxDistance;
    const mouseRange = 180;
    const mouseRangeSq = mouseRange * mouseRange;

    // Spatial partitioning grid setup (cell size = maxDistance)
    const cellSize = maxDistance;

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const onMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.isHovering = false;
    };

    let resizeTimer: number;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setupCanvasSize, 150);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animId);
      } else if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const strokeColor = isDark ? '204, 204, 204' : '51, 51, 51';

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      // Mouse smoothing
      if (mouse.isHovering && mouse.targetX > -1000) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      // Update node positions and populate spatial grid
      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;
      const grid: number[][] = Array.from({ length: cols * rows }, () => []);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.phase += n.speed;
        n.x += n.vx + Math.sin(n.phase) * 0.22;
        n.y += n.vy + Math.cos(n.phase) * 0.22;

        // Interactive mouse gentle repulsion
        if (mouse.x > -1000) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRangeSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouseRange) * 0.7;
            n.x += (dx / dist) * force * 2.2;
            n.y += (dy / dist) * force * 2.2;
          }
        }

        // Screen wrap
        if (n.x < -30) n.x = width + 30;
        if (n.x > width + 30) n.x = -30;
        if (n.y < -30) n.y = height + 30;
        if (n.y > height + 30) n.y = -30;

        // Bin into grid
        const c = Math.max(0, Math.min(cols - 1, Math.floor(n.x / cellSize)));
        const r = Math.max(0, Math.min(rows - 1, Math.floor(n.y / cellSize)));
        grid[r * cols + c].push(i);
      }

      // Spatial bucketing connection checks: only test same cell and 4 forward neighbors
      const activeConnections: { i: number; j: number }[] = [];
      const neighborOffsets = [
        [0, 0],   // same cell
        [1, 0],   // right
        [-1, 1],  // bottom-left
        [0, 1],   // bottom
        [1, 1],   // bottom-right
      ];

      // Batch line rendering to minimize GPU draw calls
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${strokeColor}, ${isDark ? 0.09 : 0.11})`;
      ctx.lineWidth = isDark ? 0.95 : 1.05;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cellNodes = grid[r * cols + c];
          if (!cellNodes || cellNodes.length === 0) continue;

          for (const [dc, dr] of neighborOffsets) {
            const nc = c + dc;
            const nr = r + dr;
            if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;

            const neighborNodes = grid[nr * cols + nc];
            if (!neighborNodes || neighborNodes.length === 0) continue;

            const isSameCell = dc === 0 && dr === 0;

            for (let idxA = 0; idxA < cellNodes.length; idxA++) {
              const i = cellNodes[idxA];
              const startIdxB = isSameCell ? idxA + 1 : 0;

              for (let idxB = startIdxB; idxB < neighborNodes.length; idxB++) {
                const j = neighborNodes[idxB];
                const a = nodes[i];
                const b = nodes[j];

                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < maxDistanceSq) {
                  activeConnections.push({ i, j });
                  ctx.moveTo(a.x, a.y);
                  ctx.lineTo(b.x, b.y);
                }
              }
            }
          }
        }
      }
      ctx.stroke();

      // Connect node to mouse cursor if within range
      if (mouse.x > -1000) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${strokeColor}, ${isDark ? 0.22 : 0.25})`;
        ctx.lineWidth = 1;

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < mouseRangeSq) {
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
          }
        }
        ctx.stroke();

        // Subtle interactive cursor focal rings
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(204, 204, 204, 0.25)' : 'rgba(51, 51, 51, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Spawn electrical firing pulses
      if (pulses.length < maxPulses && activeConnections.length > 0 && Math.random() < 0.15) {
        const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
        pulses.push({
          sourceIdx: conn.i,
          targetIdx: conn.j,
          progress: 0,
          speed: 0.012 + Math.random() * 0.02,
          isCyan: Math.random() > 0.45,
        });
      }

      // Render & update pulses (batched)
      ctx.beginPath();
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)';

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const a = nodes[pulse.sourceIdx];
        const b = nodes[pulse.targetIdx];
        if (!a || !b) {
          pulses.splice(p, 1);
          continue;
        }

        const px = a.x + (b.x - a.x) * pulse.progress;
        const py = a.y + (b.y - a.y) * pulse.progress;

        ctx.moveTo(px + 2, py);
        ctx.arc(px, py, 2, 0, Math.PI * 2);
      }
      ctx.fill();

      // Render nodes (batched by theme)
      ctx.beginPath();
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.35)';
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.moveTo(n.x + n.radius, n.y);
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
    />
  );
}
