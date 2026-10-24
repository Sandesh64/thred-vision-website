import React from 'react';
import { ABOUT_PHOTOS } from '../../data/photos';
import { ShieldCheck, Ruler } from 'lucide-react';

export const FloorPlanVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  const photo = ABOUT_PHOTOS.qualityInspection;

  return (
    <div className={`relative w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-[#092820] text-[#F4F0E6] flex flex-col justify-between p-5 border border-[#C8A875]/30 shadow-lg group ${className}`}>
      {/* Real High-Resolution Garment Quality Inspection & Engineering Image */}
      <img
        src={photo.url}
        alt={photo.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        onError={(e) => { e.currentTarget.src = '/screenshot-3.png'; }}
      />

      {/* Atmospheric Gradient Scrim for Editorial Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#092820] via-[#092820]/50 to-[#092820]/30 pointer-events-none" />

      {/* Top Meta Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C8A875] bg-[#092820]/85 backdrop-blur-xs px-2.5 py-1 rounded border border-[#C8A875]/30 flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-[#C8A875]" />
          <span>QUALITY CONTROL</span>
        </span>
        <span className="text-[10px] font-mono text-[#F4F0E6]/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded flex items-center gap-1">
          <Ruler className="w-2.5 h-2.5 text-[#C8A875]" />
          <span>QUALITY CHECKS AT EVERY STAGE</span>
        </span>
      </div>

      {/* Bottom Title & Specs */}
      <div className="relative z-10 space-y-1">
        <div className="text-[11px] font-mono text-[#C8A875]">
          KEY QUALITY CONTROL POINTS
        </div>
        <h4 className="text-lg font-bold text-[#F4F0E6] leading-snug">
          Quality Control Process
        </h4>
        <p className="text-xs text-[#F4F0E6]/80 line-clamp-2">
          Quality checks are carried out throughout production to help ensure garments meet buyer specifications and safety standards.
        </p>
      </div>
    </div>
  );
};
