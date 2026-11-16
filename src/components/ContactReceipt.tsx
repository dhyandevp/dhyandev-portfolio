import React, { useState, useEffect, useRef, useCallback } from 'react';
import { printerAudio } from '../lib/printerSound';

export interface TransmissionData {
  name: string;
  email: string;
  phone?: string;
  comments?: string;
}

export interface ContactReceiptProps {
  email?: string;
  orderNumber?: number;
  transmission?: TransmissionData | null;
  printTrigger?: number;
}

const ZIGZAG_CLIP =
  'polygon(0% 4px, 2.5% 0px, 5% 4px, 7.5% 0px, 10% 4px, 12.5% 0px, 15% 4px, 17.5% 0px, 20% 4px, 22.5% 0px, 25% 4px, 27.5% 0px, 30% 4px, 32.5% 0px, 35% 4px, 37.5% 0px, 40% 4px, 42.5% 0px, 45% 4px, 47.5% 0px, 50% 4px, 52.5% 0px, 55% 4px, 57.5% 0px, 60% 4px, 62.5% 0px, 65% 4px, 67.5% 0px, 70% 4px, 72.5% 0px, 75% 4px, 77.5% 0px, 80% 4px, 82.5% 0px, 85% 4px, 87.5% 0px, 90% 4px, 92.5% 0px, 95% 4px, 97.5% 0px, 100% 4px, 100% 100%, 0% 100%)';

export const ContactReceipt: React.FC<ContactReceiptProps> = ({
  email = 'dhyandevp@proton.me',
  orderNumber: initialOrder = 27,
  transmission = null,
  printTrigger = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [orderNumber, setOrderNumber] = useState(initialOrder);

  // Animation lifecycle stage: 'idle' | 'printing' | 'settling' | 'ready' | 'tearing' | 'waiting'
  const [stage, setStage] = useState<'idle' | 'printing' | 'settling' | 'ready' | 'tearing' | 'waiting'>('idle');

  // Copied label & aria-live state
  const [isCopied, setIsCopied] = useState(false);
  const [ariaAnnouncement, setAriaAnnouncement] = useState('');

  // Stagger reveal: visible lines 0 to 12
  const [visibleLines, setVisibleLines] = useState<number>(0);

  // Typewriter char counts for the 4 OPEN service lines (0 to 4 each)
  const [openCounts, setOpenCounts] = useState<[number, number, number, number]>([0, 0, 0, 0]);

  // Format today's date dynamically: e.g. "15 NOV 2026"
  const formattedDate = React.useMemo(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const validMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = validMonths[now.getMonth()];
    const year = now.getFullYear();
    return `${day} ${month} ${year}`;
  }, []);

  const formattedOrder = React.useMemo(() => {
    return `NO. ${String(orderNumber).padStart(4, '0')}`;
  }, [orderNumber]);

  // Check reduced-motion and screen width
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', onMotionChange);

    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // IntersectionObserver: trigger once when 30% of the section is in view
  useEffect(() => {
    if (!containerRef.current || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [inView]);

  // Print sequence with stagger lines and typewriter OPEN
  const startPrintSequence = useCallback(() => {
    if (isReducedMotion) {
      setStage('ready');
      setVisibleLines(12);
      setOpenCounts([4, 4, 4, 4]);
      return;
    }

    setStage('printing');
    setVisibleLines(0);
    setOpenCounts([0, 0, 0, 0]);

    const printDuration = isMobile ? 1200 : 1600;
    const lineStagger = 100; // 0.1s stagger

    const timers: NodeJS.Timeout[] = [];

    // Reveal lines one by one in sync with the paper (stagger 0.1s, opacity 0 to 1)
    for (let i = 1; i <= 12; i++) {
      const t = setTimeout(() => {
        setVisibleLines(i);
      }, i * lineStagger);
      timers.push(t);
    }

    // Typewriter for the 4 OPEN service lines (lines 4, 5, 6, 7): 30ms per char
    [0, 1, 2, 3].forEach((serviceIdx) => {
      const lineRevealTime = (serviceIdx + 4) * lineStagger;
      for (let charIdx = 1; charIdx <= 4; charIdx++) {
        const charTimer = setTimeout(() => {
          setOpenCounts((prev) => {
            const next = [...prev] as [number, number, number, number];
            next[serviceIdx] = charIdx;
            return next;
          });
        }, lineRevealTime + charIdx * 30);
        timers.push(charTimer);
      }
    });

    // After printing: settle spring (translateY 0 to 3px to 0, 0.35s)
    const settleTimer = setTimeout(() => {
      setStage('settling');

      const readyTimer = setTimeout(() => {
        setStage('ready');
      }, 350);
      timers.push(readyTimer);
    }, printDuration);
    timers.push(settleTimer);

    return () => timers.forEach(clearTimeout);
  }, [isMobile, isReducedMotion]);

  // External trigger (paper airplane landing after form submission)
  useEffect(() => {
    if (printTrigger && printTrigger > 0) {
      setOrderNumber((prev) => prev + 1);
      printerAudio.playPrintSequence(isMobile ? 1.2 : 1.6);
      startPrintSequence();
    }
  }, [printTrigger, isMobile, startPrintSequence]);

  // Handle strip click / tap / keyboard: tear away, copy, and re-print fresh strip
  const handleTear = useCallback(
    async (e?: React.MouseEvent | React.KeyboardEvent) => {
      if (e) {
        e.preventDefault();
      }

      // If already tearing or waiting, ignore extra clicks
      if (stage === 'tearing' || stage === 'waiting') return;

      printerAudio.playClick();

      // 1. Copy email to clipboard (with fallback)
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          throw new Error('Clipboard API unavailable');
        }
      } catch {
        try {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }

      // 2. Announce through aria-live region and show COPIED on email line
      setIsCopied(true);
      setAriaAnnouncement(`Email ${email} copied to clipboard.`);

      // 3. prefers-reduced-motion: show copied for 1.5s without tear animation
      if (isReducedMotion) {
        setTimeout(() => {
          setIsCopied(false);
          setAriaAnnouncement('');
        }, 1500);
        return;
      }

      // 4. Animate tear away: translateY(-28px), rotate 3deg, opacity 0, 0.4s
      setStage('tearing');

      // 5. After 0.4s tear finishes, wait 0.6s, then print fresh strip with incremented order
      setTimeout(() => {
        setStage('waiting');

        setTimeout(() => {
          setOrderNumber((prev) => prev + 1);
          setIsCopied(false);
          setAriaAnnouncement('');
          startPrintSequence();
        }, 600);
      }, 400);

      // Keep COPIED label active for 1.5s
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    },
    [email, isReducedMotion, stage, startPrintSequence]
  );

  // Keyboard accessibility: Enter or Space triggers tear
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTear(e);
    }
  };

  const printDurationSec = isMobile ? 1.2 : 1.6;

  // Typewriter word renderer: constant width via invisible trailing characters
  const renderOpenWord = (count: number) => {
    const full = 'OPEN';
    const revealed = isReducedMotion ? full : full.slice(0, count);
    const hidden = isReducedMotion ? '' : full.slice(count);

    return (
      <span className="text-[#121211] font-semibold whitespace-nowrap inline-block">
        <span className="inline-block mr-0.5">•</span>
        <span>{revealed}</span>
        <span className="invisible" aria-hidden="true">
          {hidden}
        </span>
      </span>
    );
  };

  return (
    <div ref={containerRef} className="group relative flex flex-col items-center select-none font-sans">
      {/* Screen reader live announcement region */}
      <div className="sr-only" aria-live="polite" role="status">
        {ariaAnnouncement}
      </div>

      {/* Overflow-hidden slot wrapper: paper rises upward out of this slot */}
      <div
        id="receipt-printer-slot"
        className="w-[220px] lg:w-[240px] h-[280px] overflow-hidden flex flex-col justify-end relative z-0"
      >
        {/* Airport Runway Landing Strip & Terminal Gate when idle */}
        {stage === 'idle' && (
          <div className="absolute inset-0 flex flex-col justify-between p-4 border border-[#D6D5CF] rounded-2xl bg-[#FAF9F5] text-center font-sans select-none pointer-events-none transition-opacity duration-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
            {/* Top Runway Approach Threshold & Indicator */}
            <div className="flex items-center justify-between border-b border-[#E5E5E1] pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#121211]" />
                <span className="text-[11px] font-bold tracking-tight text-[#121211]">
                  Gate 01 · Runway 27L
                </span>
              </div>
              <span className="text-[9px] text-[#121211] font-semibold tracking-wider bg-neutral-200/70 px-2 py-0.5 rounded-full border border-neutral-300/80">
                READY
              </span>
            </div>

            {/* Runway Tarmac Markings */}
            <div className="my-auto flex flex-col items-center justify-center space-y-2 py-2">
              {/* Threshold Piano Keys */}
              <div className="flex gap-1 items-center justify-center">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-1.5 h-6 bg-[#121211]/25 rounded-[1px]" />
                ))}
              </div>

              {/* Runway Designation Stencil */}
              <div className="text-[18px] font-black tracking-widest text-[#121211]/80 font-sans">
                27L
              </div>

              {/* Dashed Runway Centerline */}
              <div className="flex flex-col items-center gap-1.5 py-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 h-3 bg-[#121211]/30 rounded-full" />
                ))}
              </div>

              {/* Aiming Point Touchdown Markers */}
              <div className="flex justify-between w-32 px-2">
                <div className="w-4 h-1.5 bg-[#121211]/30 rounded-xs" />
                <div className="w-4 h-1.5 bg-[#121211]/30 rounded-xs" />
              </div>
            </div>

            {/* Bottom Runway Slot Status */}
            <div className="border-t border-[#E5E5E1] pt-2">
              <span className="block text-[10px] text-[#6D6C66] tracking-tight font-medium">
                Printer Terminal · Touchdown to print
              </span>
            </div>
          </div>
        )}

        {/* Printable Receipt Paper Strip */}
        <div
          onClick={() => handleTear()}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={`Project inquiry receipt. Click or press Enter to tear and copy ${email}.`}
          className={`contact-receipt-paper w-[220px] lg:w-[240px] bg-[#FAF9F5] text-[#121211] border-x border-b border-[#D6D5CF] font-sans text-[11px] leading-relaxed tracking-tight select-text relative cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 will-change-transform shadow-[0_4px_16px_rgba(0,0,0,0.06)] ${
            stage === 'ready' ? 'receipt-hover-ready' : ''
          }`}
          style={{
            clipPath: ZIGZAG_CLIP,
            animation:
              stage === 'printing' && !isReducedMotion
                ? `receiptPrintStep ${printDurationSec}s steps(16, end) forwards`
                : stage === 'settling' && !isReducedMotion
                ? 'receiptSettle 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                : stage === 'tearing' && !isReducedMotion
                ? 'receiptTear 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards'
                : undefined,
            transform:
              stage === 'idle'
                ? 'translateY(100%)'
                : stage === 'waiting'
                ? 'translateY(100%) opacity-0'
                : stage === 'ready'
                ? 'translateY(0)'
                : undefined,
          }}
        >
          {/* Torn top edge hairline decoration */}
          <div className="w-full h-[5px] overflow-hidden" aria-hidden="true">
            <svg
              className="w-full h-[5px] text-[#D6D5CF] block"
              preserveAspectRatio="none"
              viewBox="0 0 100 5"
            >
              <path
                d="M0,4 L2.5,0 L5,4 L7.5,0 L10,4 L12.5,0 L15,4 L17.5,0 L20,4 L22.5,0 L25,4 L27.5,0 L30,4 L32.5,0 L35,4 L37.5,0 L40,4 L42.5,0 L45,4 L47.5,0 L50,4 L52.5,0 L55,4 L57.5,0 L60,4 L62.5,0 L65,4 L67.5,0 L70,4 L72.5,0 L75,4 L77.5,0 L80,4 L82.5,0 L85,4 L87.5,0 L90,4 L92.5,0 L95,4 L97.5,0 L100,4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="px-3.5 pt-1.5 pb-2.5">
            {/* Line 0: WAYVE ENTERPRISES */}
            <div
              className="text-center font-bold tracking-wider mb-0.5 transition-opacity duration-150 text-[#121211]"
              style={{ opacity: visibleLines >= 1 || isReducedMotion ? 1 : 0 }}
            >
              WAYVE ENTERPRISES
            </div>

            {/* Line 1: NO. 0027 / 15 NOV 2026 */}
            <div
              className="text-center text-[#6D6C66] text-[10px] tracking-wider mb-1.5 transition-opacity duration-150"
              style={{ opacity: visibleLines >= 2 || isReducedMotion ? 1 : 0 }}
            >
              {formattedOrder} / {formattedDate}
            </div>

            {/* Line 2: Dashed Rule */}
            <div
              className="border-b border-dashed border-[#D6D5CF] my-1.5 transition-opacity duration-150"
              style={{ opacity: visibleLines >= 3 || isReducedMotion ? 1 : 0 }}
              aria-hidden="true"
            />

            {/* Lines 3 - 6: Service Lines or Submitted Transmission Details */}
            {transmission ? (
              <div className="space-y-0.5 my-1.5 text-[10px]">
                <div
                  className="flex justify-between items-baseline font-semibold text-[#121211] transition-opacity duration-150"
                  style={{ opacity: visibleLines >= 4 || isReducedMotion ? 1 : 0 }}
                >
                  <span>INQUIRY RELAYED</span>
                  <span className="text-neutral-900 font-semibold">•AIR-DISPATCH</span>
                </div>
                <div
                  className="flex justify-between items-baseline transition-opacity duration-150"
                  style={{ opacity: visibleLines >= 5 || isReducedMotion ? 1 : 0 }}
                >
                  <span className="text-[#6D6C66]">NAME</span>
                  <span className="truncate max-w-[130px] font-semibold text-right text-[#121211]">{transmission.name}</span>
                </div>
                <div
                  className="flex justify-between items-baseline transition-opacity duration-150"
                  style={{ opacity: visibleLines >= 6 || isReducedMotion ? 1 : 0 }}
                >
                  <span className="text-[#6D6C66]">EMAIL</span>
                  <span className="truncate max-w-[130px] text-right text-[#121211]">{transmission.email}</span>
                </div>
                <div
                  className="flex justify-between items-baseline transition-opacity duration-150"
                  style={{ opacity: visibleLines >= 7 || isReducedMotion ? 1 : 0 }}
                >
                  <span className="text-[#6D6C66]">PHONE</span>
                  <span className="truncate max-w-[130px] text-right text-[#121211]">{transmission.phone || 'N/A'}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-0.5 my-1.5 text-[#121211]">
                {/* Line 3: CONTRACTING */}
                <div
                  className="flex justify-between items-baseline transition-opacity duration-150"
                  style={{ opacity: visibleLines >= 4 || isReducedMotion ? 1 : 0 }}
                >
                  <span>CONTRACTING</span>
                  <span className="text-[#A5A49E] tracking-tighter">........</span>
                  {renderOpenWord(openCounts[0])}
                </div>

                {/* Line 4: COMPUTER VISION */}
                <div
                  className="flex justify-between items-baseline transition-opacity duration-150"
                  style={{ opacity: visibleLines >= 5 || isReducedMotion ? 1 : 0 }}
                >
                  <span>COMPUTER VISION</span>
                  <span className="text-[#A5A49E] tracking-tighter">.....</span>
                  {renderOpenWord(openCounts[1])}
                </div>

                {/* Line 5: FULL-STACK */}
                <div
                  className="flex justify-between items-baseline transition-opacity duration-150"
                  style={{ opacity: visibleLines >= 6 || isReducedMotion ? 1 : 0 }}
                >
                  <span>FULL-STACK</span>
                  <span className="text-[#A5A49E] tracking-tighter">..........</span>
                  {renderOpenWord(openCounts[2])}
                </div>

                {/* Line 6: ADVISORY */}
                <div
                  className="flex justify-between items-baseline transition-opacity duration-150"
                  style={{ opacity: visibleLines >= 7 || isReducedMotion ? 1 : 0 }}
                >
                  <span>ADVISORY</span>
                  <span className="text-[#A5A49E] tracking-tighter">............</span>
                  {renderOpenWord(openCounts[3])}
                </div>
              </div>
            )}

            {/* Line 7: Dashed Rule */}
            <div
              className="border-b border-dashed border-[#D6D5CF] my-1.5 transition-opacity duration-150"
              style={{ opacity: visibleLines >= 8 || isReducedMotion ? 1 : 0 }}
              aria-hidden="true"
            />

            {/* Lines 8 - 9: SLA & Total */}
            <div className="space-y-0.5 my-1.5">
              <div
                className="text-[#6D6C66] text-[10px] transition-opacity duration-150 flex justify-between items-baseline"
                style={{ opacity: visibleLines >= 9 || isReducedMotion ? 1 : 0 }}
              >
                <span>{transmission ? `DEST: ${email}` : 'REPLY WITHIN 24H'}</span>
                {transmission && <span className="text-neutral-900 font-semibold">•CONFIRMED</span>}
              </div>
              <div
                className="font-bold text-[10px] leading-snug transition-opacity duration-150 text-[#121211]"
                style={{ opacity: visibleLines >= 10 || isReducedMotion ? 1 : 0 }}
              >
                TOTAL: LET'S BUILD SOMETHING EXCEPTIONAL
              </div>
            </div>

            {/* Line 10: Clickable Email Line */}
            <div
              className="my-1.5 pt-1 border-t border-[#EBEBE8] transition-opacity duration-150"
              style={{ opacity: visibleLines >= 11 || isReducedMotion ? 1 : 0 }}
            >
              <a
                href={`mailto:${email}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTear(e);
                }}
                className="block text-[#121211] font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1 truncate"
              >
                {isCopied ? (
                  <span className="text-neutral-900 font-bold tracking-wider">COPIED</span>
                ) : (
                  email
                )}
              </a>
            </div>

            {/* Line 11: Sign-off */}
            <div
              className="text-center text-[#6D6C66] text-[10px] tracking-widest mt-1.5 transition-opacity duration-150"
              style={{ opacity: visibleLines >= 12 || isReducedMotion ? 1 : 0 }}
            >
              THANK YOU.
            </div>
          </div>
        </div>
      </div>

      {/* Tiny Mono Hint under strip on desktop hover / focus */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 text-[9px] font-mono uppercase tracking-widest text-[#8E8D88] dark:text-[#7A7974] text-center pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hidden lg:block z-20 whitespace-nowrap"
        aria-hidden="true"
      >
        TEAR TO COPY
      </div>

      <style>{`
        @keyframes receiptPrintStep {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes receiptSettle {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(3px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes receiptTear {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-28px) rotate(3deg);
            opacity: 0;
          }
        }
        @media (hover: hover) and (pointer: fine) {
          .receipt-hover-ready {
            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .receipt-hover-ready:hover,
          .receipt-hover-ready:focus-visible {
            transform: translateY(-3px) !important;
          }
        }
        /* Authentic Crisp White Thermal Paper - Always white, no black in dark mode */
        .contact-receipt-paper {
          background-color: #FAF9F5 !important;
          color: #121211 !important;
          border-color: #D6D5CF !important;
        }
      `}</style>
    </div>
  );
};

export default ContactReceipt;
