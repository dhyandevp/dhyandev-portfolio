import React from 'react';
import { m } from 'motion/react';
import { DeveloperProfile } from '../types/portfolio';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '../lib/scroll';
import { tapScale } from '../lib/motion';

interface FooterProps {
  readonly profile: DeveloperProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-16 pb-12 sm:pb-16 px-6 md:px-12 border-t border-[#D6D5CF]/80 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* 1. Elsewhere Navigation & Direct Email */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#D6D5CF]/60 font-sans text-sm">
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

        {/* 2. Signature Brand Mark */}
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4 pb-4">
          <div className="space-y-1">
            <div className="font-signature text-4xl sm:text-5xl text-[#121211] select-none tracking-wide">
              Dhyandev
            </div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#6D6C66]">
              {profile.name} — Co-Founder @ Wayve Enterprises
            </p>
          </div>
        </div>

        {/* 3. Bottom Row: Copyright, Location & Back to Top */}
        <div className="pt-6 border-t border-[#D6D5CF]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#6D6C66]">
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
