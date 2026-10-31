import { useEffect, useRef } from 'react';

export function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = document.documentElement.clientWidth || window.innerWidth);
    let height = (canvas.height = document.documentElement.clientHeight || window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = document.documentElement.clientWidth || window.innerWidth;
      height = canvas.height = document.documentElement.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(65, Math.floor((width * height) / 22000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.35,
      vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 16000) {
            const alpha = (1 - distSq / 16000) * 0.12;
            ctx.strokeStyle = `rgba(184, 115, 51, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw subtle nodes
      for (const p of particles) {
        ctx.fillStyle = 'rgba(210, 83, 56, 0.35)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40 max-w-full w-full h-full"
      style={{ maxWidth: '100vw', maxHeight: '100vh' }}
      aria-hidden="true"
    />
  );
}
