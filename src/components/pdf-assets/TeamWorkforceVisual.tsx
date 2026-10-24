import React from 'react';
import { Users2, Award } from 'lucide-react';

export const TeamWorkforceVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-full rounded-xl overflow-hidden bg-[#092820] text-[#F4F0E6] flex flex-col border border-[#C8A875]/30 shadow-lg group transition-all duration-300 hover:border-[#C8A875] ${className}`}
    >
      {/* Official THRED VISION Complete Employee Group Photograph - 100% Original Upload, Zero Cropping */}
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#092820] flex items-center justify-center">
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_5.34.56_PM_6338563f.jpeg"
          alt="THRED VISION team and workforce at the Ganjimutt garment manufacturing facility"
          loading="lazy"
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-102"
        />
      </div>

      {/* Card Details & Credentials */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-[#092820]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C8A875] bg-[#C8A875]/20 border border-[#C8A875]/40 px-2.5 py-1 rounded flex items-center gap-1.5">
            <Users2 className="w-3 h-3 text-[#C8A875]" />
            <span>OUR WORKFORCE</span>
          </span>
          <span className="text-[10px] font-mono text-[#F4F0E6] bg-[#103C30] px-2.5 py-0.5 rounded border border-[#C8A875]/20 flex items-center gap-1">
            <Award className="w-2.5 h-2.5 text-[#C8A875]" />
            <span>400+ TEAM</span>
          </span>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#F4F0E6] leading-tight mb-1">
            THRED VISION Workforce
          </h4>
          <p className="text-xs text-[#E5D7B7]/80 line-clamp-2 leading-relaxed">
            Our dedicated 400+ workforce of artisans, managers, and technicians at Ganjimutt manufacturing facility.
          </p>
        </div>
      </div>
    </div>
  );
};
