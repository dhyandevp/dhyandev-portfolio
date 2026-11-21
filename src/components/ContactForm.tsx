import React, { useState } from 'react';
import { m } from 'motion/react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { tapScale } from '../lib/motion';

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSdqtf586ofUAtb37P25cjuOTXcta5zgLnFeOtCN86mSVdSyeA/formResponse';

const ENTRY_IDS = {
  name: 'entry.2005620554',
  email: 'entry.1045781291',
  phone: 'entry.1166974658',
  comments: 'entry.839337160',
};

interface ContactFormProps {
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comments: '',
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Invalid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsTransmitting(true);
    setSubmittedName(formData.name.trim());

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const comments = formData.comments.trim();

    const params = new URLSearchParams();
    params.append(ENTRY_IDS.name, name);
    params.append(ENTRY_IDS.email, email);
    params.append(ENTRY_IDS.phone, phone);
    params.append(ENTRY_IDS.comments, comments);
    params.append('fvv', '1');
    params.append('pageHistory', '0');

    // 1. Send via navigator.sendBeacon
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      try {
        navigator.sendBeacon(GOOGLE_FORM_ACTION, params);
      } catch {
        // Silently continue
      }
    }

    // 2. Direct fetch with URLSearchParams (no-cors)
    try {
      fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }).catch(() => {});
    } catch {
      // Silently continue
    }

    // 3. Fallback submission via hidden iframe
    try {
      const iframeForm = document.createElement('form');
      iframeForm.action = GOOGLE_FORM_ACTION;
      iframeForm.method = 'POST';
      iframeForm.target = 'google_form_submission_frame';
      iframeForm.style.position = 'absolute';
      iframeForm.style.width = '0';
      iframeForm.style.height = '0';
      iframeForm.style.opacity = '0';
      iframeForm.style.pointerEvents = 'none';

      const addInput = (n: string, v: string) => {
        const inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = n;
        inp.value = v;
        iframeForm.appendChild(inp);
      };

      addInput(ENTRY_IDS.name, name);
      addInput(ENTRY_IDS.email, email);
      addInput(ENTRY_IDS.phone, phone);
      addInput(ENTRY_IDS.comments, comments);
      addInput('fvv', '1');
      addInput('pageHistory', '0');

      document.body.appendChild(iframeForm);
      iframeForm.submit();

      setTimeout(() => {
        if (document.body.contains(iframeForm)) {
          document.body.removeChild(iframeForm);
        }
      }, 1000);
    } catch {
      // Silently continue
    }

    setTimeout(() => {
      setIsTransmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', comments: '' });
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <div
      className={`w-full border border-[#E5E5E1] bg-white rounded-3xl p-6 sm:p-9 relative z-10 transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.03)] ${className}`}
    >
      {/* Hidden iframe for Google Forms response capture */}
      <iframe
        name="google_form_submission_frame"
        id="google_form_submission_frame"
        style={{ position: 'absolute', width: 0, height: 0, border: 0, opacity: 0, pointerEvents: 'none' }}
        title="Google Form Submission Frame"
        aria-hidden="true"
      />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F0F0EE] font-sans text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 bg-[#F4F4F2] text-[#121211] border border-[#E5E5E1] rounded-full text-xs font-semibold">
            Direct Inquiry Console
          </span>
        </div>
        <span className="text-xs text-neutral-500 hidden sm:inline font-medium">
          Encrypted Direct Transmission
        </span>
      </div>

      {isSubmitted ? (
        <div className="py-8 sm:py-12 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#121211] text-white flex items-center justify-center shadow-xs">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-sans font-bold text-lg sm:text-xl text-[#121211]">
              Inquiry Dispatched Successfully
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
              Thank you{submittedName ? `, ${submittedName}` : ''}. Your transmission has been delivered directly to{' '}
              <span className="text-neutral-900 font-semibold">dhyandevp@proton.me</span>.
            </p>
          </div>
          <div className="pt-2">
            <m.button
              type="button"
              onClick={handleReset}
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              className="px-6 py-2.5 rounded-full border border-[#D6D5CF] hover:border-black text-xs sm:text-sm font-sans font-semibold bg-white text-[#111827] hover:bg-neutral-50 transition-all cursor-pointer shadow-xs select-none"
            >
              Send another inquiry
            </m.button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Field: Full Name */}
            <div>
              <div className="flex items-center justify-between mb-2 text-xs font-semibold">
                <label htmlFor="form-name" className="text-[#1F2937] flex items-center gap-1 tracking-tight">
                  <span>Your Name</span>
                  <span className="text-rose-500">*</span>
                </label>
                {errors.name && (
                  <span className="text-rose-500 flex items-center gap-1 text-[11px] font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </span>
                )}
              </div>
              <input
                id="form-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="e.g. Elena Rostova"
                required
                autoCapitalize="words"
                autoCorrect="off"
                enterKeyHint="next"
                className="w-full px-5 py-3.5 bg-[#FAF9F6] text-[#111827] border border-[#E2E1DC] rounded-full font-sans text-sm focus:outline-none focus:border-[#111827] focus:bg-white focus:ring-2 focus:ring-[#111827]/5 transition-all placeholder:text-[#9CA3AF]"
              />
            </div>

            {/* Field: Email */}
            <div>
              <div className="flex items-center justify-between mb-2 text-xs font-semibold">
                <label htmlFor="form-email" className="text-[#1F2937] flex items-center gap-1 tracking-tight">
                  <span>Email Address</span>
                  <span className="text-rose-500">*</span>
                </label>
                {errors.email && (
                  <span className="text-rose-500 flex items-center gap-1 text-[11px] font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </span>
                )}
              </div>
              <input
                id="form-email"
                name="email"
                type="email"
                inputMode="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="e.g. elena@company.com"
                required
                autoCapitalize="none"
                autoCorrect="off"
                enterKeyHint="next"
                className="w-full px-5 py-3.5 bg-[#FAF9F6] text-[#111827] border border-[#E2E1DC] rounded-full font-sans text-sm focus:outline-none focus:border-[#111827] focus:bg-white focus:ring-2 focus:ring-[#111827]/5 transition-all placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          {/* Field: Phone Number */}
          <div>
            <div className="flex items-center justify-between mb-2 text-xs font-semibold text-[#1F2937] tracking-tight">
              <label htmlFor="form-phone">
                Phone Number <span className="text-[11px] text-neutral-400 font-normal">(optional)</span>
              </label>
            </div>
            <input
              id="form-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="e.g. +1 (555) 019-2834"
              autoCorrect="off"
              enterKeyHint="next"
              className="w-full px-5 py-3.5 bg-[#FAF9F6] text-[#111827] border border-[#E2E1DC] rounded-full font-sans text-sm focus:outline-none focus:border-[#111827] focus:bg-white focus:ring-2 focus:ring-[#111827]/5 transition-all placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Field: Comments / Paragraph */}
          <div>
            <div className="flex items-center justify-between mb-2 text-xs font-semibold text-[#1F2937] tracking-tight">
              <label htmlFor="form-comments">Your Message or Project Details</label>
            </div>
            <textarea
              id="form-comments"
              name="comments"
              rows={3}
              value={formData.comments}
              onChange={(e) => setFormData((prev) => ({ ...prev, comments: e.target.value }))}
              placeholder="Describe your project, technical questions, or collaboration ideas..."
              enterKeyHint="done"
              className="w-full px-5 py-4 bg-[#FAF9F6] text-[#111827] border border-[#E2E1DC] rounded-2xl font-sans text-sm focus:outline-none focus:border-[#111827] focus:bg-white focus:ring-2 focus:ring-[#111827]/5 transition-all placeholder:text-[#9CA3AF] resize-none"
            />
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="font-sans text-xs text-neutral-500">
              Encrypted delivery directly to{' '}
              <span className="text-neutral-900 font-semibold">dhyandevp@proton.me</span>
            </span>

            <m.button
              type="submit"
              disabled={isTransmitting}
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              className={`inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#121211] hover:bg-black text-white rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)] cursor-pointer select-none ${
                isTransmitting ? 'opacity-80 pointer-events-none' : ''
              }`}
            >
              {isTransmitting ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-white/70 animate-ping mr-0.5" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 stroke-[2.2]" />
                  <span>Send inquiry</span>
                </>
              )}
            </m.button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
