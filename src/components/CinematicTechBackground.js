'use client';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BackgroundWrapper = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const BackgroundCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const AmbientGlow = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 15% 20%, rgba(255, 87, 34, 0.07) 0%, transparent 45%),
    radial-gradient(circle at 85% 75%, rgba(14, 165, 233, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.04) 0%, transparent 60%);
  filter: blur(50px);
  will-change: transform;
`;

export default function CinematicTechBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const nodeCount = isMobile ? 14 : 28;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.8,
        pulse: Math.random() * Math.PI,
        color: i % 3 === 0 ? 'rgba(255, 87, 34, ' : i % 3 === 1 ? 'rgba(14, 165, 233, ' : 'rgba(168, 85, 247, '
      });
    }

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // ── 1. Subtle 3D Perspective Cyber Floor (Lightweight Static Grid) ──
      const horizon = height * 0.65;

      ctx.save();
      ctx.lineWidth = 1;

      // Perspective grid lines
      const lineStep = isMobile ? 140 : 90;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';
      for (let x = -width; x < width * 2; x += lineStep) {
        ctx.beginPath();
        ctx.moveTo(width * 0.5 + (x - width * 0.5) * 0.08, horizon);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal rings
      for (let d = 1; d <= 4; d++) {
        const y = horizon + Math.pow(d / 4, 2) * (height - horizon);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(255, 87, 34, ${0.012 * d})`;
        ctx.stroke();
      }
      ctx.restore();

      // ── 2. Floating Tech Constellation Nodes (No ShadowBlur for 60fps) ──
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        const currentOpacity = 0.28 + Math.sin(node.pulse) * 0.14;

        // Node halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${currentOpacity * 0.35})`;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${currentOpacity})`;
        ctx.fill();

        // Connect nearby nodes
        const maxDist = isMobile ? 80 : 120;
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <BackgroundWrapper aria-hidden="true">
      <AmbientGlow />
      <BackgroundCanvas ref={canvasRef} />
    </BackgroundWrapper>
  );
}
