import React, { useState } from 'react';
import { ArrowUpRight, Building2, Users2, FileCheck, CheckCircle2, Image as ImageIcon, FileText } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FactoryPlantVisual } from './pdf-assets/FactoryPlantVisual';
import { ProductionFloorVisual } from './pdf-assets/ProductionFloorVisual';
import { FloorPlanVisual } from './pdf-assets/FloorPlanVisual';
import { TeamWorkforceVisual } from './pdf-assets/TeamWorkforceVisual';
import { AuditDocumentVisual } from './pdf-assets/AuditDocumentVisual';
import { BrandLogo } from './BrandLogo';
import { CountUp } from './motion/CountUp';
import { TextReveal } from './motion/TextReveal';
import { TiltCard } from './motion/TiltCard';

interface AboutSectionProps {
  onLearnMoreClick: () => void;
  onOpenLeadModal?: () => void;
  onOpenCompanyProfile?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onLearnMoreClick,
  onOpenLeadModal,
  onOpenCompanyProfile,
}) => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.05,
    triggerOnce: true,
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'pillars' | 'credentials'>('overview');

  const pillars = [
    {
      num: '01',
      title: 'Merchandising & Marketing',
      scope: 'Buyer Communication & Costing',
      points: [
        'End-to-end buyer communication, order processing, and strategic costing',
        'Proto-sample development, trend forecasting, and tech-pack review',
        'Brand positioning and dedicated B2B client account management',
      ],
    },
    {
      num: '02',
      title: 'Production & Operations',
      scope: 'Cutting, Sewing & Workflow',
      points: [
        'Supervises precision CAD cutting, sewing assembly, and finishing lines',
        'Floor synchronization ensuring on-time throughput while safeguarding quality',
        'Scheduled machine preventive maintenance across all 400+ workstations',
      ],
    },
    {
      num: '03',
      title: 'Quality Control & Compliance',
      scope: 'Multi-Stage KQCP Audits',
      points: [
        'Maintains defect-free standards across every sewing and finishing stage',
        'Stringent adherence to international buyer specs and dimensional tolerances',
        'Conducts AQL inspections, tensile/seam tests, and continuous process improvements',
      ],
    },
    {
      num: '04',
      title: 'Supply Chain & Logistics',
      scope: 'Procurement & Export Despatch',
      points: [
        'Raw material fabric & trim inventory procurement and lot traceability',
        'Warehouse management along the strategic Bangalore Highway corridor',
        'Timely container shipment dispatch to regional ports and domestic hubs',
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative w-full bg-[#F4F0E6] text-[#202622] py-24 sm:py-32 overflow-hidden border-b border-[#202622]/10 transition-all duration-700 ease-out ${
        isSectionVisible ? 'opacity-100 translate-y-0 is-visible' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Subtle Background Linen Weave Texture */}
      <div className="absolute inset-0 bg-linen-weave opacity-70 pointer-events-none" aria-hidden="true" />

      {/* Decorative Editorial Watermark Thread */}
      <div className="absolute right-0 top-1/4 w-96 h-96 opacity-10 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#103C30]">
          <path d="M 20 20 C 80 180, 140 20, 180 180" strokeWidth="2" strokeDasharray="4 6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Staged Scroll Reveal */}
        <RevealOnScroll delay={100}>
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-3 py-1 px-3.5 rounded-full bg-[#103C30]/10 border border-[#103C30]/20 mb-4 shadow-2xs">
              <BrandLogo layout="icon-only" size="sm" variant="dark" className="shrink-0" />
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#103C30] uppercase">
                <span>ABOUT THRED VISION</span>
                <span aria-hidden="true" className="text-[#C8A875]">·</span>
                <span>GANJIMUTT, KARNATAKA</span>
              </div>
            </div>

            <TextReveal>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#202622] leading-[1.1] mb-6">
                Manufacturing with Purpose. Creating with Precision.
              </h2>
            </TextReveal>

            <p className="text-lg sm:text-xl text-[#202622]/85 leading-relaxed font-normal mb-4">
              Established in 2022 along the Bangalore Highway, THRED VISION operates a garment manufacturing facility spanning 2 ACRES at SIDCO Industrial Estate, Ganjimutt, Dakshina Kannada, Karnataka.
            </p>

            <p className="text-sm sm:text-base text-[#202622]/70 leading-relaxed font-normal">
              With 400+ MACHINES and a dedicated 400+ WORKFORCE—including professionals, experienced managers, and technical experts—we manufacture ready-made garments. The company profile states a production capacity of 1L+ GARMENTS/MONTH.
            </p>
          </div>
        </RevealOnScroll>

        {/* 4 Stated Scale Facts with Staged Scroll Reveal */}
        <RevealOnScroll delay={200}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-y border-[#202622]/15 py-10 mb-16">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#103C30] font-semibold block mb-1">
                ESTABLISHED
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-[#202622]">
                <CountUp end={2022} />
              </div>
              <p className="text-xs text-[#202622]/65 mt-2">
                SIDCO Industrial Estate, Ganjimutt
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-[#103C30] font-semibold block mb-1">
                FACTORY FOOTPRINT
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-[#202622]">
                <CountUp end={2} suffix=" ACRES" />
              </div>
              <p className="text-xs text-[#202622]/65 mt-2">
                Unit 1 &amp; Unit 2
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-[#103C30] font-semibold block mb-1">
                MODERN MACHINERY
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-[#202622]">
                <CountUp end={400} suffix="+" />
              </div>
              <p className="text-xs text-[#202622]/65 mt-2 font-mono uppercase">
                400+ MACHINES
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-[#103C30] font-semibold block mb-1">
                MONTHLY CAPACITY
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-[#202622]">
                <CountUp end={1} suffix="L+" />
              </div>
              <p className="text-xs text-[#202622]/65 mt-2 font-mono uppercase">
                1L+ GARMENTS/MONTH
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* FACILITY & PRODUCTION INFRASTRUCTURE GALLERY */}
        <RevealOnScroll delay={250}>
          <div className="mb-16">
            <div className="flex items-center justify-between pb-4 border-b border-[#202622]/15 mb-6">
              <div>
                <span className="text-xs font-semibold text-[#103C30] uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#103C30]" />
                  <span>PLANT FACILITY, WORKFORCE &amp; INFRASTRUCTURE</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#202622] mt-0.5">
                  Ganjimutt Manufacturing Complex &amp; Workforce
                </h3>
              </div>
              <span className="text-xs font-mono text-[#103C30] bg-white px-3 py-1.5 rounded-lg border border-[#202622]/10 hidden sm:inline-block">
                BANGALORE HIGHWAY CORRIDOR
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TiltCard maxTilt={5}>
                <FactoryPlantVisual />
              </TiltCard>
              <TiltCard maxTilt={5}>
                <TeamWorkforceVisual />
              </TiltCard>
              <TiltCard maxTilt={5}>
                <ProductionFloorVisual />
              </TiltCard>
            </div>
          </div>
        </RevealOnScroll>

        {/* Tabbed Editorial Deep Dive: Overview · 4 Pillars · Verified Credentials */}
        <RevealOnScroll delay={300}>
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202622]/15 pb-4 mb-8">
              <div className="flex items-center gap-3 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'overview'
                      ? 'bg-[#103C30] text-[#F4F0E6] shadow-sm'
                      : 'text-[#202622]/70 hover:text-[#202622] hover:bg-[#202622]/5'
                  }`}
                >
                  Infrastructure &amp; Workforce
                </button>
                <button
                  onClick={() => setActiveTab('pillars')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'pillars'
                      ? 'bg-[#103C30] text-[#F4F0E6] shadow-sm'
                      : 'text-[#202622]/70 hover:text-[#202622] hover:bg-[#202622]/5'
                  }`}
                >
                  4 Pillar Departments
                </button>
                <button
                  onClick={() => setActiveTab('credentials')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'credentials'
                      ? 'bg-[#103C30] text-[#F4F0E6] shadow-sm'
                      : 'text-[#202622]/70 hover:text-[#202622] hover:bg-[#202622]/5'
                  }`}
                >
                  Audits &amp; Certifications
                </button>
              </div>

              <a
                href="/THRED%20VISION%20PROFILE-2(2).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#092820] bg-[#C8A875] hover:bg-[#d8b885] rounded-md transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer shadow-sm hover:shadow"
              >
                <FileText className="w-3.5 h-3.5 text-[#092820]" />
                <span>VIEW COMPANY PROFILE</span>
              </a>
            </div>

            {/* TAB 1: Infrastructure & Social Upliftment */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-7 bg-white rounded-xl border border-[#202622]/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#103C30] uppercase tracking-wider mb-2">
                      <Building2 className="w-4 h-4" />
                      <span>Unit 1 &amp; Unit 2 Layout</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#202622] mb-3">
                      Strategically Positioned Along Bangalore Highway
                    </h3>
                    <p className="text-sm text-[#202622]/75 leading-relaxed mb-6 font-normal">
                      Located in Hobli Gurpura, SIDCO Industrial Estate EPIP Phase 1, our 2 ACRES layout incorporates dedicated fabric storage, computerized cutting rooms, independent sewing conveyor lines, checking departments, and a sealed export finishing hall.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#202622]/10 text-xs text-[#202622]/80">
                      <div className="p-3 bg-[#F4F0E6] rounded-lg">
                        <span className="font-semibold text-[#103C30] block mb-1">Port &amp; Highway Logistics</span>
                        <span>Direct arterial connectivity to major regional shipping ports and Bangalore distribution hubs.</span>
                      </div>
                      <div className="p-3 bg-[#F4F0E6] rounded-lg">
                        <span className="font-semibold text-[#103C30] block mb-1">Production Flow Isolation</span>
                        <span>Raw fabric inspection separated from steam pressing to eliminate particle contamination.</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#202622]/10 flex items-center justify-between">
                    <span className="text-xs text-[#202622]/60 font-mono">PLANT REF: PLOT NO 11 P1-A, SIDCO EPIP</span>
                    <button
                      onClick={onLearnMoreClick}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#103C30] hover:underline cursor-pointer"
                    >
                      <span>View 5-Stage Process</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Workforce & Social Responsibility Card */}
                <div className="lg:col-span-5 bg-[#103C30] text-[#F4F0E6] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#C8A875] uppercase tracking-wider mb-2">
                      <Users2 className="w-4 h-4" />
                      <span>Workforce Empowerment</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#F4F0E6] mb-3">
                      400+ WORKFORCE
                    </h3>
                    <p className="text-sm text-[#F4F0E6]/80 leading-relaxed mb-6 font-normal">
                      THRED VISION champions economic independence and gender inclusion. Our workforce operates under fair wage standards, progressive career training (including CEDOK entrepreneurial support), and employee amenities including staff transportation, on-site first aid, and hygienic canteens.
                    </p>

                    <div className="space-y-2 text-xs text-[#F4F0E6]/90">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A875]" />
                        <span>Skill Development: Continuous training on high-speed Juki &amp; Kansai machines</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A875]" />
                        <span>Social Upliftment: Strong local employment fostering family well-being</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A875]" />
                        <span>Positive Workplace: High retention rate and safe operational climate</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#F4F0E6]/15 text-xs text-[#C8A875] font-mono">
                    WOMEN EMPOWERMENT · FAIR EMPLOYMENT STANDARD
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Garments 4 Pillar Departments */}
            {activeTab === 'pillars' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.num}
                    className="bg-white rounded-xl border border-[#202622]/10 p-6 flex flex-col justify-between shadow-sm hover:border-[#103C30]/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-2xl font-bold text-[#103C30]">
                          {pillar.num}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#C8A875] bg-[#092820] px-2 py-0.5 rounded">
                          PILLAR
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#202622] mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-xs font-semibold text-[#103C30] mb-4">
                        {pillar.scope}
                      </p>

                      <ul className="space-y-2 text-xs text-[#202622]/75">
                        {pillar.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#103C30] font-bold">·</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Audits & Certifications with interactive Document Visual */}
            {activeTab === 'credentials' && (
              <AuditDocumentVisual />
            )}
          </div>
        </RevealOnScroll>

        {/* Founder & Leadership Statement with Scroll Reveal */}
        <RevealOnScroll delay={400}>
          <div className="rounded-2xl bg-[#092820] text-[#F4F0E6] p-8 sm:p-12 border border-[#C8A875]/25 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-semibold tracking-widest text-[#C8A875] uppercase block mb-3">
                  FOUNDER &amp; MANAGING DIRECTOR VISION
                </span>
                <blockquote className="text-lg sm:text-xl font-normal leading-relaxed text-[#F4F0E6]/95 italic mb-6">
                  &ldquo;Our journey has been driven by the vision to not only meet global standards but to exceed them. With our throughput of 1L+ GARMENTS/MONTH, each piece we manufacture carries the hallmark of our commitment to craftsmanship and sustainability. We are proud to be a trusted partner for businesses worldwide.&rdquo;
                </blockquote>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div>
                    <span className="font-bold text-[#F4F0E6] block">Subhash N &amp; Sandesh N</span>
                    <span className="text-xs text-[#B6C6B8]">Managing Directors</span>
                  </div>
                  <div className="w-px h-8 bg-[#C8A875]/30 hidden sm:block" />
                  <div>
                    <span className="font-bold text-[#F4F0E6] block">Dinesh Chandra</span>
                    <span className="text-xs text-[#B6C6B8]">General Manager</span>
                  </div>
                  <div className="w-px h-8 bg-[#C8A875]/30 hidden sm:block" />
                  <div className="text-xs text-[#C8A875] font-serif italic">
                    &ldquo;Dream to Design&rdquo;
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#103C30] p-6 rounded-xl border border-[#C8A875]/20 space-y-4">
                <div>
                  <span className="text-xs text-[#C8A875] font-semibold uppercase tracking-wider block mb-1">
                    Our Mission
                  </span>
                  <p className="text-xs text-[#F4F0E6]/85 leading-relaxed">
                    To create high-quality, stylish, and sustainable clothing that empowers individuals while maintaining ethical and eco-friendly production practices.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F4F0E6]/15">
                  <span className="text-xs text-[#C8A875] font-semibold uppercase tracking-wider block mb-1">
                    Our Vision
                  </span>
                  <p className="text-xs text-[#F4F0E6]/85 leading-relaxed">
                    To be a globally recognized leader in the fashion industry, setting trends in innovation, sustainability, and social responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
