import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Copy, Send, Sparkles, Building, Phone, Mail, User, Layers, Loader2, AlertCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({
  isOpen,
  onClose,
  initialCategory,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  const [categories, setCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : ['T-shirts and polos']
  );
  const [volume, setVolume] = useState<string>('10,000 - 25,000 pcs (Standard Minimum Run)');
  const [requirements, setRequirements] = useState<string>('');
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    companyName: '',
    businessEmail: '',
    phone: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [botcheck, setBotcheck] = useState<string>('');

  useEffect(() => {
    if (initialCategory && !categories.includes(initialCategory)) {
      setCategories([initialCategory]);
    }
  }, [initialCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categoryChoices = [
    { id: 'tshirts', label: 'T-Shirts & Polos', sub: 'Single Jersey, Piqué, Bio-wash' },
    { id: 'formal-shirts', label: 'Formal Shirts', sub: '100% Giza Cotton, Poplin, Twill' },
    { id: 'casual-shirts', label: 'Casual Shirts', sub: 'Yarn-dyed Oxford, Checks, Linen' },
    { id: 'denim', label: 'Jeans & Denim', sub: '10 - 14 oz Ring-spun, Washes' },
    { id: 'trousers', label: 'Trousers & Chinos', sub: 'Tailored Suiting, Stretch Twill' },
    { id: 'jackets', label: 'Jackets & Outerwear', sub: 'Heavy Canvas, Fleece, Utility' },
    { id: 'dresses', label: 'Dresses & Blouses', sub: 'Viscose, Rayon, Linen, Crepe' },
    { id: 'kurtis', label: 'Kurtis & Ethnic', sub: 'Cotton Flex, Chanderi, Prints' },
    { id: 'leggings', label: 'Leggings & Bottoms', sub: '4-Way Cotton Spandex, Flatlock' },
    { id: 'custom', label: 'Custom Tech Pack Spec', sub: 'Client Designer Patterns' },
  ];

  const volumeChoices = [
    {
      id: 'min-tier',
      title: '10,000 - 25,000 pcs',
      badge: 'Minimum Order Quantity (MOQ)',
      desc: 'Our certified factory minimum baseline. Dedicated line allocation, custom labels, and full in-house fabric QA.',
    },
    {
      id: 'mid-tier',
      title: '25,000 - 1,00,000 pcs',
      badge: 'High-Volume Production',
      desc: 'Optimized multi-line assembly conveyor allocation, volume yarn pricing, and scheduled export batching.',
    },
    {
      id: 'max-tier',
      title: '1,00,000 - 2,00,000 pcs (2 Lakhs)',
      badge: 'Maximum Industrial Scale',
      desc: 'Peak capacity utilization across Unit 1 & Unit 2, containerized shipping logistics, and phased deliveries.',
    },
  ];

  const toggleCategory = (label: string) => {
    if (categories.includes(label)) {
      if (categories.length === 1) return;
      setCategories(categories.filter((c) => c !== label));
    } else {
      setCategories([...categories, label]);
    }
  };

  const handleNext = async () => {
    setErrors({});
    setSubmitError(null);
    if (currentStep === 1) {
      if (categories.length === 0) {
        setErrors({ category: 'Please select at least one garment category.' });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!requirements.trim()) {
        setErrors({ requirements: 'Please enter brief details regarding fabric, fit, or timeline.' });
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      const newErrors: { [key: string]: string } = {};
      if (!contactInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!contactInfo.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!contactInfo.businessEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.businessEmail)) {
        newErrors.businessEmail = 'Valid business email is required';
      }

      const cleanDigits = contactInfo.phone.trim().replace(/\D/g, '');
      const is10DigitIndian =
        (cleanDigits.length === 10 && /^[6-9]\d{9}$/.test(cleanDigits)) ||
        (cleanDigits.length === 12 && cleanDigits.startsWith('91') && /^[6-9]\d{9}$/.test(cleanDigits.slice(2))) ||
        (cleanDigits.length === 11 && cleanDigits.startsWith('0') && /^[6-9]\d{9}$/.test(cleanDigits.slice(1)));

      if (!contactInfo.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!is10DigitIndian) {
        newErrors.phone = 'Please provide a valid 10-digit phone number (optional +91)';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      if (botcheck) {
        setIsCompleted(true);
        return;
      }

      setIsSubmitting(true);

      try {
        const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;

        if (!endpoint) {
          throw new Error(
            'Google Sheets endpoint is not configured. Add VITE_GOOGLE_SHEETS_WEB_APP_URL to your .env file.'
          );
        }

        const payload = {
          fullName: contactInfo.fullName.trim(),
          companyName: contactInfo.companyName.trim(),
          businessEmail: contactInfo.businessEmail.trim(),
          phone: contactInfo.phone.trim(),
          categories: categories.join(', '),
          volume: volume || 'Not specified',
          requirements: requirements.trim() || 'Not specified',
          botcheck: botcheck.trim(),
        };

        // Apps Script Web Apps generally do not expose their response to
        // browser JavaScript cross-origin. no-cors sends the request, but
        // cannot confirm from the browser that Sheets/email succeeded.
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
          },
          body: JSON.stringify(payload),
        });

        setIsCompleted(true);
      } catch (error) {
        console.error('[Google Sheets Lead Submission Error]', error);
        setSubmitError(
          'We could not send your enquiry. Please try again or contact us by phone or WhatsApp.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const constructEmailBody = () => {
    return `THRED VISION — B2B GARMENT MANUFACTURING RFQ

Client Information:
- Contact Name: ${contactInfo.fullName}
- Company: ${contactInfo.companyName}
- Corporate Email: ${contactInfo.businessEmail}
- Telephone / WhatsApp: ${contactInfo.phone}

Production Scope:
- Target Categories: ${categories.join(', ')}
- Target Order Volume: ${volume}

Project Requirements & Fabric Specifications:
${requirements}

---
Generated via THRED VISION Interactive Lead Portal (Ganjimutt, Karnataka Facility)`;
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Manufacturing RFQ: ${contactInfo.companyName} [${volume.split('(')[0].trim()}]`);
    const body = encodeURIComponent(constructEmailBody());
    window.location.href = `mailto:info@thredvision.com?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(constructEmailBody());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#092820]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#103C30] rounded-2xl border border-[#C8A875]/30 shadow-2xl text-[#F4F0E6] overflow-hidden my-auto">
        {/* Progress Bar at the top */}
        <div className="w-full bg-[#092820] h-1.5">
          <div
            className="bg-gradient-to-r from-[#C8A875] to-[#F4F0E6] h-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Modal Top Bar */}
        <div className="px-6 sm:px-8 pt-6 pb-4 flex items-center justify-between border-b border-[#C8A875]/15">
          <BrandLogo variant="light" showTagline={true} size="sm" />
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#F4F0E6]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-[#C8A875]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 md:p-10">
          {!isCompleted ? (
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs font-mono text-[#C8A875] mb-2">
                <span>QUESTION 0{currentStep} OF 0{totalSteps}</span>
                <span className="uppercase tracking-widest text-[#B6C6B8]">
                  {currentStep === 1 && 'APPAREL CATEGORY'}
                  {currentStep === 2 && 'PRODUCTION SCALE'}
                  {currentStep === 3 && 'FABRIC & SPECS'}
                  {currentStep === 4 && 'DIRECT CONTACT'}
                </span>
              </div>

              {/* STEP 1: Categories */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F0E6]">
                      Which apparel categories are you planning to produce?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B6C6B8] mt-2">
                      Select all that apply for your upcoming collection or trial batch.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {categoryChoices.map((choice) => {
                      const isSelected = categories.includes(choice.label);
                      return (
                        <button
                          type="button"
                          key={choice.id}
                          onClick={() => toggleCategory(choice.label)}
                          className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-[#C8A875] text-[#092820] border-[#C8A875] font-semibold shadow-md'
                              : 'bg-[#092820]/70 text-[#F4F0E6] border-[#C8A875]/20 hover:border-[#C8A875]/50'
                          }`}
                        >
                          <div>
                            <span className="text-sm font-bold block">{choice.label}</span>
                            <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-[#092820]/80' : 'text-[#B6C6B8]'}`}>
                              {choice.sub}
                            </span>
                          </div>
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                              isSelected ? 'bg-[#092820] border-[#092820] text-[#C8A875]' : 'border-[#C8A875]/40'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {errors.category && (
                    <p className="text-xs text-red-400 font-medium">{errors.category}</p>
                  )}
                </div>
              )}

              {/* STEP 2: Volume */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F0E6]">
                      What is your estimated initial order volume?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B6C6B8] mt-2">
                      Our 400+ MACHINES facility flexibly supports boutique runs to high-throughput scale.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {volumeChoices.map((opt) => {
                      const isSelected = volume.startsWith(opt.title);
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setVolume(`${opt.title} (${opt.badge})`)}
                          className={`w-full p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#C8A875] text-[#092820] border-[#C8A875] font-semibold shadow-md'
                              : 'bg-[#092820]/70 text-[#F4F0E6] border-[#C8A875]/20 hover:border-[#C8A875]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-base font-bold">{opt.title}</span>
                            <span
                              className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                                isSelected ? 'bg-[#092820] text-[#C8A875]' : 'bg-[#103C30] text-[#C8A875]'
                              }`}
                            >
                              {opt.badge}
                            </span>
                          </div>
                          <p className={`text-xs ${isSelected ? 'text-[#092820]/80' : 'text-[#B6C6B8]'}`}>
                            {opt.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Fabric & Specifications */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F0E6]">
                      Tell us about your fabric, trim, or delivery specs.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B6C6B8] mt-2">
                      Specify substrate (e.g. 100% Cotton, Giza poplin, Denim), GSM, desired wash, or delivery target.
                    </p>
                  </div>

                  <div>
                    {/* Quick Suggestion Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <span className="text-[11px] font-mono text-[#C8A875] mr-1">Quick Add:</span>
                      {[
                        '100% Bio-Wash Cotton',
                        'Giza Cotton Poplin',
                        '12-14oz Ring-Spun Denim',
                        'Tech Packs Ready',
                        'Need Fabric Swatches',
                        'Urgent (<8 Weeks)',
                      ].map((chip) => (
                        <button
                          type="button"
                          key={chip}
                          onClick={() => {
                            if (!requirements.includes(chip)) {
                              setRequirements((prev) => (prev ? `${prev}, ${chip}` : chip));
                            }
                          }}
                          className="px-2.5 py-1 rounded-full bg-[#092820] text-[#F4F0E6]/85 border border-[#C8A875]/30 text-[11px] hover:border-[#C8A875] hover:text-[#C8A875] transition-colors cursor-pointer"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={4}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="e.g. Need 100% bio-wash cotton pique (220 GSM) polos and oxford casual shirts. Tech packs ready. Target production completion within 8-10 weeks..."
                      className="w-full p-4 bg-[#092820] border border-[#C8A875]/30 rounded-xl text-sm text-[#F4F0E6] placeholder-[#F4F0E6]/30 focus:outline-none focus:border-[#C8A875] transition-colors"
                    />
                    {errors.requirements && (
                      <p className="text-xs text-red-400 mt-1 font-medium">{errors.requirements}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: Contact Information */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F0E6]">
                      Where should our management desk direct your quotation?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B6C6B8] mt-2">
                      Managing Directors Subhash N, Sandesh N and General Manager Dinesh Chandra will personally review your brief.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#C8A875] uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={contactInfo.fullName}
                        onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full px-4 py-3 bg-[#092820] border border-[#C8A875]/30 rounded-lg text-sm text-[#F4F0E6] placeholder-[#F4F0E6]/30 focus:outline-none focus:border-[#C8A875]"
                      />
                      {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#C8A875] uppercase tracking-wider mb-1.5">
                        Brand / Company Name *
                      </label>
                      <input
                        type="text"
                        value={contactInfo.companyName}
                        onChange={(e) => setContactInfo({ ...contactInfo, companyName: e.target.value })}
                        placeholder="e.g. Urban Fabric Retail"
                        className="w-full px-4 py-3 bg-[#092820] border border-[#C8A875]/30 rounded-lg text-sm text-[#F4F0E6] placeholder-[#F4F0E6]/30 focus:outline-none focus:border-[#C8A875]"
                      />
                      {errors.companyName && <p className="text-xs text-red-400 mt-1">{errors.companyName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#C8A875] uppercase tracking-wider mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        value={contactInfo.businessEmail}
                        onChange={(e) => setContactInfo({ ...contactInfo, businessEmail: e.target.value })}
                        placeholder="procurement@company.com"
                        className="w-full px-4 py-3 bg-[#092820] border border-[#C8A875]/30 rounded-lg text-sm text-[#F4F0E6] placeholder-[#F4F0E6]/30 focus:outline-none focus:border-[#C8A875]"
                      />
                      {errors.businessEmail && <p className="text-xs text-red-400 mt-1">{errors.businessEmail}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#C8A875] uppercase tracking-wider mb-1.5">
                        Telephone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-[#092820] border border-[#C8A875]/30 rounded-lg text-sm text-[#F4F0E6] placeholder-[#F4F0E6]/30 focus:outline-none focus:border-[#C8A875]"
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Honeypot Spam Protection (Hidden) */}
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botcheck}
                    onChange={(e) => setBotcheck(e.target.value)}
                    className="hidden"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                  />

                  {/* Submit Error Banner */}
                  {submitError && (
                    <div className="p-3.5 rounded-lg bg-red-950/70 border border-red-500/50 text-xs text-red-200 flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Nav Controls */}
              <div className="pt-8 mt-8 border-t border-[#C8A875]/20 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitError(null);
                      setCurrentStep(currentStep - 1);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#F4F0E6] border border-[#C8A875]/30 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-[#092820] bg-[#C8A875] rounded-lg hover:bg-[#F4F0E6] transition-all cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#092820]" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>{currentStep === totalSteps ? 'Complete & Submit RFQ' : 'Continue'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* STEP 5: Finished Summary & Instant Actions */
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#C8A875] text-[#092820] mx-auto flex items-center justify-center font-bold mb-3 shadow-lg">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F0E6]">
                  Thank you! Your RFQ has been received.
                </h3>
                <p className="text-xs sm:text-sm text-[#B6C6B8] mt-1.5 max-w-md mx-auto">
                  Our management team will contact you shortly regarding the requirements for <strong>{contactInfo.companyName}</strong>.
                </p>
              </div>

              {/* Preview Box */}
              <div className="p-4 rounded-xl bg-[#092820] border border-[#C8A875]/25 text-xs text-[#F4F0E6]/90 space-y-2 font-mono max-h-48 overflow-y-auto">
                <p><span className="text-[#C8A875]">CLIENT:</span> {contactInfo.fullName} ({contactInfo.companyName})</p>
                <p><span className="text-[#C8A875]">CONTACT:</span> {contactInfo.businessEmail} · {contactInfo.phone}</p>
                <p><span className="text-[#C8A875]">CATEGORIES:</span> {categories.join(', ')}</p>
                <p><span className="text-[#C8A875]">VOLUME:</span> {volume}</p>
                <p><span className="text-[#C8A875]">SPECS:</span> {requirements}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#092820] bg-[#F4F0E6] rounded-lg hover:bg-white transition-all cursor-pointer shadow-lg"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied RFQ Summary</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#103C30]" />
                      <span>Copy RFQ Summary</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#F4F0E6] border border-[#C8A875]/40 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                >
                  <span>Close</span>
                </button>
              </div>

              {/* Direct Management Lines */}
              <div className="p-4 rounded-xl bg-[#092820]/70 border border-[#C8A875]/20 text-xs text-[#B6C6B8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-semibold text-[#C8A875]">Immediate Assistance:</span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#F4F0E6] font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#C8A875]">General Manager:</span>
                    <a href="tel:+919980546369" className="hover:text-[#C8A875] py-1 min-h-[44px] inline-flex items-center">
                      +91 9980546369
                    </a>
                    <span>·</span>
                    <a href="mailto:dinesh@thredvision.com" className="hover:text-[#C8A875] py-1 min-h-[44px] inline-flex items-center">
                      dinesh@thredvision.com
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#C8A875]">Corporate Contact:</span>
                    <a href="tel:+918105334689" className="hover:text-[#C8A875] py-1 min-h-[44px] inline-flex items-center">
                      +91 8105334689
                    </a>
                    <span>·</span>
                    <a href="mailto:info@thredvision.com" className="hover:text-[#C8A875] py-1 min-h-[44px] inline-flex items-center">
                      info@thredvision.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
