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

  // IntersectionObserver to trigger scan sweep once when 30% visible
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
      // Normalized left-to-right ratio
      const ratio = Math.max(0, Math.min(1, box.rect.left / secWidth));
      // Easing curve estimation: sweep completes in 1.6s
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
          // Ease-out progress
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

    // End scan animation after 1.6s
    const scanEndTimer = window.setTimeout(() => {
      setIsScanning(false);
    }, 1650);
    timers.push(scanEndTimer);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [isScanning, boxes]);

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

  return (
    <div
      aria-hidden="true"
      data-detections={detectionCount}
      className="absolute inset-0 pointer-events-none select-none z-20 overflow-hidden"
    >
      {/* 1. Scan Sweep Line (sweeps left to right over 1.6s with soft trailing gradient) */}
      {isScanning && (
        <div
          className="absolute top-0 bottom-0 pointer-events-none z-30"
          style={{
            animation: 'scanSweep 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          {/* Vertical 1px black sweep beam */}
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-black shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
          {/* Soft trailing gradient (rgba(0,0,0,0.06) to transparent, 120px wide) */}
          <div className="absolute top-0 bottom-0 right-0 w-[120px] bg-gradient-to-l from-black/[0.06] to-transparent pointer-events-none" />
        </div>
      )}

      {/* 2. Detected Bounding Boxes */}
      {boxes.map((box) => {
        const isDetected = detectedMap[box.id] || false;
        const currentConf = confidences[box.id] ?? 0;

        return (
          <div
            key={box.id}
            className={`absolute transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isDetected ? 'scale-100 opacity-[0.35]' : 'scale-[1.08] opacity-0'
            }`}
            style={{
              top: `${box.rect.top}px`,
              left: `${box.rect.left}px`,
              width: `${box.rect.width}px`,
              height: `${box.rect.height}px`,
            }}
          >
            {/* L-shaped Corner Brackets (10px arms) */}
            <div className="absolute top-0 left-0 w-[10px] h-[10px] border-t border-l border-black" />
            <div className="absolute top-0 right-0 w-[10px] h-[10px] border-t border-r border-black" />
            <div className="absolute bottom-0 left-0 w-[10px] h-[10px] border-b border-l border-black" />
            <div className="absolute bottom-0 right-0 w-[10px] h-[10px] border-b border-r border-black" />

            {/* Micro Label Tag attached to Top-Left */}
            {isDetected && (
              <div className="absolute -top-[19px] left-0 bg-black text-white font-mono text-[9px] sm:text-[10px] uppercase font-semibold px-1.5 py-[2px] leading-tight tracking-wider whitespace-nowrap shadow-xs">
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
