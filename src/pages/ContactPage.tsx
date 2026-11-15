import React from 'react';
import { m } from 'motion/react';
import { ContactSection } from '../components/ContactSection';
import { developerProfile } from '../data/portfolioData';
import { revealVariant } from '../lib/motion';

export const ContactPage: React.FC = () => {
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
            <span className="text-black font-semibold">[05]</span>
            <span>DIRECT REACHOUT</span>
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
              Initiate Contact & Technical Inquiry
            </h1>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
              Connect directly for technical advisory, computer vision system design, distributed IoT architectures,
              or selective venture engagements.
            </p>
          </m.div>
        </div>
      </section>

      {/* Complete Contact Section with vision HUD */}
      <ContactSection profile={developerProfile} />
    </div>
  );
};

export default ContactPage;
