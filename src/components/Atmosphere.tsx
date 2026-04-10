'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    // Deep void base (clear instead of fill because CSS handles background)
    ctx.clearRect(0, 0, width, height);

    // --- Smooth flowing gradient waves ---
    // Each wave is a filled bezier curve region with semi-transparent dark fills.
    // Multiple layers create depth and organic movement.

    const layers = [
      // Deep background — slow, large undulations
      { yBase: 0.2, amp: 0.08, freq: 0.4, speed: 0.12, phase: 0, r: 16, g: 16, b: 16, a: 0.9 },
      // Mid layers 
      { yBase: 0.42, amp: 0.07, freq: 0.5, speed: 0.1, phase: 2.5, r: 22, g: 22, b: 22, a: 0.8 },
      { yBase: 0.5, amp: 0.05, freq: 0.7, speed: -0.14, phase: 0.8, r: 20, g: 18, b: 16, a: 0.6 },
      // Foreground — faster, sharper
      { yBase: 0.6, amp: 0.05, freq: 0.8, speed: 0.16, phase: 4.0, r: 26, g: 24, b: 22, a: 0.7 },
      { yBase: 0.72, amp: 0.04, freq: 0.55, speed: -0.11, phase: 1.8, r: 14, g: 13, b: 13, a: 0.8 },
    ];

    const segments = 6; // number of bezier segments across width

    for (const layer of layers) {
      const t = time * layer.speed + layer.phase;
      
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      // Build smooth curve using quadratic bezier through control points
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i <= segments; i++) {
        const nx = i / segments; // normalized x [0..1]
        const px = nx * width;
        
        // Layer multiple sine waves for organic shape
        const wave1 = Math.sin(nx * Math.PI * 2 * layer.freq + t) * layer.amp;
        const wave2 = Math.sin(nx * Math.PI * 2 * layer.freq * 1.7 + t * 0.7 + 2.1) * layer.amp * 0.35;
        const wave3 = Math.sin(nx * Math.PI * 2 * layer.freq * 0.6 + t * 1.4 + 4.3) * layer.amp * 0.2;
        
        const py = (layer.yBase + wave1 + wave2 + wave3) * height;
        points.push({ x: px, y: py });
      }
      
      // Draw smooth curve through points
      ctx.moveTo(-10, height + 10);
      ctx.lineTo(-10, points[0].y);
      
      for (let i = 0; i < points.length - 1; i++) {
        const curr = points[i];
        const next = points[i + 1];
        const cpx = (curr.x + next.x) / 2;
        const cpy = (curr.y + next.y) / 2;
        ctx.quadraticCurveTo(curr.x, curr.y, cpx, cpy);
      }
      
      // Last point
      const last = points[points.length - 1];
      ctx.lineTo(width + 10, last.y);
      ctx.lineTo(width + 10, height + 10);
      ctx.closePath();
      
      ctx.fillStyle = `rgba(${layer.r}, ${layer.g}, ${layer.b}, ${layer.a})`;
      ctx.fill();
    }
    // Lighting effects moved to CSS for massive performance gains
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    let dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const startTime = performance.now();
    let lastFrame = 0;
    // Cap framerate slightly more aggressively. Desktop ~45fps, Mobile ~30fps 
    const frameInterval = isMobile ? 33 : 22; 

    const animate = (now: number) => {
      if (now - lastFrame >= frameInterval) {
        const elapsed = (now - startTime) / 1000;
        draw(ctx, window.innerWidth, window.innerHeight, elapsed);
        lastFrame = now;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [draw]);

  return (
    <>
      <div className="fixed inset-0 w-full h-full bg-nero-void pointer-events-none" style={{ zIndex: -2 }} />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      />
      <div className="fixed inset-0 w-full h-full pointer-events-none ambient-glow" style={{ zIndex: 0 }} />
      <div className="fixed inset-0 w-full h-full pointer-events-none vignette-overlay" style={{ zIndex: 0 }} />
    </>
  );
}
