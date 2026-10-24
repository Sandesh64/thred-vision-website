import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motionConfig } from '../../config/motionConfig';
import { useDeviceTier } from '../../hooks/useDeviceTier';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isTouch, prefersReducedMotion, isLowTier } = useDeviceTier();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable smooth inertial scroll on touch devices, low-end hardware, or if prefers-reduced-motion
    if (!motionConfig.enableSmoothScroll || isTouch || prefersReducedMotion || isLowTier) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Provide window helper for anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        const hash = target.getAttribute('href');
        if (hash && hash !== '#') {
          const el = document.querySelector(hash);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el as HTMLElement, { offset: -40 });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isTouch, prefersReducedMotion, isLowTier]);

  return <>{children}</>;
};
