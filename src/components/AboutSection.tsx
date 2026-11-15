import React, { useState } from 'react';
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
  isPixelatedDefault?: boolean;
  tag: string;
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

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  // WA0044 is pixelated by default as requested by user
  const [wa0044Pixelated, setWa0044Pixelated] = useState<boolean>(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoCardData | null>(null);

  const photoCards: PhotoCardData[] = [
    {
      id: 'bridge',
      title: 'River Crossing, Kerala',
      subtitle: 'Silhouette with motorcycle by the riverfront',
      src: '/images/about/bridge_motorcycle.webp',
      tag: 'Kerala // 11.87° N',
      rotation: -7,
      desktopPosition: {
        top: '6%',
        left: '4%',
        zIndex: 10,
      },
      aspectRatio: 'aspect-[3/4]',
    },
    {
      id: 'selfie',
      title: 'Dhyandev, 16',
      subtitle: 'Selfie at school campus, Kerala',
      src: '/images/about/selfie_school.webp',
      tag: '16 y/o builder',
      rotation: 3,
      desktopPosition: {
        top: '2%',
        left: '32%',
        zIndex: 15,
      },
      aspectRatio: 'aspect-[4/3]',
    },
    {
      id: 'f1-redbull',
      title: 'Oracle Red Bull Racing',
      subtitle: 'Max Verstappen championship helmet — speed, telemetry & relentless precision',
      src: '/images/about/redbull_f1_helmet.webp',
      tag: 'Red Bull F1 // #1',
      rotation: 7,
      desktopPosition: {
        top: '5%',
        right: '5%',
        zIndex: 12,
      },
      aspectRatio: 'aspect-[3/4]',
    },
    {
      id: 'wa0044-desk',
      title: 'Midnight Telemetry & Sim Racing (WA0044)',
      subtitle: 'Zidane 10 jersey, laptop glow, and 900° force feedback sim wheel',
      src: '/images/about/wa0044_desk_sim.webp',
      pixelatedSrc: '/images/about/wa0044_pixelated.webp',
      isPixelatedDefault: true,
      tag: 'WA0044 // 8-BIT',
      rotation: -3,
      desktopPosition: {
        bottom: '4%',
        right: '22%',
        zIndex: 25,
      },
      aspectRatio: 'aspect-[4/3]',
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

  return (
    <section id="about" className="w-full py-20 sm:py-28 border-b border-[#D6D5CF]/80 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* 1. Header & Headline (Matching Reference) */}
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

        {/* 2. Three-Paragraph Narrative Bio */}
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

        {/* 3. Central Photo Showcase / Floating Card Collage (Exact Match to Reference) */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="w-full my-12 sm:my-16"
        >
          <div className="w-full p-4 sm:p-8 md:p-12 rounded-3xl bg-white border border-[#E5E5E1] shadow-[0_16px_50px_rgba(0,0,0,0.05)] relative overflow-hidden select-none">
            
            {/* Top Bar inside Card: Label & Pixel toggle */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#F0F0EE] mb-4 sm:mb-8 text-xs font-mono text-[#73736C]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3F8A52] inline-block animate-pulse" />
                <span className="uppercase tracking-wider">COLLAGE // 4 VERIFIED MOMENTS</span>
              </div>
              <button
                type="button"
                onClick={() => setWa0044Pixelated(!wa0044Pixelated)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F4F4F2] hover:bg-[#EAEAEA] text-[#121211] font-medium text-[11px] transition-colors cursor-pointer border border-[#E0E0DC]"
                title="Toggle retro pixelation on WA0044"
              >
                <span>WA0044:</span>
                <span className={wa0044Pixelated ? 'text-[#C62828] font-bold font-pixel' : 'text-[#2E7D32] font-semibold'}>
                  {wa0044Pixelated ? '👾 8-BIT PIXELS' : '✨ SHARP HD'}
                </span>
              </button>
            </div>

            {/* Desktop / Tablet: Floating Stack Canvas */}
            <div className="hidden sm:block relative w-full h-[460px] md:h-[500px]">
              
              {/* Floating Sticker 1: 3D Dark Cube / Wayve Badge (Top-Left) */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.12, rotate: -6 }}
                className="absolute top-8 left-[22%] z-30 p-2.5 rounded-xl bg-[#121211] text-white shadow-xl border border-white/20 cursor-pointer -rotate-12 transition-transform"
                title="Wayve Enterprises // Co-Founder"
              >
                <Zap className="w-5 h-5 text-white" />
              </m.div>

              {/* Floating Sticker 2: India Flag Pill (Top-Right) */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, rotate: 6 }}
                className="absolute top-4 right-[25%] z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#121211] shadow-lg border border-[#E5E5E1] text-xs font-semibold cursor-pointer rotate-12 transition-transform"
                title="Kerala, India"
              >
                <span className="text-sm">🇮🇳</span>
                <span className="text-[11px] font-mono font-bold tracking-wider">IND</span>
              </m.div>

              {/* Floating Sticker 3: Oracle Red Bull Racing Emblem (Bottom-Left) */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, rotate: -2 }}
                className="absolute bottom-10 left-[8%] z-30 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#001A30] text-white shadow-xl border border-[#FCD700]/40 text-xs font-semibold cursor-pointer -rotate-6 transition-transform"
                title="Huge Formula 1 & Oracle Red Bull Racing Fan"
              >
                <span className="text-[#EA1D2D] font-black text-xs">ORACLE</span>
                <span className="text-[#FCD700] font-bold text-xs tracking-tight">RED BULL</span>
                <span className="px-1.5 py-0.2 bg-[#EA1D2D] text-white rounded text-[10px] font-mono font-bold">#1</span>
              </m.div>

              {/* Floating Sticker 4: Sim Racing Force Feedback (Bottom-Center) */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, rotate: 2 }}
                className="absolute bottom-6 left-[34%] z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#121211] shadow-lg border border-[#E5E5E1] text-xs font-semibold cursor-pointer rotate-3 transition-transform"
                title="900° Logitech Sim Wheel Setup"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-[#121211]" />
                <span className="text-[11px] font-mono">900° SIM FFB</span>
              </m.div>

              {/* Photos Layer */}
              {photoCards.map((card) => {
                const isWA0044 = card.id === 'wa0044-desk';
                const currentImageSrc = isWA0044
                  ? (wa0044Pixelated && card.pixelatedSrc ? card.pixelatedSrc : card.src)
                  : card.src;

                return (
                  <m.div
                    key={card.id}
                    style={{
                      top: card.desktopPosition.top,
                      bottom: card.desktopPosition.bottom,
                      left: card.desktopPosition.left,
                      right: card.desktopPosition.right,
                      zIndex: card.desktopPosition.zIndex,
                    }}
                    initial={{ rotate: card.rotation }}
                    whileHover={{
                      scale: 1.06,
                      rotate: 0,
                      zIndex: 40,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={tapScale}
                    onClick={() => setSelectedPhoto(card)}
                    className="absolute cursor-pointer group"
                  >
                    <div className="relative p-2 bg-white rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border-[3px] border-white group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)] transition-shadow">
                      <div className={`overflow-hidden rounded-xl bg-[#EBEBE8] ${card.aspectRatio} w-44 sm:w-56 md:w-60 lg:w-64 relative`}>
                        <img
                          src={currentImageSrc}
                          alt={card.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          style={isWA0044 && wa0044Pixelated ? { imageRendering: 'pixelated' } : undefined}
                        />

                        {/* Pixelated scanline overlay for WA0044 */}
                        {isWA0044 && wa0044Pixelated && (
                          <div
                            className="absolute inset-0 bg-[linear-gradient(rgba(18,18,17,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40"
                            aria-hidden="true"
                          />
                        )}

                        {/* Card Tag Badge */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono font-medium">
                          {card.tag}
                        </div>

                        {/* Expand hint icon on hover */}
                        <div className="absolute bottom-2 right-2 p-1 rounded-full bg-white/80 backdrop-blur-sm text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>

            {/* Mobile View (<640px): 2x2 Clean Polaroid Grid */}
            <div className="sm:hidden grid grid-cols-2 gap-3.5 pt-2">
              {photoCards.map((card) => {
                const isWA0044 = card.id === 'wa0044-desk';
                const currentImageSrc = isWA0044
                  ? (wa0044Pixelated && card.pixelatedSrc ? card.pixelatedSrc : card.src)
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
                        style={isWA0044 && wa0044Pixelated ? { imageRendering: 'pixelated' } : undefined}
                      />
                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-mono">
                        {card.tag}
                      </div>
                    </div>
                    <p className="mt-1.5 text-[11px] font-medium text-[#121211] truncate px-0.5">
                      {card.title}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Footer hint under photo collage */}
            <div className="mt-6 pt-4 border-t border-[#F0F0EE] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#73736C]">
              <span>Tap or hover any card to inspect details</span>
              <div className="flex items-center gap-2">
                <span>Racing Sim</span>
                <span>·</span>
                <span>Oracle Red Bull Racing</span>
                <span>·</span>
                <span>Kerala</span>
              </div>
            </div>
          </div>
        </m.div>

        {/* 4. Career Timeline Section (Matching Reference Exactly) */}
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

        {/* 5. Tech Stack Section (Matching Reference Exactly) */}
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

      {/* Lightbox Modal for Photo Details */}
      <AnimatePresence>
        {selectedPhoto && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <m.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-white rounded-2xl p-4 sm:p-6 max-w-lg w-full shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0EE] mb-4">
                <div>
                  <h4 className="font-sans font-bold text-base text-[#121211]">
                    {selectedPhoto.title}
                  </h4>
                  <p className="font-mono text-xs text-[#73736C]">
                    {selectedPhoto.tag}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 rounded-full hover:bg-[#F4F4F2] text-[#121211] transition-colors"
                  aria-label="Close photo preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-hidden rounded-xl bg-[#EBEBE8] max-h-[380px] flex items-center justify-center mb-4">
                <img
                  src={
                    selectedPhoto.id === 'wa0044-desk'
                      ? (wa0044Pixelated && selectedPhoto.pixelatedSrc ? selectedPhoto.pixelatedSrc : selectedPhoto.src)
                      : selectedPhoto.src
                  }
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-[380px]"
                  style={selectedPhoto.id === 'wa0044-desk' && wa0044Pixelated ? { imageRendering: 'pixelated' } : undefined}
                />
              </div>

              <p className="text-xs sm:text-sm text-[#575651] leading-relaxed mb-4">
                {selectedPhoto.subtitle}
              </p>

              {selectedPhoto.id === 'wa0044-desk' && (
                <div className="flex items-center justify-between pt-3 border-t border-[#F0F0EE] text-xs font-mono">
                  <span className="text-[#73736C]">Rendering Mode:</span>
                  <button
                    type="button"
                    onClick={() => setWa0044Pixelated(!wa0044Pixelated)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121211] text-white hover:bg-neutral-800 transition-colors"
                  >
                    <span>Toggle:</span>
                    <span className="font-bold">
                      {wa0044Pixelated ? '👾 Pixelated (Active)' : '✨ Sharp HD'}
                    </span>
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
