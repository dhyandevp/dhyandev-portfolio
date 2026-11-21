import React from 'react';
import { m } from 'motion/react';
import { SpecializationsSection } from '../components/SpecializationsSection';
import { ContactSection } from '../components/ContactSection';
import { developerProfile } from '../data/portfolioData';
import { revealVariant } from '../lib/motion';

export const SpecializationsPage: React.FC = () => {
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
              Specializations & Production Tooling Matrix
            </h1>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans max-w-2xl">
              Comprehensive capabilities spanning edge machine perception, bare-metal server infrastructure,
              embedded IoT hardware telemetry, and resilient client-side web engineering.
            </p>
          </m.div>
        </div>
      </section>

      {/* Complete Specializations Section */}
      <SpecializationsSection />

      {/* Reachout Section */}
      <ContactSection profile={developerProfile} />
    </div>
  );
};

export default SpecializationsPage;
