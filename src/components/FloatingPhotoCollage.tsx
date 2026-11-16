import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import {
  aboutCollageConfig,
  PHOTO_SLOT_LAYOUTS,
  STICKER_SLOT_LAYOUTS,
  type CollagePhoto,
} from '../data/aboutCollageData';
import { renderStickerIcon } from './CollageStickers';

const SPRING_TRANSITION = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 20,
};

export const FloatingPhotoCollage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();

  // Track if page is visible & on-screen to pause idle loops
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [isCollageOnScreen, setIsCollageOnScreen] = useState<boolean>(false);

  // Parallax pointer offset (-1 to 1) for fine pointers only
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState<boolean>(false);

  // Dynamic Z-indices for bring-to-front
  const initialZIndexMap = useMemo(() => {
    const map: Record<string, number> = {};
    aboutCollageConfig.photos.forEach((photo) => {
      const layout = PHOTO_SLOT_LAYOUTS[photo.slot];
      map[photo.id] = layout ? layout.zIndex : 10;
    });
    return map;
  }, []);

  const [zIndices, setZIndices] = useState<Record<string, number>>(initialZIndexMap);
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);
  const [hoveredStickerId, setHoveredStickerId] = useState<string | null>(null);
  const [draggingPhotoId, setDraggingPhotoId] = useState<string | null>(null);

  // Detect pointer capability
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMedia = () => {
      setIsFinePointer(window.matchMedia('(pointer: fine) and (hover: hover)').matches);
    };
    checkMedia();
    window.addEventListener('resize', checkMedia);
    return () => window.removeEventListener('resize', checkMedia);
  }, []);

  // Listen to tab visibility
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // IntersectionObserver for continuous idle pausing when scrolled away
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCollageOnScreen(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Bring photo to front on click / tap / keyboard
  const bringPhotoToFront = useCallback((photo: CollagePhoto) => {
    setZIndices((prev) => {
      const currentMax = Math.max(...Object.values(prev), 25);
      return {
        ...prev,
        [photo.id]: currentMax + 1,
      };
    });
  }, []);

  // Parallax mouse move handler (active on desktop fine pointer only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setPointerOffset({ x: relX * 2, y: relY * 2 });
  };

  const handleMouseLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
    setHoveredPhotoId(null);
    setHoveredStickerId(null);
  };

  const isIdleActive = isTabVisible && isCollageOnScreen && !shouldReduceMotion;

  return (
    <div className="w-full my-10 sm:my-16 select-none">
      {/* Hyperrealistic Curvy Card Container */}
      <div className="w-full max-w-4xl mx-auto rounded-[32px] sm:rounded-[44px] md:rounded-[48px] bg-white border border-[#E5E5E1] shadow-[0_24px_70px_rgba(0,0,0,0.06)] p-3 sm:p-8 md:p-12 lg:p-14 relative overflow-hidden">
        
        {/* Stage: 4:3 Aspect Ratio Container */}
        <div
          ref={containerRef}
          role="group"
          aria-label="Photo collage showcase"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-[4/3] overflow-visible"
          style={{ perspective: 1200 }}
        >
          {/* 1. Photos Layer */}
          {aboutCollageConfig.photos.map((photo) => {
            const layout = PHOTO_SLOT_LAYOUTS[photo.slot];
            if (!layout) return null;

            const isHero = photo.slot === 1;
            const currentZ = zIndices[photo.id] ?? layout.zIndex;
            const isHovered = hoveredPhotoId === photo.id;
            const isDragging = draggingPhotoId === photo.id;

            // Parallax depth calculation: subtle 6-10px shift
            const depthMultiplier = (layout.zIndex / 25) * 8;
            const parallaxX = isFinePointer && !shouldReduceMotion ? -pointerOffset.x * depthMultiplier : 0;
            const parallaxY = isFinePointer && !shouldReduceMotion ? -pointerOffset.y * depthMultiplier : 0;

            const aspectClass =
              layout.aspect === '16:9'
                ? 'aspect-[16/9]'
                : layout.aspect === '4:5'
                ? 'aspect-[4/5]'
                : 'aspect-[3/4]';

            return (
              <m.div
                key={photo.id}
                tabIndex={0}
                role="button"
                aria-label={photo.alt}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    bringPhotoToFront(photo);
                  }
                }}
                onClick={() => bringPhotoToFront(photo)}
                onMouseEnter={() => isFinePointer && setHoveredPhotoId(photo.id)}
                onMouseLeave={() => isFinePointer && setHoveredPhotoId(null)}
                drag={!shouldReduceMotion}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.22}
                dragTransition={{ bounceStiffness: 260, bounceDamping: 20 }}
                onDragStart={() => setDraggingPhotoId(photo.id)}
                onDragEnd={() => setDraggingPhotoId(null)}
                style={{
                  position: 'absolute',
                  left: `${layout.left}%`,
                  top: `${layout.top}%`,
                  width: `${layout.width}%`,
                  zIndex: isHovered ? 45 : currentZ,
                  willChange: isDragging ? 'transform' : 'auto',
                }}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1, rotate: layout.rotation }
                    : { opacity: 0, scale: 0.88, rotate: 0 }
                }
                animate={{
                  opacity: isInView ? 1 : 0,
                  scale: isHovered ? 1.04 : 1,
                  rotate: isHovered
                    ? 0
                    : isIdleActive && !isDragging
                    ? [layout.rotation - 0.35, layout.rotation + 0.35, layout.rotation - 0.35]
                    : layout.rotation,
                  x: parallaxX,
                  y: parallaxY,
                }}
                transition={{
                  scale: SPRING_TRANSITION,
                  x: SPRING_TRANSITION,
                  y: SPRING_TRANSITION,
                  rotate: isHovered
                    ? { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                    : isIdleActive
                    ? {
                        duration: 7 + photo.slot * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : SPRING_TRANSITION,
                  opacity: {
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : (layout.zIndex / 25) * 0.15,
                  },
                }}
                className="cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121211] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] group"
              >
                {/* Hyperrealistic Curvy White Border Print */}
                <div
                  className={`relative p-2 sm:p-2.5 md:p-3 bg-white rounded-[24px] sm:rounded-[28px] md:rounded-[32px] border border-black/[0.04] transition-shadow duration-300 ${
                    isHero
                      ? 'shadow-[0_22px_60px_rgba(0,0,0,0.22),0_8px_20px_rgba(0,0,0,0.10)] group-hover:shadow-[0_32px_80px_rgba(0,0,0,0.30)]'
                      : 'shadow-[0_16px_45px_rgba(0,0,0,0.14),0_6px_16px_rgba(0,0,0,0.08)] group-hover:shadow-[0_28px_65px_rgba(0,0,0,0.24)]'
                  }`}
                >
                  <div
                    className={`relative overflow-hidden rounded-[18px] sm:rounded-[22px] md:rounded-[26px] bg-[#EBEBE8] ${aspectClass} w-full`}
                  >
                    <picture>
                      {photo.avif480 && photo.avif960 && (
                        <source
                          type="image/avif"
                          srcSet={`${photo.avif480} 480w, ${photo.avif960} 960w`}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 420px"
                        />
                      )}
                      {photo.webp480 && photo.webp960 && (
                        <source
                          type="image/webp"
                          srcSet={`${photo.webp480} 480w, ${photo.webp960} 960w`}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 420px"
                        />
                      )}
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading={isHero ? 'eager' : 'lazy'}
                        decoding={isHero ? 'sync' : 'async'}
                        // @ts-expect-error fetchPriority supported in modern browsers
                        fetchpriority={isHero ? 'high' : 'auto'}
                        width={photo.width}
                        height={photo.height}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102 pointer-events-none"
                        style={{ objectPosition: photo.focal }}
                      />
                    </picture>
                  </div>
                </div>
              </m.div>
            );
          })}

          {/* 2. Hyperrealistic 3D Stickers Layer */}
          {aboutCollageConfig.stickers.map((sticker) => {
            const layout = STICKER_SLOT_LAYOUTS[sticker.slot];
            if (!layout) return null;

            const isHovered = hoveredStickerId === sticker.id;
            const parallaxMultiplier = 16;
            const parallaxX = isFinePointer && !shouldReduceMotion ? -pointerOffset.x * parallaxMultiplier : 0;
            const parallaxY = isFinePointer && !shouldReduceMotion ? -pointerOffset.y * parallaxMultiplier : 0;

            const isFlag = sticker.id === 'india-flag-3d';

            return (
              <m.div
                key={sticker.id}
                aria-hidden="true"
                onMouseEnter={() => isFinePointer && setHoveredStickerId(sticker.id)}
                onMouseLeave={() => isFinePointer && setHoveredStickerId(null)}
                style={{
                  position: 'absolute',
                  left: `${layout.left}%`,
                  top: `${layout.top}%`,
                  zIndex: layout.zIndex,
                }}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1, rotate: layout.rotation }
                    : { opacity: 0, scale: 0, rotate: layout.rotation - 12 }
                }
                animate={{
                  opacity: isInView ? 1 : 0,
                  scale: isHovered ? 1.15 : 1,
                  rotate: isHovered
                    ? layout.rotation + 6
                    : isIdleActive
                    ? [layout.rotation - 1.5, layout.rotation + 1.5, layout.rotation - 1.5]
                    : layout.rotation,
                  y: isIdleActive
                    ? [parallaxY - 4, parallaxY + 4, parallaxY - 4]
                    : parallaxY,
                  x: parallaxX,
                }}
                transition={{
                  scale: SPRING_TRANSITION,
                  opacity: { duration: 0.3, delay: shouldReduceMotion ? 0 : 0.35 + sticker.slot * 0.08 },
                  rotate: isHovered
                    ? { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                    : isIdleActive
                    ? {
                        duration: 4.5 + sticker.slot * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : SPRING_TRANSITION,
                  y: isIdleActive
                    ? {
                        duration: 4.8 + sticker.slot * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : SPRING_TRANSITION,
                  x: SPRING_TRANSITION,
                }}
                className={
                  isFlag
                    ? 'w-13 h-9 sm:w-16 sm:h-11 md:w-20 md:h-14 cursor-pointer select-none flex items-center justify-center'
                    : 'w-12 h-12 sm:w-15 sm:h-15 md:w-17 md:h-17 rounded-[18px] sm:rounded-[22px] md:rounded-[24px] bg-gradient-to-b from-[#2C2C30] via-[#1B1B1E] to-[#0D0D10] border border-white/20 shadow-[0_14px_32px_rgba(0,0,0,0.35)] flex items-center justify-center cursor-pointer select-none transition-shadow hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]'
                }
              >
                {renderStickerIcon(sticker.id)}
              </m.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FloatingPhotoCollage;
