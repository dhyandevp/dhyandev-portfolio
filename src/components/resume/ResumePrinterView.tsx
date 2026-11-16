import React, { useState, useEffect, useCallback, useRef } from 'react';
import { m } from 'motion/react';
import { ArrowLeft, Download, Volume2, VolumeX, Printer } from 'lucide-react';
import { ChromePrinter } from './ChromePrinter';
import { ResumePaper } from './ResumePaper';
import { ResumeData } from '../../types/resume';
import { dhyandevResume } from '../../lib/resumeDataPuller';
import { printerAudio } from '../../lib/printerSound';

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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#EAE6DE] select-none print:bg-white print:static print:inset-auto print:overflow-visible print:z-auto"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.75) 0%, rgba(234, 230, 222, 0.5) 60%, rgba(216, 210, 200, 0.8) 100%)
        `
      }}
    >
      {/* Discreet floating top nav bar */}
      <div className="sticky top-[calc(1rem+env(safe-area-inset-top,0px))] sm:top-4 inset-x-0 z-30 flex items-center justify-between max-w-4xl mx-auto px-4 pointer-events-auto print:hidden">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-full bg-white/95 hover:bg-white text-neutral-900 border border-neutral-300 shadow-sm font-sans text-xs sm:text-[13px] font-medium flex items-center gap-1.5 transition-colors duration-150 cursor-pointer backdrop-blur-sm"
          title="Return to portfolio"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Portfolio</span>
        </button>

        {/* Center click-to-download cue in top bar */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-neutral-700 bg-white/90 px-3.5 py-1.5 rounded-full border border-neutral-300/80 backdrop-blur-xs shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
          <span>Click paper to download PDF</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTriggerPrint}
            disabled={isPrinting}
            className="px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-neutral-900 border border-neutral-300 shadow-sm font-sans text-xs sm:text-[13px] font-medium flex items-center gap-1.5 transition-colors duration-150 cursor-pointer backdrop-blur-sm disabled:opacity-50"
            title="Feed paper again"
          >
            <Printer className="w-3.5 h-3.5 text-neutral-800" />
            <span className="hidden sm:inline">Feed</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="px-4 py-2 rounded-full bg-[#121211] hover:bg-neutral-800 text-white shadow-sm font-sans text-xs sm:text-[13px] font-medium flex items-center gap-1.5 transition-colors duration-150 cursor-pointer"
            title="Download / Print PDF"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Download PDF</span>
          </button>

          <button
            type="button"
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-white/95 hover:bg-white text-neutral-700 border border-neutral-300 shadow-sm transition-colors duration-150 cursor-pointer"
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            aria-label="Toggle mechanical audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
          </button>
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
