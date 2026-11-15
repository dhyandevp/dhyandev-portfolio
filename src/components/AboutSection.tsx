import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { experienceHighlights } from '../data/portfolioData';

interface AboutSectionProps {
  readonly profile: DeveloperProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="w-full py-16 md:py-24 border-b border-hairline bg-white content-visibility-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Marker */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint mb-8 pb-3 border-b border-hairline">
          <span className="text-black font-semibold">[01]</span>
          <span>ABOUT & PHILOSOPHY</span>
          <span className="text-hairline">/</span>
          <span>DEVELOPMENT SPECIALIST</span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Narrative Bio */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-black tracking-tight leading-tight">
              Engineering deterministic systems with zero bloat and measurable substance.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
              <p>
                As a Development Specialist based in Kerala, India, I bridge the gap between deep systems-level
                software engineering and modern web product design. My background began with embedded hardware,
                networking, and bare-metal Linux servers before expanding into real-time computer vision and
                high-availability web applications.
              </p>
              <p>
                I believe the most valuable code is resilient, lightweight, and deterministic. Whether architecting
                an edge OpenCV pipeline to verify candidate identity locally or building an offline-first PWA
                with client IndexedDB storage, my approach focuses on eliminating latency and protecting data sovereignty.
              </p>
              <p>
                My background in gaming logic also reinforces my commitment to state machines, coordinate
                systems, and memory discipline—principles that keep complex applications fast and predictable.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#reachout"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-mono font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <span>INITIATE REACHOUT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-hairline text-black text-xs font-mono font-medium uppercase tracking-wider hover:border-black transition-colors"
              >
                <span>GITHUB // @{profile.handle}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Key Principles & Experience Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 md:p-8 bg-[#FAFAFA] border border-hairline space-y-6">
              <span className="block font-mono text-[11px] font-bold text-black uppercase tracking-wider">
                CORE TECHNICAL PRINCIPLES
              </span>

              <div className="space-y-5">
                {experienceHighlights.map((exp, idx) => (
                  <div key={idx} className="space-y-1.5 pb-4 border-b border-hairline/60 last:border-0 last:pb-0">
                    <h3 className="font-sans font-bold text-sm text-black flex items-center gap-2">
                      <span className="font-mono text-xs text-ink-faint">0{idx + 1}.</span>
                      {exp.title}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed pl-5">
                      {exp.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Spec Box */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 border border-hairline bg-white">
                <span className="block text-[10px] text-ink-faint uppercase mb-1">AVAILABILITY</span>
                <span className="font-bold text-black">Contracts & Advisory</span>
              </div>
              <div className="p-4 border border-hairline bg-white">
                <span className="block text-[10px] text-ink-faint uppercase mb-1">TIMEZONE</span>
                <span className="font-bold text-black">IST (UTC+05:30)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
