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
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comments: '',
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);
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

    // Trigger airplane takeoff and receipt printer
    onTransmitStart(
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        comments: formData.comments.trim(),
      },
      buttonCoords
    );

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', comments: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="w-full border border-[#D6D5CF] bg-white dark:bg-[#121211] rounded-3xl p-6 sm:p-8 relative z-10 transition-colors shadow-sm">
      {/* Hidden iframe for Google Forms response capture */}
      <iframe
        name="google_form_submission_frame"
        id="google_form_submission_frame"
        style={{ position: 'absolute', width: 0, height: 0, border: 0, opacity: 0, pointerEvents: 'none' }}
        title="Google Form Submission Frame"
        aria-hidden="true"
      />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E5E1] dark:border-neutral-800 font-sans text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2fb344]/10 text-[#22863a] dark:text-[#38d356] rounded-full text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[#2fb344] animate-pulse" />
            Direct Message Console
          </span>
        </div>
        <span className="text-xs text-[#6D6C66] dark:text-neutral-400 hidden sm:inline font-normal">
          Direct to Dhyandev
        </span>
      </div>

      {submitted ? (
        <div className="py-8 text-center space-y-4 font-sans">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2fb344]/15 text-[#22863a] dark:text-[#38d356] mb-2">
            <Check className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#121211] dark:text-white">
              Message Sent Successfully
            </h3>
            <p className="text-xs sm:text-sm text-[#6D6C66] dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out! Your message was delivered directly to{' '}
              <span className="text-[#121211] dark:text-white font-medium">dhyandevp@proton.me</span>. I will respond within 24 hours.
            </p>
          </div>
          <m.button
            type="button"
            onClick={handleReset}
            whileTap={tapScale}
            whileHover={{ scale: 1.02 }}
            className="mt-4 px-6 py-2.5 rounded-full border border-[#D6D5CF] hover:border-black dark:hover:border-white text-xs sm:text-sm font-sans font-medium bg-white dark:bg-neutral-900 text-black dark:text-white transition-all cursor-pointer shadow-xs"
          >
            Send another message
          </m.button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Field: Full Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-medium">
                <label htmlFor="form-name" className="text-[#121211] dark:text-[#f2f2ef] flex items-center gap-1">
                  <span>Your Name</span>
                  <span className="text-rose-500">*</span>
                </label>
                {errors.name && (
                  <span className="text-rose-500 flex items-center gap-1 text-[11px]">
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
                className="w-full px-5 py-3 bg-[#F9F9F8] dark:bg-[#1a1a19] text-[#121211] dark:text-[#f2f2ef] border border-[#D6D5CF] dark:border-neutral-800 rounded-full font-sans text-sm focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all placeholder:text-[#A09F99]"
              />
            </div>

            {/* Field: Email */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-medium">
                <label htmlFor="form-email" className="text-[#121211] dark:text-[#f2f2ef] flex items-center gap-1">
                  <span>Email Address</span>
                  <span className="text-rose-500">*</span>
                </label>
                {errors.email && (
                  <span className="text-rose-500 flex items-center gap-1 text-[11px]">
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
                className="w-full px-5 py-3 bg-[#F9F9F8] dark:bg-[#1a1a19] text-[#121211] dark:text-[#f2f2ef] border border-[#D6D5CF] dark:border-neutral-800 rounded-full font-sans text-sm focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all placeholder:text-[#A09F99]"
              />
            </div>
          </div>

          {/* Field: Phone Number */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs font-medium text-[#6D6C66] dark:text-neutral-400">
              <label htmlFor="form-phone">
                Phone Number <span className="text-[11px] text-[#A09F99] font-normal">(optional)</span>
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
              className="w-full px-5 py-3 bg-[#F9F9F8] dark:bg-[#1a1a19] text-[#121211] dark:text-[#f2f2ef] border border-[#D6D5CF] dark:border-neutral-800 rounded-full font-sans text-sm focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all placeholder:text-[#A09F99]"
            />
          </div>

          {/* Field: Comments / Paragraph */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs font-medium text-[#121211] dark:text-[#f2f2ef]">
              <label htmlFor="form-comments">Your Message or Project Details</label>
            </div>
            <textarea
              id="form-comments"
              rows={3}
              value={formData.comments}
              onChange={(e) => setFormData((prev) => ({ ...prev, comments: e.target.value }))}
              placeholder="Describe your project, technical questions, or collaboration ideas..."
              enterKeyHint="done"
              className="w-full px-5 py-3.5 bg-[#F9F9F8] dark:bg-[#1a1a19] text-[#121211] dark:text-[#f2f2ef] border border-[#D6D5CF] dark:border-neutral-800 rounded-2xl font-sans text-sm focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all placeholder:text-[#A09F99] resize-none"
            />
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="font-sans text-xs text-[#6D6C66] dark:text-neutral-400">
              Encrypted delivery directly to <span className="text-[#121211] dark:text-neutral-200 font-medium">dhyandevp@proton.me</span>
            </span>

            <m.button
              ref={submitButtonRef}
              id="contact-form-submit-btn"
              type="submit"
              disabled={isTransmitting}
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#121211] dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-full text-xs sm:text-sm font-sans font-medium transition-all shadow-sm cursor-pointer select-none ${
                isTransmitting ? 'opacity-70 pointer-events-none' : ''
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isTransmitting ? 'Sending message...' : 'Send message'}</span>
            </m.button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
