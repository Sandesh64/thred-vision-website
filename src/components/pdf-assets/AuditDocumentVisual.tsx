import React, { useState } from 'react';
import { ShieldCheck, Award, FileText, CheckCircle2, ExternalLink } from 'lucide-react';

export const AuditDocumentVisual: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<'reliance' | 'licence' | 'iec' | 'gst'>('reliance');

  return (
    <div className="w-full bg-[#092820] rounded-2xl border border-[#C8A875]/25 p-6 sm:p-8 text-[#F4F0E6] shadow-xl">
      {/* Top Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#C8A875]/20 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A875] block">
            VERIFIED CREDENTIALS &amp; STATUTORY COMPLIANCE ARCHIVES
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F4F0E6] mt-1">
            Government Licences &amp; Client Audits
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#103C30] rounded-lg border border-[#C8A875]/20">
          <button
            onClick={() => setSelectedDoc('reliance')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
              selectedDoc === 'reliance'
                ? 'bg-[#C8A875] text-[#092820] font-bold shadow-sm'
                : 'text-[#F4F0E6]/75 hover:text-white'
            }`}
          >
            Reliance Audit
          </button>
          <button
            onClick={() => setSelectedDoc('licence')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
              selectedDoc === 'licence'
                ? 'bg-[#C8A875] text-[#092820] font-bold shadow-sm'
                : 'text-[#F4F0E6]/75 hover:text-white'
            }`}
          >
            Factory Licence
          </button>
          <button
            onClick={() => setSelectedDoc('iec')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
              selectedDoc === 'iec'
                ? 'bg-[#C8A875] text-[#092820] font-bold shadow-sm'
                : 'text-[#F4F0E6]/75 hover:text-white'
            }`}
          >
            IEC Certificate
          </button>
          <button
            onClick={() => setSelectedDoc('gst')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
              selectedDoc === 'gst'
                ? 'bg-[#C8A875] text-[#092820] font-bold shadow-sm'
                : 'text-[#F4F0E6]/75 hover:text-white'
            }`}
          >
            GST Certificate
          </button>
        </div>
      </div>

      {/* DOCUMENT PREVIEW CONTAINER */}
      <div className="bg-[#FFFFFF] text-[#202622] rounded-xl p-6 sm:p-8 font-sans shadow-inner border border-[#202622]/15">
        {/* DOCUMENT 1: Reliance Audit Report */}
        {selectedDoc === 'reliance' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[#202622]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#103C30] text-[#F4F0E6] flex items-center justify-center font-bold text-sm">
                  MAN
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#202622] leading-tight">
                    Vendor Evaluation Audit Report
                  </h4>
                  <p className="text-xs text-[#202622]/60 font-mono">
                    MANTHAN / RELIANCE APPARELS &amp; ACCESSORIES QA DEPARTMENT
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded font-mono">
                  RESULT: PASS · GRADE A
                </span>
                <p className="text-[10px] text-[#202622]/50 font-mono mt-0.5">Report # SMART101313</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#F4F0E6]/60 p-4 rounded-lg font-mono">
              <div>
                <span className="text-[#202622]/60 block text-[10px]">SUB-CONTRACTOR</span>
                <span className="font-bold text-[#103C30]">THREAD VISION</span>
              </div>
              <div>
                <span className="text-[#202622]/60 block text-[10px]">LOCATION</span>
                <span className="font-bold">EPIP GANJIMUTTA</span>
              </div>
              <div>
                <span className="text-[#202622]/60 block text-[10px]">EVALUATED MACHINES</span>
                <span className="font-bold">226 UNITS</span>
              </div>
              <div>
                <span className="text-[#202622]/60 block text-[10px]">TOTAL MANPOWER</span>
                <span className="font-bold">301 EVALUATED</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#103C30] uppercase text-[10px] tracking-wider block">
                Compliance Evaluation Breakdown:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white border border-[#202622]/10 rounded">
                  <div className="flex justify-between font-mono mb-1">
                    <span>Legal Compliance</span>
                    <strong className="text-emerald-700">80.56%</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded"><div className="bg-emerald-600 h-1.5 rounded" style={{ width: '80.5%' }} /></div>
                </div>
                <div className="p-3 bg-white border border-[#202622]/10 rounded">
                  <div className="flex justify-between font-mono mb-1">
                    <span>Delivery Compliance</span>
                    <strong className="text-emerald-700">81.82%</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded"><div className="bg-emerald-600 h-1.5 rounded" style={{ width: '81.8%' }} /></div>
                </div>
                <div className="p-3 bg-white border border-[#202622]/10 rounded">
                  <div className="flex justify-between font-mono mb-1">
                    <span>Overall Audit Result</span>
                    <strong className="text-emerald-700">APPROVED</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded"><div className="bg-emerald-600 h-1.5 rounded" style={{ width: '100%' }} /></div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-emerald-50 text-emerald-900 text-xs border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>&ldquo;Factory audited for mid economy format-based release for Smart business, approving for sub-contract purpose.&rdquo;</span>
            </div>
          </div>
        )}

        {/* DOCUMENT 2: Factory Licence */}
        {selectedDoc === 'licence' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[#202622]/20">
              <div>
                <h4 className="text-base font-bold text-[#202622] leading-tight">
                  Government of Karnataka — Factory Licence
                </h4>
                <p className="text-xs text-[#202622]/60 font-mono">
                  DEPARTMENT OF FACTORIES, INDUSTRIAL SAFETY &amp; HEALTH, BENGALURU
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded font-mono">
                LICENCE: MYSK 2452
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#F4F0E6]/60 p-4 rounded-lg font-mono">
              <div>
                <span className="text-[#202622]/60 block text-[10px]">LICENSEE ENTITY</span>
                <span className="font-bold text-[#103C30]">THRED VISION</span>
              </div>
              <div>
                <span className="text-[#202622]/60 block text-[10px]">SIGNATORY</span>
                <span className="font-bold">SUBHASH N</span>
              </div>
              <div>
                <span className="text-[#202622]/60 block text-[10px]">REGISTERED LOCATION</span>
                <span className="font-bold">PLOT 11 P1-A, EPIP</span>
              </div>
              <div>
                <span className="text-[#202622]/60 block text-[10px]">VALIDITY TERM</span>
                <span className="font-bold text-emerald-700">UNTIL 31/12/2029</span>
              </div>
            </div>

            <p className="text-xs text-[#202622]/75 leading-relaxed font-sans">
              Issued under the Factories Act 1948 and Karnataka Factory Rules 1969, certifying the manufacturing plant at SIDCO Industrial Estate EPIP Phase 1, Badagaulipady Village, Ganjimutt, Mangalore.
            </p>
          </div>
        )}

        {/* DOCUMENT 3: IEC Certificate */}
        {selectedDoc === 'iec' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[#202622]/20">
              <div>
                <h4 className="text-base font-bold text-[#202622] leading-tight">
                  Importer-Exporter Code (IEC)
                </h4>
                <p className="text-xs text-[#202622]/60 font-mono">
                  GOVERNMENT OF INDIA · MINISTRY OF COMMERCE &amp; INDUSTRY (DGFT BENGALURU)
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded font-mono">
                IEC: LRTPS9072F
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-[#F4F0E6]/60 p-4 rounded-lg font-mono">
              <div>
                <span className="text-[#202622]/60 block text-[10px]">FIRM NAME</span>
                <span className="font-bold text-[#103C30]">THRED VISION</span>
              </div>
              <div>
                <span className="text-[#202622]/60 block text-[10px]">PAN / TAX ID</span>
                <span className="font-bold">LRTPS9072F</span>
              </div>
              <div>
                <span className="text-[#202622]/60 block text-[10px]">NATURE OF CONCERN</span>
                <span className="font-bold">PROPRIETORSHIP</span>
              </div>
            </div>

            <p className="text-xs text-[#202622]/75 leading-relaxed font-sans">
              Authorizes THRED VISION to engage in international commercial trade, export ready-made garments worldwide, and import specialized fabrics and accessories under Indian foreign trade policies.
            </p>
          </div>
        )}

        {/* DOCUMENT 4: GST Certificate */}
        {selectedDoc === 'gst' && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[#202622]/20">
              <div>
                <h4 className="text-base font-bold text-[#202622] leading-tight">
                  Goods &amp; Services Tax Registration (Form GST REG-06)
                </h4>
                <p className="text-xs text-[#202622]/60 font-mono">
                  GOVERNMENT OF INDIA · COMMERCIAL TAXES DEPARTMENT, MANGALORE
                </p>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-900 text-xs font-bold rounded font-mono">
                GSTIN: 29LRTPS9072F1ZK
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-[#F4F0E6]/60 p-4 rounded-lg font-mono">
              <div>
                <span className="text-[#202622]/60 block text-[10px]">LEGAL NAME</span>
                <span className="font-bold text-[#103C30]">SUBHASH N</span>
              </div>
              <div>
                <span className="text-[#202622]/60 block text-[10px]">TRADE NAME</span>
                <span className="font-bold">THRED VISION</span>
              </div>
              <div>
                <span className="text-[#202622]/60 block text-[10px]">REGISTRATION DATE</span>
                <span className="font-bold">31/05/2022 (ACTIVE)</span>
              </div>
            </div>

            <p className="text-xs text-[#202622]/75 leading-relaxed font-sans">
              Principal place of business registered at Hobli Gurpura, No 11 P1-A, SIDCO Industrial Estate EPIP Phase 1, Badagaulipady Village, Ganjimutt, Dakshina Kannada, Karnataka, 574144.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
