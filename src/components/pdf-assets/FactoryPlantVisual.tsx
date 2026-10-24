import React from 'react';
import { ABOUT_PHOTOS } from '../../data/photos';
import { MapPin, Building2 } from 'lucide-react';

export const FactoryPlantVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  const photo = ABOUT_PHOTOS.factoryExterior;

  return (
    <div className={`w-full rounded-xl overflow-hidden bg-[#092820] text-white border border-[#C8A875]/30 group shadow-lg flex flex-col transition-all duration-300 hover:border-[#C8A875] ${className}`}>
      {/* 100% Exact, Unaltered Original Uploaded Factory Image - Zero Crop, Zero Darkening Overlay */}
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#092820] flex items-center justify-center">
        <img
          src={photo.url}
          alt={photo.alt}
          loading="lazy"
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-102"
        />
      </div>

      {/* Card Details & Credentials */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-[#092820]">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded bg-[#C8A875]/20 border border-[#C8A875]/40 text-[#C8A875] text-[10px] font-semibold tracking-wider uppercase font-mono">
            Facility Campus
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#E5D7B7] bg-[#103C30] px-2.5 py-0.5 rounded border border-[#C8A875]/20 font-mono">
            <MapPin className="w-3.5 h-3.5 text-[#C8A875]" />
            <span>Ganjimutt, Mangalore</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-[#C8A875] shrink-0" />
            <h4 className="font-semibold text-sm text-[#F7F4EE] leading-tight">
              {photo.title}
            </h4>
          </div>
          <p className="text-xs text-[#E5D7B7]/80 line-clamp-2 leading-relaxed">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
