import React from 'react';

export interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'black-badge';
  showTagline?: boolean;
  layout?: 'horizontal' | 'stacked' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  asImg?: boolean;
}

/**
 * Authentic Official "THRED VISION" Brand Logo
 * Matching user uploaded logo Light (1).png
 * Features:
 * - Vertical precision sewing needle with hollow eye
 * - Dynamic crimson red thread chevron passing through needle eye and forming T/V geometry
 * - Cohesive brand typography
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  showTagline = true,
  layout = 'horizontal',
  size = 'md',
  className = '',
  asImg = false,
}) => {
  const isLight = variant === 'light';
  const needleColor = isLight ? '#FFFFFF' : '#000000';
  const redThreadColor = '#E50914';

  const textColor = isLight ? 'text-white' : 'text-[#103C30]';
  const taglineColor = isLight ? 'text-[#C8A875]' : 'text-[#103C30]/75';

  // Height mappings based on size
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  };

  const currentHeight = heightClasses[size] || heightClasses.md;

  // Direct PNG / raster option if requested
  if (asImg) {
    const imgSrc = isLight ? '/brand-logo-white.png' : '/Light (1).png';
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={imgSrc}
          alt="THRED VISION"
          className={`${currentHeight} w-auto object-contain`}
        />
      </div>
    );
  }

  // Pure Icon / Monogram Layout (Exact needle and red thread chevron)
  if (layout === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <svg
          className={`${currentHeight} w-auto shrink-0 drop-shadow-xs`}
          viewBox="170 80 670 835"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="THRED VISION Logo"
        >
          {/* 1. Red Thread Ribbon passing through needle eye */}
          <path
            d="M 190 214 L 820 95 L 452 900 L 462 876 L 742 155 L 190 238 Z"
            fill={redThreadColor}
          />
          {/* 2. Needle with Eye Hole Cutout (shows red thread through the hole) */}
          <path
            fillRule="evenodd"
            d="M 425.5 120 C 425.5 105 437 94 452 94 C 467 94 478.5 105 478.5 120 L 478.5 205 L 452 885 L 425.5 205 Z M 438 134 C 438 126 444 120 452 120 C 460 120 466 126 466 134 L 466 180 C 466 188 460 194 452 194 C 444 194 438 188 438 180 Z"
            fill={needleColor}
          />
        </svg>
      </div>
    );
  }

  // Full Horizontal Brand Logo (Emblem + Typography)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Authentic Needle & Red Thread Monogram */}
      <svg
        className={`${currentHeight} w-auto shrink-0 drop-shadow-xs`}
        viewBox="170 80 670 835"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 190 214 L 820 95 L 452 900 L 462 876 L 742 155 L 190 238 Z"
          fill={redThreadColor}
        />
        <path
          fillRule="evenodd"
          d="M 425.5 120 C 425.5 105 437 94 452 94 C 467 94 478.5 105 478.5 120 L 478.5 205 L 452 885 L 425.5 205 Z M 438 134 C 438 126 444 120 452 120 C 460 120 466 126 466 134 L 466 180 C 466 188 460 194 452 194 C 444 194 438 188 438 180 Z"
          fill={needleColor}
        />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center font-black tracking-[0.16em] uppercase text-base sm:text-lg leading-tight font-sans">
          <span className={textColor}>THRED</span>
          <span className="text-[#E50914] ml-1.5">VISION</span>
        </div>
        {showTagline && (
          <span
            className={`text-[8px] sm:text-[9px] font-bold tracking-[0.22em] uppercase pt-0.5 leading-tight ${taglineColor}`}
          >
            Garment Manufacturing
          </span>
        )}
      </div>
    </div>
  );
};
