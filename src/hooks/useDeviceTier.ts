import { useState, useEffect } from 'react';

export type DeviceTierLevel = 'high' | 'medium' | 'low';

export interface DeviceTier {
  /** 3-Tier classification: 'high' (desktop), 'medium' (normal mobile), 'low' (weak mobile) */
  tierLevel: DeviceTierLevel;
  isLowTier: boolean;
  isMobile: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  dpr: number;
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(() => {
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return {
      tierLevel: isMobile ? 'medium' : 'high',
      isLowTier: false,
      isMobile,
      isTouch,
      prefersReducedMotion: false,
      dpr: isMobile ? 1.25 : 1.5,
    };
  });

  useEffect(() => {

    // 2. Touch and screen width
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    const isMobile = window.innerWidth < 768;

    // 3. Accessibility prefers-reduced-motion (only dampens speed, does NOT kill 3D)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = motionQuery.matches;

    // 4. Hardware classification into 3 tiers
    const cores = navigator.hardwareConcurrency || 4;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const memory = nav.deviceMemory || 4;

    let tierLevel: DeviceTierLevel = 'high';
    if (isMobile) {
      if (cores <= 2 && memory <= 2) {
        tierLevel = 'low';
      } else {
        tierLevel = 'medium';
      }
    } else {
      tierLevel = 'high';
    }

    // 5. DPR Assignment
    const rawDpr = window.devicePixelRatio || 1;
    let dpr = 1.5;
    if (tierLevel === 'low') {
      dpr = 1.0;
    } else if (tierLevel === 'medium') {
      dpr = Math.min(rawDpr, 1.35);
    } else {
      dpr = Math.min(rawDpr, 1.75);
    }

    setTier({
      tierLevel,
      isLowTier: tierLevel === 'low',
      isMobile,
      isTouch,
      prefersReducedMotion,
      dpr,
    });

    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      setTier((prev) => ({
        ...prev,
        isMobile: currentIsMobile,
        tierLevel: currentIsMobile ? (prev.isLowTier ? 'low' : 'medium') : 'high',
      }));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return tier;
}
