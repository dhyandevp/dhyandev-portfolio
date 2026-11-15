import React from 'react';
import { DeveloperProfile } from '../types/portfolio';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  readonly profile: DeveloperProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-hairline">
        <div className="space-y-1">
          <div className="font-signature text-3xl text-black select-none">
            Dhyandev
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-ink-muted">
            {profile.name} — {profile.title}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-sans text-ink-muted">
          <a href="#about" className="hover:text-black transition-colors">
            About Me
          </a>
          <a href="#projects" className="hover:text-black transition-colors font-medium text-black">
            Projects
          </a>
          <a href="#specializations" className="hover:text-black transition-colors">
            Specializations
          </a>
          <a href="#notes" className="hover:text-black transition-colors">
            Laboratory
          </a>
          <a href="#reachout" className="hover:text-black transition-colors">
            Contact
          </a>
          <a
            href={profile.linktreeUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition-colors font-mono font-medium underline underline-offset-4"
          >
            Linktree ↗
          </a>
        </nav>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-4 py-2 border border-hairline hover:border-black text-black text-xs font-mono uppercase tracking-wider transition-colors"
          aria-label="Scroll back to top"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-faint">
        <div>© {currentYear} Dhyandev P. All rights reserved.</div>
        <div>Engineered with React & Tailwind CSS.</div>
      </div>
    </footer>
  );
};
