import React, { useMemo } from 'react';
import { motionConfig } from '../../config/motionConfig';
import { useDeviceTier } from '../../hooks/useDeviceTier';

export const FloatingParticles: React.FC = () => {
  const { prefersReducedMotion, isLowTier } = useDeviceTier();

  const particles = useMemo(() => {
    const list = [];
    const count = motionConfig.particleCount;
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        top: `${(i * 100) / count + (Math.sin(i) * 5)}%`,
        left: `${(i * 37) % 100}%`,
        size: i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
        duration: 18 + (i % 7) * 3,
        delay: (i % 5) * 1.5,
        opacity: 0.12 + (i % 4) * 0.04,
      });
    }
    return list;
  }, []);

  if (prefersReducedMotion || isLowTier || !motionConfig.enableFloatingParticles) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#C8A875] animate-pulse"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 4px #C8A875',
          }}
        />
      ))}
    </div>
  );
};
