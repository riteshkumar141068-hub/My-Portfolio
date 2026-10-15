'use client';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const TrailCanvas = styled.canvas`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: screen;

  @media (pointer: coarse) {
    display: none;
  }
`;

export default function RainbowCursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Only run on devices with precision pointer (mouse)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const points = [];
    const particles = [];
    const MAX_POINTS = 14;
    const MAX_PARTICLES = 18;
    let hue = 0;
    let lastX = -1000;
    let lastY = -1000;
    let animId = null;
    let isIdle = true;
    let idleTimeout = null;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      hue = (hue + 5) % 360;

      // Add trail point
      points.push({
        x,
        y,
        hue,
        age: 0,
        maxAge: 20,
      });

      if (points.length > MAX_POINTS) {
        points.shift();
      }

      // Sparkle micro-particles
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > 12 && particles.length < MAX_PARTICLES) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2.5 + 1.2,
          hue: (hue + Math.random() * 20 - 10 + 360) % 360,
          alpha: 0.9,
          decay: 0.045,
        });
      }

      lastX = x;
      lastY = y;

      if (isIdle) {
        isIdle = false;
        animId = requestAnimationFrame(animate);
      }

      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        // Will settle and stop loop automatically when points decay
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // ── 1. Draw Rainbow Linking Ribbon (Fast Multi-Pass, No ShadowBlur) ──
      if (points.length > 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = 'lighter';

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          p1.age += 1;
          const progress = 1 - p1.age / p1.maxAge;
          if (progress <= 0) continue;

          const midX = (p1.x + p2.x) * 0.5;
          const midY = (p1.y + p2.y) * 0.5;

          // Outer Glow Pass (Wide & Soft)
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
          ctx.strokeStyle = `hsla(${p1.hue}, 100%, 60%, ${progress * 0.22})`;
          ctx.lineWidth = progress * 14;
          ctx.stroke();

          // Medium Radiant Core
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
          ctx.strokeStyle = `hsla(${p1.hue}, 100%, 65%, ${progress * 0.55})`;
          ctx.lineWidth = progress * 6;
          ctx.stroke();

          // Crisp Center Line
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
          ctx.strokeStyle = `hsla(${p1.hue}, 100%, 90%, ${progress * 0.85})`;
          ctx.lineWidth = Math.max(0.75, progress * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Clean up aged points
      while (points.length > 0 && points[0].age >= points[0].maxAge) {
        points.shift();
      }

      // ── 2. Draw Floating Sparkle Particles ──
      if (particles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
          p.radius *= 0.95;

          if (p.alpha <= 0 || p.radius <= 0.4) {
            particles.splice(i, 1);
            continue;
          }

          // Halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha * 0.35})`;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${p.alpha * 0.85})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // Idle check: if nothing left to draw, pause loop to save 100% CPU
      if (points.length === 0 && particles.length === 0) {
        isIdle = true;
        ctx.clearRect(0, 0, width, height);
        return;
      }

      animId = requestAnimationFrame(animate);
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
      clearTimeout(idleTimeout);
    };
  }, []);

  return <TrailCanvas ref={canvasRef} aria-hidden="true" />;
}
