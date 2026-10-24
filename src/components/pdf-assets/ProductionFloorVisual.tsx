import React from 'react';
import { ABOUT_PHOTOS } from '../../data/photos';
import { Cpu, Zap } from 'lucide-react';

export const ProductionFloorVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  const photo = ABOUT_PHOTOS.stitchingFloor;

  return (
    <div className={`w-full rounded-xl overflow-hidden bg-[#092820] text-[#F4F0E6] flex flex-col border border-[#C8A875]/30 shadow-lg group transition-all duration-300 hover:border-[#C8A875] ${className}`}>
      {/* Real High-Resolution Industrial Stitching Floor Image */}
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#092820] flex items-center justify-center">
        <img
          src={photo.url}
          alt={photo.alt}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-102"
          onError={(e) => { e.currentTarget.src = '/screenshot-2.png'; }}
        />
      </div>

      {/* Card Details & Credentials */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-[#092820]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C8A875] bg-[#C8A875]/20 border border-[#C8A875]/40 px-2.5 py-1 rounded flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-[#C8A875]" />
            <span>STITCHING OPERATIONS</span>
          </span>
          <span className="text-[10px] font-mono text-[#F4F0E6] bg-[#103C30] px-2.5 py-0.5 rounded border border-[#C8A875]/20 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-[#C8A875]" />
            <span>400+ MACHINES</span>
          </span>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#F4F0E6] leading-tight mb-1">
            Garment Production Machinery
          </h4>
          <p className="text-xs text-[#E5D7B7]/80 line-clamp-2 leading-relaxed">
            Synchronized Juki, Kansai, and Tirva workstations supporting high-volume monthly apparel capacity.
          </p>
        </div>
      </div>
    </div>
  );
};
