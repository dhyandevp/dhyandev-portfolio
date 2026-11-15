import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const currentProgress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalScroll) * 100)));
            setScrollProgress((prev) => (prev !== currentProgress ? currentProgress : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about') || document.getElementById('reachout');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Left Edge Floating Black Award/Specialist Tab Badge (Image 8) */}
      <aside
        aria-label="Awards & Accreditation"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center bg-black text-white py-4 px-2 w-10 shadow-md select-none"
      >
        <span className="font-sans font-bold text-sm mb-3">W.</span>
        <span
          className="text-[10px] font-mono tracking-widest uppercase text-white/80 whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Specialist
        </span>
      </aside>

      {/* 2. Right Edge Scroll Indicator (Image 8) */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 select-none">
        <span className="font-mono text-[10px] text-ink-faint tabular">
          {scrollProgress}%
        </span>
        <div className="w-[1px] h-16 bg-hairline relative">
          <div
            className="w-[1.5px] bg-black absolute top-0 left-0 transition-all duration-150"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* 3. Top Navigation Bar (Image 8) */}
      <header className="w-full bg-white/90 backdrop-blur-sm sticky top-0 z-30 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          {/* Signature Logo on Left */}
          <a
            href="#"
            className="font-signature text-3xl sm:text-4xl text-black hover:opacity-70 transition-opacity select-none leading-none pt-1"
            aria-label="Dhyandev - Home"
          >
            Dhyandev
          </a>

          {/* Centered Minimalist Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans text-ink-muted">
            <a href="#about" className="hover:text-black transition-colors">
              About Me
            </a>
            <a href="#reachout" className="hover:text-black transition-colors">
              Contact
            </a>
            <a href="#specializations" className="hover:text-black transition-colors">
              Specializations
            </a>
            <a href="#notes" className="hover:text-black transition-colors">
              Laboratory
            </a>
            <a
              href="https://linktr.ee/DhyandevRTX"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition-colors"
            >
              Resume
            </a>
          </nav>

          {/* Right Circular Scroll-Down Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToNext}
              className="w-9 h-9 rounded-full bg-[#F4F4F4] hover:bg-black hover:text-white text-black flex items-center justify-center transition-colors focus-visible:outline-none"
              aria-label="Scroll down to next section"
              title="Scroll down"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-hairline px-6 py-4 space-y-3 font-sans text-sm">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-ink-muted hover:text-black"
            >
              About Me
            </a>
            <a
              href="#specializations"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-ink-muted hover:text-black"
            >
              Specializations
            </a>
            <a
              href="#notes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-ink-muted hover:text-black"
            >
              Laboratory Notes
            </a>
            <a
              href="#reachout"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 font-semibold text-black"
            >
              Contact / Reachout
            </a>
          </div>
        )}
      </header>
    </>
  );
};
