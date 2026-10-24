import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  onOpenLeadModal?: () => void;
  onOpenCompanyProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavClick,
  onOpenLeadModal,
  onOpenCompanyProfile,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavClick(id);
  };

  const handleInquireClick = () => {
    setMobileMenuOpen(false);
    if (onOpenLeadModal) {
      onOpenLeadModal();
    } else {
      onNavClick('contact');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#092820]/95 backdrop-blur-md py-3.5 border-b border-[#C8A875]/25 shadow-lg'
          : 'bg-gradient-to-b from-[#092820]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Authentic Brand Logo with needle & thread monogram */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A875] rounded"
          aria-label="THRED VISION Home"
        >
          <BrandLogo variant="light" showTagline={!scrolled} />
        </button>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#F4F0E6]/85"
        >
          <button
            onClick={() => handleLinkClick('about')}
            className="hover:text-[#C8A875] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A875] rounded py-1 tracking-wide"
          >
            About
          </button>
          <button
            onClick={() => handleLinkClick('products')}
            className="hover:text-[#C8A875] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A875] rounded py-1 tracking-wide"
          >
            Capabilities
          </button>
          <button
            onClick={() => handleLinkClick('manufacturing')}
            className="hover:text-[#C8A875] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A875] rounded py-1 tracking-wide"
          >
            Manufacturing
          </button>
          <button
            onClick={() => handleLinkClick('contact')}
            className="hover:text-[#C8A875] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A875] rounded py-1 tracking-wide"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Action (Inquire Now + Mobile Menu) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleInquireClick}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#092820] bg-[#F4F0E6] rounded-md hover:bg-white hover:shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer border border-[#C8A875]/40"
          >
            Inquire Now
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F4F0E6] p-1.5 rounded hover:bg-[#F4F0E6]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A875]"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#C8A875]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#092820] border-b border-[#C8A875]/25 px-6 py-6 space-y-4 shadow-xl">
          <div className="pb-3 border-b border-[#C8A875]/20 flex items-center justify-between">
            <BrandLogo variant="light" showTagline={true} size="sm" />
          </div>
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#F4F0E6]">
            <button
              onClick={() => handleLinkClick('about')}
              className="text-left py-2 hover:text-[#C8A875] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleLinkClick('products')}
              className="text-left py-2 hover:text-[#C8A875] transition-colors"
            >
              Capabilities
            </button>
            <button
              onClick={() => handleLinkClick('manufacturing')}
              className="text-left py-2 hover:text-[#C8A875] transition-colors"
            >
              Manufacturing
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-left py-2 hover:text-[#C8A875] transition-colors"
            >
              Contact
            </button>
          </nav>
          <div className="pt-2 border-t border-[#C8A875]/20">
            <button
              onClick={handleInquireClick}
              className="w-full text-center py-3 px-4 text-sm font-semibold text-[#092820] bg-[#F4F0E6] rounded-md hover:bg-white transition-colors"
            >
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
