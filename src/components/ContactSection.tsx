import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, AlertCircle, FileText, Clock, Sparkles, Instagram, ArrowUpRight, Loader2 } from 'lucide-react';
import { RfqFormData, RfqFormErrors } from '../types';
import { BrandLogo } from './BrandLogo';
import { RevealOnScroll } from './RevealOnScroll';
import { CONTACT_PHOTO } from '../data/photos';
import { TiltCard } from './motion/TiltCard';
import { WhatsAppButton } from './WhatsAppButton';

interface ContactSectionProps {
  preSelectedCategory?: string;
  onNavClick: (sectionId: string) => void;
  onOpenLeadModal?: () => void;
  onOpenCompanyProfile?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preSelectedCategory,
  onNavClick,
  onOpenLeadModal,
  onOpenCompanyProfile,
}) => {
  const [formData, setFormData] = useState<RfqFormData>({
    fullName: '',
    companyName: '',
    businessEmail: '',
    phone: '',
    selectedCategories: preSelectedCategory ? [preSelectedCategory] : ['T-shirts and polos'],
    orderQuantity: '10,000 - 25,000 pcs (Standard Bulk Production)',
    requirements: '',
  });

  const [errors, setErrors] = useState<RfqFormErrors>({});
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [botcheck, setBotcheck] = useState<string>('');

  useEffect(() => {
    if (preSelectedCategory && !formData.selectedCategories.includes(preSelectedCategory)) {
      setFormData((prev) => ({
        ...prev,
        selectedCategories: [...prev.selectedCategories, preSelectedCategory],
      }));
    }
  }, [preSelectedCategory]);

  const categoryOptions = [
    'T-shirts and polos',
    'Formal shirts',
    'Casual shirts',
    'Trousers',
    'Jeans',
    'Jackets',
    'Shorts',
    'Tops and blouses',
    'Dresses',
    'Skirts',
    'Pants & Trousers (Women)',
    'Kurtis',
    'Leggings',
  ];

  const quantityOptions = [
    '10,000 - 25,000 pcs (Minimum Production Run)',
    '25,000 - 1,00,000 pcs (High-Volume Scale)',
    '1,00,000 - 2,00,000 pcs (Maximum Scale / 2 Lakhs)',
  ];

  const toggleCategory = (cat: string) => {
    setFormData((prev) => {
      const exists = prev.selectedCategories.includes(cat);
      if (exists) {
        if (prev.selectedCategories.length === 1) return prev;
        return {
          ...prev,
          selectedCategories: prev.selectedCategories.filter((c) => c !== cat),
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...prev.selectedCategories, cat],
        };
      }
    });
  };

  const validate = (): boolean => {
    const newErrors: RfqFormErrors = {};
    let firstErrorField: string | null = null;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      if (!firstErrorField) firstErrorField = 'fullName';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      if (!firstErrorField) firstErrorField = 'companyName';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required';
      if (!firstErrorField) firstErrorField = 'businessEmail';
    } else if (!emailRegex.test(formData.businessEmail.trim())) {
      newErrors.businessEmail = 'Please provide a valid corporate email';
      if (!firstErrorField) firstErrorField = 'businessEmail';
    }

    const rawPhone = formData.phone.trim();
    const cleanDigits = rawPhone.replace(/\D/g, '');
    const is10DigitIndian =
      (cleanDigits.length === 10 && /^[6-9]\d{9}$/.test(cleanDigits)) ||
      (cleanDigits.length === 12 && cleanDigits.startsWith('91') && /^[6-9]\d{9}$/.test(cleanDigits.slice(2))) ||
      (cleanDigits.length === 11 && cleanDigits.startsWith('0') && /^[6-9]\d{9}$/.test(cleanDigits.slice(1)));

    if (!rawPhone) {
      newErrors.phone = 'Telephone / WhatsApp is required';
      if (!firstErrorField) firstErrorField = 'phone';
    } else if (!is10DigitIndian) {
      newErrors.phone = 'Please provide a valid 10-digit phone number (optional +91)';
      if (!firstErrorField) firstErrorField = 'phone';
    }

    if (formData.selectedCategories.length === 0) {
      newErrors.selectedCategories = ['Please select at least one garment category'];
      if (!firstErrorField) firstErrorField = 'garmentCategory';
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Project requirements and timeline are required';
      if (!firstErrorField) firstErrorField = 'requirements';
    }

    setErrors(newErrors);

    if (firstErrorField) {
      const el = document.getElementById(firstErrorField);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          el.focus();
        }
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const constructEmailBody = (): string => {
    return `THRED VISION — B2B APPAREL MANUFACTURING INQUIRY (RFQ)

Contact Information:
- Full Name: ${formData.fullName}
- Company: ${formData.companyName}
- Business Email: ${formData.businessEmail}
- Telephone / WhatsApp: ${formData.phone}

Production Requirements:
- Garment Categories: ${formData.selectedCategories.join(', ')}
- Estimated Order Quantity: ${formData.orderQuantity || 'Not selected'}

Project Scope & Fabric Notes:
${formData.requirements}

---
Inquiry submitted via THRED VISION Web Portal (Ganjimutt, Karnataka Facility)`;
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      if (botcheck) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        return;
      }

      const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;

      if (!endpoint) {
        throw new Error(
          'Google Sheets endpoint is missing. Add VITE_GOOGLE_SHEETS_WEB_APP_URL to your .env file.'
        );
      }

      const payload = {
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim(),
        businessEmail: formData.businessEmail.trim(),
        phone: formData.phone.trim(),
        categories: formData.selectedCategories.join(', '),
        volume: formData.orderQuantity?.trim() || 'Not selected',
        requirements: formData.requirements.trim(),
        botcheck: '',
      };

      // Apps Script web apps often do not expose cross-origin responses to the
      // browser. no-cors allows the POST, but means the browser cannot confirm
      // whether the script saved the row or sent the notification email.
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        },
        body: JSON.stringify(payload),
      });

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        businessEmail: '',
        phone: '',
        selectedCategories: ['T-shirts and polos'],
        orderQuantity: '10,000 - 25,000 pcs (Standard Bulk Production)',
        requirements: '',
      });
      setErrors({});
    } catch (error) {
      console.error('[Google Sheets RFQ Submission Error]', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!validate()) return;
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
    <section
      id="contact"
      className="relative w-full bg-[#092820] text-[#F4F0E6] pt-24 sm:pt-32 pb-16 overflow-hidden"
    >
      {/* Real Industrial Manufacturing Backdrop Photo with Dark Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={CONTACT_PHOTO.url}
          alt={CONTACT_PHOTO.alt}
          loading="lazy"
          className="w-full h-full object-cover opacity-18 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#092820] via-[#092820]/95 to-[#092820]" />
      </div>

      {/* Background Linen Weave & Glows */}
      <div className="absolute inset-0 bg-dark-linen-weave opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#103C30] rounded-full blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Staged Scroll Reveal */}
        <RevealOnScroll delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 py-1 px-3.5 rounded-full bg-[#103C30] border border-[#C8A875]/30 mb-4 shadow-sm">
                <BrandLogo layout="icon-only" size="sm" variant="light" className="shrink-0" />
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#C8A875] uppercase">
                  <span>COMMERCIAL INQUIRIES</span>
                  <span aria-hidden="true" className="text-[#C8A875]/40">·</span>
                  <span>DIRECT PRODUCTION DESK</span>
                </div>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F0E6] leading-[1.1] mb-6">
                Let&apos;s Build Something Exceptional.
              </h2>

              <p className="text-lg sm:text-xl text-[#F4F0E6]/85 leading-relaxed font-normal">
                Tell us about your apparel manufacturing requirements. Let&apos;s explore how THRED VISION can support your next collection.
              </p>
            </div>

            {/* Guided Lead Form Modal Trigger */}
            {onOpenLeadModal && (
              <button
                type="button"
                onClick={onOpenLeadModal}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-[#092820] bg-[#C8A875] rounded-xl hover:bg-[#F4F0E6] transition-all cursor-pointer shadow-lg self-start md:self-auto shrink-0"
              >
                <Sparkles className="w-4 h-4 text-[#092820]" />
                <span>Start Step-by-Step Guided RFQ</span>
              </button>
            )}
          </div>
        </RevealOnScroll>

        {/* Two-Column Grid: RFQ Form Left, Verified Contacts Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Inquiry Form Column with Scroll Reveal */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={200}>
              <div className="bg-[#103C30]/90 rounded-2xl border border-[#C8A875]/25 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-6 border-b border-[#C8A875]/20 mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F4F0E6]">
                      Request for Quotation (RFQ)
                    </h3>
                    <p className="text-xs text-[#B6C6B8] mt-1">
                      Structured garment manufacturing specification builder
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#092820] bg-[#C8A875] font-bold px-3 py-1 rounded">
                    B2B DIRECT
                  </span>
                </div>

                <form onSubmit={handleSendInquiry} className="space-y-6" noValidate>
                  {/* Row 1: Name and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-medium text-[#C8A875] uppercase tracking-wider mb-2">
                        Full Name <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                          if (submitStatus !== 'idle') setSubmitStatus('idle');
                        }}
                        placeholder="e.g. Subhash K."
                        className={`w-full px-4 py-3 bg-[#092820] border rounded-lg text-sm text-[#F4F0E6] placeholder-[#F4F0E6]/30 focus:outline-none transition-colors ${
                          errors.fullName
                            ? 'border-[#E53935] focus:border-[#E53935]'
                            : 'border-[#C8A875]/30 focus:border-[#C8A875]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block text-xs font-medium text-[#C8A875] uppercase tracking-wider mb-2">
                        Company Name <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => {
                          setFormData({ ...formData, companyName: e.target.value });
                          if (errors.companyName) setErrors({ ...errors, companyName: undefined });
                          if (submitStatus !== 'idle') setSubmitStatus('idle');
                        }}
                        placeholder="e.g. Fashion Brand Retail"
                        className={`w-full px-4 py-3 bg-[#092820] border rounded-lg text-sm text-[#F4F0E6] placeholder-[#F4F0E6]/30 focus:outline-none transition-colors ${
                          errors.companyName
                            ? 'border-[#E53935] focus:border-[#E53935]'
                            : 'border-[#C8A875]/30 focus:border-[#C8A875]'
                        }`}
                      />
                      {errors.companyName && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.companyName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="businessEmail" className="block text-xs font-medium text-[#C8A875] uppercase tracking-wider mb-2">
                        Business Email <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="email"
                        id="businessEmail"
                        value={formData.businessEmail}
                        onChange={(e) => {
                          setFormData({ ...formData, businessEmail: e.target.value });
                          if (errors.businessEmail) setErrors({ ...errors, businessEmail: undefined });
                          if (submitStatus !== 'idle') setSubmitStatus('idle');
                        }}
                        placeholder="procurement@company.com"
                        className={`w-full px-4 py-3 bg-[#092820] border rounded-lg text-sm text-[#F4F0E6] placeholder-[#F4F0E6]/30 focus:outline-none transition-colors ${
                          errors.businessEmail
                            ? 'border-[#E53935] focus:border-[#E53935]'
                            : 'border-[#C8A875]/30 focus:border-[#C8A875]'
                        }`}
                      />
                      {errors.businessEmail && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.businessEmail}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-[#C8A875] uppercase tracking-wider mb-2">
                        Telephone / WhatsApp <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                          if (submitStatus !== 'idle') setSubmitStatus('idle');
                        }}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 bg-[#092820] border rounded-lg text-sm text-[#F4F0E6] placeholder-[#F4F0E6]/30 focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-[#E53935] focus:border-[#E53935]'
                            : 'border-[#C8A875]/30 focus:border-[#C8A875]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Garment Categories Multi-Select */}
                  <div id="garmentCategory">
                    <label className="block text-xs font-medium text-[#C8A875] uppercase tracking-wider mb-2.5">
                      Garment Category (Select All Applicable) <span className="text-[#E53935]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categoryOptions.map((cat) => {
                        const isSelected = formData.selectedCategories.includes(cat);
                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => {
                              toggleCategory(cat);
                              if (errors.selectedCategories) setErrors({ ...errors, selectedCategories: undefined });
                              if (submitStatus !== 'idle') setSubmitStatus('idle');
                            }}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#C8A875] text-[#092820] shadow-sm'
                                : 'bg-[#092820] text-[#F4F0E6]/80 border border-[#C8A875]/30 hover:border-[#C8A875]'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                    {errors.selectedCategories && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.selectedCategories[0]}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 4: Estimated Order Quantity */}
                  <div>
                    <label className="block text-xs font-medium text-[#C8A875] uppercase tracking-wider mb-2.5">
                      Estimated Order Quantity
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {quantityOptions.map((qty) => {
                        const isSelected = formData.orderQuantity === qty;
                        return (
                          <button
                            type="button"
                            key={qty}
                            onClick={() => {
                              setFormData({ ...formData, orderQuantity: qty });
                              if (submitStatus !== 'idle') setSubmitStatus('idle');
                            }}
                            className={`p-3 text-left rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#F4F0E6] text-[#092820] border-[#F4F0E6] shadow-sm'
                                : 'bg-[#092820] text-[#F4F0E6]/80 border-[#C8A875]/30 hover:border-[#C8A875]'
                            }`}
                          >
                            {qty}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 5: Project Requirements */}
                  <div>
                    <label htmlFor="requirements" className="block text-xs font-medium text-[#C8A875] uppercase tracking-wider mb-2">
                      Project Requirements &amp; Target Timeline <span className="text-[#E53935]">*</span>
                    </label>
                    <textarea
                      id="requirements"
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => {
                        setFormData({ ...formData, requirements: e.target.value });
                        if (errors.requirements) setErrors({ ...errors, requirements: undefined });
                        if (submitStatus !== 'idle') setSubmitStatus('idle');
                      }}
                      placeholder="Detail desired fabrics (e.g. 100% bio-wash cotton pique, 12oz denim), delivery window, target specs, or custom branding requirements..."
                      className={`w-full px-4 py-3 bg-[#092820] border rounded-lg text-sm text-[#F4F0E6] placeholder-[#F4F0E6]/30 focus:outline-none transition-colors ${
                        errors.requirements
                          ? 'border-[#E53935] focus:border-[#E53935]'
                          : 'border-[#C8A875]/30 focus:border-[#C8A875]'
                      }`}
                    />
                    {errors.requirements && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.requirements}</span>
                      </p>
                    )}
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

                  {/* Submission Status Alerts */}
                  {submitStatus === 'success' && (
                    <div
                      role="status"
                      className="p-4 rounded-xl bg-[#092820] border border-emerald-500/50 text-sm text-emerald-300 leading-relaxed flex items-start gap-3 shadow-md"
                    >
                      <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-medium">
                        Thank you! Your RFQ has been received. Our team will contact you shortly.
                      </span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-[#092820] border border-[#E53935]/50 text-sm text-red-300 leading-relaxed flex items-start gap-3 shadow-md"
                    >
                      <AlertCircle className="w-5 h-5 text-[#E53935] shrink-0 mt-0.5" />
                      <span className="font-medium">
                        Something went wrong. Please call us or message us on WhatsApp.
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold text-[#092820] bg-[#F4F0E6] rounded-lg hover:bg-white transition-all cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#103C30]" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#103C30]" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-[#F4F0E6] border border-[#C8A875]/40 rounded-lg hover:bg-[#092820] hover:border-[#C8A875] transition-all cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Copied RFQ Draft</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#C8A875]" />
                          <span>Copy RFQ Summary</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Clear Informative Disclaimer */}
                  <div className="p-4 rounded-xl bg-[#092820] border border-[#C8A875]/20 text-xs text-[#B6C6B8] leading-relaxed flex items-start gap-3">
                    <FileText className="w-4 h-4 text-[#C8A875] shrink-0 mt-0.5" />
                    <span>
                      <strong>Send Inquiry</strong> submits your RFQ to our enquiry system, where it is recorded in Google Sheets and an email notification is sent to <strong>info@thredvision.com</strong>. You may also copy the structured draft for your records.
                    </span>
                  </div>
                </form>
              </div>
            </RevealOnScroll>
          </div>

          {/* Verified Contact Details Column (from PDF) */}
          <div className="lg:col-span-5 space-y-6">
            <RevealOnScroll delay={300}>
              <div>
                <h3 className="text-2xl font-bold text-[#F4F0E6] mb-2">
                  Executive &amp; Plant Directory
                </h3>
                <p className="text-sm text-[#F4F0E6]/75 leading-relaxed font-normal">
                  Direct contacts for THRED VISION leadership and plant operations in Ganjimutt, Karnataka.
                </p>
              </div>
            </RevealOnScroll>

            {/* Leadership Contact Cards */}
            <RevealOnScroll delay={350}>
              <TiltCard maxTilt={5}>
                <div className="p-6 rounded-xl bg-[#103C30] border border-[#C8A875]/25 space-y-4 shadow-md">
                  <span className="text-xs uppercase tracking-widest text-[#C8A875] font-bold block">
                    DIRECT MANAGEMENT DESK
                  </span>

                  <div className="space-y-4 divide-y divide-[#F4F0E6]/10">
                    {/* Managing Director Group */}
                    <div className="pt-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#C8A875] font-semibold block mb-2">
                        Managing Director
                      </span>
                      <div className="space-y-3 font-mono text-xs sm:text-sm text-[#F4F0E6]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-bold text-sm sm:text-base font-sans text-[#F4F0E6]">Subhash N</span>
                          <a
                            href="mailto:info@thredvision.com"
                            className="inline-flex items-center text-[#F4F0E6]/90 hover:text-[#C8A875] transition-colors py-1 min-h-[44px] sm:min-h-0"
                          >
                            subhash@thredvision.com
                          </a>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-bold text-sm sm:text-base font-sans text-[#F4F0E6]">Sandesh N</span>
                          <a
                            href="mailto:sandesh@thredvision.com"
                            className="inline-flex items-center text-[#F4F0E6]/90 hover:text-[#C8A875] transition-colors py-1 min-h-[44px] sm:min-h-0"
                          >
                            sandesh@thredvision.com
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* General Manager Group */}
                    <div className="pt-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#C8A875] font-semibold block mb-2">
                        General Manager
                      </span>
                      <div className="space-y-2 font-mono text-xs sm:text-sm text-[#F4F0E6]">
                        <span className="font-bold text-sm sm:text-base font-sans text-[#F4F0E6] block">
                          Dinesh Chandra
                        </span>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-0.5">
                          <a
                            href="tel:+919980546369"
                            className="inline-flex items-center text-[#F4F0E6]/90 hover:text-[#C8A875] transition-colors py-1 min-h-[44px] sm:min-h-0"
                          >
                            +91 9980546369
                          </a>
                          <span className="hidden sm:inline text-[#C8A875]/40" aria-hidden="true">·</span>
                          <a
                            href="mailto:dinesh@thredvision.com"
                            className="inline-flex items-center text-[#F4F0E6]/90 hover:text-[#C8A875] transition-colors py-1 min-h-[44px] sm:min-h-0"
                          >
                            dinesh@thredvision.com
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Corporate Inquiries */}
                    <div className="pt-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#C8A875] font-semibold block mb-1">
                        Corporate Inquiries
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-0.5">
                          <a
                            href="tel:+919980546369"
                            className="inline-flex items-center text-[#F4F0E6]/90 hover:text-[#C8A875] transition-colors py-1 min-h-[44px] sm:min-h-0"
                          >
                            +91 9980546369
                          </a>
                          <span className="hidden sm:inline text-[#C8A875]/40" aria-hidden="true">·</span>
                          <a
                            href="mailto:dinesh@thredvision.com"
                            className="inline-flex items-center text-[#F4F0E6]/90 hover:text-[#C8A875] transition-colors py-1 min-h-[44px] sm:min-h-0"
                          >
                            dinesh@thredvision.com
                          </a>
                        </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>

            {/* Registered Factory Location */}
            <RevealOnScroll delay={400}>
              <TiltCard maxTilt={4}>
                <div className="p-6 rounded-xl bg-[#103C30] border border-[#C8A875]/25 space-y-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-[#C8A875] font-bold">
                      <MapPin className="w-4 h-4 text-[#C8A875]" />
                      <span>Manufacturing Plant Location</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#F4F0E6]/75 bg-[#092820] px-2 py-0.5 rounded border border-[#C8A875]/20">
                      GANJIMUTT
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#F4F0E6]">
                      THRED VISION GARMENTS
                    </p>
                    <p className="text-xs sm:text-sm text-[#F4F0E6]/80 mt-1 leading-relaxed">
                      Hobli Gurpura, No 11 P1-A, SIDCO Industrial Estate EPIP Phase 1, Badagaulipady Village, Ganjimutt, Dakshina Kannada, Karnataka, India - 574144
                    </p>
                    <p className="text-xs text-[#B6C6B8] mt-2 font-mono">
                      Strategically positioned along the Bangalore Highway
                    </p>
                  </div>

                  {/* Visible and Clickable Google Maps Item */}
                  <a
                    href="https://www.google.com/maps/place/Thred+Vision/@12.9700991,74.9533976,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba357604b87a775:0xe2e254fd46e39ee8!8m2!3d12.9700939!4d74.9559725!16s%2Fg%2F11s8c03ymq?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View THRED VISION on Google Maps"
                    className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-[#092820] border border-[#C8A875]/30 hover:border-[#C8A875] text-[#F4F0E6] hover:text-[#C8A875] transition-all group/maps shadow-xs cursor-pointer block"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-md bg-[#103C30] border border-[#C8A875]/30 text-[#C8A875] group-hover/maps:scale-110 transition-transform shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-[#C8A875]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-[#C8A875] tracking-wider uppercase block">
                          VIEW ON GOOGLE MAPS
                        </span>
                        <p className="text-xs text-[#F4F0E6]/90 group-hover/maps:text-[#F4F0E6] mt-0.5 leading-snug">
                          THRED VISION, SIDCO Industrial Estate, Ganjimutt, Mangalore, Karnataka
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#C8A875] group-hover/maps:translate-x-0.5 group-hover/maps:-translate-y-0.5 transition-transform shrink-0" />
                  </a>
                </div>
              </TiltCard>
            </RevealOnScroll>

            {/* Official Instagram Profile Item */}
            <RevealOnScroll delay={430}>
              <a
                href="https://www.instagram.com/thredvision?utm_source=qr&srtk=eTcxdHVpNTloZWY5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow THRED VISION on Instagram @thredvision"
                className="p-6 rounded-xl bg-[#103C30] border border-[#C8A875]/25 hover:border-[#C8A875] transition-all group/insta shadow-md block text-[#F4F0E6] cursor-pointer"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-2.5 rounded-lg bg-[#092820] border border-[#C8A875]/30 text-[#C8A875] group-hover/insta:scale-110 transition-transform shrink-0">
                      <Instagram className="w-5 h-5 text-[#C8A875]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-[#C8A875] tracking-wider uppercase block">
                        FOLLOW US ON INSTAGRAM
                      </span>
                      <p className="text-base font-bold text-[#F4F0E6] group-hover/insta:text-[#C8A875] transition-colors mt-0.5">
                        @thredvision
                      </p>
                      <p className="text-xs text-[#B6C6B8]">
                        Official updates, factory life &amp; apparel manufacturing highlights
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#C8A875] group-hover/insta:translate-x-0.5 group-hover/insta:-translate-y-0.5 transition-transform shrink-0" />
                </div>
              </a>
            </RevealOnScroll>

            {/* Operating Hours & Dispatch Notice */}
            <RevealOnScroll delay={450}>
              <div className="p-5 rounded-xl bg-[#092820] border border-[#C8A875]/20 flex items-center gap-4 text-xs text-[#B6C6B8]">
                <Clock className="w-5 h-5 text-[#C8A875] shrink-0" />
                <div>
                  <span className="text-[#F4F0E6] font-semibold block">Plant Working Hours</span>
                  <span>Monday – Saturday, 09:00 AM to 06:30 PM IST · Regular sampling reviews</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Polished Footer */}
        <footer className="pt-12 border-t border-[#C8A875]/25 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#B6C6B8]">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <BrandLogo variant="light" showTagline={true} size="md" />
            <span className="hidden sm:inline text-[#C8A875]" aria-hidden="true">·</span>
            <span>Ready-Made Garment Manufacturer · Ganjimutt, Karnataka</span>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => onNavClick('about')}
              className="hover:text-[#C8A875] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavClick('products')}
              className="hover:text-[#C8A875] transition-colors cursor-pointer"
            >
              Capabilities
            </button>
            <button
              onClick={() => onNavClick('manufacturing')}
              className="hover:text-[#C8A875] transition-colors cursor-pointer"
            >
              Manufacturing
            </button>
            <button
              onClick={() => onNavClick('contact')}
              className="hover:text-[#C8A875] transition-colors cursor-pointer"
            >
              Contact
            </button>
            <a
              href="/THRED%20VISION%20PROFILE-2(2).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8A875] hover:underline font-semibold transition-colors cursor-pointer"
            >
              Company Profile PDF
            </a>
            <a
              href="https://www.instagram.com/thredvision?utm_source=qr&srtk=eTcxdHVpNTloZWY5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C8A875] hover:text-[#F4F0E6] transition-colors cursor-pointer"
              aria-label="Instagram @thredvision"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@thredvision</span>
            </a>
            <WhatsAppButton variant="footer" showText={true} />
          </nav>

          <div className="text-center md:text-right font-mono text-[11px] text-[#B6C6B8]/75">
            © 2022 THRED VISION. All rights reserved.
          </div>
        </footer>
      </div>
    </section>
  );
};
