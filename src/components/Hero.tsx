import React from 'react';
import { m } from 'motion/react';
import { Sparkles, Asterisk, ChevronsRight, ExternalLink, ArrowDown, Linkedin, Mail } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { specializations } from '../data/portfolioData';
import {
  revealVariant,
  standardViewport,
  tapScale,
  MOTION_EASE
} from '../lib/motion';

interface HeroProps {
  readonly profile: DeveloperProfile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 sm:pt-24 pb-14 sm:pb-20">
        {/* 1. Minimal Editorial Bio Statement matching Lucas Lima reference */}
        <div className="max-w-5xl">
          <m.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: MOTION_EASE }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.24] sm:leading-[1.18] tracking-tight text-[#8E8D88]"
          >
            Dhyandev P is a{' '}
            <span className="text-[#121211] font-medium">development specialist</span>{' '}
            and{' '}
            <span className="text-[#121211] font-medium">systems engineer</span>{' '}
            with a soft spot for complex problems, and a growing obsession with building things in code.
          </m.h1>

          {/* 2. Metadata & Quick Action Controls */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: MOTION_EASE }}
            className="mt-8 sm:mt-12 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[#D6D5CF]/60"
          >
            {/* Meta Credentials */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-sans text-[#6D6C66]">
              <span className="px-3 py-1 rounded-full bg-[#E5E5E1]/90 text-[#121211] font-semibold text-xs tracking-tight shadow-xs">
                Co-Founder @ Wayve Enterprises
              </span>
              <span className="text-[#D6D5CF] hidden sm:inline">/</span>
              <span>{profile.location}</span>
              <span className="text-[#D6D5CF] hidden sm:inline">/</span>
              <span className="font-mono">{profile.timezone}</span>
            </div>

            {/* Actions & Links */}
            <div className="flex flex-wrap items-center gap-3">
              <m.a
                href="#projects"
                whileTap={tapScale}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                className="px-4 py-2 rounded-full bg-[#121211] text-[#F4F4F2] font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </m.a>

              <m.a
                href={profile.linktreeUrl}
                target="_blank"
                rel="noreferrer"
                whileTap={tapScale}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                className="px-4 py-2 rounded-full border border-[#D6D5CF] bg-[#E5E5E1]/80 text-[#121211] font-mono text-xs uppercase tracking-wider hover:bg-[#D8D8D4] hover:border-black transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>LINKTREE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </m.a>

              <div className="flex items-center gap-1.5 pl-2">
                <m.a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileTap={tapScale}
                  whileHover={{ scale: 1.08 }}
                  className="w-8 h-8 rounded-full border border-[#D6D5CF] bg-[#E5E5E1]/80 hover:bg-[#121211] hover:text-white hover:border-black flex items-center justify-center text-[#121211] transition-colors"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                </m.a>

                <m.a
                  href={`mailto:${profile.email}`}
                  whileTap={tapScale}
                  whileHover={{ scale: 1.08 }}
                  className="w-8 h-8 rounded-full border border-[#D6D5CF] bg-[#E5E5E1]/80 hover:bg-[#121211] hover:text-white hover:border-black flex items-center justify-center text-[#121211] transition-colors"
                  aria-label="Send Email"
                  title="Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </m.a>
              </div>
            </div>
          </m.div>
        </div>
      </div>

      {/* 3. Bottom 3-Card Horizontal Specialization Row */}
      <div className="w-full border-t border-b border-[#D6D5CF]/80 bg-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D6D5CF]/80">
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
    </section>
  );
};

export default Hero;
