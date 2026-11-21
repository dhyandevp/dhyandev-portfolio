import React from 'react';
import { m } from 'motion/react';
import { Sparkles, Asterisk, ChevronsRight, ArrowRight } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';

import { heroTokens, specializations } from '../data/portfolioData';
import {
  wordMaskContainer,
  wordMaskChild,
  revealVariant,
  standardViewport,
  tapScale
} from '../lib/motion';
import { useRouter } from '../lib/router';

interface HeroProps {
  readonly profile: DeveloperProfile;
}

export const Hero: React.FC<HeroProps> = ({ profile: _profile }) => {
  const { navigate, path } = useRouter();
  const isResumeOpen = path === '/resume' || path === '/printer' || path === '/cv';

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

  return (
    <section className="w-full bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 sm:pt-28 md:pt-32 pb-0">
        {/* The Iconic Colossal Pixel Typography Name */}
        <m.div
          variants={revealVariant}
          initial="hidden"
          animate="visible"
          className="w-full pb-10 sm:pb-14 md:pb-18 border-b border-[#D6D5CF]/80"
        >
          <h1 className="font-pixel font-bold text-[12vw] sm:text-7xl md:text-8xl lg:text-[9.5rem] text-[#121211] tracking-tight leading-none select-none">
            Dhyandev P.
          </h1>
        </m.div>

        {/* Value Proposition Statement with word-by-word mask reveal */}
        <div className="max-w-3xl pt-12 sm:pt-16 md:pt-20 mb-14 sm:mb-20">
          <m.h2
            variants={wordMaskContainer}
            initial="hidden"
            animate="visible"
            className="font-sans text-2xl sm:text-3xl md:text-[36px] font-normal leading-[1.38] sm:leading-[1.42] tracking-tight"
          >
            {heroTokens.map((token, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-[0.28em] align-top">
                <m.span
                  variants={wordMaskChild}
                  className={`inline-block will-change-transform ${
                    token.isBold
                      ? 'font-bold text-[#121211]'
                      : 'font-normal text-[#71716A]'
                  }`}
                >
                  {token.text}
                </m.span>
              </span>
            ))}
          </m.h2>

          {/* Focused Primary Actions */}
          <m.div
            variants={revealVariant}
            initial="hidden"
            animate="visible"
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <m.a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                navigate('/projects');
              }}
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="px-6 py-3 bg-[#121211] text-[#F4F4F2] font-sans text-xs sm:text-[13px] font-semibold tracking-wide hover:bg-neutral-800 transition-colors duration-150 inline-flex items-center gap-2 shadow-xs cursor-pointer rounded-full select-none"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </m.a>
            <m.a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigate('/about');
              }}
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="px-6 py-3 border border-[#D6D5CF] bg-white/80 text-[#121211] font-sans text-xs sm:text-[13px] font-medium hover:bg-white hover:border-[#121211] transition-colors duration-150 inline-flex items-center shadow-xs cursor-pointer rounded-full select-none"
            >
              <span>Background & Bio</span>
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
