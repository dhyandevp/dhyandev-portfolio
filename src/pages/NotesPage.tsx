import React from 'react';
import { m } from 'motion/react';
import { TechnicalNotesSection } from '../components/TechnicalNotesSection';
import { ContactSection } from '../components/ContactSection';
import { developerProfile } from '../data/portfolioData';
import { revealVariant } from '../lib/motion';

export const NotesPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Page Hero Header Banner */}
      <section className="w-full pt-20 sm:pt-28 md:pt-36 pb-14 sm:pb-18 border-b border-hairline bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial="hidden"
            animate="visible"
            variants={revealVariant}
            className="max-w-3xl"
          >
            <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-[#121211] tracking-tight leading-[1.08] mb-5">
              Laboratory Logs & Technical Thinking
            </h1>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans max-w-2xl">
              Documented insights from hands-on performance profiling: sub-50ms OpenCV perception loops,
              offline data reconciliation, local biometric verification, and resilient network topologies.
            </p>
          </m.div>
        </div>
      </section>

      {/* Complete Technical Notes Section */}
      <TechnicalNotesSection />

      {/* Reachout Section */}
      <ContactSection profile={developerProfile} />
    </div>
  );
};

export default NotesPage;
