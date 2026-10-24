import React, { useState } from 'react';
import { Tag, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { MENS_GARMENT_PHOTOS, WOMENS_GARMENT_PHOTOS, PhotoAsset } from '../../data/photos';
import { BrandLogo } from '../BrandLogo';

interface ApparelProductVisualsProps {
  onSelectCategory: (name: string) => void;
  activeCatalog?: 'gentlemen' | 'ladies';
  onCatalogChange?: (catalog: 'gentlemen' | 'ladies') => void;
}

export const ApparelProductVisuals: React.FC<ApparelProductVisualsProps> = ({
  onSelectCategory,
  activeCatalog: controlledCatalog,
  onCatalogChange,
}) => {
  const [internalCatalog, setInternalCatalog] = useState<'gentlemen' | 'ladies'>('ladies');
  const activeCatalog = controlledCatalog ?? internalCatalog;

  const handleCatalogChange = (catalog: 'gentlemen' | 'ladies') => {
    setInternalCatalog(catalog);
    onCatalogChange?.(catalog);
  };

  const currentItems: PhotoAsset[] =
    activeCatalog === 'gentlemen' ? MENS_GARMENT_PHOTOS : WOMENS_GARMENT_PHOTOS;

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#202622]/15 p-6 sm:p-10 shadow-sm">
      {/* Lookbook Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#202622]/10 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#103C30] uppercase tracking-wider mb-1">
            <Tag className="w-3.5 h-3.5 text-[#103C30]" />
            <span>REAL EDITORIAL GARMENT PORTFOLIO</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#202622]">
            {activeCatalog === 'gentlemen' ? `Men's Apparel Lookbook (${MENS_GARMENT_PHOTOS.length} Styles)` : `Women's Apparel Lookbook (${WOMENS_GARMENT_PHOTOS.length} Styles)`}
          </h3>
          <p className="text-xs text-[#202622]/65 mt-1 font-mono">
            Commercial apparel manufacturing lines produced at THRED VISION facility
          </p>
        </div>

        {/* Catalog Selector Switcher */}
        <div className="flex items-center p-1 bg-[#F4F0E6] rounded-xl border border-[#202622]/10 shrink-0">
          <button
            onClick={() => handleCatalogChange('gentlemen')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeCatalog === 'gentlemen'
                ? 'bg-[#103C30] text-[#F4F0E6] shadow-sm'
                : 'text-[#202622]/70 hover:text-[#202622]'
            }`}
          >
            Men&apos;s Collection ({MENS_GARMENT_PHOTOS.length})
          </button>
          <button
            onClick={() => handleCatalogChange('ladies')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeCatalog === 'ladies'
                ? 'bg-[#103C30] text-[#F4F0E6] shadow-sm'
                : 'text-[#202622]/70 hover:text-[#202622]'
            }`}
          >
            Women&apos;s Collection ({WOMENS_GARMENT_PHOTOS.length})
          </button>
        </div>
      </div>

      {/* Grid of 6 Real Garment Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl border border-[#202622]/10 overflow-hidden bg-[#F4F0E6]/30 hover:border-[#103C30]/50 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              {/* Real High-Resolution Garment Photography Header */}
              <div className="relative h-64 overflow-hidden bg-[#092820]">
                {item.url ? (
                  <img
                    src={item.url}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#092820] to-[#103C30] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#103C30] border border-[#C8A875]/40 flex items-center justify-center mb-2 shadow-inner">
                      <BrandLogo layout="icon-only" size="sm" variant="light" />
                    </div>
                    <span className="text-xs font-mono text-[#C8A875] font-bold uppercase tracking-wider">
                      SPECIFICATION
                    </span>
                  </div>
                )}

                {/* Subtle gradient at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#092820]/90 text-[#F4F0E6] font-bold border border-[#C8A875]/30 backdrop-blur-xs">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/90 text-[#103C30] font-bold">
                    VERIFIED SPEC
                  </span>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                  <h4 className="text-lg font-bold leading-tight drop-shadow-sm">
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Garment Details & Technical Specs */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-[#202622]/80 leading-relaxed font-normal">
                  {item.caption}
                </p>

                {item.specs && (
                  <div className="p-2.5 rounded bg-white border border-[#202622]/10 text-[11px] text-[#103C30] font-mono flex items-start gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C8A875] shrink-0 mt-0.5" />
                    <span>{item.specs}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Inquiry Action */}
            <div className="p-4 pt-0">
              <button
                type="button"
                onClick={() => onSelectCategory(item.title)}
                className="w-full py-2.5 px-3 rounded-lg bg-white border border-[#202622]/15 text-xs font-bold text-[#103C30] hover:bg-[#103C30] hover:text-[#F4F0E6] hover:border-[#103C30] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Inquire on this Style</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
