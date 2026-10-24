import React from 'react';
import { useDeviceTier } from '../../hooks/useDeviceTier';

interface StitchedDividerProps {
  className?: string;
  tone?: 'dark' | 'light';
}

export const StitchedDivider: React.FC<StitchedDividerProps> = ({
  className = '',
  tone = 'dark',
}) => {
  const { prefersReducedMotion } = useDeviceTier();

  const strokeColor = tone === 'dark' ? 'rgba(16, 60, 48, 0.25)' : 'rgba(200, 168, 117, 0.35)';

  return (
    <div
      className={`w-full overflow-hidden flex items-center justify-center py-2 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className={`w-full max-w-7xl h-3 px-6 sm:px-12 ${
          prefersReducedMotion ? '' : 'transition-opacity duration-1000'
        }`}
        preserveAspectRatio="none"
        viewBox="0 0 1000 12"
        fill="none"
      >
        {/* Editorial stitch line with running dashoffset */}
        <line
          x1="0"
          y1="6"
          x2="1000"
          y2="6"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
        {/* Subtle center gold needle eye glyph */}
        <circle cx="500" cy="6" r="3" fill="#C8A875" />
        <circle cx="500" cy="6" r="1.2" fill={tone === 'dark' ? '#092820' : '#F4F0E6'} />
      </svg>
    </div>
  );
};
