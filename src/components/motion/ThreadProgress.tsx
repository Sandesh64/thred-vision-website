import React, { useEffect, useState } from 'react';
import { useDeviceTier } from '../../hooks/useDeviceTier';

export const ThreadProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const { prefersReducedMotion } = useDeviceTier();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const p = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  // Compute manufacturing process stage based on scroll percentage
  const getStageName = (p: number) => {
    if (p < 25) return 'FABRIC & ARCHITECTURE';
    if (p < 50) return 'APPAREL CAPABILITIES';
    if (p < 80) return 'MANUFACTURING & QUALITY';
    return 'EXECUTIVE & RFQ';
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Precision Background Track */}
      <div className="w-full h-[3px] bg-[#092820]/80 backdrop-blur-sm relative overflow-hidden">
        {/* SVG Tailor's Stitched Line */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 3"
        >
          {/* Subtle base guide thread */}
          <line
            x1="0"
            y1="1.5"
            x2="1000"
            y2="1.5"
            stroke="rgba(200, 168, 117, 0.25)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Active stitched thread with dynamic stroke-dashoffset */}
          <line
            x1="0"
            y1="1.5"
            x2="1000"
            y2="1.5"
            stroke="#C8A875"
            strokeWidth="2.5"
            strokeDasharray="8 4"
            style={{
              strokeDashoffset: `${1000 - (progress / 100) * 1000}`,
              transition: 'stroke-dashoffset 0.1s linear',
            }}
          />
        </svg>

        {/* Needle Glint & Leading Filament Bead */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#F4F0E6] shadow-[0_0_8px_#C8A875] border border-[#C8A875] transition-all duration-75"
          style={{ left: `${progress}%` }}
        />
      </div>

      {/* Floating Micro Badge for Manufacturing Process Status (Visible on scroll) */}
      {progress > 2 && (
        <div
          className="absolute top-2 right-4 px-2 py-0.5 rounded-full bg-[#092820]/90 border border-[#C8A875]/40 text-[9px] font-mono uppercase tracking-widest text-[#C8A875] backdrop-blur-md shadow-md opacity-90 transition-opacity duration-300 hidden sm:flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A875] animate-pulse" />
          <span>{getStageName(progress)}</span>
          <span className="text-[#F4F0E6]/60">·</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
};

