import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ApparelProductVisuals } from './pdf-assets/ApparelProductVisuals';
import { MENS_GARMENT_PHOTOS, WOMENS_GARMENT_PHOTOS, PhotoAsset } from '../data/photos';
import { BrandLogo } from './BrandLogo';
import { TiltCard } from './motion/TiltCard';

interface ProductsSectionProps {
  onCategorySelectForInquiry: (categoryName: string) => void;
  onOpenLeadModal?: (categoryName: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onCategorySelectForInquiry,
  onOpenLeadModal,
}) => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.05,
    triggerOnce: true,
  });
  const [activeTab, setActiveTab] = useState<'mens' | 'womens'>('womens');
  const [selectedItemName, setSelectedItemName] = useState<string>('Tops & Blouses');

  const mensCategories = [
    {
      id: 'men-tshirt-polo',
      name: 'T-shirts and polos',
      type: 'Knits & Casuals',
      fabric: 'Single Jersey, Cotton Piqué, Interlock, Bio-wash Cotton',
      gsm: '160 - 240 GSM',
      stitches: 'Double-needle hem, flat knit collars, reinforced neck tape',
      leadRuns: 'From 500 pcs per colorway',
      description: 'Engineered for premium handfeel, colorfast wash durability, and refined collar retention.',
    },
    {
      id: 'men-formal-shirt',
      name: 'Formal shirts',
      type: 'Wovens & Tailoring',
      fabric: '100% Giza Cotton, Pinpoint Oxford, Poplin, Poly-Cotton Twill',
      gsm: '110 - 150 GSM',
      stitches: 'Fused collar & cuffs, 18-20 SPI single-needle side seams, clean plackets',
      leadRuns: 'Custom collar stays, mother-of-pearl buttons, contrast plackets',
      description: 'Sharp business tailoring meeting strict seam symmetry and puckering-free armholes.',
    },
    {
      id: 'men-casual-shirt',
      name: 'Casual shirts',
      type: 'Lifestyle Wovens',
      fabric: 'Yarn-dyed Oxford, Chambray, Buffalo Check Flannel, Linen Blends',
      gsm: '120 - 180 GSM',
      stitches: 'Twin-needle flat-felled seams, garment enzyme washed, durable bar tacks',
      leadRuns: 'Solid slubs, authentic checks, and precision micro-prints',
      description: 'Relaxed contemporary fits with pre-shrunk softness and authentic character.',
    },
    {
      id: 'men-trousers',
      name: 'Trousers',
      type: 'Structured Bottoms',
      fabric: 'Cotton Chino Twill, Poly-Viscose Suiting, Stretch Gabardine',
      gsm: '220 - 320 GSM',
      stitches: 'Split waistband construction, French fly closure, blind stitch hems',
      leadRuns: 'Formal flat-front, pleated, and modern tailored slim silhouettes',
      description: 'Clean crease lines, reinforced pockets, and flexible comfort waistbands.',
    },
    {
      id: 'men-jeans',
      name: 'Jeans',
      type: 'Denim Manufacturing',
      fabric: 'Rigid & 2% Stretch Ring-Spun Denim, Cross-Hatch Indigo Weaves',
      gsm: '280 - 420 GSM (10 - 14 oz)',
      stitches: 'Heavy-duty chainstitch waistband, brass rivet bar tacks, double-needle yokes',
      leadRuns: 'Enzyme wash, stone wash, whiskers, scraping, eco-friendly silicone rinses',
      description: 'Robust denim engineering built on our specialized feed-of-arm and chain-lock lines.',
    },
    {
      id: 'men-jackets',
      name: 'Jackets',
      type: 'Outerwear',
      fabric: 'Heavy Cotton Canvas, Twill, Brushed Fleece, Bonded Technical Shells',
      gsm: '280 - 450 GSM',
      stitches: 'Engineered lining assembly, reinforced welt pockets, heavy YKK zippers',
      leadRuns: 'Coach jackets, utility overshirts, bomber silhouettes, and windcheaters',
      description: 'Structured outerwear crafted for layered warmth, durable hardware, and clean inner bindings.',
    },
    {
      id: 'men-shorts',
      name: 'Shorts',
      type: 'Warm-Weather Apparel',
      fabric: 'French Terry, Cotton Twill, Poplin Ripstop, Stretch Canvas',
      gsm: '180 - 280 GSM',
      stitches: 'Elasticated drawcord channels, pocket bar tacking, reinforced crotch seams',
      leadRuns: 'Casual walkshorts, active sweatshorts, and structured bermuda fits',
      description: 'Comfortable movement geometry with clean pocket bags and resilient stitching.',
    },
  ];

  const womensCategories = [
    {
      id: 'women-tops-blouses',
      name: 'Tops & Blouses',
      type: 'Lightweight Fashion',
      fabric: 'Viscose Rayon, Georgette, Cotton Voile, Modal, Silk Chiffon Blends',
      gsm: '80 - 140 GSM',
      stitches: 'French seams, delicate keyhole and placket finishes, rolled hems',
      leadRuns: 'Bishop sleeves, smocking, ruffled yokes, and fluid draping',
      description: 'Delicate handling of flowing textiles with zero needle puckering and immaculate hems.',
    },
    {
      id: 'women-dresses',
      name: 'Dresses',
      type: 'Occasion & Daywear',
      fabric: 'Cotton Poplin, Pure Linen, Crepe, Tencel Twill, Viscose Rayon',
      gsm: '120 - 220 GSM',
      stitches: 'Concealed zipper insertions, bias bindings, tiered gathered seams',
      leadRuns: 'Maxi, midi, shirt dresses, wrap dresses, and fit-and-flare cuts',
      description: 'Precise pattern symmetry accommodating intricate gathers, waist cinches, and linings.',
    },
    {
      id: 'women-skirts',
      name: 'Skirts',
      type: 'Contemporary Separates',
      fabric: 'Pleated Twill, Denim, Cotton Satin, Poplin, Structured Crepe',
      gsm: '140 - 260 GSM',
      stitches: 'Blind hems, clean waist yokes, button fronts, invisible zips',
      leadRuns: 'A-line, wrap, pleated, pencil, and tiered bohemian cuts',
      description: 'Flawless panel alignment and graceful drape across structured and relaxed silhouettes.',
    },
    {
      id: 'women-pants-trousers',
      name: 'Pants & Trousers',
      type: 'Tailored & Casual',
      fabric: 'Stretch Twill, Linen-Cotton Blend, Ponte Roma, Viscose Suiting',
      gsm: '200 - 320 GSM',
      stitches: 'Pressed pleats, slant pockets, tailored fly fronts, clean elastic backs',
      leadRuns: 'Wide-leg palazzo, cigarette trousers, and high-rise relaxed fits',
      description: 'Superior fit ergonomics ensuring flattering drape and all-day fabric recovery.',
    },
    {
      id: 'women-kurtis',
      name: 'Kurtis & Tunics',
      type: 'Ethnic & Fusion',
      fabric: 'Pure Cotton, Rayon Flex, Chanderi Blend, Cambric',
      gsm: '120 - 200 GSM',
      stitches: 'Side slit reinforcement, neat neck plackets, contrast piping, embroidery',
      leadRuns: 'Straight cut, A-line, Anarkali flared, and contemporary short kurtis',
      description: 'Traditional craftsmanship paired with modern industrial production speed and durability.',
    },
    {
      id: 'women-tshirts',
      name: 'T-Shirts & Knits',
      type: 'Knitwear Basics',
      fabric: 'Supima Cotton, 2x2 Rib Knit, Slub Jersey, Modal Spandex',
      gsm: '140 - 200 GSM',
      stitches: 'Soft silicone softened wash, clean taped necklines, twin-needle cuffs',
      leadRuns: 'Crew, scoop, fitted baby tees, and boyfriend boxy fits',
      description: 'Silky smooth surface finish ideal for clean branding, screenprints, or minimalist solids.',
    },
    {
      id: 'women-leggings',
      name: 'Leggings & Athleisure',
      type: 'Stretch Basics',
      fabric: '4-Way Cotton Spandex, Bio-wash Viscose Elastane',
      gsm: '180 - 230 GSM',
      stitches: 'Flatlock non-chafing seams, broad anti-roll waistband',
      leadRuns: 'Ankle-length, churidar, and cropped high-stretch fits',
      description: 'High elastic recovery and pill-resistant fabric retaining shape across repeated washes.',
    },
    {
      id: 'women-jackets',
      name: 'Jackets & Outerwear',
      type: 'Layering & Outerwear',
      fabric: 'Structured Twill, Denim, Textured Jacquard, Cotton Canvas',
      gsm: '240 - 380 GSM',
      stitches: 'Princess seams, tailored lapels, clean binded interiors, metallic buttons',
      leadRuns: 'Cropped trucker styles, tailored blazer jackets, utility safari jackets',
      description: 'Architectural cuts that hold structure while offering refined feminine proportions.',
    },
  ];

  const currentList = activeTab === 'mens' ? mensCategories : womensCategories;
  const currentDetail = currentList.find((c) => c.name === selectedItemName) || currentList[0];

  const currentCategoryPhoto: PhotoAsset = React.useMemo(() => {
    const list = activeTab === 'mens' ? MENS_GARMENT_PHOTOS : WOMENS_GARMENT_PHOTOS;
    const match = list.find((p) => p.id === currentDetail.id);
    return match || list[0];
  }, [activeTab, currentDetail.id]);

  const getCategoryPhoto = (category: (typeof currentList)[0]): PhotoAsset => {
    const list = activeTab === 'mens' ? MENS_GARMENT_PHOTOS : WOMENS_GARMENT_PHOTOS;
    const match = list.find((p) => p.id === category.id);
    return match || list[0];
  };

  const handleInquiryAction = (categoryName: string) => {
    if (onOpenLeadModal) {
      onOpenLeadModal(categoryName);
    } else {
      onCategorySelectForInquiry(categoryName);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className={`relative w-full bg-[#FFFFFF] text-[#202622] py-24 sm:py-32 overflow-hidden border-b border-[#202622]/10 transition-all duration-700 ease-out ${
        isSectionVisible ? 'opacity-100 translate-y-0 is-visible' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Staged Scroll Reveal */}
        <RevealOnScroll delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 py-1 px-3.5 rounded-full bg-[#103C30]/10 border border-[#103C30]/20 mb-4 shadow-2xs">
                <BrandLogo layout="icon-only" size="sm" variant="dark" className="shrink-0" />
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#103C30] uppercase">
                  <span>APPAREL CAPABILITIES</span>
                  <span aria-hidden="true" className="text-[#C8A875]">·</span>
                  <span>B2B MANUFACTURING SCOPE</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#202622] leading-[1.1]">
                Made for Every Detail. Built for Every Collection.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#202622]/75 leading-relaxed">
                From casual street knits to razor-sharp formal tailoring and ethnic collections, our Ganjimutt plant transforms your designer tech packs into finished, market-ready garments.
              </p>
            </div>

            {/* Line Switcher */}
            <div className="flex items-center p-1.5 bg-[#F4F0E6] rounded-xl border border-[#202622]/10 self-start md:self-auto shrink-0 shadow-sm">
              <button
                onClick={() => {
                  setActiveTab('mens');
                  setSelectedItemName(mensCategories[0].name);
                }}
                className={`px-6 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'mens'
                    ? 'bg-[#103C30] text-[#F4F0E6] shadow-md'
                    : 'text-[#202622]/70 hover:text-[#202622]'
                }`}
              >
                Men&apos;s Apparel ({mensCategories.length} Categories)
              </button>
              <button
                onClick={() => {
                  setActiveTab('womens');
                  setSelectedItemName(womensCategories[0].name);
                }}
                className={`px-6 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'womens'
                    ? 'bg-[#103C30] text-[#F4F0E6] shadow-md'
                    : 'text-[#202622]/70 hover:text-[#202622]'
                }`}
              >
                Women&apos;s Apparel ({womensCategories.length} Categories)
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Master Two-Column Editorial Layout with Scroll Reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left Column: Category Selector List */}
          <div className="lg:col-span-5 space-y-2.5">
            <RevealOnScroll delay={200}>
              <div className="pb-3 border-b border-[#202622]/10 flex items-center justify-between text-xs font-semibold text-[#103C30] uppercase tracking-wider">
                <span>{activeTab === 'mens' ? 'Gentlemen’s Garments' : 'Ladies Fashion Garments'}</span>
                <span className="font-mono text-[#C8A875] bg-[#092820] px-2 py-0.5 rounded">
                  TECHNICAL SPECIFICATION
                </span>
              </div>

              <div className="divide-y divide-[#202622]/10 border border-[#202622]/10 rounded-xl overflow-hidden bg-[#F4F0E6]/60">
                {currentList.map((category) => {
                  const isSelected = selectedItemName === category.name;
                  const categoryPhoto = getCategoryPhoto(category);
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedItemName(category.name)}
                      className={`w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3.5 transition-all cursor-pointer group ${
                        isSelected
                          ? 'bg-[#103C30] text-[#F4F0E6]'
                          : 'hover:bg-[#F4F0E6] text-[#202622]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Permanent category thumbnail */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#202622]/15 bg-[#092820] flex items-center justify-center">
                          {categoryPhoto?.url ? (
                            <img
                              src={categoryPhoto.url}
                              alt={categoryPhoto.alt}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#103C30]/50 text-[#C8A875]">
                              <BrandLogo layout="icon-only" size="sm" variant="light" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold leading-snug truncate">
                              {category.name}
                            </h4>
                            <span
                              className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded shrink-0 ${
                                isSelected
                                  ? 'bg-[#C8A875] text-[#092820] font-bold'
                                  : 'bg-white text-[#103C30] border border-[#202622]/10'
                              }`}
                            >
                              {category.type}
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-1 transition-colors truncate ${
                              isSelected ? 'text-[#B6C6B8]' : 'text-[#202622]/60'
                            }`}
                          >
                            {category.gsm} · {category.fabric.split(',')[0]}
                          </p>
                        </div>
                      </div>

                      <ArrowRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected
                            ? 'text-[#C8A875] translate-x-1'
                            : 'text-[#202622]/40 group-hover:text-[#202622] group-hover:translate-x-0.5'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Editorial Showcase & Technical Drawer */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={300}>
              <div className="bg-[#F4F0E6] rounded-2xl border border-[#202622]/15 p-6 sm:p-10 flex flex-col justify-between shadow-sm min-h-[560px]">
                <div>
                  {/* Category Top Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#202622]/15 mb-6">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#103C30] font-semibold">
                        MANUFACTURING SPECIFICATION
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-bold text-[#202622] mt-1">
                        {currentDetail.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-wider text-[#202622]/60">Category Type</span>
                      <p className="text-sm font-mono font-bold text-[#103C30]">
                        {currentDetail.type}
                      </p>
                    </div>
                  </div>

                  {/* Real Editorial Garment Sample Photography Card */}
                  <TiltCard maxTilt={5} className="mb-8">
                    <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden shadow-md border border-[#C8A875]/30 group bg-[#092820]">
                    {currentCategoryPhoto?.url ? (
                      <>
                        <img
                          src={currentCategoryPhoto.url}
                          alt={currentCategoryPhoto.alt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#092820] via-black/40 to-black/30 pointer-events-none" />

                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                          <span className="text-xs font-mono tracking-widest uppercase text-[#C8A875] bg-[#092820]/90 px-3 py-1 rounded border border-[#C8A875]/40 backdrop-blur-xs font-bold">
                            REAL EDITORIAL SAMPLE // {currentCategoryPhoto.category}
                          </span>
                          <span className="text-xs px-3 py-1 rounded bg-[#C8A875] text-[#092820] font-bold font-mono">
                            {currentDetail.gsm}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 z-10">
                          <p className="text-xs text-[#B6C6B8] uppercase tracking-wider mb-1 font-mono">
                            PRIMARY FABRIC SUBSTRATES
                          </p>
                          <p className="text-base sm:text-lg font-bold text-[#F4F0E6]">
                            {currentDetail.fabric}
                          </p>
                          <p className="text-xs text-[#F4F0E6]/90 mt-1 line-clamp-2">
                            {currentCategoryPhoto.caption || currentDetail.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#092820] via-[#0D3328] to-[#103C30] p-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-[#103C30] border border-[#C8A875]/40 flex items-center justify-center mb-3 shadow-inner">
                          <BrandLogo layout="icon-only" size="sm" variant="light" />
                        </div>
                        <span className="text-[11px] font-mono tracking-widest uppercase text-[#C8A875] bg-[#092820]/90 px-3 py-1 rounded border border-[#C8A875]/40 font-bold mb-2">
                          MANUFACTURING CAPABILITY // {currentCategoryPhoto.category}
                        </span>
                        <h4 className="text-2xl font-bold text-[#F4F0E6] mb-1">{currentDetail.name}</h4>
                        <p className="text-xs text-[#B6C6B8] max-w-md line-clamp-2 mb-2">
                          {currentCategoryPhoto.caption || currentDetail.description}
                        </p>
                        <span className="text-xs font-mono text-[#C8A875] bg-[#103C30] px-3 py-1 rounded border border-[#C8A875]/30">
                          {currentDetail.fabric} · {currentDetail.gsm}
                        </span>
                      </div>
                    )}
                    </div>
                  </TiltCard>

                  {/* Technical Specifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-5 rounded-xl bg-white border border-[#202622]/10 shadow-sm">
                      <span className="text-xs font-bold text-[#103C30] uppercase tracking-wider block mb-1.5">
                        Stitching &amp; Seam Construction
                      </span>
                      <p className="text-xs sm:text-sm text-[#202622]/80 leading-relaxed font-normal">
                        {currentDetail.stitches}
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white border border-[#202622]/10 shadow-sm">
                      <span className="text-xs font-bold text-[#103C30] uppercase tracking-wider block mb-1.5">
                        Production Runs &amp; Lead Batches
                      </span>
                      <p className="text-xs sm:text-sm text-[#202622]/80 leading-relaxed font-normal">
                        {currentDetail.leadRuns}
                      </p>
                    </div>
                  </div>

                  {/* Manufacturing Checklist */}
                  <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-[#202622]/80">
                    <div className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#103C30] shrink-0" />
                      <span>CAD pattern digitization and graded marker optimization to eliminate fabric waste</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#103C30] shrink-0" />
                      <span>Pre-production sample signoff with color lab dips and wash test approvals</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#103C30] shrink-0" />
                      <span>Custom branding trims: heat-transfers, woven neck labels, care tags, and barcoded polybags</span>
                    </div>
                  </div>
                </div>

                {/* Direct Inquiry Action Strip */}
                <div className="pt-6 border-t border-[#202622]/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <span className="text-xs text-[#202622]/65 font-medium">
                    Production lines active in Ganjimutt facility for this garment category.
                  </span>
                  <button
                    onClick={() => handleInquiryAction(currentDetail.name)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-[#F4F0E6] bg-[#103C30] rounded-lg hover:bg-[#092820] hover:shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0 border border-[#C8A875]/30"
                  >
                    <span>Discuss Your Requirements</span>
                    <ArrowRight className="w-4 h-4 text-[#C8A875]" />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* AUTHENTIC APPAREL PRODUCT GALLERY (FROM PDF PAGES 12 & 13) */}
        <RevealOnScroll delay={350}>
          <ApparelProductVisuals
            activeCatalog={activeTab === 'mens' ? 'gentlemen' : 'ladies'}
            onCatalogChange={(catalog) => {
              const targetTab = catalog === 'gentlemen' ? 'mens' : 'womens';
              setActiveTab(targetTab);
              setSelectedItemName(targetTab === 'mens' ? mensCategories[0].name : womensCategories[0].name);
            }}
            onSelectCategory={handleInquiryAction}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
};
