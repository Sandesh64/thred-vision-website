import React, { useState } from 'react';
import {
  Layers,
  Scissors,
  Cpu,
  ShieldCheck,
  PackageCheck,
  CheckCircle2,
  Camera,
  Upload,
} from 'lucide-react';
import { ManufacturingStage, MachineStat } from '../types';
import { RevealOnScroll } from './RevealOnScroll';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { GarmentingStageVisuals } from './pdf-assets/GarmentingStageVisuals';
import { MANUFACTURING_STAGE_PHOTOS } from '../data/photos';
import { BrandLogo } from './BrandLogo';
import { TiltCard } from './motion/TiltCard';

export const ManufacturingSection: React.FC = () => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.05,
    triggerOnce: true,
  });
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'process' | 'machinery' | 'kqcp'>('process');

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('tv_manufacturing_custom_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCustomPhotos((prev) => {
          const next = { ...prev, [activeStageIndex]: dataUrl };
          try {
            localStorage.setItem('tv_manufacturing_custom_photos', JSON.stringify(next));
          } catch {}
          return next;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const stages: ManufacturingStage[] = [
    {
      id: 'sampling-store',
      number: '01',
      title: 'Sampling, Fabric & Accessories Store',
      subtitle: 'Technical Prep & Material Verification',
      description:
        'Every production batch originates in our sampling and fabric storage department. Raw textile rolls undergo 4-point defect grading, shrinkage testing, and relaxation before touching the cutting tables.',
      details: [
        'Exclusive Sampling Unit creating counter-samples attuned to international buyer specs',
        'Fabric Checking Machine inspecting shade continuity, GSM variance, and yarn irregularities',
        'Controlled roll relaxation in non-damp warehouse conditions to eliminate mechanical tension',
        'Batch testing of sewing threads, zippers, buttons, interlinings, and client-supplied trims',
      ],
      checkpoint: 'Dimensional stability verification and raw material inspection report approval',
      machinesInvolved: 'Fabric Checking Machine · Computerized Sampling Sewers · Inspection Roll Tables',
    },
    {
      id: 'cutting',
      number: '02',
      title: 'Spreading, Marker Planning & Cutting',
      subtitle: 'CAD Precision & Material Optimization',
      description:
        'Dexterous craftsmen and high-tech cutting machinery work in tandem. Graded CAD markers are plotted to maximize textile utilization while guaranteeing exact millimeter precision across all bundle sizes.',
      details: [
        'Multi-ply automated spreading with vacuum table hold-down for non-slip ply alignment',
        'Bandknife & straight-knife cutting machines ensuring razor-sharp pattern perimeter cut',
        'Bais Cloth Cutting Machine producing clean bias tapes, bindings, and continuous ribbons',
        'Meticulous bundle numbering, shade sorting, and ply ticketing to prevent lot-to-lot shade mismatch',
      ],
      checkpoint: 'Ply-to-ply tolerance measurement against master acrylic CAD patterns',
      machinesInvolved: '3 Industrial Cutting Machines · 1 Bandknife Machine · 1 Bais Cloth Cutting Machine · 1 Fusing Machine',
    },
    {
      id: 'sewing',
      number: '03',
      title: 'Sewing Lines & Garment Assembly',
      subtitle: 'Clockwork Floor Precision (400+ MACHINES)',
      description:
        'To sew fabric to perfection, our team of skilled operators utilizes world-renowned Juki machinery organized by progressive bundle work breakdown, delivering consistent stitch tension and structural durability.',
      details: [
        '196 Single Needle workstations calibrated for clean topstitching and precision joining',
        '25 Overlock 4 & 5 Thread machines executing seamless serging and fray-proof edge safety',
        'Specialized Kansai, Tirva Flat Lock, and Double Needle Chain Lock units for stretch and waistbands',
        'Engineered Weltpocket, Keyhole, Bartack, Button, and Kaja automatic cycle machines',
      ],
      checkpoint: 'Inline Stitch-Per-Inch (SPI) verification, seam tension check, and seam puckering surveillance',
      machinesInvolved: '196 Single Needle · 25 Overlock (4/5 Thread) · 4 Kansai · 2 Tirva Flatlock · 7 Chain Lock · 4 Bartack',
    },
    {
      id: 'washing-qc',
      number: '04',
      title: 'Washing & Multi-Point Quality Control',
      subtitle: 'Rigorous End-to-End Inspection (KQCP)',
      description:
        'With a stringent policy of continuous inspection integrated throughout operations, checking is an end-to-end procedure. Garments undergo intermediate wash/silicone treatments and 100% measurement verification.',
      details: [
        '100% garment measurement audit against client specification tolerance charts',
        'Seam strength, puckering, loose thread trimming, and button-pull tension tests',
        'Symmetry audits on collar points, cuff widths, pocket placements, and hem alignments',
        'Colorfastness and wash-care label legibility validation prior to release to finishing',
      ],
      checkpoint: 'Pass verification across all 5 Key Quality Control Points (KQCP) before packing approval',
      machinesInvolved: 'Industrial Garment Washing Units · Tension Gauges · Calibrated Measurement Inspection Tables',
    },
    {
      id: 'finishing-packing',
      number: '05',
      title: 'Pressing, Folding & Export Packing',
      subtitle: 'Final Finesse & Dispatch Readiness',
      description:
        'We believe in bringing finesse to every product, marking the completion of an effort. Finished garments are steam-ironed on boiler tables, barcode tagged, and packed into export-grade corrugated cartons.',
      details: [
        '12 Boiler Iron Tables and 4 Bottle Irons delivering crease-free, shape-retaining steam finish',
        'Final needle detector screening ensuring zero metallic foreign body contamination',
        'Care label, price ticket, swing tag, and individual polybag packaging to buyer specs',
        'Assortment carton packing, barcode label verification, and container dispatch preparation',
      ],
      checkpoint: 'Carton audit, barcode scan validation, and shipping container seal verification',
      machinesInvolved: '12 Boiler Iron Tables · 4 Bottle Irons · Conveyor Metal Detector · Automated Bagging Stations',
    },
  ];

  const machineInventory: MachineStat[] = [
    { name: 'Total Single Needle', count: 196, category: 'Sewing' },
    { name: 'Total Overlock 5 Thread Machine', count: 22, category: 'Overlock & Specialized' },
    { name: 'Total Overlock 4 Thread Machine', count: 3, category: 'Overlock & Specialized' },
    { name: 'Double Needle Chain Lock Machine', count: 7, category: 'Overlock & Specialized' },
    { name: 'Double Needle', count: 6, category: 'Sewing' },
    { name: 'Single Needle Edge Cutting', count: 9, category: 'Sewing' },
    { name: 'Button Machines', count: 5, category: 'Sewing' },
    { name: 'Bartack Machines', count: 4, category: 'Sewing' },
    { name: 'Kansai Machines', count: 4, category: 'Overlock & Specialized' },
    { name: 'Kaja Machines', count: 4, category: 'Sewing' },
    { name: 'Feed of Arm Machines', count: 4, category: 'Overlock & Specialized' },
    { name: 'Tirva Flat Lock Machines', count: 2, category: 'Overlock & Specialized' },
    { name: 'Boiler Iron Tables', count: 12, category: 'Finishing & Cutting' },
    { name: 'Industrial Cutting Machines', count: 3, category: 'Finishing & Cutting' },
    { name: 'Bottle Irons', count: 4, category: 'Finishing & Cutting' },
    { name: 'Fusing Machine', count: 1, category: 'Finishing & Cutting' },
    { name: 'Bandknife Machine', count: 1, category: 'Finishing & Cutting' },
    { name: 'Fabric Checking Machine', count: 1, category: 'Finishing & Cutting' },
    { name: 'Weltpocket Machine', count: 1, category: 'Overlock & Specialized' },
    { name: 'Keyhole Machine', count: 1, category: 'Overlock & Specialized' },
    { name: 'Bais Cloth Cutting Machine', count: 1, category: 'Finishing & Cutting' },
  ];

  const kqcpItems = [
    {
      resource: 'Industrial Sewing Machines',
      point: 'Machine Maintenance & Setting',
      desc: 'Preventive resource maintenance and exact stitch tension calibration for each specific fabric blend.',
    },
    {
      resource: 'Cutters & Spreading',
      point: 'Accuracy & Fabric Balance',
      desc: 'Precision cuts eliminating dimensional distortion while optimizing marker consumption to save textile yardage.',
    },
    {
      resource: 'Fabric & Cloth',
      point: 'Assessment of Prints & Weave',
      desc: 'Initial inspection of substrate shade, yarn composition, and print alignment directly upon supplier receipt.',
    },
    {
      resource: 'Facility Environment',
      point: 'Protective Storage',
      desc: 'Non-damp, temperature-moderated warehouse safeguarding raw fabric and finished garments from humidity.',
    },
    {
      resource: 'Labour Skills',
      point: 'Formal & Tacit Application',
      desc: 'Experienced operators applying strict workmanship standards across collar rolling, cuffs, and seam finishes.',
    },
  ];

  const currentStage = stages[activeStageIndex];

  return (
    <section
      ref={sectionRef}
      id="manufacturing"
      className={`relative w-full bg-[#F4F0E6] text-[#202622] py-24 sm:py-32 overflow-hidden border-b border-[#202622]/10 transition-all duration-700 ease-out ${
        isSectionVisible ? 'opacity-100 translate-y-0 is-visible' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Staged Scroll Reveal */}
        <RevealOnScroll delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 py-1 px-3.5 rounded-full bg-[#103C30]/10 border border-[#103C30]/20 mb-4 shadow-2xs">
                <BrandLogo layout="icon-only" size="sm" variant="dark" className="shrink-0" />
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#103C30] uppercase">
                  <span>MANUFACTURING &amp; QUALITY</span>
                  <span aria-hidden="true" className="text-[#C8A875]">·</span>
                  <span>400+ MACHINES PRODUCTION PLANT</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#202622] leading-[1.1]">
                Precision in Every Stage. Quality in Every Detail.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#202622]/80 leading-relaxed font-normal">
                From fabric store to export dispatch, THRED VISION operates a documented, synchronized production flow ensuring high-throughput capacity and zero-defect consistency.
              </p>
            </div>

            {/* Perspective View Mode Switcher */}
            <div className="flex items-center p-1.5 bg-white rounded-xl border border-[#202622]/10 self-start md:self-auto shrink-0 shadow-sm">
              <button
                onClick={() => setViewMode('process')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  viewMode === 'process'
                    ? 'bg-[#103C30] text-[#F4F0E6] shadow-sm'
                    : 'text-[#202622]/70 hover:text-[#202622]'
                }`}
              >
                5-Stage Flowchart
              </button>
              <button
                onClick={() => setViewMode('machinery')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  viewMode === 'machinery'
                    ? 'bg-[#103C30] text-[#F4F0E6] shadow-sm'
                    : 'text-[#202622]/70 hover:text-[#202622]'
                }`}
              >
                Machinery Inventory
              </button>
              <button
                onClick={() => setViewMode('kqcp')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  viewMode === 'kqcp'
                    ? 'bg-[#103C30] text-[#F4F0E6] shadow-sm'
                    : 'text-[#202622]/70 hover:text-[#202622]'
                }`}
              >
                Key Quality Points (KQCP)
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* VIEW 1: 5-Stage Interactive Process Journey */}
        {viewMode === 'process' && (
          <div className="mb-16">
            {/* 5 Connected Step Buttons with Scroll Reveal */}
            <RevealOnScroll delay={200}>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-10">
                {stages.map((stage, idx) => {
                  const isActive = idx === activeStageIndex;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActiveStageIndex(idx)}
                      className={`p-4 rounded-xl text-left transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#103C30] text-[#F4F0E6] border-[#103C30] shadow-md -translate-y-1'
                          : 'bg-white text-[#202622] border-[#202622]/10 hover:border-[#103C30]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-mono text-xl font-bold ${isActive ? 'text-[#C8A875]' : 'text-[#103C30]'}`}>
                          {stage.number}
                        </span>
                        {idx === 0 && <Layers className={`w-4 h-4 ${isActive ? 'text-[#C8A875]' : 'text-[#103C30]'}`} />}
                        {idx === 1 && <Scissors className={`w-4 h-4 ${isActive ? 'text-[#C8A875]' : 'text-[#103C30]'}`} />}
                        {idx === 2 && <Cpu className={`w-4 h-4 ${isActive ? 'text-[#C8A875]' : 'text-[#103C30]'}`} />}
                        {idx === 3 && <ShieldCheck className={`w-4 h-4 ${isActive ? 'text-[#C8A875]' : 'text-[#103C30]'}`} />}
                        {idx === 4 && <PackageCheck className={`w-4 h-4 ${isActive ? 'text-[#C8A875]' : 'text-[#103C30]'}`} />}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold leading-tight mb-1">
                        {stage.title.split(',')[0]}
                      </h3>
                      <p className={`text-[11px] line-clamp-1 ${isActive ? 'text-[#F4F0E6]/75' : 'text-[#202622]/60'}`}>
                        {stage.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </RevealOnScroll>

            {/* Detailed Stage Blueprint Box with Scroll Reveal */}
            <RevealOnScroll delay={300}>
              <div className="bg-white rounded-2xl border border-[#202622]/15 p-6 sm:p-10 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded bg-[#103C30] text-[#F4F0E6] font-mono text-xs font-bold">
                        STAGE {currentStage.number} // PROCESS FLOW
                      </span>
                      <span className="text-xs uppercase tracking-wider text-[#103C30] font-semibold">
                        Standard Operating Procedure
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-[#202622]">
                      {currentStage.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#202622]/80 leading-relaxed font-normal">
                      {currentStage.description}
                    </p>

                    <div className="p-4 rounded-xl bg-[#F4F0E6] border border-[#202622]/10 space-y-2">
                      <span className="text-xs font-bold text-[#103C30] uppercase tracking-wider block">
                        Primary Quality Control Gate
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#202622]">
                        {currentStage.checkpoint}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#092820] text-[#F4F0E6] border border-[#C8A875]/25">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#C8A875] block mb-1">
                        Active Machinery on this Line
                      </span>
                      <p className="text-xs text-[#F4F0E6]/90 font-mono">
                        {currentStage.machinesInvolved}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    {/* Real Industrial Production Stage Photo */}
                    <TiltCard maxTilt={5}>
                      <div className="w-full rounded-xl overflow-hidden border border-[#C8A875]/30 group bg-[#092820] shadow-md flex flex-col">
                        {/* 100% Unaltered Factory Shopfloor Image (Exact 16:9 Ratio, 0% Crop, 0% Darkening) */}
                        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#092820] flex items-center justify-center">
                          <img
                            src={customPhotos[activeStageIndex] || MANUFACTURING_STAGE_PHOTOS[activeStageIndex].url}
                            alt={MANUFACTURING_STAGE_PHOTOS[activeStageIndex].alt}
                            loading="lazy"
                            className="w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-101"
                          />

                          {/* Subtle Stage & Change Photo Badges in corners without obstructing text or machinery */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-auto">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8A875] bg-[#092820]/90 px-2.5 py-1 rounded border border-[#C8A875]/40 backdrop-blur-xs font-bold shadow-sm">
                              STAGE 0{activeStageIndex + 1} // {MANUFACTURING_STAGE_PHOTOS[activeStageIndex].category}
                            </span>
                            
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#092820]/90 hover:bg-[#C8A875] text-[#F4F0E6] hover:text-[#092820] text-[10px] font-bold border border-[#C8A875]/40 backdrop-blur-xs transition-colors cursor-pointer shadow-sm"
                                title="Click to replace this image with your own uploaded photo"
                              >
                                <Camera className="w-3 h-3" />
                                <span>Change Photo</span>
                              </button>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/95 text-[#103C30] font-bold shadow-sm">
                                ACTIVE SHOPFLOOR
                              </span>
                            </div>
                          </div>
                        </div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          aria-label="Upload custom shopfloor image"
                        />

                        {/* Clean Details Footer Below Image (Zero Overlap on Photo) */}
                        <div className="p-4 bg-[#092820] border-t border-[#C8A875]/20 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-[#F4F0E6] leading-tight">
                              {MANUFACTURING_STAGE_PHOTOS[activeStageIndex].title}
                            </h4>
                            <p className="text-xs text-[#E5D7B7]/80 mt-0.5 leading-relaxed">
                              {MANUFACTURING_STAGE_PHOTOS[activeStageIndex].caption}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-[#C8A875] px-2.5 py-1 rounded bg-[#103C30] border border-[#C8A875]/25 shrink-0 self-start sm:self-auto">
                            {MANUFACTURING_STAGE_PHOTOS[activeStageIndex].specs?.split('·')[0] || 'VERIFIED'}
                          </span>
                        </div>
                      </div>
                    </TiltCard>

                    <div className="bg-[#F4F0E6]/60 rounded-xl p-6 sm:p-8 border border-[#202622]/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#103C30]">
                        Standardized Checkpoints &amp; Factory Execution
                      </h4>

                      <div className="space-y-3">
                        {currentStage.details.map((detail, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#202622]/5 text-xs sm:text-sm text-[#202622]/85 shadow-xs"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#103C30] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#202622]/10 text-xs text-[#202622]/65 font-medium">
                        Integrated across THRED VISION Unit 1 and Unit 2 floor plans along Bangalore Highway.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        )}

        {/* VIEW 2: Machinery Inventory */}
        {viewMode === 'machinery' && (
          <div className="mb-16">
            <RevealOnScroll delay={200}>
              <div className="bg-white rounded-2xl border border-[#202622]/15 p-6 sm:p-10 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#202622]/10 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-[#202622]">
                      Modern Machinery Breakdown
                    </h3>
                    <p className="text-xs text-[#202622]/70 mt-1">
                      Extracted from verified THRED VISION factory profile (400+ MACHINES)
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#F4F0E6] bg-[#103C30] px-3.5 py-1.5 rounded-lg">
                    JUKI &amp; KANSAI AUTOMATION
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {machineInventory.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F4F0E6]/50 border border-[#202622]/10 flex items-center justify-between gap-3 hover:bg-[#F4F0E6] transition-colors"
                    >
                      <div>
                        <span className="text-xs text-[#103C30] font-semibold block uppercase tracking-wider text-[10px]">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold text-[#202622] mt-0.5">
                          {item.name}
                        </h4>
                      </div>
                      <div className="text-xl font-bold font-mono text-[#103C30] bg-white px-3 py-1.5 rounded-lg border border-[#202622]/10 shrink-0">
                        {item.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        )}

        {/* VIEW 3: Key Quality Control Points (KQCP) */}
        {viewMode === 'kqcp' && (
          <div className="mb-16">
            <RevealOnScroll delay={200}>
              <div className="bg-white rounded-2xl border border-[#202622]/15 p-6 sm:p-10 shadow-sm">
                <div className="pb-6 border-b border-[#202622]/10 mb-8">
                  <h3 className="text-2xl font-bold text-[#202622]">
                    Key Quality Control Points (KQCP)
                  </h3>
                  <p className="text-xs text-[#202622]/70 mt-1">
                    Cause &amp; effect protocol applied at machine, cutter, material, facility, and labour tiers
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {kqcpItems.map((kq, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#F4F0E6] border border-[#202622]/10 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs uppercase tracking-widest text-[#103C30] font-bold block mb-1">
                          {kq.resource}
                        </span>
                        <h4 className="text-base font-bold text-[#202622] mb-2">
                          {kq.point}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#202622]/75 leading-relaxed">
                          {kq.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#202622]/10 flex items-center gap-1.5 text-xs text-[#103C30] font-semibold">
                        <ShieldCheck className="w-4 h-4 text-[#103C30]" />
                        <span>Continuous Audit Standard</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        )}

        {/* AUTHENTIC PDF GARMENTING STAGES & QUALITY VISUALS (PAGES 7 & 9) */}
        <RevealOnScroll delay={350}>
          <div className="mb-12">
            <GarmentingStageVisuals />
          </div>
        </RevealOnScroll>

        {/* Factory Commitment Callout with Scroll Reveal */}
        <RevealOnScroll delay={400}>
          <div className="p-8 rounded-2xl bg-[#092820] text-[#F4F0E6] border border-[#C8A875]/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-widest text-[#C8A875] uppercase block mb-1">
                QUALITY ASSURANCE COMMITMENT DIRECTIVE
              </span>
              <p className="text-sm sm:text-base text-[#F4F0E6]/90 leading-relaxed font-normal">
                &ldquo;THRED VISION GARMENTS PVT LTD is dedicated to producing garments that meet the highest standards of quality and craftsmanship. Quality control processes are implemented at every stage of production, ensuring that each garment reflects the brand&apos;s commitment to excellence.&rdquo;
              </p>
            </div>
            <div className="text-xs font-mono text-[#C8A875] bg-[#103C30] px-4 py-2.5 rounded-lg border border-[#C8A875]/30 whitespace-nowrap shrink-0">
              AQL 2.5 / 1.5 STANDARDS
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
