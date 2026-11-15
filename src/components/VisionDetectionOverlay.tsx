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
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Measure all [data-vision-target] relative to section container
  const measureTargets = useCallback(() => {
    if (!sectionRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
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

  useEffect(() => {
    measureTargets();

    // Debounced ResizeObserver
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
      className="absolute inset-0 pointer-events-none select-none z-20 overflow-hidden"
    >
      {boxes.map((box) => (
        <div
          key={box.id}
          className="absolute transition-opacity duration-300"
          style={{
            top: `${box.rect.top}px`,
            left: `${box.rect.left}px`,
            width: `${box.rect.width}px`,
            height: `${box.rect.height}px`,
            opacity: 0.35,
          }}
        >
          {/* L-shaped Corner Brackets (10px arms) */}
          {/* Top-Left */}
          <div className="absolute top-0 left-0 w-[10px] h-[10px] border-t border-l border-black" />
          {/* Top-Right */}
          <div className="absolute top-0 right-0 w-[10px] h-[10px] border-t border-r border-black" />
          {/* Bottom-Left */}
          <div className="absolute bottom-0 left-0 w-[10px] h-[10px] border-b border-l border-black" />
          {/* Bottom-Right */}
          <div className="absolute bottom-0 right-0 w-[10px] h-[10px] border-b border-r border-black" />

          {/* Micro Label Tag attached to Top-Left */}
          <div className="absolute -top-[19px] left-0 bg-black text-white font-mono text-[9px] sm:text-[10px] uppercase font-semibold px-1.5 py-[2px] leading-tight tracking-wider whitespace-nowrap shadow-xs">
            {box.label} {box.confidence.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisionDetectionOverlay;
