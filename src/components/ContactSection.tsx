import React, { useState, Suspense, lazy } from 'react';
import { m } from 'motion/react';
import { DeveloperProfile } from '../types/portfolio';
import { Copy, Check, ArrowUpRight, Mail, Linkedin, Github, Globe } from 'lucide-react';
import { revealVariant, standardViewport, tapScale } from '../lib/motion';
import { ContactForm, TransmissionData } from './ContactForm';
import { FlyingPaperAirplane } from './FlyingPaperAirplane';

const ContactReceipt = lazy(() => import('./ContactReceipt'));

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface ContactSectionProps {
  readonly profile: DeveloperProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copiedProton, setCopiedProton] = useState(false);
  const [pendingTransmission, setPendingTransmission] = useState<TransmissionData | null>(null);
  const [transmission, setTransmission] = useState<TransmissionData | null>(null);
  const [printTrigger, setPrintTrigger] = useState(0);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [flightData, setFlightData] = useState<{
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
  } | null>(null);

  const protonEmail = profile.protonEmail || 'dhyandevp@proton.me';
  const gmailEmail = profile.secondaryEmail || 'dhyandev027@gmail.com';

  const handleCopy = async (text: string) => {
    setCopiedProton(true);
    setTimeout(() => setCopiedProton(false), 2000);

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        // Silently continue
      }
    }
  };

  const handleTransmitStart = (data: TransmissionData, buttonCoords: { x: number; y: number }) => {
    setIsTransmitting(true);
    setIsConfirmed(false);
    // Keep data pending while airplane is flying slowly in the air
    setPendingTransmission(data);

    // Locate the receipt printer slot
    const slotEl = document.getElementById('receipt-printer-slot');
    let targetX = buttonCoords.x + 240;
    let targetY = buttonCoords.y - 180;

    if (slotEl) {
      const rect = slotEl.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + 25; // mouth of the slot
    }

    setFlightData({
      startX: buttonCoords.x,
      startY: buttonCoords.y,
      targetX,
      targetY,
    });
  };

  const handleAirplaneLanded = () => {
    setFlightData(null);
    setIsTransmitting(false);
    setIsConfirmed(true);

    // ONLY when the airplane has safely landed in the receipt slot, pass the data and trigger print!
    if (pendingTransmission) {
      setTransmission(pendingTransmission);
    }
    setPrintTrigger((prev) => prev + 1);
  };

  return (
    <section
      id="reachout"
      className="w-full py-20 md:py-32 border-b border-hairline bg-transparent content-visibility-auto relative"
    >
      {/* Aerodynamic Paper Airplane Flight Animation Overlay */}
      {flightData && (
        <FlyingPaperAirplane
          startX={flightData.startX}
          startY={flightData.startY}
          targetX={flightData.targetX}
          targetY={flightData.targetY}
          onLanded={handleAirplaneLanded}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Row: Headline & Bio on Left, Animated Receipt Slot on Right (Desktop) */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-0">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
            variants={revealVariant}
            className="max-w-3xl space-y-6 pb-2 lg:pb-0"
          >
            <h2 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-[#121211] tracking-tight leading-[1.1]">
              Let's build something exceptional together.
            </h2>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed font-sans">
              As Co-Founder of Wayve Enterprises, I'm available for technical contracting, computer vision architecture,
              full-stack systems engineering, and strategic advisory. Transmit an inquiry through the console below or connect directly.
            </p>
          </m.div>

          {/* Minimal Animated Receipt Slot: Centered on mobile/tablet, right-aligned on desktop */}
          <div className="flex justify-center lg:justify-end shrink-0 relative z-0">
            <Suspense fallback={<div className="w-[220px] lg:w-[240px] h-[280px]" />}>
              <ContactReceipt
                email={protonEmail}
                transmission={transmission}
                printTrigger={printTrigger}
              />
            </Suspense>
          </div>
        </div>

        {/* Custom Transmission Intake Form (Connected to Google Form Backend) */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="mb-8"
        >
          <ContactForm
            onTransmitStart={handleTransmitStart}
            isTransmitting={isTransmitting}
            isConfirmed={isConfirmed}
            onResetConfirmation={() => {
              setIsConfirmed(false);
              setPendingTransmission(null);
            }}
          />
        </m.div>

        {/* Primary Contact Card: Direct Transmission Inboxes */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="p-8 md:p-12 border border-[#E5E5E1] bg-white rounded-3xl mb-12 relative z-10 shadow-sm transition-colors"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-[#F0F0EE]">
            <div className="space-y-4 font-sans">
              <div>
                <span className="block text-xs font-semibold text-[#6D6C66] uppercase tracking-wider mb-1.5">
                  Primary Encrypted Inbox · Proton Mail
                </span>
                <a
                  href={`mailto:${protonEmail}`}
                  onClick={() => handleCopy(protonEmail)}
                  className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-[#121211] hover:opacity-75 transition-opacity"
                >
                  {protonEmail}
                </a>
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#6D6C66] uppercase tracking-wider mb-1.5">
                  Alternate Direct Inbox · Gmail
                </span>
                <a
                  href={`mailto:${gmailEmail}`}
                  className="font-sans text-sm sm:text-base text-[#6D6C66] hover:text-black transition-colors"
                >
                  {gmailEmail}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <m.button
                type="button"
                onClick={() => handleCopy(protonEmail)}
                whileTap={tapScale}
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#D6D5CF] bg-white hover:border-black text-[#121211] text-xs sm:text-sm font-sans font-medium rounded-full transition-all shadow-xs cursor-pointer select-none"
              >
                {copiedProton ? (
                  <>
                    <Check className="w-4 h-4 text-[#22863a]" />
                    <span>Copied Proton address</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#6D6C66]" />
                    <span>Copy proton.me</span>
                  </>
                )}
              </m.button>

              <m.a
                href={`mailto:${protonEmail}?subject=Project%20Inquiry%20-%20Dhyandev%20P.`}
                whileTap={tapScale}
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#121211] hover:bg-black text-white text-xs sm:text-sm font-sans font-medium rounded-full transition-all shadow-xs select-none"
              >
                <Mail className="w-4 h-4" />
                <span>Write an email</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </m.a>
            </div>
          </div>

          {/* SLA & Availability Guarantee */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans text-xs sm:text-sm">
            <div>
              <span className="block text-[11px] font-medium text-[#6D6C66] uppercase tracking-wider mb-1">Response Time</span>
              <span className="text-[#121211] font-semibold">Guaranteed within 24 hours</span>
            </div>
            <div>
              <span className="block text-[11px] font-medium text-[#6D6C66] uppercase tracking-wider mb-1">Contract Format</span>
              <span className="text-[#121211] font-semibold">Remote & Direct Collaboration</span>
            </div>
            <div>
              <span className="block text-[11px] font-medium text-[#6D6C66] uppercase tracking-wider mb-1">Status</span>
              <span className="text-[#121211] font-semibold">Available for Select Projects</span>
            </div>
          </div>
        </m.div>

        {/* Profile Channels Grid */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E5E5E1] divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E1] bg-white rounded-2xl overflow-hidden shadow-xs"
        >
          {/* LinkedIn */}
          <m.a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            whileTap={tapScale}
            className="p-6 flex items-center justify-between hover:bg-[#F9F9F8] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-black" />
              <div>
                <span className="block font-sans font-bold text-sm text-black">LinkedIn</span>
                <span className="block font-sans text-xs text-[#6D6C66]">dhyandev-p</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-black transition-colors" />
          </m.a>

          {/* GitHub */}
          <m.a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            whileTap={tapScale}
            className="p-6 flex items-center justify-between hover:bg-[#F9F9F8] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-black" />
              <div>
                <span className="block font-sans font-bold text-sm text-black">GitHub</span>
                <span className="block font-sans text-xs text-[#6D6C66]">@{profile.handle}</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-black transition-colors" />
          </m.a>

          {/* Instagram */}
          <m.a
            href={profile.instagramUrl || 'https://instagram.com/_.dhyandev._'}
            target="_blank"
            rel="noreferrer"
            whileTap={tapScale}
            className="p-6 flex items-center justify-between hover:bg-[#F9F9F8] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <InstagramIcon className="w-5 h-5 text-black" />
              <div>
                <span className="block font-sans font-bold text-sm text-black">Instagram</span>
                <span className="block font-sans text-xs text-[#6D6C66]">@_.dhyandev._</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-black transition-colors" />
          </m.a>

          {/* Linktree */}
          <m.a
            href={profile.linktreeUrl}
            target="_blank"
            rel="noreferrer"
            whileTap={tapScale}
            className="p-6 flex items-center justify-between hover:bg-[#F9F9F8] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-black" />
              <div>
                <span className="block font-sans font-bold text-sm text-black">Linktree</span>
                <span className="block font-sans text-xs text-[#6D6C66]">DhyandevRTX</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-black transition-colors" />
          </m.a>
        </m.div>
      </div>
    </section>
  );
};

export default ContactSection;
