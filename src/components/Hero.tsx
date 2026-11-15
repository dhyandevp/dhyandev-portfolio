import React from 'react';
import { m } from 'motion/react';
import { Linkedin, Sparkles, Asterisk, ChevronsRight, ExternalLink, ArrowDown } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { heroValueStatement, specializations } from '../data/portfolioData';
import {
  wordMaskContainer,
  wordMaskChild,
  revealVariant,
  standardViewport,
  tapScale
} from '../lib/motion';

interface HeroProps {
  readonly profile: DeveloperProfile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const words = heroValueStatement.split(' ');

  const getCardIcon = (index: string) => {
    switch (index) {
      case '01':
        return <Sparkles className="w-5 h-5 text-black" />;
      case '02':
        return <Asterisk className="w-5 h-5 text-black" strokeWidth={2.5} />;
      case '03':
        return <ChevronsRight className="w-5 h-5 text-black" strokeWidth={2.5} />;
      default:
        return <Sparkles className="w-5 h-5 text-black" />;
    }
  };

  return (
    <section className="w-full bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-0">
        {/* 1. Value Proposition Statement with word-by-word mask reveal */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <m.h1
            variants={wordMaskContainer}
            initial="hidden"
            animate="visible"
            className="font-sans text-2xl sm:text-3xl md:text-[34px] text-black font-normal leading-[1.35] tracking-tight"
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
              href="#projects"
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              className="px-4 py-2 bg-black text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </m.a>
            <m.a
              href={profile.linktreeUrl}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              whileHover={{ scale: 1.02 }}
              className="px-4 py-2 border border-hairline bg-[#FAFAFA] text-black font-mono text-xs uppercase tracking-wider hover:border-black transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>LINKTREE // ALL LINKS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </m.a>
          </m.div>
        </div>

        {/* 2. Metadata Tag Row Above Name */}
        <m.div
          variants={revealVariant}
          initial="hidden"
          animate="visible"
          className="w-full flex justify-end mb-4"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-[11px] sm:text-xs font-sans uppercase tracking-widest text-ink-muted">
            <span className="font-semibold text-black">CO-FOUNDER @ WAYVE ENTERPRISES</span>
            <span className="text-ink-faint font-mono font-light">+</span>
            <span>SYSTEMS & APPLIED AI</span>
            <span className="text-ink-faint font-mono font-light">+</span>
            <span>KERALA, IND</span>
          </div>
        </m.div>

        {/* 3. Colossal Pixel Typography Name + Social Buttons */}
        <m.div
          variants={revealVariant}
          initial="hidden"
          animate="visible"
          className="w-full pb-12 sm:pb-16 md:pb-24 border-b border-hairline flex flex-wrap items-center gap-3 sm:gap-6"
        >
          <div className="font-pixel font-bold text-[11vw] sm:text-7xl md:text-8xl lg:text-[9.5rem] text-black tracking-tight leading-none select-none">
            {profile.name}
          </div>

          <div className="flex items-center gap-2">
            {/* LinkedIn Badge Button beside name */}
            <m.a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              whileHover={{ scale: 1.05 }}
              className="w-7 h-7 sm:w-9 sm:h-9 border border-black rounded flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
              aria-label="LinkedIn profile of Dhyandev P."
              title="LinkedIn profile"
            >
              <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            </m.a>

            {/* Linktree Badge Button */}
            <m.a
              href={profile.linktreeUrl}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              whileHover={{ scale: 1.05 }}
              className="w-7 h-7 sm:w-9 sm:h-9 border border-black rounded flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
              aria-label="Linktree of Dhyandev P."
              title="Linktree profile"
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </m.a>
          </div>
        </m.div>
      </div>

      {/* 4. Bottom 3-Card Horizontal Tile Row */}
      <div className="w-full border-b border-hairline bg-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline">
          {specializations.map((item) => (
            <m.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={standardViewport}
              variants={revealVariant}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25 }}
              className="p-6 md:p-8 flex items-start gap-4 hover:bg-[#E5E5E1]/40 transition-colors"
            >
              {/* Rounded Gray Icon Box */}
              <div className="w-12 h-12 rounded-xl bg-[#E5E5E1]/80 backdrop-blur-sm flex items-center justify-center shrink-0">
                {getCardIcon(item.index)}
              </div>

              {/* Title & Concise Punchy Narrative */}
              <div className="space-y-1.5">
                <h3 className="font-sans font-bold text-base sm:text-lg text-black tracking-tight">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
