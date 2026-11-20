import React, { useEffect, useRef } from 'react';
import AirDispatch from '../lib/air-dispatch.js';
import '../styles/air-dispatch.css';

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
  const formRef = useRef<HTMLFormElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const actionRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const formEl = formRef.current;
    const btnEl = buttonRef.current;
    const actionRowEl = actionRowRef.current;
    if (!formEl || !btnEl) return;

    const ad = AirDispatch.init({
      form: formEl,
      button: btnEl,
      apronAfter: actionRowEl || btnEl,
      align: 'button',
      validate: true,
      accent: '#1E1E1D',
      receipt: {
        company: 'WAYVE ENTERPRISES',
        destination: 'dhyandevp@proton.me',
        number: 28,
        peek: 0,
        autoDismiss: 3200,
        rows: [
          { label: 'NAME', field: 'name' },
          { label: 'EMAIL', field: 'email' },
          { label: 'PHONE', field: 'phone', fallback: 'N/A' },
        ],
      },
      send: async (data, form) => {
        // Test simulation: ?fail in URL triggers failure state
        if (typeof window !== 'undefined' && window.location.search.includes('fail')) {
          await new Promise((r) => setTimeout(r, 1200));
          throw new Error('Simulated failure');
        }

        const name = (data.name || (form.elements.namedItem('name') as HTMLInputElement)?.value || '').trim();
        const email = (data.email || (form.elements.namedItem('email') as HTMLInputElement)?.value || '').trim();
        const phone = (data.phone || (form.elements.namedItem('phone') as HTMLInputElement)?.value || '').trim();
        const comments = (
          data.comments ||
          data.message ||
          (form.elements.namedItem('comments') as HTMLTextAreaElement)?.value ||
          ''
        ).trim();

        const params = new URLSearchParams();
        params.append(ENTRY_IDS.name, name);
        params.append(ENTRY_IDS.email, email);
        params.append(ENTRY_IDS.phone, phone);
        params.append(ENTRY_IDS.comments, comments);
        params.append('fvv', '1');
        params.append('pageHistory', '0');

        // 1. Send via navigator.sendBeacon (instant background delivery)
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          try {
            navigator.sendBeacon(GOOGLE_FORM_ACTION, params);
          } catch {
            // Ignore
          }
        }

        // 2. Fetch with no-cors (application/x-www-form-urlencoded)
        try {
          await fetch(GOOGLE_FORM_ACTION, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
          });
        } catch (err) {
          if (typeof navigator !== 'undefined' && !navigator.onLine) {
            throw err;
          }
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
          // Ignore
        }
      },
    });

    const handleDelivered = () => {
      formEl.reset();
    };
    formEl.addEventListener('airdispatch:delivered', handleDelivered);

    return () => {
      formEl.removeEventListener('airdispatch:delivered', handleDelivered);
      ad.destroy();
    };
  }, []);

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
          Google Forms Relay // Air-Dispatch
        </span>
      </div>

      <form id="contact-form" ref={formRef} className="space-y-5 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Field: Full Name */}
          <div>
            <div className="flex items-center justify-between mb-2 text-xs font-semibold">
              <label htmlFor="form-name" className="text-[#1F2937] flex items-center gap-1 tracking-tight">
                <span>Your Name</span>
                <span className="text-rose-500">*</span>
              </label>
            </div>
            <input
              id="form-name"
              name="name"
              type="text"
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
            </div>
            <input
              id="form-email"
              name="email"
              type="email"
              inputMode="email"
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
            placeholder="Describe your project, technical questions, or collaboration ideas..."
            enterKeyHint="done"
            className="w-full px-5 py-4 bg-[#FAF9F6] text-[#111827] border border-[#E2E1DC] rounded-2xl font-sans text-sm focus:outline-none focus:border-[#111827] focus:bg-white focus:ring-2 focus:ring-[#111827]/5 transition-all placeholder:text-[#9CA3AF] resize-none"
          />
        </div>

        {/* Action Row */}
        <div
          ref={actionRowRef}
          id="contact-form-action-row"
          className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <span className="font-sans text-xs text-neutral-500">
            Encrypted delivery directly to{' '}
            <span className="text-neutral-900 font-semibold">dhyandevp@proton.me</span>
          </span>

          <button
            ref={buttonRef}
            id="send"
            type="submit"
            className="relative overflow-hidden inline-flex items-center justify-center min-w-[210px] px-8 py-3.5 bg-[#121211] hover:bg-black text-white rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)] cursor-pointer select-none"
          >
            <span className="ad-label">Send inquiry</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
