import React, { useState, useRef } from 'react';
import { m, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  X,
  Sparkles,
  Zap,
  Award,
  Terminal,
  Eye,
  Gamepad2,
  Maximize2
} from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { revealVariant, standardViewport, tapScale } from '../lib/motion';

interface AboutSectionProps {
  readonly profile: DeveloperProfile;
}

interface PhotoCardData {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  pixelatedSrc?: string;
  rotation: number;
  desktopPosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    zIndex: number;
  };
  aspectRatio: string;
}

interface CareerItem {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly iconType: 'wayve' | 'award' | 'gnome' | 'vision' | 'racing';
  readonly current?: boolean;
}

interface TechGroup {
  readonly title: string;
  readonly skills: readonly string[];
}

/** Official Formula 1 (F1) Vector Logo */
export const F1Logo: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.6 11.24h7.91L19.75 9H9.39c-2.85 0-3.62.34-5.17 1.81C2.71 12.3 0 15 0 15h3.38c.77-.75 2.2-2.13 2.85-2.75.92-.87 1.37-1.01 3.37-1.01zM20.39 9l-6 6H18l6-6h-3.61zm-3.25 2.61H9.88c-2.22 0-2.6.12-3.55 1.07C5.44 13.57 4 15 4 15h3.15l.75-.75c.49-.49.75-.55 1.78-.55h5.37l2.09-2.09z"
      fill="#E10600"
    />
  </svg>
);

/** Official Anthropic Claude Spark / Sunburst Logo */
export const ClaudeLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M256 0c14.7 0 26.7 12 26.7 26.7v162.9l115.1-66.5c12.7-7.4 29 3 26.5 17.6l-29.2 168.7 146 51.6c13.7 4.9 13.7 24.3 0 29.2l-146 51.6 29.2 168.7c2.5 14.6-13.8 25-26.5 17.6L282.7 322.4v162.9c0 14.7-12 26.7-26.7 26.7s-26.7-12-26.7-26.7V322.4l-115.1 66.5c-12.7 7.4-29-3-26.5-17.6l29.2-168.7-146-51.6c-13.7-4.9-13.7-24.3 0-29.2l146-51.6L99.2 77.7c-2.5-14.6 13.8-25 26.5-17.6l115.1 66.5V26.7C229.3 12 241.3 0 256 0z"
      fill="#D97757"
    />
  </svg>
);

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const [wa0044Pixelated, setWa0044Pixelated] = useState<boolean>(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoCardData | null>(null);

  // Focus lens state for the creative pixelated card
  const [lensPos, setLensPos] = useState<{ x: number; y: number }>({ x: 140, y: 100 });
  const [isLensHovered, setIsLensHovered] = useState<boolean>(false);
  const pixelCardRef = useRef<HTMLDivElement>(null);

  const handleLensMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pixelCardRef.current) return;
    const rect = pixelCardRef.current.getBoundingClientRect();
    setLensPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsLensHovered(true);
  };

  const handleLensTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!pixelCardRef.current || e.touches.length === 0) return;
    const rect = pixelCardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setLensPos({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
    setIsLensHovered(true);
  };

  const photoCards: PhotoCardData[] = [
    {
      id: 'bridge',
      title: 'River Crossing, Kerala',
      subtitle: 'Silhouette with motorcycle by the riverfront',
      src: '/images/about/bridge_motorcycle.webp',
      rotation: -8,
      desktopPosition: {
        top: '8%',
        left: '5%',
        zIndex: 10,
      },
      aspectRatio: 'aspect-[3/4]',
    },
    {
      id: 'selfie',
      title: 'Dhyandev, 16',
      subtitle: 'Selfie at school campus, Kerala',
      src: '/images/about/selfie_school.webp',
      rotation: 3,
      desktopPosition: {
        top: '3%',
        left: '34%',
        zIndex: 14,
      },
      aspectRatio: 'aspect-[4/3]',
    },
    {
      id: 'f1-redbull',
      title: 'Oracle Red Bull Racing',
      subtitle: 'Max Verstappen championship helmet — speed, telemetry & relentless precision',
      src: '/images/about/redbull_f1_helmet.webp',
      rotation: 8,
      desktopPosition: {
        top: '6%',
        right: '6%',
        zIndex: 12,
      },
      aspectRatio: 'aspect-[3/4]',
    },
    {
      id: 'zidane-river',
      title: 'Zidane 10 by the River, Kerala',
      subtitle: 'Contemplating systems by the river under monsoon storm clouds',
      src: '/images/about/zidane_river.webp',
      pixelatedSrc: '/images/about/zidane_river_pixelated.webp',
      rotation: -3,
      desktopPosition: {
        bottom: '3%',
        left: '26%',
        zIndex: 25,
      },
      aspectRatio: 'aspect-[3/4]',
    },
  ];

  const careerList: readonly CareerItem[] = [
    {
      company: 'Wayve Enterprises',
      role: 'Co-Founder & Technical Lead',
      period: '2025 — Present',
      iconType: 'wayve',
      current: true,
    },
    {
      company: 'SmartCity IoT / Sasthrolsavam',
      role: 'Systems Architect · Kannur District A-Grade Award',
      period: '2025 — 2026',
      iconType: 'award',
    },
    {
      company: 'GNOME Shell Extensions',
      role: 'Open Source Author (Lid Switch)',
      period: '2026 — Present',
      iconType: 'gnome',
    },
    {
      company: 'DrishyaSahayak.ai',
      role: 'Edge Computer Vision & Audio Perception Aid',
      period: '2025 — 2026',
      iconType: 'vision',
    },
    {
      company: 'Systems & Electronics Labs',
      role: 'Firmware, Linux Kernel & Sim Racing Telemetry',
      period: '2023 — Present',
      iconType: 'racing',
    },
  ];

  const techCategories: readonly TechGroup[] = [
    {
      title: 'Systems & Hardware',
      skills: ['Linux (Fedora/Debian)', 'C / C++', 'ESP32', 'Raspberry Pi 3B+', 'systemd', 'WireGuard'],
    },
    {
      title: 'Development & Web',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Python 3', 'WebSockets', 'Node.js'],
    },
    {
      title: 'AI & Computer Vision',
      skills: ['OpenCV', 'PyTorch', 'YOLOv8', 'MediaPipe', 'Edge AI', 'Haar Cascade'],
    },
    {
      title: 'Motorsport & Telemetry',
      skills: ['Logitech G Force Feedback', 'F1 Telemetry UDP', 'Sim Racing Setup', 'Arduino'],
    },
    {
      title: 'Tools & Infrastructure',
      skills: ['Git', 'GitHub', 'Docker Compose', 'Bash', 'Neovim', 'Vercel'],
    },
  ];

  const getMilestoneIcon = (iconType: string) => {
    switch (iconType) {
      case 'wayve':
        return <Zap className="w-4 h-4 text-[#121211]" />;
      case 'award':
        return <Award className="w-4 h-4 text-[#C59B27]" />;
      case 'gnome':
        return <Terminal className="w-4 h-4 text-[#2E7D32]" />;
      case 'vision':
        return <Eye className="w-4 h-4 text-[#1565C0]" />;
      case 'racing':
        return <Gamepad2 className="w-4 h-4 text-[#C62828]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#121211]" />;
    }
  };

  const lensRadius = 60;

  return (
    <section id="about" className="w-full py-20 sm:py-28 border-b border-[#D6D5CF]/80 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* 1. Header & Headline */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="mb-10 text-left"
        >
          <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#73736C] mb-4">
            ABOUT
          </span>

          <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-[46px] text-[#121211] tracking-tight leading-[1.14]">
            I&apos;m Dhyandev, a 16-year-old developer & systems builder in Kerala, India.
          </h2>
        </m.div>

        {/* 2. Narrative Bio */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="max-w-xl mx-auto space-y-5 text-[15px] sm:text-base text-[#575651] leading-relaxed font-sans mb-14 sm:mb-18"
        >
          <p>
            I&apos;m 16 years old, based in Kerala, India. Working directly in code and bare hardware lets me
            explore how systems behave while I&apos;m still figuring them out. I like being able to write an
            interaction or a low-level routine, test an edge case, and see real physical or digital signals respond immediately.
          </p>

          <p>
            I am a huge Formula 1 and <strong className="text-[#121211] font-semibold">Oracle Red Bull Racing</strong> fan.
            The obsession with aerodynamic efficiency, sub-millisecond telemetry, and relentless engineering execution inspires
            everything I build. When I&apos;m not compiling Linux kernels or training vision models, you&apos;ll find me analyzing
            race pace data or turning laps in the simulator with force feedback late into the night.
          </p>

          <p>
            As Co-Founder of <strong className="text-[#121211] font-semibold">Wayve Enterprises</strong>, I engineer deterministic
            systems: real-time edge computer vision pipelines achieving sub-50ms latency, open-source Linux tools like Lid Switch
            for GNOME Shell, distributed disaster telemetry, and containerized private infrastructure. No corporate theater — just clean,
            measurable performance.
          </p>
        </m.div>

        {/* 3. Central Photo Showcase Canvas (Aesthetic Cluster, No Small Text, F1 & Claude Logos) */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="w-full my-12 sm:my-16"
        >
          <div className="w-full p-4 sm:p-10 md:p-14 rounded-3xl sm:rounded-[36px] bg-white border border-[#E5E5E1] shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden select-none">
            
            {/* Desktop / Tablet: Floating Stack Canvas */}
            <div className="hidden sm:block relative w-full h-[470px] md:h-[510px]">
              
              {/* STICKER 1: Formula 1 Logo 3D Badge (Top-Left) */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.15, rotate: -4 }}
                className="absolute top-8 left-[23%] z-30 w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b from-[#242426] to-[#0D0D0E] text-white shadow-[0_12px_28px_rgba(0,0,0,0.3)] border border-white/20 flex items-center justify-center cursor-pointer -rotate-12 transition-transform"
                title="Formula 1 Racing"
              >
                <F1Logo className="w-8 h-8" />
              </m.div>

              {/* STICKER 2: Waving India 🇮🇳 Flag Sticker (Top-Right) */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.15, rotate: 6 }}
                className="absolute top-5 right-[26%] z-30 flex items-center justify-center p-2 rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] border border-[#E5E5E1] cursor-pointer rotate-12 transition-transform"
                title="India"
              >
                <span className="text-2xl sm:text-3xl leading-none">🇮🇳</span>
              </m.div>

              {/* STICKER 3: Claude (Anthropic) Spark 3D Badge (Bottom-Right) */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.15, rotate: 2 }}
                className="absolute bottom-10 right-[18%] z-30 w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b from-[#252220] to-[#12100E] shadow-[0_12px_28px_rgba(0,0,0,0.3)] border border-white/15 flex items-center justify-center cursor-pointer rotate-8 transition-transform"
                title="Claude AI"
              >
                <ClaudeLogo className="w-7 h-7" />
              </m.div>

              {/* Photo 1: Bridge Motorcycle Silhouette (Left) */}
              <m.div
                style={{
                  top: photoCards[0].desktopPosition.top,
                  left: photoCards[0].desktopPosition.left,
                  zIndex: photoCards[0].desktopPosition.zIndex,
                }}
                initial={{ rotate: photoCards[0].rotation }}
                whileHover={{
                  scale: 1.06,
                  rotate: 0,
                  zIndex: 35,
                  transition: { duration: 0.2 },
                }}
                whileTap={tapScale}
                onClick={() => setSelectedPhoto(photoCards[0])}
                className="absolute cursor-pointer group"
              >
                <div className="relative p-2 bg-white rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border-[3px] border-white group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)] transition-shadow">
                  <div className="overflow-hidden rounded-xl bg-[#EBEBE8] aspect-[3/4] w-44 sm:w-54 md:w-58 lg:w-62 relative">
                    <img
                      src={photoCards[0].src}
                      alt={photoCards[0].title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 p-1 rounded-full bg-white/80 backdrop-blur-sm text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </m.div>

              {/* Photo 2: School Campus Selfie (Top Center) */}
              <m.div
                style={{
                  top: photoCards[1].desktopPosition.top,
                  left: photoCards[1].desktopPosition.left,
                  zIndex: photoCards[1].desktopPosition.zIndex,
                }}
                initial={{ rotate: photoCards[1].rotation }}
                whileHover={{
                  scale: 1.06,
                  rotate: 0,
                  zIndex: 35,
                  transition: { duration: 0.2 },
                }}
                whileTap={tapScale}
                onClick={() => setSelectedPhoto(photoCards[1])}
                className="absolute cursor-pointer group"
              >
                <div className="relative p-2 bg-white rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border-[3px] border-white group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)] transition-shadow">
                  <div className="overflow-hidden rounded-xl bg-[#EBEBE8] aspect-[4/3] w-48 sm:w-56 md:w-60 lg:w-64 relative">
                    <img
                      src={photoCards[1].src}
                      alt={photoCards[1].title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 p-1 rounded-full bg-white/80 backdrop-blur-sm text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </m.div>

              {/* Photo 3: Max Verstappen Red Bull Helmet (Right) */}
              <m.div
                style={{
                  top: photoCards[2].desktopPosition.top,
                  right: photoCards[2].desktopPosition.right,
                  zIndex: photoCards[2].desktopPosition.zIndex,
                }}
                initial={{ rotate: photoCards[2].rotation }}
                whileHover={{
                  scale: 1.06,
                  rotate: 0,
                  zIndex: 35,
                  transition: { duration: 0.2 },
                }}
                whileTap={tapScale}
                onClick={() => setSelectedPhoto(photoCards[2])}
                className="absolute cursor-pointer group"
              >
                <div className="relative p-2 bg-white rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border-[3px] border-white group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)] transition-shadow">
                  <div className="overflow-hidden rounded-xl bg-[#EBEBE8] aspect-[3/4] w-44 sm:w-54 md:w-58 lg:w-62 relative">
                    <img
                      src={photoCards[2].src}
                      alt={photoCards[2].title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 p-1 rounded-full bg-white/80 backdrop-blur-sm text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </m.div>

              {/* Photo 4 (Center Front): Creative Pixelated Workstation & Sim Setup (WA0044) */}
              <m.div
                style={{
                  bottom: photoCards[3].desktopPosition.bottom,
                  left: photoCards[3].desktopPosition.left,
                  zIndex: photoCards[3].desktopPosition.zIndex,
                }}
                initial={{ rotate: photoCards[3].rotation }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 45,
                  transition: { duration: 0.2 },
                }}
                whileTap={tapScale}
                onClick={() => setSelectedPhoto(photoCards[3])}
                className="absolute cursor-pointer group"
              >
                <div className="relative p-2 sm:p-2.5 bg-white rounded-2xl shadow-[0_16px_45px_rgba(0,0,0,0.16)] border-[3px] border-white group-hover:shadow-[0_24px_55px_rgba(0,0,0,0.26)] transition-all">
                  <div
                    ref={pixelCardRef}
                    onMouseMove={handleLensMouseMove}
                    onMouseEnter={() => setIsLensHovered(true)}
                    onMouseLeave={() => setIsLensHovered(false)}
                    onTouchMove={handleLensTouchMove}
                    onTouchStart={() => setIsLensHovered(true)}
                    className="overflow-hidden rounded-xl bg-[#0B0D11] aspect-[3/4] w-48 sm:w-58 md:w-64 lg:w-70 relative cursor-crosshair select-none"
                  >
                    {/* Base Pixelated Layer */}
                    <img
                      src={photoCards[3].pixelatedSrc || photoCards[3].src}
                      alt={photoCards[3].title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                      style={{ imageRendering: 'pixelated' }}
                    />

                    {/* Subtle retro scanlines */}
                    <div
                      className="absolute inset-0 bg-[linear-gradient(rgba(18,18,17,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40"
                      aria-hidden="true"
                    />

                    {/* Interactive Reveal Lens (Shows sharp HD photo beneath cursor) */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        clipPath: isLensHovered
                          ? `circle(${lensRadius}px at ${lensPos.x}px ${lensPos.y}px)`
                          : 'circle(0px at 50% 50%)',
                        transition: isLensHovered ? 'none' : 'clip-path 0.3s ease-out',
                      }}
                    >
                      <img
                        src={photoCards[3].src}
                        alt="Sharp HD focus"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Minimalist reticle ring on hover (No small text!) */}
                    {isLensHovered && (
                      <div
                        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30"
                        style={{
                          left: `${lensPos.x}px`,
                          top: `${lensPos.y}px`,
                          width: `${lensRadius * 2}px`,
                          height: `${lensRadius * 2}px`,
                        }}
                      >
                        <div className="w-full h-full rounded-full border border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-white" />
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-0.5 bg-white" />
                        <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-0.5 bg-white" />
                        <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-1.5 w-0.5 bg-white" />
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 p-1 rounded-full bg-white/80 backdrop-blur-sm text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-xs z-20">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </m.div>

            </div>

            {/* Mobile View (<640px): Clean Polaroid Grid */}
            <div className="sm:hidden space-y-4 pt-2">
              
              {/* Mobile Sticker Bar */}
              <div className="flex items-center justify-center gap-4 pb-2">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-[#242426] to-[#0D0D0E] shadow-md border border-white/20 flex items-center justify-center">
                  <F1Logo className="w-6 h-6" />
                </div>
                <div className="p-2 rounded-2xl bg-white shadow-md border border-[#E5E5E1] text-xl flex items-center justify-center">
                  <span>🇮🇳</span>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-[#252220] to-[#12100E] shadow-md border border-white/15 flex items-center justify-center">
                  <ClaudeLogo className="w-5 h-5" />
                </div>
              </div>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {photoCards.map((card) => {
                  const isPixelCard = card.id === 'zidane-river';
                  const currentImageSrc = isPixelCard && wa0044Pixelated && card.pixelatedSrc
                    ? card.pixelatedSrc
                    : card.src;

                  return (
                    <div
                      key={card.id}
                      onClick={() => setSelectedPhoto(card)}
                      className="p-1.5 bg-white rounded-xl shadow-md border border-[#E5E5E1] cursor-pointer"
                    >
                      <div className={`overflow-hidden rounded-lg bg-[#EBEBE8] ${card.aspectRatio} relative`}>
                        <img
                          src={currentImageSrc}
                          alt={card.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          style={isPixelCard && wa0044Pixelated ? { imageRendering: 'pixelated' } : undefined}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </m.div>

        {/* 4. Career Milestones Table */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="max-w-xl mx-auto my-14 sm:my-20"
        >
          <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#121211] tracking-tight mb-8">
            Career
          </h3>

          <div className="space-y-6">
            {careerList.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-4 py-2 border-b border-[#E5E5E1]/60 last:border-0 hover:bg-[#F9F9F8] px-2 -mx-2 rounded-lg transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-[#F4F4F2] border border-[#E5E5E1] mt-0.5 shrink-0 group-hover:bg-white transition-colors">
                    {getMilestoneIcon(item.iconType)}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-sm sm:text-[15px] text-[#121211] group-hover:text-black flex items-center gap-2">
                      <span>{item.company}</span>
                      {item.current && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3F8A52] inline-block" title="Current Active Role" />
                      )}
                    </h4>
                    <p className="text-xs text-[#6D6C66] mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#73736C] shrink-0 pt-0.5">
                  {item.period}
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* 5. Tech Stack Section */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="max-w-xl mx-auto my-14 sm:my-20"
        >
          <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#121211] tracking-tight mb-8">
            Tech stack
          </h3>

          <div className="space-y-7">
            {techCategories.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <span className="block text-xs font-mono font-medium text-[#73736C] uppercase tracking-wider">
                  {cat.title}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#E5E5E1] text-xs font-sans text-[#222221] shadow-2xs hover:border-[#121211] transition-colors select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* 6. Quick Spec Callout & Links */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="max-w-xl mx-auto pt-6 border-t border-[#D6D5CF]/80 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#6D6C66]"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3F8A52]" />
            <span>Age 16 · Kerala, India · Formula 1 Fan</span>
          </div>

          <a
            href={profile.linktreeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[#121211] hover:underline font-semibold"
          >
            <span>linktr.ee/DhyandevRTX</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </m.div>

      </div>

      {/* Clean Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <m.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-white rounded-3xl p-4 sm:p-6 max-w-xl w-full shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0EE] mb-4">
                <h4 className="font-sans font-bold text-base text-[#121211]">
                  {selectedPhoto.title}
                </h4>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 rounded-full hover:bg-[#F4F4F2] text-[#121211] transition-colors cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl bg-[#0D1117] max-h-[420px] flex items-center justify-center mb-4">
                <img
                  src={
                    selectedPhoto.id === 'zidane-river'
                      ? (wa0044Pixelated && selectedPhoto.pixelatedSrc ? selectedPhoto.pixelatedSrc : selectedPhoto.src)
                      : selectedPhoto.src
                  }
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-[420px]"
                  style={selectedPhoto.id === 'zidane-river' && wa0044Pixelated ? { imageRendering: 'pixelated' } : undefined}
                />
              </div>

              {selectedPhoto.id === 'zidane-river' && (
                <div className="flex items-center justify-between pt-3 border-t border-[#F0F0EE]">
                  <span className="font-sans text-sm text-[#575651]">
                    Toggle Style:
                  </span>
                  <button
                    type="button"
                    onClick={() => setWa0044Pixelated(!wa0044Pixelated)}
                    className="px-4 py-1.5 rounded-full bg-[#121211] text-white hover:bg-neutral-800 transition-colors font-medium text-xs cursor-pointer"
                  >
                    {wa0044Pixelated ? 'Pixel Art (Active)' : 'Sharp HD'}
                  </button>
                </div>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutSection;
