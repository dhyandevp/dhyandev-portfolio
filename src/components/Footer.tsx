import React from 'react';
import { m } from 'motion/react';
import { DeveloperProfile } from '../types/portfolio';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '../lib/scroll';
import { MOTION_EASE, tapScale } from '../lib/motion';

interface FooterProps {
  readonly profile: DeveloperProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  // Letters for the monumental end wordmark
  const letters = ['D', 'h', 'y', 'a', 'n', 'd', 'e', 'v', ' ', 'P'];

  return (
    <footer className="w-full pt-20 pb-10 sm:pb-16 px-6 md:px-12 border-t border-[#D6D5CF]/80 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* 1. Elsewhere Navigation & Email Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 font-sans text-sm border-b border-[#D6D5CF]/60">
          <nav aria-label="Elsewhere" className="flex flex-wrap items-center gap-6 sm:gap-8 font-medium text-[#121211]">
            <m.a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              className="hover:text-black transition-colors underline-offset-4 hover:underline"
            >
              LinkedIn ↗
            </m.a>
            <m.a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              className="hover:text-black transition-colors underline-offset-4 hover:underline"
            >
              GitHub ↗
            </m.a>
            <m.a
              href={profile.linktreeUrl}
              target="_blank"
              rel="noreferrer"
              whileTap={tapScale}
              className="hover:text-black transition-colors underline-offset-4 hover:underline font-semibold"
            >
              Linktree ↗
            </m.a>
            {profile.instagramUrl && (
              <m.a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer"
                whileTap={tapScale}
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Instagram ↗
              </m.a>
            )}
          </nav>

          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs sm:text-sm text-[#6D6C66] hover:text-[#121211] transition-colors underline underline-offset-4"
          >
            {profile.email}
          </a>
        </div>

        {/* 2. Colossal "Dhyandev P" Monumental Typography at the End */}
        <div className="w-full select-none pt-8 sm:pt-12 pb-4 sm:pb-8 overflow-visible">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.035,
                },
              },
            }}
            className="w-full flex items-baseline justify-between tracking-[-0.05em] font-medium leading-[0.8] text-[#121211] pr-1 sm:pr-2"
            style={{ fontSize: 'clamp(36px, 11.2vw, 158px)' }}
            aria-label="Dhyandev P"
          >
            {letters.map((char, index) => (
              <m.span
                key={index}
                variants={{
                  hidden: { y: '105%', opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.7, ease: MOTION_EASE },
                  },
                }}
                className="inline-block hover:-translate-y-2 hover:text-neutral-500 transition-transform duration-300 cursor-default will-change-transform"
              >
                {char === ' ' ? '\u00A0' : char}
              </m.span>
            ))}
          </m.div>
        </div>

        {/* 3. Bottom Row: Copyright, Location & Back to Top */}
        <div className="pt-6 sm:pt-8 border-t border-[#D6D5CF]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#6D6C66]">
          <div>© {currentYear} Dhyandev P. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>{profile.location} · {profile.timezone}</span>
            <m.button
              type="button"
              onClick={scrollToTop}
              whileTap={tapScale}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D6D5CF] hover:border-black text-[#121211] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-full"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </m.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
