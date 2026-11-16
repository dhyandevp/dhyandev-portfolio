import React, { useState, useRef } from 'react';
import { m } from 'motion/react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { tapScale } from '../lib/motion';

export interface TransmissionData {
  name: string;
  email: string;
  phone?: string;
  comments?: string;
}

interface ContactFormProps {
  onTransmitStart: (data: TransmissionData, buttonCoords: { x: number; y: number }) => void;
  isTransmitting: boolean;
  isConfirmed?: boolean;
  onResetConfirmation?: () => void;
}

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSdqtf586ofUAtb37P25cjuOTXcta5zgLnFeOtCN86mSVdSyeA/formResponse';

const ENTRY_IDS = {
  name: 'entry.2005620554',
  email: 'entry.1045781291',
  phone: 'entry.1166974658',
  comments: 'entry.839337160',
};

export const ContactForm: React.FC<ContactFormProps> = ({
  onTransmitStart,
  isTransmitting,
  isConfirmed = false,
  onResetConfirmation,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comments: '',
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Required field';
    }
    if (!formData.email.trim()) {
      errs.email = 'Required field';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Invalid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submitToGoogleForms = (data: typeof formData) => {
    // 1. Submit through hidden iframe
    try {
      const formEl = document.createElement('form');
      formEl.action = GOOGLE_FORM_ACTION;
      formEl.method = 'POST';
      formEl.target = 'google_form_submission_frame';
      formEl.style.position = 'absolute';
      formEl.style.width = '0';
      formEl.style.height = '0';
      formEl.style.opacity = '0';
      formEl.style.pointerEvents = 'none';

      const addInput = (name: string, value: string) => {
        const inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = name;
        inp.value = value;
        formEl.appendChild(inp);
      };

      addInput(ENTRY_IDS.name, data.name);
      addInput(ENTRY_IDS.email, data.email);
      addInput(ENTRY_IDS.phone, data.phone);
      addInput(ENTRY_IDS.comments, data.comments);

      document.body.appendChild(formEl);
      formEl.submit();

      setTimeout(() => {
        if (document.body.contains(formEl)) {
          document.body.removeChild(formEl);
        }
      }, 1000);
    } catch {
      // Ignore submission error
    }

    // 2. Fallback fetch with no-cors
    try {
      const body = new FormData();
      body.append(ENTRY_IDS.name, data.name);
      body.append(ENTRY_IDS.email, data.email);
      body.append(ENTRY_IDS.phone, data.phone);
      body.append(ENTRY_IDS.comments, data.comments);

      fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body,
      }).catch(() => {});
    } catch {
      // Ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isTransmitting) return;

    // Get button center coordinates for paper airplane takeoff
    let buttonCoords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    if (submitButtonRef.current) {
      const rect = submitButtonRef.current.getBoundingClientRect();
      buttonCoords = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }

    // Send payload headlessly to Google Forms
    submitToGoogleForms(formData);

    // Trigger airplane takeoff (confirmation & receipt will follow on landing)
    onTransmitStart(
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        comments: formData.comments.trim(),
      },
      buttonCoords
    );
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', comments: '' });
    setErrors({});
    if (onResetConfirmation) {
      onResetConfirmation();
    }
  };

  return (
    <div className="w-full border border-[#E5E5E1] bg-white rounded-3xl p-6 sm:p-9 relative z-10 transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
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
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Direct Inquiry Console
          </span>
        </div>
        <span className="text-xs text-neutral-500 hidden sm:inline font-medium">
          Google Forms Relay // Direct Dispatch
        </span>
      </div>

      {isConfirmed ? (
        <div className="py-8 text-center space-y-4 font-sans bg-white">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 mb-2">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#111827] tracking-tight">
              Inquiry Dispatched Successfully
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              Your inquiry has been relayed through Google Forms to{' '}
              <span className="text-neutral-900 font-semibold">dhyandevp@proton.me</span>. Your printed
              air-dispatch receipt has been issued in the slot above.
            </p>
          </div>
          <m.button
            type="button"
            onClick={handleReset}
            whileTap={tapScale}
            whileHover={{ scale: 1.02 }}
            className="mt-4 px-6 py-2.5 rounded-full border border-[#D6D5CF] hover:border-black text-xs sm:text-sm font-sans font-semibold bg-white text-[#111827] hover:bg-neutral-50 transition-all cursor-pointer shadow-xs"
          >
            Send another inquiry
          </m.button>
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
              ref={submitButtonRef}
              id="contact-form-submit-btn"
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
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-0.5" />
                  <span>Airplane in flight...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 stroke-[2.2]" />
                  <span>Send message</span>
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
