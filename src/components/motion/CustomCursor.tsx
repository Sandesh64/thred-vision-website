import React, { useEffect, useState, useRef } from 'react';
import { motionConfig } from '../../config/motionConfig';
import { useDeviceTier } from '../../hooks/useDeviceTier';

export const CustomCursor: React.FC = () => {
  const { isTouch, prefersReducedMotion } = useDeviceTier();
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (isTouch || prefersReducedMotion || !motionConfig.enableCursor) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"]')
        );
        setIsHovered(isInteractive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Smooth lag loop for outer ring
    let rafId: number;
    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch, prefersReducedMotion]);

  if (!enabled) return null;

  return (
    <>
      {/* Precision Center Gold Needle Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#C8A875] pointer-events-none z-50 transition-opacity duration-150"
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Spring Ring with Interactive Scale */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-50 transition-all duration-200 ease-out ${
          isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 border-[#C8A875] bg-[#C8A875]/10 backdrop-blur-2xs'
            : isClicking
            ? 'w-5 h-5 -ml-2.5 -mt-2.5 border-[#E5D7B7] bg-[#E5D7B7]/20'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border-[#C8A875]/50'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
