"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas particle field. ~80 white dots drifting slowly.
 * Pure vanilla 2D canvas — no external runtime dep, ~50 lines.
 * Used in place of @tsparticles because the v4 React binding changed API
 * and Turbopack errored on the legacy `initParticlesEngine` import.
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
      aPhase: number;
    };

    let particles: Particle[] = [];

    const reset = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = rect?.width ?? window.innerWidth;
      const h = rect?.height ?? window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      const count = Math.round((w * h) / 14000); // ~80 on a 1200x900 area
      particles = Array.from({ length: Math.min(120, Math.max(40, count)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: 0.4 + Math.random() * 1.2,
        a: 0.15 + Math.random() * 0.4,
        aPhase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      const t = performance.now() / 1000;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        const alpha = p.a + Math.sin(t * 0.8 + p.aPhase) * 0.15;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.05, alpha)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    reset();
    draw();

    const onResize = () => {
      cancelAnimationFrame(raf);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      reset();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
