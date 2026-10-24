/**
 * THRED VISION - Creative Motion & 3D Configuration
 * 
 * Central control panel for all agency-grade 3D and motion effects.
 * Every effect can be toggled on/off or adjusted in speed/intensity.
 */

export const motionConfig = {
  // Master Feature Toggles
  enableSmoothScroll: true,        // Lenis inertial smooth scroll (desktop only)
  enableCursor: true,              // Precision cursor follower (desktop only)
  enableFloatingParticles: true,   // Subtle ambient textile fibers in background
  enableStitchedDividers: true,    // Animated stitched/dashed line section dividers
  enableCountUp: true,             // Animated count-up for numbers/stats
  enableTextReveal: true,          // Staggered slide/mask text reveal for headings
  enableCardTilt: true,            // 3D perspective tilt on cards (desktop only)
  enablePreloader: true,           // Quick luxury brand preloader on initial visit

  // Timing & Performance Tuning
  preloaderDurationMs: 1100,       // Max duration in ms (strictly under 1.2s, skippable)
  particleCount: 24,               // Ambient particles (max 30 for high mobile 60fps)
  animationSpeed: 1.0,             // Multiplier for motion speeds
  scrollParallaxIntensity: 0.15,   // Parallax strength on scroll

  // Unified Design System Easing (Cubic-Bezier)
  // Ensures all motion feels cohesive, premium, and designed by a single creative agency
  easing: [0.22, 1, 0.36, 1] as [number, number, number, number], // Smooth ease-out quint

  // Brand Color Palette (Synchronized with THRED VISION design language)
  colors: {
    forest: '#092820',             // Deep editorial forest green
    darkGreen: '#103C30',          // Signature emerald garment tone
    gold: '#C8A875',               // Warm champagne gold thread
    goldLight: '#E5D7B7',          // Soft gold sheen
    ivory: '#F4F0E6',              // Organic raw linen ivory
    charcoal: '#202622',           // Charcoal woven text
    borderGold: 'rgba(200, 168, 117, 0.3)',
  },
};
