import React from 'react';
import { m } from 'motion/react';
import { DeveloperProfile } from '../types/portfolio';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '../lib/scroll';
import { tapScale } from '../lib/motion';
import { useRouter } from '../lib/router';

interface FooterProps {
  readonly profile: DeveloperProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const { navigate } = useRouter();

  return (
    <footer
      className="w-full pt-12 sm:pt-16 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pb-10 px-4 sm:px-6 md:px-8 border-t border-[#D6D5CF]/80 bg-transparent overflow-hidden"
      style={{ containerType: 'inline-size' }}
    >
      <div className="w-full space-y-8 sm:space-y-12">
        {/* Top Header Row: Social Links & Email + Square Top Button (media_1794725967229.png) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans text-xs sm:text-sm">
          <nav aria-label="Elsewhere" className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 text-[#71716A]">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#121211] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-[#A3A299] select-none">·</span>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#121211] transition-colors"
            >
              GitHub
            </a>
            <span className="text-[#A3A299] select-none">·</span>
            <a
              href={profile.linktreeUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#121211] transition-colors"
            >
              Linktree
            </a>
            {profile.instagramUrl && (
              <>
                <span className="text-[#A3A299] select-none">·</span>
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#121211] transition-colors"
                >
                  Instagram
                </a>
              </>
            )}
            <span className="text-[#A3A299] select-none">·</span>
            <a
              href="/resume"
              onClick={(e) => {
                e.preventDefault();
                navigate('/resume');
              }}
              className="hover:text-[#121211] transition-colors cursor-pointer"
            >
              Resume
            </a>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto justify-between sm:justify-end">
            <a
              href={`mailto:${profile.email}`}
              className="font-sans text-xs sm:text-sm text-[#71716A] hover:text-[#121211] transition-colors"
            >
              {profile.email}
            </a>

            <m.button
              type="button"
              onClick={() => scrollToTop()}
              whileTap={tapScale}
              className="w-8 h-8 sm:w-9 sm:h-9 bg-[#121211] text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 rounded-none shadow-xs"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </m.button>
          </div>
        </div>

        {/* Monumental Name Headline Typography — Fills the full footer edge to edge (media_1794725967229.png) */}
        <div className="w-full select-none pt-2 sm:pt-4 overflow-visible">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-visible"
          >
            <h2
              className="font-sans font-bold text-[#121211] leading-[0.82] tracking-[-0.055em] select-none whitespace-nowrap cursor-default overflow-visible block w-full hover:text-neutral-700 transition-colors duration-300"
              style={{
                fontSize: '18.6cqw',
                paddingBottom: '0.08em',
              }}
              aria-label="Dhyandev P"
            >
              Dhyandev P
            </h2>
          </m.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
