import React, { useState, useEffect, useCallback, useRef } from 'react';
import { m } from 'motion/react';
import { ArrowLeft, Download, Volume2, VolumeX, Printer } from 'lucide-react';
import { ChromePrinter } from './ChromePrinter';
import { ResumePaper } from './ResumePaper';
import { ResumeData } from '../../types/resume';
import { dhyandevResume } from '../../lib/resumeDataPuller';
import { printerAudio } from '../../lib/printerSound';
import { getLenis } from '../../lib/scroll';

export type PrintPhase = 'idle' | 'retracting' | 'printing';

export interface ResumePrinterViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumePrinterView: React.FC<ResumePrinterViewProps> = ({
  isOpen,
  onClose
}) => {
  const [data] = useState<ResumeData>(dhyandevResume);
  const [isPrinting, setIsPrinting] = useState<boolean>(true);
  const [printPhase, setPrintPhase] = useState<PrintPhase>('retracting');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [paperHeight, setPaperHeight] = useState<number>(1100);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Measure full height of resume document dynamically
  const updatePaperHeight = useCallback(() => {
    if (contentRef.current) {
      const h = contentRef.current.scrollHeight;
      if (h > 600) {
        setPaperHeight(h);
      }
    }
  }, []);

  useEffect(() => {
    updatePaperHeight();
    window.addEventListener('resize', updatePaperHeight);
    return () => window.removeEventListener('resize', updatePaperHeight);
  }, [updatePaperHeight]);

  // Pause Lenis smooth scrolling and lock background body scroll while resume modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Stop Lenis background interception so inner container scrolls natively without interruption
    const lenis = getLenis();
    lenis?.stop();

    // Lock body scroll behind modal
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus container for keyboard scrolling (ArrowDown, PageDown, Space)
    containerRef.current?.focus();

    return () => {
      lenis?.start();
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [isOpen]);

  // Fallback wheel listener to ensure mouse wheel & trackpad gestures scroll the container natively
  useEffect(() => {
    if (!isOpen) return;
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // Prevent background listeners from blocking native container scroll
      e.stopPropagation();
    };

    container.addEventListener('wheel', onWheel, { passive: true });
    return () => container.removeEventListener('wheel', onWheel);
  }, [isOpen]);

  const handleTriggerPrint = useCallback(() => {
    if (isPrinting) return;
    setIsPrinting(true);
    setPrintPhase('retracting');

    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setTimeout(() => {
      setPrintPhase('printing');
      if (soundEnabled) {
        printerAudio.playPrintSequence(2.5);
      }

      setTimeout(() => {
        if (soundEnabled) {
          printerAudio.playTearSound();
        }
        setIsPrinting(false);
        setPrintPhase('idle');
      }, 2500);
    }, 280);
  }, [isPrinting, soundEnabled]);

  const handleDownloadPdf = useCallback(() => {
    printerAudio.playClick();
    window.print();
  }, []);

  const handleToggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    printerAudio.setMuted(!next);
    if (next) {
      printerAudio.playClick();
    }
  }, [soundEnabled]);

  // Initial mount: Reset scroll to top and start visceral mechanical print extrusion
  useEffect(() => {
    if (isOpen) {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
      window.scrollTo({ top: 0, behavior: 'instant' });

      setPrintPhase('retracting');
      setIsPrinting(true);

      let finishTimer: NodeJS.Timeout | null = null;
      const startTimer = setTimeout(() => {
        updatePaperHeight();
        setPrintPhase('printing');
        if (soundEnabled) {
          printerAudio.playPrintSequence(2.5);
        }

        finishTimer = setTimeout(() => {
          if (soundEnabled) {
            printerAudio.playTearSound();
          }
          setIsPrinting(false);
          setPrintPhase('idle');
        }, 2500);
      }, 300);

      return () => {
        clearTimeout(startTimer);
        if (finishTimer) clearTimeout(finishTimer);
      };
    }
  }, [isOpen, soundEnabled, updatePaperHeight]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain touch-pan-y bg-[#EAE6DE] print:bg-white print:static print:inset-auto print:overflow-visible print:z-auto outline-hidden"
      style={{
        WebkitOverflowScrolling: 'touch',
        backgroundImage: `
          radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.75) 0%, rgba(234, 230, 222, 0.5) 60%, rgba(216, 210, 200, 0.8) 100%)
        `
      }}
    >
      {/* Precision Aligned Floating Top Navigation Bar */}
      <div className="sticky top-[calc(0.75rem+env(safe-area-inset-top,0px))] sm:top-4 inset-x-0 z-30 w-full max-w-[820px] mx-auto px-4 pointer-events-auto print:hidden">
        <div className="relative w-full h-10 sm:h-11 flex items-center justify-between">
          {/* Left: Return to Portfolio Button + Feed Paper Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-full bg-white/95 hover:bg-white text-neutral-900 border border-neutral-300/80 shadow-xs hover:shadow-sm font-sans text-xs sm:text-[13px] font-semibold flex items-center gap-1.5 transition-all duration-150 cursor-pointer backdrop-blur-xs select-none"
              title="Return to portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </button>

            <button
              type="button"
              onClick={handleTriggerPrint}
              disabled={isPrinting}
              className="h-9 sm:h-10 px-3 sm:px-3.5 rounded-full bg-white/95 hover:bg-white text-neutral-900 border border-neutral-300/80 shadow-xs hover:shadow-sm font-sans text-xs sm:text-[13px] font-semibold flex items-center gap-1.5 transition-all duration-150 cursor-pointer backdrop-blur-xs disabled:opacity-50 select-none"
              title="Feed paper again"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-800" />
              <span className="hidden sm:inline">Feed</span>
            </button>
          </div>

          {/* Center: Exactly Dead-Center Download Cue Badge */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-white/90 px-4 h-9 sm:h-10 rounded-full border border-neutral-300/80 backdrop-blur-xs shadow-xs pointer-events-none select-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
            <span>Click paper to download PDF</span>
          </div>

          {/* Right: Actions Group (Download PDF + Audio Toggle) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-[#121211] hover:bg-neutral-800 text-white shadow-xs hover:shadow-sm font-sans text-xs sm:text-[13px] font-semibold flex items-center gap-1.5 transition-all duration-150 cursor-pointer select-none"
              title="Download / Print PDF"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handleToggleSound}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-neutral-700 border border-neutral-300/80 shadow-xs hover:shadow-sm flex items-center justify-center transition-all duration-150 cursor-pointer backdrop-blur-xs select-none"
              title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
              aria-label="Toggle mechanical audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-neutral-900" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
            </button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[100dvh] flex flex-col items-center pt-4 sm:pt-6 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] px-4 print:p-0 print:m-0">
        {/* The 3D Chrome Hardware Apparatus */}
        <ChromePrinter
          isPrinting={isPrinting}
          onTriggerPrint={handleTriggerPrint}
        />

        {/* Paper Container - Pinned directly under slot with zero gap */}
        <div className="relative w-full max-w-4xl flex flex-col items-center -mt-4 sm:-mt-5 z-0">
          {/* Extrusion Wrapper - Pinned right below printer slot with physical stepped feed */}
          <m.div
            initial={{ height: 44, y: 0 }}
            animate={
              printPhase === 'retracting'
                ? { height: 44, y: 0 }
                : printPhase === 'printing'
                ? {
                    height: [
                      44,
                      Math.round(paperHeight * 0.12),
                      Math.round(paperHeight * 0.12),
                      Math.round(paperHeight * 0.32),
                      Math.round(paperHeight * 0.32),
                      Math.round(paperHeight * 0.55),
                      Math.round(paperHeight * 0.55),
                      Math.round(paperHeight * 0.78),
                      Math.round(paperHeight * 0.78),
                      paperHeight
                    ],
                    y: [0, 3, 0, 3, 0, 3, 0, 3, 0, 0]
                  }
                : { height: 'auto', y: 0 }
            }
            transition={
              printPhase === 'retracting'
                ? { duration: 0.3, ease: 'easeIn' }
                : printPhase === 'printing'
                ? {
                    duration: 2.5,
                    times: [0, 0.12, 0.16, 0.35, 0.39, 0.58, 0.62, 0.82, 0.86, 1.0],
                    ease: 'easeInOut'
                  }
                : { type: 'spring', stiffness: 260, damping: 22 }
            }
            className={`relative w-full max-w-[760px] ${
              printPhase === 'idle' ? 'overflow-visible' : 'overflow-hidden'
            } print:h-auto print:max-h-none print:overflow-visible transition-[box-shadow] duration-300`}
          >
            {/* The Resume Document */}
            <div ref={contentRef} className="w-full flex justify-center">
              <ResumePaper
                data={data}
                pageMode="page1"
                isPrinting={isPrinting}
                onPaperClick={handleDownloadPdf}
              />
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default ResumePrinterView;
