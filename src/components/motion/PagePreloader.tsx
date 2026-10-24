import React, { useState, useEffect } from 'react';
import { motionConfig } from '../../config/motionConfig';
import { useDeviceTier } from '../../hooks/useDeviceTier';
import { BrandLogo } from '../BrandLogo';

export const PagePreloader: React.FC = () => {
  const { prefersReducedMotion } = useDeviceTier();
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // If reduced motion or preloader disabled, dismiss instantly
    if (prefersReducedMotion || !motionConfig.enablePreloader) {
      setIsVisible(false);
      return;
    }

    // Dismiss after max 1.1s (strictly under 1.2s limit)
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsVisible(false), 300);
    }, motionConfig.preloaderDurationMs);

    // Allow user to skip by clicking or pressing any key
    const handleSkip = () => {
      setIsExiting(true);
      setTimeout(() => setIsVisible(false), 150);
    };

    window.addEventListener('keydown', handleSkip);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        setIsExiting(true);
        setTimeout(() => setIsVisible(false), 150);
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#092820] text-[#F4F0E6] cursor-pointer transition-opacity duration-300 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading THRED VISION"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Brand Logo */}
        <div className="relative mb-6 transform transition-transform duration-700 hover:scale-105">
          <BrandLogo variant="light" size="lg" layout="icon-only" />
          {/* Subtle concentric gold ripple */}
          <div className="absolute -inset-4 rounded-full border border-[#C8A875]/30 animate-ping pointer-events-none" />
        </div>

        {/* Brand Name Typography */}
        <h1 className="font-mono text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#F4F0E6] uppercase">
          THRED VISION
        </h1>
        <p className="text-[11px] font-mono tracking-widest text-[#C8A875] uppercase mt-1">
          MANUFACTURING WITH PURPOSE
        </p>

        {/* Tailor's Golden Stitch Line that draws across */}
        <div className="w-48 h-0.5 mt-6 bg-[#103C30] rounded-full overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-transparent via-[#C8A875] to-transparent w-full animate-[shimmer_1s_infinite]" />
        </div>

        <span className="text-[10px] text-[#B6C6B8]/60 mt-4 font-mono">
          Click anywhere to skip
        </span>
      </div>
    </div>
  );
};
