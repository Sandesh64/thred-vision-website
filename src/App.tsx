/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProductsSection } from './components/ProductsSection';
import { ManufacturingSection } from './components/ManufacturingSection';
import { ContactSection } from './components/ContactSection';
import { LeadFormModal } from './components/LeadFormModal';
import { CompanyProfileModal } from './components/CompanyProfileModal';
import { ThreadProgress } from './components/motion/ThreadProgress';
import { CustomCursor } from './components/motion/CustomCursor';
import { FloatingParticles } from './components/motion/FloatingParticles';
import { SmoothScroll } from './components/motion/SmoothScroll';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [inquiryCategory, setInquiryCategory] = useState<string | undefined>(undefined);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);
  const [leadModalCategory, setLeadModalCategory] = useState<string | undefined>(undefined);
  const [isCompanyProfileOpen, setIsCompanyProfileOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLeadModal = (categoryName?: string) => {
    if (categoryName) {
      setLeadModalCategory(categoryName);
    }
    setIsLeadModalOpen(true);
  };

  const handleCategorySelectForInquiry = (categoryName: string) => {
    setInquiryCategory(categoryName);
    scrollToSection('contact');
  };

  const handleOpenCompanyProfile = () => {
    window.open('/THRED%20VISION%20PROFILE-2(2).pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#F4F0E6] text-[#202622] flex flex-col selection:bg-[#103C30] selection:text-[#F4F0E6] relative">
        {/* Animated Tailor's Stitched Line Visualizing Scroll Progress */}
        <ThreadProgress />

        {/* Desktop Precision Custom Cursor Follower */}
        <CustomCursor />

        {/* Subtle Ambient Textile Particles */}
        <FloatingParticles />

        {/* Strict 3-Zone Top Navigation Bar with Company Profile Dossier and Lead Form Trigger */}
        <Navbar
          onNavClick={scrollToSection}
          onOpenLeadModal={() => handleOpenLeadModal()}
          onOpenCompanyProfile={handleOpenCompanyProfile}
        />

        <main className="flex-1 w-full">
          {/* SECTION 01 — HERO */}
          <HeroSection
            onExploreClick={() => scrollToSection('manufacturing')}
            onDiscussClick={() => handleOpenLeadModal()}
            onOpenCompanyProfile={handleOpenCompanyProfile}
          />

          {/* SECTION 02 — ABOUT THRED VISION Wrapped in Framer Motion Viewport-based Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full relative z-10"
          >
            <AboutSection
              onLearnMoreClick={() => scrollToSection('manufacturing')}
              onOpenLeadModal={() => handleOpenLeadModal()}
              onOpenCompanyProfile={handleOpenCompanyProfile}
            />
          </motion.div>

          {/* SECTION 03 — APPAREL CAPABILITIES (Made for Every Detail. Built for Every Collection) */}
          <ProductsSection
            onCategorySelectForInquiry={handleCategorySelectForInquiry}
            onOpenLeadModal={(cat) => handleOpenLeadModal(cat)}
          />

        {/* SECTION 04 — MANUFACTURING & QUALITY (Precision in Every Stage. Quality in Every Detail) */}
        <ManufacturingSection />

        {/* SECTION 05 — CONTACT & BUSINESS INQUIRIES (Let's Build Something Exceptional) */}
        <ContactSection
          preSelectedCategory={inquiryCategory}
          onNavClick={scrollToSection}
          onOpenLeadModal={() => handleOpenLeadModal()}
          onOpenCompanyProfile={handleOpenCompanyProfile}
        />
      </main>

      {/* Floating Modern Action Cluster (Company Profile, Quick RFQ & WhatsApp Button) */}
      <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-5 z-40 flex items-center gap-2.5 sm:gap-3">
        <a
          href="/THRED%20VISION%20PROFILE-2(2).pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#092820] text-[#F4F0E6] text-xs font-semibold shadow-xl border border-[#C8A875]/40 hover:bg-[#103C30] hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        >
          <span className="text-[#C8A875]">PDF</span>
          <span>Company Profile</span>
        </a>

        <button
          onClick={() => handleOpenLeadModal()}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#103C30] text-[#F4F0E6] text-xs sm:text-sm font-bold shadow-2xl border border-[#C8A875]/60 hover:bg-[#092820] hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A875] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C8A875]"></span>
          </span>
          <span className="tracking-wide">Start Quick RFQ</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C8A875] group-hover:rotate-12 transition-transform" />
        </button>

        <WhatsAppButton variant="floating" />
      </div>

      {/* Modern Pop Lead Form (Question by Question Modal) */}
      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        initialCategory={leadModalCategory}
      />

      {/* Official Interactive Company Profile & Capability Dossier Modal */}
      <CompanyProfileModal
        isOpen={isCompanyProfileOpen}
        onClose={() => setIsCompanyProfileOpen(false)}
        onOpenLeadModal={() => handleOpenLeadModal()}
      />
    </div>
  </SmoothScroll>
  );
}
