import React from 'react';
import { ArrowUpRight, ExternalLink, Building2 } from 'lucide-react';
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
          <span>ABOUT & LEADERSHIP</span>
          <span className="text-hairline">/</span>
          <span>CO-FOUNDER @ WAYVE ENTERPRISES</span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Narrative Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F4F4] border border-hairline text-xs font-mono text-black font-semibold">
              <Building2 className="w-3.5 h-3.5 text-black" />
              <span>CO-FOUNDER, WAYVE ENTERPRISES</span>
            </div>

            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-black tracking-tight leading-tight">
              Engineering deterministic systems, real-time perception, and high-performance digital ventures.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
              <p>
                As Co-Founder of <strong>Wayve Enterprises</strong> and a Development Specialist based in Kerala, India,
                I bridge the gap between deep systems-level software engineering, embedded hardware, and modern web product design.
                My background began with bare-metal Linux servers, radio frequencies, and custom micro-controller firmware before expanding
                into applied computer vision, distributed telemetry, and zero-trust mesh architectures.
              </p>
              <p>
                At Wayve Enterprises, I direct our technical architecture and execution philosophy: zero bloat, deterministic state machines,
                and verifiable operational performance. Whether building edge OpenCV pipelines that verify spatial obstacles at sub-50ms latency
                or streaming multi-node IoT municipal sensor feeds, our systems are built to endure real-world constraints.
              </p>
              <p>
                My work is grounded in engineering truth over corporate theater. Every project carries verifiable code repositories, measurable latency metrics,
                and physical hardware validation.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#reachout"
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white text-xs font-mono font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <span>INITIATE REACHOUT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-hairline text-black text-xs font-mono font-medium uppercase tracking-wider hover:border-black transition-colors"
              >
                <span>GITHUB // @{profile.handle}</span>
              </a>

              <a
                href={profile.linktreeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-hairline bg-[#FAFAFA] text-black text-xs font-mono font-medium uppercase tracking-wider hover:border-black transition-colors"
              >
                <span>LINKTREE // ALL LINKS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Key Principles & Experience Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 md:p-8 bg-[#FAFAFA] border border-hairline space-y-6">
              <span className="block font-mono text-[11px] font-bold text-black uppercase tracking-wider">
                CORE TECHNICAL & VENTURE PRINCIPLES
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
                <span className="block text-[10px] text-ink-faint uppercase mb-1">VENTURE</span>
                <span className="font-bold text-black">Wayve Enterprises</span>
              </div>
              <div className="p-4 border border-hairline bg-white">
                <span className="block text-[10px] text-ink-faint uppercase mb-1">ALL PROFILES</span>
                <a href={profile.linktreeUrl} target="_blank" rel="noreferrer" className="font-bold text-black hover:underline block truncate">
                  linktr.ee/DhyandevRTX
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
