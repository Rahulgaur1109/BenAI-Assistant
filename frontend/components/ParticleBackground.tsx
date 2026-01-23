'use client';

import { useEffect, useState } from 'react';

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; delay: string; class: string }>>([]);

  useEffect(() => {
    const particleCount = 8;
    const particleClasses = ['particle-1', 'particle-2', 'particle-3', 'particle-4', 'particle-5'];
    
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      class: particleClasses[i % particleClasses.length]
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle ${particle.class}`}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay
          }}
        />
      ))}
    </>
  );
}
