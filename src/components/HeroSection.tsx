import React from 'react';
import { Layers, ShieldCheck, FileText } from 'lucide-react';
import { HERO_PHOTO } from '../data/photos';
import { BrandLogo } from './BrandLogo';
import { MagneticButton } from './motion/MagneticButton';
import { TiltCard } from './motion/TiltCard';

interface HeroSectionProps {
  onExploreClick: () => void;
  onDiscussClick: () => void;
  onOpenCompanyProfile?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onDiscussClick,
}) => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#092820] via-[#103C30] to-[#092820] text-[#F4F0E6] overflow-hidden flex flex-col justify-between"
    >
      {/* Elegant Ambient Fabric Texture Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dark-linen-weave opacity-40" />
        <svg
          className="w-full h-full object-cover opacity-20"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 500 C 400 250, 800 700, 1500 400 C 1100 750, 500 300, -100 500 Z"
            fill="#103C30"
          />
          <path
            d="M-50 300 C 500 550, 900 200, 1450 600 C 950 400, 450 700, -50 300 Z"
            fill="#164e3f"
          />
        </svg>
      </div>

      {/* Atmospheric Vignette & Scrims */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-[#092820] via-transparent to-[#092820]/75 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-[#092820]/80 via-transparent to-[#092820]/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Golden Thread Horizon Line */}
      <div
        className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A875]/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Content Overlay with Editorial Photography Showcase */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 sm:pt-40 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7">
            {/* Eyebrow Label featuring authentic Brand Mark */}
            <div className="inline-flex items-center gap-3 py-1 px-3.5 rounded-full bg-[#092820]/80 border border-[#C8A875]/35 backdrop-blur-md mb-6 shadow-sm">
              <BrandLogo layout="icon-only" size="sm" variant="light" className="shrink-0" />
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#C8A875] uppercase">
                <span>THRED VISION</span>
                <span aria-hidden="true" className="text-[#C8A875]/40">·</span>
                <span>GARMENT MANUFACTURING</span>
              </div>
            </div>

            {/* Primary Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F0E6] leading-[1.06] mb-7 text-balance">
              Where Fabric Meets Precision.
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl lg:text-2xl font-normal text-[#F4F0E6]/85 max-w-2xl leading-relaxed mb-10">
              Your partner in ready-made garment manufacturing, bringing craftsmanship, production capability, and attention to detail together.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-5">
              <MagneticButton
                onClick={onExploreClick}
                pulse={true}
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-semibold text-[#092820] bg-[#F4F0E6] rounded-lg hover:bg-white hover:shadow-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-md border border-[#C8A875]/30"
              >
                Explore Capabilities
              </MagneticButton>

              <MagneticButton
                onClick={onDiscussClick}
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-medium text-[#F4F0E6] border border-[#C8A875]/50 rounded-lg hover:bg-[#F4F0E6]/10 hover:border-[#F4F0E6] transition-all cursor-pointer whitespace-nowrap shrink-0 backdrop-blur-sm"
              >
                Discuss Requirements
              </MagneticButton>

              <a
                href="/THRED%20VISION%20PROFILE-2(2).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#092820] bg-[#C8A875] hover:bg-[#d8b885] rounded-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-md"
              >
                <FileText className="w-4 h-4 text-[#092820]" />
                <span>Company Profile PDF</span>
              </a>
            </div>
          </div>

          {/* Right Column: Real Editorial Textile Craft Photography Card */}
          <div className="lg:col-span-5">
            <TiltCard maxTilt={6} className="w-full">
              <div className="relative rounded-2xl overflow-hidden border border-[#C8A875]/40 bg-[#092820]/80 backdrop-blur-md shadow-2xl p-3 sm:p-4 group">
                {/* Real Manufacturing Facility Photo */}
                <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={HERO_PHOTO.url}
                    alt={HERO_PHOTO.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1741183397795-324643563b7f?auto=format&fit=crop&q=85&w=1600';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#092820] via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8A875] bg-[#092820]/90 px-2.5 py-1 rounded border border-[#C8A875]/40 backdrop-blur-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <Layers className="w-3 h-3 text-[#C8A875]" />
                      <span>GANJIMUTT FACILITY</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/95 text-[#092820] font-bold shadow-sm">
                      EXPORT GRADE
                    </span>
                  </div>

                  {/* Bottom Details on Image */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                    <h3 className="text-base sm:text-lg font-bold text-[#F4F0E6] leading-tight drop-shadow-md">
                      {HERO_PHOTO.title}
                    </h3>
                    <p className="text-xs text-[#F4F0E6]/90 mt-1 line-clamp-2 drop-shadow-sm">
                      {HERO_PHOTO.caption}
                    </p>
                  </div>
                </div>

                {/* Bottom Quick Metric Bar */}
                <div className="mt-3 pt-3 border-t border-[#C8A875]/20 flex items-center justify-between text-[11px] text-[#B6C6B8] font-mono px-1">
                  <span>GANJIMUTT FACILITY</span>
                  <span className="text-[#C8A875] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#C8A875]" />
                    AQL 2.5 / 1.5 AUDITED
                  </span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Hero Bottom Editorial Strip: Stated Scale & Trust Markers */}
      <div className="relative z-10 w-full border-t border-[#C8A875]/20 bg-[#092820]/90 backdrop-blur-md py-4 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 text-[#B6C6B8]">
            <span className="font-semibold text-[#F4F0E6]">GANJIMUTT, KARNATAKA</span>
            <span aria-hidden="true" className="text-[#C8A875]">·</span>
            <span>Bangalore Highway Industrial Hub</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[#F4F0E6]">
            <div>
              <span className="text-[#C8A875]">400+</span> <span className="text-xs text-[#B6C6B8]">MACHINES</span>
            </div>
            <span aria-hidden="true" className="text-[#C8A875]/30">|</span>
            <div>
              <span className="text-[#C8A875]">400+</span> <span className="text-xs text-[#B6C6B8]">WORKFORCE</span>
            </div>
            <span aria-hidden="true" className="text-[#C8A875]/30">|</span>
            <div>
              <span className="text-[#C8A875]">1L+</span> <span className="text-xs text-[#B6C6B8]">GARMENTS/MONTH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
