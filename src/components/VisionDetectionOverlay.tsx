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
  emailCopiedTimestamp?: number;
}

export const VisionDetectionOverlay: React.FC<VisionDetectionOverlayProps> = ({
  sectionRef,
  emailCopiedTimestamp,
}) => {
  const [boxes, setBoxes] = useState<TargetBox[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [detectedMap, setDetectedMap] = useState<Record<string, boolean>>({});
  const [confidences, setConfidences] = useState<Record<string, number>>({});
  const [detectionCount, setDetectionCount] = useState(0);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [latency, setLatency] = useState(12);
  const [isInView, setIsInView] = useState(false);
  const [isEmailFlashing, setIsEmailFlashing] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [activeMobileTargetId, setActiveMobileTargetId] = useState<string | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const sectionWidthRef = useRef<number>(1280);
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const isHoverSupportedRef = useRef(false);
  const isReducedMotionRef = useRef(false);

  // Check hover capability and reduced motion preferences
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsReducedMotion(motionQuery.matches);
    isHoverSupportedRef.current = hoverQuery.matches;
    isReducedMotionRef.current = motionQuery.matches;

    const onHoverChange = (e: MediaQueryListEvent) => {
      isHoverSupportedRef.current = e.matches;
    };
    const onMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      isReducedMotionRef.current = e.matches;
    };

    hoverQuery.addEventListener('change', onHoverChange);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      hoverQuery.removeEventListener('change', onHoverChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  // Immediate static final state when prefers-reduced-motion is enabled
  useEffect(() => {
    if (isReducedMotion && boxes.length > 0) {
      const fullMap: Record<string, boolean> = {};
      const fullConf: Record<string, number> = {};
      boxes.forEach((b) => {
        fullMap[b.id] = true;
        fullConf[b.id] = b.confidence;
      });
      setDetectedMap(fullMap);
      setConfidences(fullConf);
      setDetectionCount(boxes.length);
      setIsScanning(false);
      setHasScanned(true);
    }
  }, [isReducedMotion, boxes]);

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
            if (isReducedMotionRef.current) {
              setHasScanned(true);
              setIsScanning(false);
            } else {
              setIsScanning(true);
              setHasScanned(true);
            }
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

  // Jitter latency slightly (±3ms) every 400ms when an element is focused and in view (disabled on reduced motion)
  useEffect(() => {
    if (!isInView || !focusedId || isReducedMotion) return;

    const interval = window.setInterval(() => {
      // Base 12ms ± 3ms (9ms to 15ms)
      const jitter = Math.floor(Math.random() * 7) - 3;
      setLatency(12 + jitter);
    }, 400);

    return () => window.clearInterval(interval);
  }, [isInView, focusedId, isReducedMotion]);

  // Handle email copy flash (120ms) and COPIED 1.00 label state (1.5s)
  const triggerEmailCopyState = useCallback(() => {
    setIsEmailFlashing(true);
    setIsEmailCopied(true);

    const flashTimer = window.setTimeout(() => {
      setIsEmailFlashing(false);
    }, 120);

    const copiedTimer = window.setTimeout(() => {
      setIsEmailCopied(false);
    }, 1500);

    return () => {
      window.clearTimeout(flashTimer);
      window.clearTimeout(copiedTimer);
    };
  }, []);

  useEffect(() => {
    if (emailCopiedTimestamp && emailCopiedTimestamp > 0) {
      return triggerEmailCopyState();
    }
  }, [emailCopiedTimestamp, triggerEmailCopyState]);

  // Mobile (<640px) 6-second auto-sequence loop: highlights each element in sequence (0.4s stagger)
  useEffect(() => {
    if (isReducedMotion || !isInView || !hasScanned || isScanning || boxes.length === 0) return;

    const isMobileScreen = typeof window !== 'undefined' && (window.innerWidth < 640 || !isHoverSupportedRef.current);
    if (!isMobileScreen) return;

    let initialTimeout: number;
    let intervalId: number;
    const timeouts: number[] = [];

    const runSequence = () => {
      if (focusedId !== null) return;

      boxes.forEach((box, i) => {
        const t = window.setTimeout(() => {
          setActiveMobileTargetId(box.id);
        }, i * 400);
        timeouts.push(t);
      });

      const clearTimer = window.setTimeout(() => {
        setActiveMobileTargetId(null);
      }, boxes.length * 400 + 300);
      timeouts.push(clearTimer);
    };

    initialTimeout = window.setTimeout(runSequence, 1500);
    intervalId = window.setInterval(runSequence, 6000);

    return () => {
      window.clearTimeout(initialTimeout);
      window.clearInterval(intervalId);
      timeouts.forEach((t) => window.clearTimeout(t));
      setActiveMobileTargetId(null);
    };
  }, [isReducedMotion, isInView, hasScanned, isScanning, boxes, focusedId]);

  // Attach hover, keyboard focus, tap-to-focus, and click listeners to targets in sectionRef
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

    // Tap-to-focus for mobile & tablet
    const handlePointerDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest('[data-vision-target]');
      if (target) {
        const id = target.getAttribute('data-vision-target');
        setFocusedId(id);
      } else {
        setFocusedId(null);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-vision-target="email"]');
      if (target) {
        triggerEmailCopyState();
      }
    };

    root.addEventListener('mouseover', handlePointerOver);
    root.addEventListener('mouseout', handlePointerOut);
    root.addEventListener('focusin', handleFocusIn);
    root.addEventListener('focusout', handleFocusOut);
    root.addEventListener('pointerdown', handlePointerDown);
    root.addEventListener('click', handleClick);

    return () => {
      root.removeEventListener('mouseover', handlePointerOver);
      root.removeEventListener('mouseout', handlePointerOut);
      root.removeEventListener('focusin', handleFocusIn);
      root.removeEventListener('focusout', handleFocusOut);
      root.removeEventListener('pointerdown', handlePointerDown);
      root.removeEventListener('click', handleClick);
    };
  }, [sectionRef, triggerEmailCopyState]);

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

  // Cursor-follow reticle (desktop only, hover: hover): spring physics (stiffness 300, damping 30)
  // Snapping to nearest element box within 80px, paused when not in view
  useEffect(() => {
    if (!isInView || !sectionRef.current) return;
    const root = sectionRef.current;

    let rafId: number | null = null;
    let isInside = false;
    let targetX = -100;
    let targetY = -100;
    let currX = -100;
    let currY = -100;
    let vx = 0;
    let vy = 0;
    let lastTime = performance.now();
    let isRunning = false;
    let isLocked = false;
    let initialized = false;

    const stopLoop = () => {
      isRunning = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const loop = (now: number) => {
      if (!isRunning) return;

      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      // Spring physics: stiffness 300, damping 30
      const k = 300;
      const c = 30;
      const ax = k * (targetX - currX) - c * vx;
      const ay = k * (targetY - currY) - c * vy;

      vx += ax * dt;
      vy += ay * dt;
      currX += vx * dt;
      currY += vy * dt;

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${currX - 14}px, ${currY - 14}px, 0)`;
        reticleRef.current.style.opacity = isInside ? '1' : '0';
        if (isLocked) {
          reticleRef.current.classList.add('border-black', 'scale-110');
          reticleRef.current.classList.remove('border-black/60', 'scale-100');
        } else {
          reticleRef.current.classList.add('border-black/60', 'scale-100');
          reticleRef.current.classList.remove('border-black', 'scale-110');
        }
      }

      // If outside and spring has settled, stop loop to save CPU
      const distToTarget = Math.hypot(targetX - currX, targetY - currY);
      const speed = Math.hypot(vx, vy);
      if (!isInside && distToTarget < 1 && speed < 1) {
        stopLoop();
        return;
      }

      rafId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHoverSupportedRef.current || isReducedMotionRef.current) return;

      const rect = root.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      isInside = true;

      // Find nearest element box within 80px
      let closestBox: TargetBox | null = null;
      let minDistance = 80;

      for (const box of boxes) {
        const dx = Math.max(box.rect.left - mouseX, 0, mouseX - (box.rect.left + box.rect.width));
        const dy = Math.max(box.rect.top - mouseY, 0, mouseY - (box.rect.top + box.rect.height));
        const dist = Math.hypot(dx, dy);

        if (dist <= 80 && dist < minDistance) {
          minDistance = dist;
          closestBox = box;
        }
      }

      if (closestBox) {
        // Snap to center of nearest box
        targetX = closestBox.rect.left + closestBox.rect.width / 2;
        targetY = closestBox.rect.top + closestBox.rect.height / 2;
        isLocked = true;
      } else {
        targetX = mouseX;
        targetY = mouseY;
        isLocked = false;
      }

      if (!initialized) {
        currX = targetX;
        currY = targetY;
        vx = 0;
        vy = 0;
        initialized = true;
      }

      startLoop();
    };

    const handleMouseLeave = () => {
      isInside = false;
      isLocked = false;
      startLoop();
    };

    root.addEventListener('mousemove', handleMouseMove, { passive: true });
    root.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      stopLoop();
      root.removeEventListener('mousemove', handleMouseMove);
      root.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [boxes, isInView, sectionRef]);

  const activeTargetId = focusedId || activeMobileTargetId;
  const focusedBox = boxes.find((b) => b.id === activeTargetId);

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

      {/* 2. Scan Sweep Line (disabled on reduced motion) */}
      {isScanning && !isReducedMotion && (
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
        const isEmailBox = box.id === 'email';
        const isCopied = isEmailCopied && isEmailBox;
        const isFlashing = isEmailFlashing && isEmailBox;
        const isHighlighted = isCopied || isFocused || activeMobileTargetId === box.id;

        return (
          <div
            key={box.id}
            className={`absolute transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isFlashing
                ? 'scale-100 opacity-100 z-40 bg-black'
                : isHighlighted
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
            {/* Corner Brackets: 1px normal, 2px when focused/copied, 10px arms */}
            {/* Top-Left */}
            <div
              className={`absolute top-0 left-0 w-[10px] h-[10px] border-t border-l transition-all ${
                isFlashing
                  ? 'border-white border-t-2 border-l-2'
                  : isHighlighted
                  ? 'border-black border-t-2 border-l-2'
                  : 'border-black border-t border-l'
              }`}
            />
            {/* Top-Right */}
            <div
              className={`absolute top-0 right-0 w-[10px] h-[10px] border-t border-r transition-all ${
                isFlashing
                  ? 'border-white border-t-2 border-r-2'
                  : isHighlighted
                  ? 'border-black border-t-2 border-r-2'
                  : 'border-black border-t border-r'
              }`}
            />
            {/* Bottom-Left */}
            <div
              className={`absolute bottom-0 left-0 w-[10px] h-[10px] border-b border-l transition-all ${
                isFlashing
                  ? 'border-white border-b-2 border-l-2'
                  : isHighlighted
                  ? 'border-black border-b-2 border-l-2'
                  : 'border-black border-b border-l'
              }`}
            />
            {/* Bottom-Right */}
            <div
              className={`absolute bottom-0 right-0 w-[10px] h-[10px] border-b border-r transition-all ${
                isFlashing
                  ? 'border-white border-b-2 border-r-2'
                  : isHighlighted
                  ? 'border-black border-b-2 border-r-2'
                  : 'border-black border-b border-r'
              }`}
            />

            {/* Crosshair at center when focused (unless flashing) */}
            {isHighlighted && !isFlashing && (
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
                className={`absolute -top-[19px] left-0 font-mono text-[9px] lg:text-[10px] uppercase font-semibold px-1.5 py-[2px] leading-tight tracking-wider whitespace-nowrap shadow-xs transition-colors ${
                  isHighlighted ? 'bg-black text-white' : 'bg-black/90 text-white'
                }`}
              >
                {isCopied ? 'COPIED 1.00' : `${box.label} ${currentConf.toFixed(2)}`}
              </div>
            )}
          </div>
        );
      })}

      {/* 4. Cursor-follow Reticle (desktop only, hover: hover, spring physics) */}
      <div
        ref={reticleRef}
        className="absolute top-0 left-0 w-7 h-7 pointer-events-none rounded-full border border-black/60 transition-colors duration-150 z-40 hidden sm:block will-change-transform opacity-0"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        {/* Crosshair Ticks (Top, Bottom, Left, Right) */}
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-black/80" />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-black/80" />
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-[1px] bg-black/80" />
        <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-[1px] bg-black/80" />
        {/* Center micro dot */}
        <span className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-black/40" />
      </div>

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
