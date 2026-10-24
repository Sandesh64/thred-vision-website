import React from 'react';
import { useTilt, UseTiltOptions } from '../../hooks/useTilt';
import { useDeviceTier } from '../../hooks/useDeviceTier';

interface TiltCardProps extends UseTiltOptions {
  children: React.ReactNode;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glareColor = 'rgba(200, 168, 117, 0.45)',
  maxGlareOpacity = 0.25,
  enabled = true,
}) => {
  const { isTouch, prefersReducedMotion } = useDeviceTier();
  const { tiltProps, glareStyle } = useTilt<HTMLDivElement>({
    maxTilt,
    perspective,
    scale,
    glareColor,
    maxGlareOpacity,
    enabled,
  });

  return (
    <div
      {...tiltProps}
      className={`relative will-change-transform active:scale-[0.985] transition-transform duration-150 ${className}`}
    >
      {children}

      {/* Soft dynamic glare highlight on hover */}
      {!isTouch && !prefersReducedMotion && (
        <div style={glareStyle} aria-hidden="true" />
      )}
    </div>
  );
};
