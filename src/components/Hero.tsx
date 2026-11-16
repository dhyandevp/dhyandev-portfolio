import React from 'react';
import { m } from 'motion/react';
import { Sparkles, Asterisk, ChevronsRight, ExternalLink, ArrowRight, Linkedin } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';

import { heroValueStatement, specializations } from '../data/portfolioData';
import {
  wordMaskContainer,
  wordMaskChild,
  revealVariant,
  standardViewport,
  tapScale
} from '../lib/motion';
import { useRouter } from '../lib/router';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface HeroProps {
  readonly profile: DeveloperProfile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const { navigate, path } = useRouter();
  const isResumeOpen = path === '/resume' || path === '/printer' || path === '/cv';
  const words = heroValueStatement.split(' ');

  const getCardIcon = (index: string) => {
    switch (index) {
      case '01':
        return <Sparkles className="w-5 h-5 text-[#121211]" />;
      case '02':
        return <Asterisk className="w-5 h-5 text-[#121211]" strokeWidth={2.5} />;
      case '03':
        return <ChevronsRight className="w-5 h-5 text-[#121211]" strokeWidth={2.5} />;
      default:
        return <Sparkles className="w-5 h-5 text-[#121211]" />;
    }
  };

  const instagramHref = profile.instagramUrl || 'https://instagram.com/Dhyandev_p';

  return (
    <section className="w-full bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 sm:pt-20 pb-0">
        {/* 1. Metadata Tag Row Above Name */}
        <m.div
          variants={revealVariant}
          initial="hidden"
          animate="visible"
          className="w-full flex justify-end mb-3 sm:mb-4"
        >
          <div className="text-[11px] sm:text-xs font-sans uppercase tracking-widest font-semibold text-[#121211]">
            CO-FOUNDER @ WAYVE ENTERPRISES
          </div>
        </m.div>

        {/* 2. The Iconic Colossal Pixel Typography Name + Social Badges (At the Top) */}
        <m.div
          variants={revealVariant}
          initial="hidden"
          animate="visible"
          className="w-full pb-8 sm:pb-12 md:pb-16 border-b border-[#D6D5CF]/80 flex flex-wrap items-center gap-3 sm:gap-6"
        >
          <div className="font-pixel font-bold text-[11.5vw] sm:text-7xl md:text-8xl lg:text-[9.5rem] text-[#121211] tracking-tight leading-none select-none">
            Dhyandev P.
          </div>

          <div className="flex items-center gap-2">
            {/* LinkedIn Badge Button beside name */}
            <m.a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 sm:w-10 sm:h-10 border border-[#121211] rounded-full flex items-center justify-center text-[#121211] hover:bg-[#121211] hover:text-white transition-colors"
              aria-label="LinkedIn profile of Dhyandev P."
              title="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </m.a>

            {/* Instagram Badge Button */}
            <m.a
              href={instagramHref}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 sm:w-10 sm:h-10 border border-[#121211] rounded-full flex items-center justify-center text-[#121211] hover:bg-[#121211] hover:text-white transition-colors"
              aria-label="Instagram profile of Dhyandev P."
              title="Instagram profile (@Dhyandev_p)"
            >
              <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </m.a>

            {/* Linktree Badge Button */}
            <m.a
              href={profile.linktreeUrl}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 sm:w-10 sm:h-10 border border-[#121211] rounded-full flex items-center justify-center text-[#121211] hover:bg-[#121211] hover:text-white transition-colors"
              aria-label="Links profile of Dhyandev P."
              title="Links profile (links.dhyandev.sbs)"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </m.a>
          </div>
        </m.div>

        {/* 3. Value Proposition Statement with word-by-word mask reveal */}
        <div className="max-w-3xl pt-10 sm:pt-14 mb-12 sm:mb-16">
          <m.h1
            variants={wordMaskContainer}
            initial="hidden"
            animate="visible"
            className="font-sans text-2xl sm:text-3xl md:text-[36px] text-[#121211] font-normal leading-[1.32] tracking-tight"
          >
            {words.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-[0.28em] align-top">
                <m.span
                  variants={wordMaskChild}
                  className="inline-block will-change-transform"
                >
                  {word}
                </m.span>
              </span>
            ))}
          </m.h1>

          {/* Quick Action Badges */}
          <m.div
            variants={revealVariant}
            initial="hidden"
            animate="visible"
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <m.a
              href="/resume"
              onClick={(e) => {
                e.preventDefault();
                navigate('/resume');
              }}
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="px-6 py-2.5 bg-black text-white font-sans text-xs sm:text-[13px] font-semibold tracking-wider hover:bg-neutral-800 transition-colors duration-150 inline-flex items-center shadow-xs cursor-pointer rounded-full select-none"
            >
              <span>RESUME</span>
            </m.a>
            <m.a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                navigate('/projects');
              }}
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="px-5 py-2.5 border border-[#D6D5CF] bg-[#E5E5E1]/80 text-[#121211] font-sans text-xs sm:text-[13px] font-medium hover:bg-[#D8D8D4] hover:border-black transition-colors duration-150 inline-flex items-center gap-2 shadow-xs cursor-pointer rounded-full select-none"
            >
              <span>Find projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </m.a>
            <m.a
              href={instagramHref}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="px-5 py-2.5 border border-[#D6D5CF] bg-[#E5E5E1]/80 text-[#121211] font-sans text-xs sm:text-[13px] font-medium hover:bg-[#D8D8D4] hover:border-black transition-colors duration-150 inline-flex items-center gap-1.5 shadow-xs cursor-pointer rounded-full select-none"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </m.a>
            <m.a
              href={profile.linktreeUrl}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="px-5 py-2.5 border border-[#D6D5CF] bg-[#E5E5E1]/80 text-[#121211] font-sans text-xs sm:text-[13px] font-medium hover:bg-[#D8D8D4] hover:border-black transition-colors duration-150 inline-flex items-center gap-1.5 shadow-xs cursor-pointer rounded-full select-none"
            >
              <span>Links</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </m.a>
          </m.div>
        </div>
      </div>

      {/* 4. Bottom 3-Card Horizontal Specialization Row */}
      <div className="w-full border-b border-[#D6D5CF]/80 bg-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D6D5CF]/80">
          {specializations.map((item) => (
            <m.div
              key={item.id}
              onClick={() => navigate('/specializations')}
              initial="hidden"
              whileInView="visible"
              viewport={standardViewport}
              variants={revealVariant}
              whileHover={{ y: -2 }}
              whileTap={tapScale}
              transition={{ duration: 0.25 }}
              className="p-6 md:p-8 flex items-start gap-4 hover:bg-[#E5E5E1]/60 transition-colors cursor-pointer select-none"
              title="Click to view full capabilities matrix"
            >
              {/* Rounded Gray Icon Box */}
              <div className="w-12 h-12 rounded-xl bg-[#E5E5E1]/80 backdrop-blur-sm flex items-center justify-center shrink-0">
                {getCardIcon(item.index)}
              </div>

              {/* Title & Concise Punchy Narrative */}
              <div className="space-y-1.5">
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#121211] tracking-tight">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6D6C66] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Clean, rounded black button with inside 'RESUME' in white, floating in Hero section */}
      {!isResumeOpen && (
        <m.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 print:hidden pointer-events-auto"
        >
          <m.button
            type="button"
            onClick={() => navigate('/resume')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={tapScale}
            className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-black hover:bg-neutral-900 text-white font-sans text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-colors duration-150 cursor-pointer select-none border border-neutral-800"
            aria-label="View Resume"
          >
            RESUME
          </m.button>
        </m.div>
      )}
    </section>
  );
};

export default Hero;
