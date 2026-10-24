import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // milliseconds
  direction?: 'up' | 'none';
  threshold?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.12,
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  });

  const getTransformClass = () => {
    if (isVisible) return 'opacity-100 translate-y-0';
    if (direction === 'up') return 'opacity-0 translate-y-8';
    return 'opacity-0';
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '700ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all duration-700 ease-out ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
};
