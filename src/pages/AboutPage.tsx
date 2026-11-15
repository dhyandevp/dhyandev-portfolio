import React from 'react';
import { m } from 'motion/react';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { developerProfile } from '../data/portfolioData';
import { revealVariant } from '../lib/motion';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Page Hero Header Banner */}
      <section className="w-full pt-16 sm:pt-24 pb-8 sm:pb-12 border-b border-hairline bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial="hidden"
            animate="visible"
            variants={revealVariant}
            className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint mb-6 pb-3 border-b border-hairline"
          >
            <span className="text-black font-semibold">[01]</span>
            <span>ABOUT & LEADERSHIP</span>
            <span className="text-hairline">/</span>
            <span>WAYVE ENTERPRISES</span>
          </m.div>

          <m.div
            initial="hidden"
            animate="visible"
            variants={revealVariant}
            className="max-w-4xl"
          >
            <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-[#121211] tracking-tight leading-[1.1] mb-4">
              Systems Architecture, Leadership & Engineering Truth
            </h1>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
              Co-Founder at Wayve Enterprises. Focusing on deterministic software execution, bare-metal Linux infrastructure,
              embedded micro-controllers, and applied computer vision systems built to withstand real-world conditions.
            </p>
          </m.div>
        </div>
      </section>

      {/* Complete About Section with photo collage and narratives */}
      <AboutSection profile={developerProfile} />

      {/* Reachout Section */}
      <ContactSection profile={developerProfile} />
    </div>
  );
};

export default AboutPage;
