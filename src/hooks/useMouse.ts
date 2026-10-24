import { useEffect, useRef, useState } from 'react';

export interface InteractionState {
  /** Normalized coordinate from -1 (left) to 1 (right) */
  x: number;
  /** Normalized coordinate from -1 (top) to 1 (bottom) */
  y: number;
  /** Raw pixel coordinates */
  clientX: number;
  clientY: number;
  /** Tap / touch active flag */
  isInteracting: boolean;
  /** Tap bounce impulse for responsive spring feedback */
  tapImpulse: number;
  /** Whether user has interacted */
  hasInteracted: boolean;
}

export function useMouse() {
  const [state, setState] = useState<InteractionState>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    isInteracting: false,
    tapImpulse: 0,
    hasInteracted: false,
  });

  const stateRef = useRef<InteractionState>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    isInteracting: false,
    tapImpulse: 0,
    hasInteracted: false,
  });

  useEffect(() => {
    const halfW = () => (window.innerWidth || 360) / 2;
    const halfH = () => (window.innerHeight || 640) / 2;

    // Desktop Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX - halfW()) / halfW();
      const normY = (e.clientY - halfH()) / halfH();

      stateRef.current.x = Math.max(-1, Math.min(1, normX));
      stateRef.current.y = Math.max(-1, Math.min(1, normY));
      stateRef.current.clientX = e.clientX;
      stateRef.current.clientY = e.clientY;
      stateRef.current.hasInteracted = true;
    };

    // Mobile Touch Move & Tilt
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normX = (touch.clientX - halfW()) / halfW();
        const normY = (touch.clientY - halfH()) / halfH();

        stateRef.current.x = Math.max(-1, Math.min(1, normX));
        stateRef.current.y = Math.max(-1, Math.min(1, normY));
        stateRef.current.clientX = touch.clientX;
        stateRef.current.clientY = touch.clientY;
        stateRef.current.isInteracting = true;
        stateRef.current.hasInteracted = true;
      }
    };

    // Mobile Tap Bounce Impulse
    const handleTouchStart = (e: TouchEvent) => {
      stateRef.current.tapImpulse = 1.0;
      stateRef.current.isInteracting = true;
      stateRef.current.hasInteracted = true;
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        stateRef.current.clientX = touch.clientX;
        stateRef.current.clientY = touch.clientY;
        stateRef.current.x = Math.max(-1, Math.min(1, (touch.clientX - halfW()) / halfW()));
        stateRef.current.y = Math.max(-1, Math.min(1, (touch.clientY - halfH()) / halfH()));
      }
    };

    const handleTouchEnd = () => {
      stateRef.current.isInteracting = false;
    };

    // Optional Gyroscope Orientation
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right tilt in degrees [-90, 90]
        // beta: front-to-back tilt in degrees [-180, 180]
        const gyroX = Math.max(-1, Math.min(1, (e.gamma || 0) / 35));
        const gyroY = Math.max(-1, Math.min(1, ((e.beta || 0) - 45) / 35));

        // Blend gyroscope subtly if no active touch
        if (!stateRef.current.isInteracting) {
          stateRef.current.x = gyroX;
          stateRef.current.y = gyroY;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return { mouse: state, mouseRef: stateRef };
}
