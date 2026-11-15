import React from 'react';
import { m } from 'motion/react';
import { ArrowRight, Building2 } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ContactSection } from '../components/ContactSection';
import { developerProfile, technicalNotes } from '../data/portfolioData';
import { revealVariant, standardViewport } from '../lib/motion';
import { Link } from '../lib/router';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section with Colossal Pixel Wordmark and Value Statement */}
      <Hero profile={developerProfile} />

      {/* 2. About & Leadership Teaser Banner */}
      <section className="w-full py-16 md:py-24 border-b border-hairline bg-transparent content-visibility-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={standardViewport}
              variants={revealVariant}
              className="lg:col-span-8 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F4F4] border border-hairline text-xs font-mono text-black font-semibold">
                <Building2 className="w-3.5 h-3.5 text-black" />
                <span>CO-FOUNDER, WAYVE ENTERPRISES</span>
              </div>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-black tracking-tight leading-tight">
                Architecting zero-bloat systems with verifiable operational performance.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
                At Wayve Enterprises, I direct our software systems and hardware ventures. We build deterministic,
                real-time technologies designed to withstand network dropouts, physical constraints, and real-world loads.
              </p>
            </m.div>

            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={standardViewport}
              variants={revealVariant}
              className="lg:col-span-4 flex flex-col gap-3 justify-center"
            >
              <Link
                to="/about"
                className="inline-flex items-center justify-between gap-2 px-5 py-4 bg-[#121211] text-[#F4F4F2] text-xs font-mono font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-xs rounded-sm"
              >
                <span>FULL BACKGROUND & BIO</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/specializations"
                className="inline-flex items-center justify-between gap-2 px-5 py-4 border border-hairline bg-white text-black text-xs font-mono font-medium uppercase tracking-wider hover:border-black transition-colors rounded-sm"
              >
                <span>CAPABILITIES MATRIX</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </m.div>
          </div>
        </div>
      </section>

      {/* 4. Laboratory Logs Teaser */}
      <section className="w-full py-16 md:py-24 border-b border-hairline bg-transparent content-visibility-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {technicalNotes.slice(0, 2).map((note) => (
              <div
                key={note.id}
                className="p-6 md:p-8 border border-hairline bg-white/80 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline/80 font-mono text-xs text-ink-muted">
                    <span className="font-bold text-black">{note.code}</span>
                    <span>{note.topic}</span>
                  </div>
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-black tracking-tight mb-2">
                    {note.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans mb-4">
                    {note.description}
                  </p>
                  <div className="p-3 bg-[#F9F9F8] border border-hairline text-xs font-mono text-black leading-relaxed">
                    <strong>Takeaway:</strong> {note.keyTakeaway}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Link
              to="/notes"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-black hover:underline"
            >
              <span>READ ALL LABORATORY NOTES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <ContactSection profile={developerProfile} />
    </div>
  );
};

export default HomePage;
