import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export function CursorParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let particleId = 0;
    let lastParticleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Throttle particle creation - only create every 50ms
      const now = Date.now();
      if (now - lastParticleTime < 50) return;
      lastParticleTime = now;

      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: Math.random() * 3 + 2, // 2-5px
      };

      setParticles(prev => [...prev.slice(-15), newParticle]); // Keep last 15 particles
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fade out particles
    const fadeInterval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.05 }))
          .filter(p => p.opacity > 0)
      );
    }, 30);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(fadeInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity * 0.4, // Very subtle
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.3)`,
          }}
        />
      ))}
    </div>
  );
}
