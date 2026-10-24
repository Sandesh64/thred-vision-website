import React, { useState } from 'react';
import { MANUFACTURING_STAGE_PHOTOS, PhotoAsset } from '../../data/photos';
import { ShieldCheck, CheckCircle2, Factory } from 'lucide-react';

export const GarmentingStageVisuals: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const stages: PhotoAsset[] = MANUFACTURING_STAGE_PHOTOS;
  const currentPhoto = stages[activePhotoIndex];

  return (
    <div className="w-full bg-[#092820] text-[#F4F0E6] rounded-2xl border border-[#C8A875]/25 p-6 sm:p-10 shadow-xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#C8A875]/20 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A875] flex items-center gap-1.5">
            <Factory className="w-3.5 h-3.5 text-[#C8A875]" />
            <span>REAL INDUSTRIAL FACTORY WORKFLOW &amp; FLOOR PHOTOGRAPHY</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F0E6] mt-1">
            Manufacturing Infrastructure in Motion
          </h3>
        </div>

        <div className="text-xs font-mono text-[#C8A875] bg-[#103C30] px-3.5 py-1.5 rounded-lg border border-[#C8A875]/30">
          5 PRODUCTION GATES
        </div>
      </div>

      {/* Featured Stage Photo Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
        {/* Left: Big Real Industrial Photo */}
        <div className="lg:col-span-7 rounded-xl overflow-hidden border border-[#C8A875]/30 group bg-[#092820] flex flex-col shadow-lg">
          {/* Top Stage Indicator */}
          <div className="px-4 py-2.5 bg-[#092820] border-b border-[#C8A875]/20 flex items-center justify-between z-10">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#103C30] text-[#C8A875] border border-[#C8A875]/40">
              GATE 0{activePhotoIndex + 1}
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded bg-black/40 text-[#F4F0E6] border border-white/10">
              {currentPhoto.category}
            </span>
          </div>

          <div className="relative w-full aspect-[16/9] bg-[#092820] flex items-center justify-center overflow-hidden">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.alt}
              loading="lazy"
              className="w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-101"
            />
          </div>

          {/* Bottom Caption under Photo */}
          <div className="p-4 bg-[#092820] border-t border-[#C8A875]/20 text-white">
            <h4 className="text-base font-bold mb-1 text-[#F4F0E6]">
              {currentPhoto.title}
            </h4>
            <p className="text-xs text-[#E5D7B7]/80 leading-relaxed">
              {currentPhoto.caption}
            </p>
          </div>
        </div>

        {/* Right: Stage Selector List */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-mono uppercase text-[#C8A875] tracking-wider block mb-2">
            SELECT PRODUCTION GATE TO INSPECT:
          </span>
          {stages.map((stage, idx) => {
            const isActive = idx === activePhotoIndex;
            return (
              <button
                key={stage.id}
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer border flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-[#103C30] text-[#F4F0E6] border-[#C8A875] shadow-md -translate-x-1'
                    : 'bg-[#092820]/60 text-[#F4F0E6]/80 border-[#C8A875]/20 hover:border-[#C8A875]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${isActive ? 'bg-[#C8A875] text-[#092820]' : 'bg-[#103C30] text-[#C8A875]'}`}>
                    0{idx + 1}
                  </span>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold leading-tight">
                      {stage.title}
                    </h5>
                    <p className="text-[11px] text-[#B6C6B8] line-clamp-1 mt-0.5 font-mono">
                      {stage.category}
                    </p>
                  </div>
                </div>

                {isActive && <CheckCircle2 className="w-4 h-4 text-[#C8A875] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified Spec Callout */}
      <div className="p-4 rounded-xl bg-[#103C30]/70 border border-[#C8A875]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C8A875] shrink-0" />
          <span className="text-[#F4F0E6]/90">
            <strong>Active Inspection Protocol:</strong> {currentPhoto.specs}
          </span>
        </div>
        <span className="text-xs font-mono text-[#C8A875] whitespace-nowrap">
          GANJIMUTT FACILITY VERIFIED
        </span>
      </div>
    </div>
  );
};
