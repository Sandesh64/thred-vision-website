import { useRef, useState, useCallback, CSSProperties } from 'react';
import { useDeviceTier } from './useDeviceTier';

export interface UseTiltOptions {
  /** Maximum tilt angle in degrees. Default is 8 */
  maxTilt?: number;
  /** Perspective in pixels. Default is 1000 */
  perspective?: number;
  /** Scale factor on hover. Default is 1.02 */
  scale?: number;
  /** Glare color string. Default is champagne gold brand hue */
  glareColor?: string;
  /** Maximum glare opacity. Default is 0.25 */
  maxGlareOpacity?: number;
  /** Whether tilt effect is enabled. Default is true */
  enabled?: boolean;
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(options: UseTiltOptions = {}) {
  const {
    maxTilt = 8,
    perspective = 1000,
    scale = 1.02,
    glareColor = 'rgba(200, 168, 117, 0.45)',
    maxGlareOpacity = 0.25,
    enabled = true,
  } = options;

  const { isTouch, prefersReducedMotion } = useDeviceTier();
  const elementRef = useRef<T | null>(null);
  const [transform, setTransform] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!enabled || isTouch || prefersReducedMotion) return;
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
      );

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlarePosition({
        x: glareX,
        y: glareY,
        opacity: maxGlareOpacity,
      });
      setIsHovered(true);
    },
    [enabled, isTouch, prefersReducedMotion, maxTilt, perspective, scale, maxGlareOpacity]
  );

  const onMouseLeave = useCallback(() => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  }, [perspective]);

  const glareStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: 'inherit',
    overflow: 'hidden',
    opacity: glarePosition.opacity,
    transition: 'opacity 0.25s ease-out',
    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 65%)`,
  };

  return {
    ref: elementRef,
    transform,
    glareStyle,
    isHovered,
    tiltProps: {
      ref: elementRef,
      onMouseMove,
      onMouseLeave,
      style: {
        transform,
        transformStyle: 'preserve-3d' as const,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        willChange: 'transform',
      },
    },
  };
}
