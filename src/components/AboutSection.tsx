import React, { Suspense, lazy } from 'react';
import { m } from 'motion/react';
import {
  ExternalLink,
  Sparkles,
  Zap,
  Award,
  Terminal,
  Eye,
  Gamepad2,
} from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { revealVariant, standardViewport } from '../lib/motion';

const FloatingPhotoCollage = lazy(() => import('./FloatingPhotoCollage'));

interface AboutSectionProps {
  readonly profile: DeveloperProfile;
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
      skills: ['TypeScript', 'React 18', 'Tailwind CSS', 'Python 3', 'Node.js', 'WebSockets'],
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

        {/* 3. Floating Photo Collage (Off the clock) */}
        <Suspense fallback={<div className="w-full max-w-[720px] mx-auto aspect-[4/3] my-12 sm:my-16" />}>
          <FloatingPhotoCollage />
        </Suspense>

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
            <span>links.dhyandev.sbs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </m.div>

      </div>
    </section>
  );
};

export default AboutSection;
