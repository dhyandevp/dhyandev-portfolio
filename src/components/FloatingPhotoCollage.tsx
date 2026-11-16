import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import {
  aboutCollageConfig,
  PHOTO_SLOT_LAYOUTS,
  STICKER_SLOT_LAYOUTS,
  type CollagePhoto,
} from '../data/aboutCollageData';
import { renderStickerIcon, StickerTooltip } from './CollageStickers';

const SPRING_TRANSITION = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 20,
};

export const FloatingPhotoCollage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  // Track if page is visible & on-screen to pause idle loops
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [isCollageOnScreen, setIsCollageOnScreen] = useState<boolean>(false);

  // Parallax pointer offset (-1 to 1) for fine pointers only
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Z-index management for bring-to-front
  const initialZIndexMap = useMemo(() => {
    const map: Record<string, number> = {};
    aboutCollageConfig.photos.forEach((photo) => {
      const layout = PHOTO_SLOT_LAYOUTS[photo.slot];
      map[photo.id] = layout ? layout.zIndex : 2;
    });
    return map;
  }, []);

  const [zIndices, setZIndices] = useState<Record<string, number>>(initialZIndexMap);
  const [topPhotoSlot, setTopPhotoSlot] = useState<number>(1);
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);
  const [hoveredStickerId, setHoveredStickerId] = useState<string | null>(null);
  const [draggingPhotoId, setDraggingPhotoId] = useState<string | null>(null);

  // Detect pointer capability and screen size
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMedia = () => {
      setIsFinePointer(window.matchMedia('(pointer: fine) and (hover: hover)').matches);
      setIsMobile(window.innerWidth < 640);
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

  // Bring photo to front on click / tap / keyboard activate
  const bringPhotoToFront = useCallback(
    (photo: CollagePhoto) => {
      setZIndices((prev) => {
        const currentMax = Math.max(...Object.values(prev), 10);
        return {
          ...prev,
          [photo.id]: currentMax + 1,
        };
      });
      setTopPhotoSlot(photo.slot);
    },
    []
  );

  // Parallax mouse move handler (active on desktop fine pointer only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setPointerOffset({ x: relX * 2, y: relY * 2 }); // -1 to 1
  };

  const handleMouseLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
    setHoveredPhotoId(null);
    setHoveredStickerId(null);
  };

  // Filter visible items for mobile (<640px)
  // Mobile displays 4 photos (slots 1, 2, 3, 5) and 3 stickers (slots 1, 2, 3)
  const visiblePhotos = useMemo(() => {
    if (!isMobile) return aboutCollageConfig.photos;
    return aboutCollageConfig.photos.filter((p) => p.slot !== 4 && p.slot !== 6);
  }, [isMobile]);

  const visibleStickers = useMemo(() => {
    if (!isMobile) return aboutCollageConfig.stickers;
    return aboutCollageConfig.stickers.filter((s) => s.slot !== 4);
  }, [isMobile]);

  const isIdleActive = isTabVisible && isCollageOnScreen && !shouldReduceMotion;

  return (
    <section
      aria-label="Off the clock photo collage"
      className="w-full my-12 sm:my-16 select-none"
    >
      {/* Hidden screen-reader list of tools */}
      <ul className="sr-only">
        {aboutCollageConfig.stickers.map((s) => (
          <li key={s.id}>
            {s.isBrand ? `Tools I use: ${s.toolName}` : s.label}
          </li>
        ))}
      </ul>

      {/* Stage: 4:3 Aspect Ratio Container floating directly over page dot grid */}
      <div
        ref={containerRef}
        role="group"
        aria-label="Off the clock photos"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[720px] mx-auto aspect-[4/3] overflow-visible"
        style={{ perspective: 1000 }}
      >
        {/* 1. Photos Layer */}
        {visiblePhotos.map((photo) => {
          const layout = PHOTO_SLOT_LAYOUTS[photo.slot];
          if (!layout) return null;

          const isHero = photo.slot === 1;
          const currentZ = zIndices[photo.id] ?? layout.zIndex;
          const isHovered = hoveredPhotoId === photo.id;
          const isDragging = draggingPhotoId === photo.id;

          // Parallax depth calculation: up to 10px based on z-index
          const depthMultiplier = (layout.zIndex / 5) * 10;
          const parallaxX = isFinePointer && !shouldReduceMotion ? -pointerOffset.x * depthMultiplier : 0;
          const parallaxY = isFinePointer && !shouldReduceMotion ? -pointerOffset.y * depthMultiplier : 0;

          // Staggered entrance order based on initial z-index
          const entranceDelay = (layout.zIndex - 1) * 0.08;

          // Aspect ratio styling
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
              aria-label={`${photo.caption || photo.alt}. Press Enter to bring to front.`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  bringPhotoToFront(photo);
                }
              }}
              onClick={() => bringPhotoToFront(photo)}
              onMouseEnter={() => isFinePointer && setHoveredPhotoId(photo.id)}
              onMouseLeave={() => isFinePointer && setHoveredPhotoId(null)}
              // Drag capability with elastic return
              drag={!shouldReduceMotion}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.25}
              dragTransition={{ bounceStiffness: 260, bounceDamping: 20 }}
              onDragStart={() => setDraggingPhotoId(photo.id)}
              onDragEnd={() => setDraggingPhotoId(null)}
              // Positioning
              style={{
                position: 'absolute',
                left: `${layout.left}%`,
                top: `${layout.top}%`,
                width: `${layout.width}%`,
                zIndex: isHovered ? 40 : currentZ,
                willChange: isDragging ? 'transform' : 'auto',
              }}
              // Entrance & Idle animation
              initial={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1, rotate: layout.rotation }
                  : { opacity: 0, scale: 0.85, rotate: 0 }
              }
              animate={{
                opacity: isInView ? 1 : 0,
                scale: isHovered ? 1.04 : 1,
                rotate: isHovered
                  ? 0
                  : isIdleActive && !isDragging
                  ? [layout.rotation - 0.4, layout.rotation + 0.4, layout.rotation - 0.4]
                  : layout.rotation,
                x: parallaxX,
                y: parallaxY,
              }}
              transition={{
                scale: SPRING_TRANSITION,
                x: SPRING_TRANSITION,
                y: SPRING_TRANSITION,
                rotate: isHovered
                  ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                  : isIdleActive
                  ? {
                      duration: 7 + photo.slot * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : SPRING_TRANSITION,
                opacity: {
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : entranceDelay,
                },
              }}
              className="cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121211] focus-visible:ring-offset-4 rounded-[16px]"
            >
              {/* White-bordered photo print */}
              <div className="relative p-2 bg-white dark:bg-[#f4f4f2] rounded-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.10)] ring-1 ring-black/[0.06] transition-shadow duration-200 hover:shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
                <div
                  className={`relative overflow-hidden rounded-[10px] bg-[#EBEBE8] ${aspectClass} w-full`}
                >
                  <picture>
                    {photo.avif480 && photo.avif960 && (
                      <source
                        type="image/avif"
                        srcSet={`${photo.avif480} 480w, ${photo.avif960} 960w`}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 35vw, 360px"
                      />
                    )}
                    {photo.webp480 && photo.webp960 && (
                      <source
                        type="image/webp"
                        srcSet={`${photo.webp480} 480w, ${photo.webp960} 960w`}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 35vw, 360px"
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
                      className="w-full h-full object-cover transition-transform duration-300 pointer-events-none"
                      style={{ objectPosition: photo.focal }}
                    />
                  </picture>
                </div>

                {/* Caption Chip (Mono Pill) on hover */}
                {isHovered && isFinePointer && photo.caption && (
                  <div
                    role="status"
                    className="absolute -bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#121211]/90 backdrop-blur-md text-white font-mono text-[10px] sm:text-[11px] font-medium tracking-tight shadow-md border border-white/10 pointer-events-none z-30 animate-in fade-in slide-in-from-bottom-1 duration-150"
                  >
                    {photo.caption}
                  </div>
                )}
              </div>
            </m.div>
          );
        })}

        {/* 2. Stickers Layer */}
        {visibleStickers.map((sticker) => {
          const layout = STICKER_SLOT_LAYOUTS[sticker.slot];
          if (!layout) return null;

          const isHovered = hoveredStickerId === sticker.id;
          const parallaxMultiplier = 22; // stickers shift up to 22px
          const parallaxX = isFinePointer && !shouldReduceMotion ? -pointerOffset.x * parallaxMultiplier : 0;
          const parallaxY = isFinePointer && !shouldReduceMotion ? -pointerOffset.y * parallaxMultiplier : 0;

          // Pop in after photos
          const entranceDelay = 0.45 + sticker.slot * 0.06;

          const tileBg =
            sticker.theme === 'dark'
              ? 'bg-[#111110] text-white border border-white/10'
              : 'bg-white text-[#121211] border border-black/[0.08]';

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
                zIndex: 35,
              }}
              initial={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1, rotate: layout.rotation }
                  : { opacity: 0, scale: 0, rotate: layout.rotation - 15 }
              }
              animate={{
                opacity: isInView ? 1 : 0,
                scale: 1,
                rotate: isHovered
                  ? [layout.rotation - 10, layout.rotation + 10, layout.rotation]
                  : isIdleActive
                  ? [layout.rotation - 2, layout.rotation + 2, layout.rotation - 2]
                  : layout.rotation,
                y: isIdleActive
                  ? [parallaxY - 6, parallaxY + 6, parallaxY - 6]
                  : parallaxY,
                x: parallaxX,
              }}
              transition={{
                scale: SPRING_TRANSITION,
                opacity: { duration: 0.3, delay: shouldReduceMotion ? 0 : entranceDelay },
                rotate: isHovered
                  ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
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
              className="w-[52px] h-[52px] sm:w-16 sm:h-16 rounded-[18px] shadow-[0_6px_14px_rgba(0,0,0,0.12)] flex items-center justify-center cursor-pointer transition-shadow hover:shadow-[0_10px_20px_rgba(0,0,0,0.18)] select-none relative"
            >
              <div
                className={`w-full h-full rounded-[18px] flex items-center justify-center ${tileBg}`}
              >
                {renderStickerIcon(sticker.id, sticker.theme)}
              </div>

              {/* Tooltip on hover for brand tiles */}
              {sticker.isBrand && sticker.toolName && (
                <StickerTooltip
                  toolName={sticker.toolName}
                  isVisible={isHovered && isFinePointer}
                />
              )}
            </m.div>
          );
        })}
      </div>

      {/* 3. Caption Row Below Collage */}
      <div className="max-w-[720px] mx-auto mt-6 px-2 flex items-center justify-between border-t border-[#D6D5CF]/50 pt-4">
        <div className="space-y-0.5">
          <h3 className="text-[20px] font-[650] text-[#121211] leading-tight font-sans">
            {aboutCollageConfig.sectionTitle}
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#73736C]">
            {aboutCollageConfig.sectionSubtitle}
          </p>
        </div>

        <div className="font-mono text-[11px] text-[#73736C] tracking-widest">
          {String(topPhotoSlot).padStart(2, '0')} / {String(aboutCollageConfig.photos.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
};

export default FloatingPhotoCollage;
