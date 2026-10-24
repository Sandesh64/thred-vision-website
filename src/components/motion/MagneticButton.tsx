import React, { useRef, useState } from 'react';
import { useDeviceTier } from '../../hooks/useDeviceTier';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticPull?: number;
  pulse?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magneticPull = 0.28,
  pulse = false,
  ...props
}) => {
  const { isTouch, prefersReducedMotion } = useDeviceTier();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch || prefersReducedMotion) return;
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticPull;
    const deltaY = (e.clientY - centerY) * magneticPull;

    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-200 ease-out active:scale-95 cursor-pointer ${
        pulse ? 'hover:shadow-[0_0_20px_rgba(200,168,117,0.45)]' : ''
      } ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
