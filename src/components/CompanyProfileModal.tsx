import React, { useEffect, useState } from 'react';
import {
  X,
  Download,
  Printer,
  FileText,
  Building2,
  Users2,
  Cpu,
  Layers,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import {
  HERO_PHOTO,
  ABOUT_PHOTOS,
  MENS_GARMENT_PHOTOS,
  WOMENS_GARMENT_PHOTOS,
  MANUFACTURING_STAGE_PHOTOS,
} from '../data/photos';

interface CompanyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLeadModal?: () => void;
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenLeadModal,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'capabilities' | 'factory' | 'compliance'>('profile');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-[#F4F0E6] text-[#202622] rounded-2xl shadow-2xl border border-[#C8A875]/40 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="bg-[#092820] text-[#F4F0E6] px-6 py-4 border-b border-[#C8A875]/30 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <BrandLogo variant="light" showTagline={true} size="sm" />
            <span className="hidden sm:inline text-[#C8A875] text-xs font-mono">|</span>
            <div className="hidden sm:block">
              <span className="text-xs uppercase tracking-widest text-[#C8A875] font-bold block">
                OFFICIAL COMPANY PROFILE &amp; CAPABILITY DOSSIER
              </span>
              <span className="text-[11px] text-[#B6C6B8] font-mono">
                THRED VISION GARMENTS · ESTD. 2022
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/THRED%20VISION%20PROFILE-2(2).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#C8A875] text-[#092820] hover:bg-white transition-colors cursor-pointer font-bold"
              title="Open Original 23-Page PDF in New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open 23-Page PDF</span>
            </a>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#103C30] text-[#F4F0E6] border border-[#C8A875]/30 hover:bg-[#C8A875] hover:text-[#092820] transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-[#F4F0E6]/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#103C30] px-6 py-2.5 border-b border-[#C8A875]/20 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'profile', label: 'Executive Overview' },
            { id: 'capabilities', label: 'Apparel Capabilities' },
            { id: 'factory', label: 'Plant & Machinery (400+ MACHINES)' },
            { id: 'compliance', label: 'Audits & Licences' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#C8A875] text-[#092820] shadow-sm font-bold'
                  : 'text-[#F4F0E6]/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-linen-weave">
          {/* TAB 1: EXECUTIVE PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Document Banner */}
              <div className="relative rounded-xl overflow-hidden bg-[#092820] text-[#F4F0E6] p-6 sm:p-8 border border-[#C8A875]/30 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <BrandLogo variant="light" showTagline={true} size="md" className="mb-2" />
                    <span className="text-xs uppercase font-mono tracking-widest text-[#C8A875] font-bold block">
                      COMPANY SUMMARY &amp; CORPORATE CHARTER
                    </span>
                    <h2 id="profile-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      THRED VISION GARMENTS
                    </h2>
                    <p className="text-sm text-[#F4F0E6]/85 leading-relaxed">
                      Established in <strong>2022</strong>, THRED VISION is an integrated ready-made garment manufacturing house located in the SIDCO Industrial Estate EPIP Phase 1, Ganjimutt, Karnataka along the Bangalore Highway. Built over 2 ACRES with 400+ MACHINES and 400+ WORKFORCE, the enterprise manufactures 1L+ GARMENTS/MONTH.
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs font-mono pt-2 text-[#C8A875]">
                      <span>· ESTD: 2022</span>
                      <span>· 1L+ GARMENTS/MONTH</span>
                      <span>· 400+ WORKFORCE</span>
                      <span>· ORDER RANGE: 10,000 – 2,00,000 PCS</span>
                    </div>
                  </div>
                  <div className="md:col-span-4 rounded-lg overflow-hidden border border-[#C8A875]/40 h-44 shadow">
                    <img
                      src={HERO_PHOTO.url}
                      alt={HERO_PHOTO.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Company Key Metrics Table */}
              <div className="bg-white rounded-xl p-6 border border-[#202622]/15 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#103C30] mb-4">
                  Corporate Registration &amp; Operating Specifics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-[#F4F0E6]/60 rounded-lg">
                    <span className="text-[#202622]/60 block font-mono text-[11px]">REGISTERED ENTITY</span>
                    <span className="font-bold text-[#202622] text-sm">THRED VISION GARMENTS</span>
                  </div>
                  <div className="p-3 bg-[#F4F0E6]/60 rounded-lg">
                    <span className="text-[#202622]/60 block font-mono text-[11px]">MANAGING DIRECTORS</span>
                    <span className="font-bold text-[#202622] text-sm">Subhash N &amp; Sandesh N</span>
                  </div>
                  <div className="p-3 bg-[#F4F0E6]/60 rounded-lg">
                    <span className="text-[#202622]/60 block font-mono text-[11px]">GENERAL MANAGER</span>
                    <span className="font-bold text-[#202622] text-sm">Dinesh Chandra</span>
                  </div>
                  <div className="p-3 bg-[#F4F0E6]/60 rounded-lg">
                    <span className="text-[#202622]/60 block font-mono text-[11px]">FACILITY FOOTPRINT</span>
                    <span className="font-bold text-[#202622] text-sm">2 ACRES (Units 1 &amp; 2)</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#202622]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-[#103C30] block mb-1">Corporate Mission:</span>
                    <p className="text-[#202622]/80 leading-relaxed">
                      To engineer superior, stylish, and sustainable ready-made apparel that empowers global labels through uncompromising craftsmanship and environmental stewardship.
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#103C30] block mb-1">Operating Hours &amp; Communication:</span>
                    <p className="text-[#202622]/80 leading-relaxed font-mono">
                      Monday – Saturday, 09:00 AM to 06:30 PM IST (12-Hour Clock). Direct phone: MD: +91 6362815418 / +91 6361761033 · GM: +91 9980546369 / +91 8105334689. Email: info@thredvision.com.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APPAREL CAPABILITIES */}
          {activeTab === 'capabilities' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-[#103C30]">
                  Full Apparel Manufacturing Portfolio
                </h3>
                <p className="text-xs text-[#202622]/70">
                  Minimum Order Quantity: 10,000 pcs · Maximum Batch Capacity: 2,00,000 pcs (2 Lakhs).
                </p>
              </div>

              {/* Men's Collection */}
              <div className="bg-white rounded-xl p-5 border border-[#202622]/15 shadow-sm">
                <span className="text-xs uppercase tracking-wider font-bold text-[#C8A875] bg-[#092820] px-2.5 py-1 rounded inline-block mb-3">
                  MEN'S READY-MADE APPAREL (6 CATEGORIES)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {MENS_GARMENT_PHOTOS.map((item) => (
                    <div key={item.id} className="group rounded-lg overflow-hidden border border-[#202622]/10">
                      <div className="h-28 overflow-hidden bg-gray-100">
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-2 bg-[#F4F0E6]/50">
                        <span className="text-[11px] font-bold block text-[#202622] leading-tight">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[#103C30] font-mono block mt-0.5">
                          {item.specs}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Women's Collection */}
              <div className="bg-white rounded-xl p-5 border border-[#202622]/15 shadow-sm">
                <span className="text-xs uppercase tracking-wider font-bold text-[#C8A875] bg-[#092820] px-2.5 py-1 rounded inline-block mb-3">
                  WOMEN&apos;S READY-MADE APPAREL ({WOMENS_GARMENT_PHOTOS.length} CATEGORIES)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
                  {WOMENS_GARMENT_PHOTOS.map((item) => (
                    <div key={item.id} className="group rounded-lg overflow-hidden border border-[#202622]/10">
                      <div className="h-28 overflow-hidden bg-gray-100">
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-2 bg-[#F4F0E6]/50">
                        <span className="text-[11px] font-bold block text-[#202622] leading-tight">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[#103C30] font-mono block mt-0.5">
                          {item.specs}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FACTORY & MACHINERY */}
          {activeTab === 'factory' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl overflow-hidden border border-[#202622]/15 bg-white shadow-sm">
                  <div className="h-36 overflow-hidden">
                    <img
                      src={ABOUT_PHOTOS.factoryExterior.url}
                      alt={ABOUT_PHOTOS.factoryExterior.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-xs font-bold text-[#103C30] block">2 ACRES Facility Campus</span>
                    <span className="text-[11px] text-[#202622]/70 font-mono">SIDCO Estate, Ganjimutt</span>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-[#202622]/15 bg-white shadow-sm">
                  <div className="h-36 overflow-hidden">
                    <img
                      src={ABOUT_PHOTOS.stitchingFloor.url}
                      alt={ABOUT_PHOTOS.stitchingFloor.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-xs font-bold text-[#103C30] block">400+ MACHINES</span>
                    <span className="text-[11px] text-[#202622]/70 font-mono">Juki, Kansai Special, Brother</span>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-[#202622]/15 bg-white shadow-sm">
                  <div className="h-36 overflow-hidden">
                    <img
                      src={ABOUT_PHOTOS.qualityInspection.url}
                      alt={ABOUT_PHOTOS.qualityInspection.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-xs font-bold text-[#103C30] block">Quality Assurance &amp; Finishing</span>
                    <span className="text-[11px] text-[#202622]/70 font-mono">100% Inline AQL 2.5 Inspection</span>
                  </div>
                </div>
              </div>

              {/* 5 Garmenting Stages */}
              <div className="bg-white rounded-xl p-5 border border-[#202622]/15 shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#103C30]">
                  5-Stage Precision Manufacturing Flow
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {MANUFACTURING_STAGE_PHOTOS.map((stage, idx) => (
                    <div key={stage.id} className="p-2.5 rounded-lg bg-[#F4F0E6]/60 border border-[#202622]/10 text-xs">
                      <span className="font-mono text-[#C8A875] font-bold text-[10px] block">STAGE 0{idx + 1}</span>
                      <span className="font-bold text-[#202622] block mt-0.5">{stage.title}</span>
                      <span className="text-[10px] text-[#202622]/70 block mt-1">{stage.specs}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COMPLIANCE & AUDITS */}
          {activeTab === 'compliance' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-xl p-6 border border-[#202622]/15 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202622]/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <h4 className="text-sm font-bold text-[#202622]">
                      Statutory Certifications &amp; Client Audit Approvals
                    </h4>
                  </div>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    STATUS: ACTIVE &amp; VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#F4F0E6]/50 rounded-lg border border-[#202622]/10">
                    <span className="font-bold text-[#103C30] block">Reliance Apparels Vendor Audit</span>
                    <span className="text-[11px] text-[#202622]/70 block mt-0.5">Report # SMART101313 · Grade A Passed</span>
                    <span className="text-[10px] text-emerald-700 font-bold block mt-1">✓ Approved for Domestic &amp; Export Lines</span>
                  </div>

                  <div className="p-3 bg-[#F4F0E6]/50 rounded-lg border border-[#202622]/10">
                    <span className="font-bold text-[#103C30] block">Karnataka Factories Act Licence</span>
                    <span className="text-[11px] text-[#202622]/70 block mt-0.5">Licence # MNG-3047/2022 · 400 HP Power Grid</span>
                    <span className="text-[10px] text-emerald-700 font-bold block mt-1">✓ Validated Industrial Operations</span>
                  </div>

                  <div className="p-3 bg-[#F4F0E6]/50 rounded-lg border border-[#202622]/10">
                    <span className="font-bold text-[#103C30] block">Directorate General of Foreign Trade (DGFT)</span>
                    <span className="text-[11px] text-[#202622]/70 block mt-0.5">IEC Code: 0722019482 · Government of India</span>
                    <span className="text-[10px] text-emerald-700 font-bold block mt-1">✓ Authorized Global Export House</span>
                  </div>

                  <div className="p-3 bg-[#F4F0E6]/50 rounded-lg border border-[#202622]/10">
                    <span className="font-bold text-[#103C30] block">GST Registration</span>
                    <span className="text-[11px] text-[#202622]/70 block mt-0.5">GSTIN: 29AAGCT2914K1ZK · Active Regular</span>
                    <span className="text-[10px] text-emerald-700 font-bold block mt-1">✓ Statutory Tax Compliance Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#092820] text-[#F4F0E6] px-6 py-4 border-t border-[#C8A875]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#B6C6B8] text-center sm:text-left flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Official inquiries: </span>
            <a href="mailto:info@thredvision.com" className="text-[#C8A875] hover:underline font-bold">
              info@thredvision.com
            </a>
            <span className="hidden sm:inline"> · </span>
            <span className="font-semibold text-white">MD:</span>
            <a href="tel:+916362815418" className="font-mono hover:text-[#C8A875]">+91 6362815418</a>
            <span>/</span>
            <a href="tel:+916361761033" className="font-mono hover:text-[#C8A875]">+91 6361761033</a>
            <span className="hidden sm:inline"> · </span>
            <span className="font-semibold text-white">GM:</span>
            <a href="tel:+919980546369" className="font-mono hover:text-[#C8A875]">+91 9980546369</a>
            <span>/</span>
            <a href="tel:+918105334689" className="font-mono hover:text-[#C8A875]">+91 8105334689</a>
          </div>

          <div className="flex items-center gap-3">
            {onOpenLeadModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLeadModal();
                }}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-[#C8A875] text-[#092820] hover:bg-white transition-colors cursor-pointer shadow"
              >
                Start Inquiry (RFQ)
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
