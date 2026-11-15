import React, { useEffect, useState, useCallback, useRef } from 'react';

export interface TargetBox {
  id: string;
  name: string;
  label: string;
  confidence: number;
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

const TARGET_CONFIGS: Record<string, { label: string; name: string; confidence: number }> = {
  section: { label: 'SECTION', name: 'SECTION_HEADER', confidence: 0.98 },
  headline: { label: 'HEADLINE', name: 'MAIN_HEADLINE', confidence: 0.99 },
  bio: { label: 'BIO', name: 'PROFILE_BIO', confidence: 0.97 },
  email: { label: 'CONTACT_EMAIL', name: 'CONTACT_EMAIL', confidence: 0.99 },
  status: { label: 'AVAILABLE', name: 'AVAILABILITY_STATUS', confidence: 0.96 },
  linkedin: { label: 'LINKEDIN', name: 'LINKEDIN_CHANNEL', confidence: 0.98 },
  github: { label: 'GITHUB', name: 'GITHUB_CHANNEL', confidence: 0.98 },
  linktree: { label: 'LINKTREE', name: 'LINKTREE_CHANNEL', confidence: 0.97 },
};

interface VisionDetectionOverlayProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export const VisionDetectionOverlay: React.FC<VisionDetectionOverlayProps> = ({ sectionRef }) => {
  const [boxes, setBoxes] = useState<TargetBox[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [detectedMap, setDetectedMap] = useState<Record<string, boolean>>({});
  const [confidences, setConfidences] = useState<Record<string, number>>({});
  const [detectionCount, setDetectionCount] = useState(0);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [latency, setLatency] = useState(12);
  const [isInView, setIsInView] = useState(false);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const sectionWidthRef = useRef<number>(1280);

  // Measure all [data-vision-target] relative to section container
  const measureTargets = useCallback(() => {
    if (!sectionRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    sectionWidthRef.current = sectionRect.width || 1280;
    const elements = sectionRef.current.querySelectorAll<HTMLElement>('[data-vision-target]');

    const measured: TargetBox[] = [];
    elements.forEach((el) => {
      const targetId = el.getAttribute('data-vision-target');
      if (!targetId || !TARGET_CONFIGS[targetId]) return;

      const rect = el.getBoundingClientRect();
      const config = TARGET_CONFIGS[targetId];

      measured.push({
        id: targetId,
        name: config.name,
        label: config.label,
        confidence: config.confidence,
        rect: {
          top: Math.round(rect.top - sectionRect.top),
          left: Math.round(rect.left - sectionRect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
      });
    });

    setBoxes(measured);
  }, [sectionRef]);

  // IntersectionObserver to trigger scan sweep once when 30% visible and track in-view state
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting && !hasScanned) {
            setIsScanning(true);
            setHasScanned(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasScanned, sectionRef]);

  // Handle Scan Sweep & Detection Sequencing
  useEffect(() => {
    if (!isScanning || boxes.length === 0) return;

    const secWidth = sectionWidthRef.current || 1280;
    const timers: number[] = [];

    // Schedule detection for each box based on horizontal sweep position
    boxes.forEach((box) => {
      const ratio = Math.max(0, Math.min(1, box.rect.left / secWidth));
      const delayMs = Math.round(Math.pow(ratio, 0.6) * 1250) + 180;

      const timer = window.setTimeout(() => {
        setDetectedMap((prev) => ({ ...prev, [box.id]: true }));
        setDetectionCount((prev) => Math.min(8, prev + 1));

        // Animate confidence count-up from 0.00 to target in 400ms
        const startTime = performance.now();
        const targetConf = box.confidence;

        const animateConfidence = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / 400);
          const currentVal = targetConf * (1 - Math.pow(1 - progress, 3));
          setConfidences((prev) => ({ ...prev, [box.id]: currentVal }));

          if (progress < 1) {
            requestAnimationFrame(animateConfidence);
          } else {
            setConfidences((prev) => ({ ...prev, [box.id]: targetConf }));
          }
        };
        requestAnimationFrame(animateConfidence);
      }, delayMs);

      timers.push(timer);
    });

    const scanEndTimer = window.setTimeout(() => {
      setIsScanning(false);
    }, 1650);
    timers.push(scanEndTimer);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [isScanning, boxes]);

  // Jitter latency slightly (±3ms) every 400ms when an element is focused and in view
  useEffect(() => {
    if (!isInView || !focusedId) return;

    const interval = window.setInterval(() => {
      // Base 12ms ± 3ms (9ms to 15ms)
      const jitter = Math.floor(Math.random() * 7) - 3;
      setLatency(12 + jitter);
    }, 400);

    return () => window.clearInterval(interval);
  }, [isInView, focusedId]);

  // Attach hover and keyboard focus listeners to targets in sectionRef
  useEffect(() => {
    if (!sectionRef.current) return;
    const root = sectionRef.current;

    const handlePointerOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-vision-target]');
      if (target) {
        const id = target.getAttribute('data-vision-target');
        setFocusedId(id);
      }
    };

    const handlePointerOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest('[data-vision-target]')) {
        setFocusedId(null);
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = (e.target as HTMLElement).closest('[data-vision-target]');
      if (target) {
        const id = target.getAttribute('data-vision-target');
        setFocusedId(id);
      }
    };

    const handleFocusOut = () => {
      setFocusedId(null);
    };

    root.addEventListener('mouseover', handlePointerOver);
    root.addEventListener('mouseout', handlePointerOut);
    root.addEventListener('focusin', handleFocusIn);
    root.addEventListener('focusout', handleFocusOut);

    return () => {
      root.removeEventListener('mouseover', handlePointerOver);
      root.removeEventListener('mouseout', handlePointerOut);
      root.removeEventListener('focusin', handleFocusIn);
      root.removeEventListener('focusout', handleFocusOut);
    };
  }, [sectionRef]);

  useEffect(() => {
    measureTargets();

    let timeoutId: number;
    const handleResize = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(measureTargets, 100);
    };

    if (sectionRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserverRef.current = new ResizeObserver(handleResize);
      resizeObserverRef.current.observe(sectionRef.current);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
      resizeObserverRef.current?.disconnect();
    };
  }, [measureTargets, sectionRef]);

  const focusedBox = boxes.find((b) => b.id === focusedId);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none z-20 overflow-hidden"
    >
      {/* 1. HUD: Top-right of the section (REC dot, MODEL, DETECTIONS, live inference) */}
      <div className="absolute top-4 sm:top-6 right-6 md:right-12 z-30 font-mono text-[9px] sm:text-[10px] text-[#121211] flex items-center gap-2 sm:gap-4 bg-[#F4F4F2]/90 backdrop-blur-xs px-2.5 sm:px-3 py-1 rounded-sm border border-hairline/80 shadow-2xs select-none">
        {/* REC dot */}
        <div className="flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0" />
          <span>REC</span>
        </div>

        <span className="text-hairline hidden sm:inline">|</span>

        {/* MODEL tag (collapses on mobile <640px) */}
        <span className="text-[#6D6C66] hidden sm:inline">MODEL: WAYVE-VISION-v1</span>

        <span className="text-hairline hidden sm:inline">|</span>

        {/* DETECTIONS: N (updates up to 8) */}
        <span className="font-semibold text-black">
          DETECTIONS: {detectionCount}
        </span>

        {/* Live Inference HUD when an element is focused */}
        {focusedBox && (
          <>
            <span className="text-hairline hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-2 text-black font-semibold">
              <span className="text-[#3F8A52]">LATENCY {latency}ms</span>
              <span className="text-hairline">·</span>
              <span>FPS 60</span>
              <span className="text-hairline">·</span>
              <span className="text-neutral-900">TARGET: {focusedBox.name}</span>
            </div>
          </>
        )}
      </div>

      {/* 2. Scan Sweep Line */}
      {isScanning && (
        <div
          className="absolute top-0 bottom-0 pointer-events-none z-30"
          style={{
            animation: 'scanSweep 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-black shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
          <div className="absolute top-0 bottom-0 right-0 w-[120px] bg-gradient-to-l from-black/[0.06] to-transparent pointer-events-none" />
        </div>
      )}

      {/* 3. Detected & Focused Bounding Boxes */}
      {boxes.map((box) => {
        const isDetected = detectedMap[box.id] || false;
        const isFocused = focusedId === box.id;
        const currentConf = confidences[box.id] ?? 0;

        return (
          <div
            key={box.id}
            className={`absolute transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isFocused
                ? 'scale-100 opacity-100 z-30'
                : isDetected
                ? 'scale-100 opacity-[0.35] z-10'
                : 'scale-[1.08] opacity-0'
            }`}
            style={{
              top: `${box.rect.top}px`,
              left: `${box.rect.left}px`,
              width: `${box.rect.width}px`,
              height: `${box.rect.height}px`,
            }}
          >
            {/* Corner Brackets: 1px normal, 2px when focused, 10px arms */}
            {/* Top-Left */}
            <div
              className={`absolute top-0 left-0 w-[10px] h-[10px] border-t border-l border-black transition-all ${
                isFocused ? 'border-t-2 border-l-2' : 'border-t border-l'
              }`}
            />
            {/* Top-Right */}
            <div
              className={`absolute top-0 right-0 w-[10px] h-[10px] border-t border-r border-black transition-all ${
                isFocused ? 'border-t-2 border-r-2' : 'border-t border-r'
              }`}
            />
            {/* Bottom-Left */}
            <div
              className={`absolute bottom-0 left-0 w-[10px] h-[10px] border-b border-l border-black transition-all ${
                isFocused ? 'border-b-2 border-l-2' : 'border-b border-l'
              }`}
            />
            {/* Bottom-Right */}
            <div
              className={`absolute bottom-0 right-0 w-[10px] h-[10px] border-b border-r border-black transition-all ${
                isFocused ? 'border-b-2 border-r-2' : 'border-b border-r'
              }`}
            />

            {/* Crosshair at center when focused */}
            {isFocused && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <div className="absolute w-3 h-[1px] bg-black/80" />
                  <div className="absolute h-3 w-[1px] bg-black/80" />
                </div>
              </div>
            )}

            {/* Micro Label Tag attached to Top-Left */}
            {isDetected && (
              <div
                className={`absolute -top-[19px] left-0 font-mono text-[9px] sm:text-[10px] uppercase font-semibold px-1.5 py-[2px] leading-tight tracking-wider whitespace-nowrap shadow-xs transition-colors ${
                  isFocused ? 'bg-black text-white' : 'bg-black/90 text-white'
                }`}
              >
                {box.label} {currentConf.toFixed(2)}
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes scanSweep {
          0% {
            left: -120px;
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default VisionDetectionOverlay;
