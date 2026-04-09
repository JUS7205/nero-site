'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    // Deep void base
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, width, height);

    // --- Smooth flowing gradient waves ---
    // Each wave is a filled bezier curve region with semi-transparent dark fills.
    // Multiple layers create depth and organic movement.

    const layers = [
      // Deep background — slow, large undulations
      { yBase: 0.2, amp: 0.08, freq: 0.4, speed: 0.12, phase: 0, r: 16, g: 16, b: 16, a: 0.9 },
      { yBase: 0.3, amp: 0.06, freq: 0.6, speed: -0.08, phase: 1.2, r: 18, g: 17, b: 15, a: 0.7 },
      // Mid layers 
      { yBase: 0.42, amp: 0.07, freq: 0.5, speed: 0.1, phase: 2.5, r: 22, g: 22, b: 22, a: 0.8 },
      { yBase: 0.5, amp: 0.05, freq: 0.7, speed: -0.14, phase: 0.8, r: 20, g: 18, b: 16, a: 0.6 },
      // Bronze accent — very subtle warmth
      { yBase: 0.38, amp: 0.04, freq: 0.35, speed: 0.06, phase: 3.1, r: 140, g: 115, b: 80, a: 0.025 },
      // Foreground — faster, sharper
      { yBase: 0.6, amp: 0.05, freq: 0.8, speed: 0.16, phase: 4.0, r: 26, g: 24, b: 22, a: 0.7 },
      { yBase: 0.72, amp: 0.04, freq: 0.55, speed: -0.11, phase: 1.8, r: 14, g: 13, b: 13, a: 0.8 },
      { yBase: 0.85, amp: 0.03, freq: 0.9, speed: 0.09, phase: 5.2, r: 20, g: 20, b: 20, a: 0.5 },
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

    // --- Ambient glow ---
    // Soft bronze radial glow that breathes
    const breathe = 0.025 + Math.sin(time * 0.15) * 0.01;
    const glowX = width * (0.5 + Math.sin(time * 0.04) * 0.05);
    const glowY = height * (0.35 + Math.sin(time * 0.06) * 0.03);
    const grd = ctx.createRadialGradient(
      glowX, glowY, 0,
      glowX, glowY, width * 0.55
    );
    grd.addColorStop(0, `rgba(184, 151, 106, ${breathe})`);
    grd.addColorStop(0.4, `rgba(184, 151, 106, ${breathe * 0.3})`);
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // --- Vignette (drawn on canvas for seamless integration) ---
    const vig = ctx.createRadialGradient(
      width * 0.5, height * 0.5, width * 0.2,
      width * 0.5, height * 0.5, width * 0.85
    );
    vig.addColorStop(0, 'transparent');
    vig.addColorStop(1, 'rgba(10, 10, 10, 0.45)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, width, height);

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
    const frameInterval = isMobile ? 33 : 0; // ~30fps on mobile, uncapped on desktop

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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
