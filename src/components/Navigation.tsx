import React, { useState, Suspense, lazy } from 'react';
import { m } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { tapScale } from '../lib/motion';
import { useRouter } from '../lib/router';

const MobileMenu = lazy(() => import('./MobileMenu'));

export const Navigation: React.FC = () => {
  const { path, navigate } = useRouter();
  const [lang, setLang] = useState<'EN' | 'ML'>('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = lang === 'EN' ? [
    { label: 'Dhyandev P', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Laboratory', href: '/notes' },
    { label: 'About', href: '/about' },
    { label: 'Specializations', href: '/specializations' },
    { label: 'Linktree', href: 'https://linktr.ee/DhyandevRTX', external: true }
  ] : [
    { label: 'ധ്യാനദേവ് പി', href: '/' },
    { label: 'പ്രോജക്ടുകൾ', href: '/projects' },
    { label: 'ലാബ് കുറിപ്പുകൾ', href: '/notes' },
    { label: 'കുറിച്ച്', href: '/about' },
    { label: 'ശേഷികൾ', href: '/specializations' },
    { label: 'ലിങ്ക് ട്രീ', href: 'https://linktr.ee/DhyandevRTX', external: true }
  ];

  const isItemActive = (href: string) => {
    if (href === '/') return path === '/';
    return path === href;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <>
      {/* 1. Ambient Top Blur Gradient Mask for Frosted Scroll Effect */}
      <div
        className="fixed top-0 inset-x-0 h-24 bg-gradient-to-b from-[#F4F4F2]/90 via-[#F4F4F2]/65 to-transparent backdrop-blur-[6px] pointer-events-none z-40 transition-opacity"
        aria-hidden="true"
      />

      {/* 2. Floating Pill Navigation Header */}
      <header className="fixed top-3 sm:top-5 inset-x-3 sm:inset-x-8 z-50 flex items-center justify-between gap-3 pointer-events-none">
        {/* Left Side: Exact Rounded Pill Navigation Capsules */}
        <nav
          aria-label="Primary Navigation"
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 max-w-[calc(100%-190px)] sm:max-w-none pointer-events-auto"
        >
          {navItems.map((item, idx) => {
            const active = isItemActive(item.href);

            return (
              <m.a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                onClick={(e) => handleNavClick(e, item.href, item.external)}
                whileTap={tapScale}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[13px] sm:text-sm font-medium transition-all whitespace-nowrap select-none cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  active
                    ? 'bg-[#121211] text-[#F4F4F2] font-semibold tracking-tight shadow-sm'
                    : idx === 0
                    ? 'bg-[#E5E5E1]/90 hover:bg-[#D8D8D4] text-[#121211] font-semibold tracking-tight'
                    : 'bg-[#E5E5E1]/80 hover:bg-[#D8D8D4] text-[#222221]'
                }`}
              >
                {item.label}
              </m.a>
            );
          })}
        </nav>

        {/* Right Side: Language Toggle & Availability Status Pill */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 pointer-events-auto">
          {/* Mobile Menu Toggle Button (visible only on small mobile < 640px) */}
          <m.button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={tapScale}
            className="sm:hidden p-2 rounded-full bg-[#E5E5E1]/90 text-[#121211] shadow-xs"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </m.button>

          {/* Language Toggle Pill with Animated Sliding Thumb */}
          <div
            role="group"
            aria-label="Language selection"
            className="bg-[#E5E5E1]/90 backdrop-blur-md p-1 rounded-full flex items-center relative shadow-xs select-none"
          >
            <m.button
              type="button"
              onClick={() => setLang('EN')}
              whileTap={tapScale}
              className={`relative z-10 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                lang === 'EN' ? 'text-white' : 'text-[#6D6C66] hover:text-[#121211]'
              }`}
              aria-pressed={lang === 'EN'}
            >
              {lang === 'EN' && (
                <m.span
                  layoutId="langPillThumb"
                  className="absolute inset-0 rounded-full bg-[#121211] -z-10 shadow-xs"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              EN
            </m.button>

            <m.button
              type="button"
              onClick={() => setLang('ML')}
              whileTap={tapScale}
              className={`relative z-10 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                lang === 'ML' ? 'text-white' : 'text-[#6D6C66] hover:text-[#121211]'
              }`}
              aria-pressed={lang === 'ML'}
              title="Malayalam (മലയാളം)"
            >
              {lang === 'ML' && (
                <m.span
                  layoutId="langPillThumb"
                  className="absolute inset-0 rounded-full bg-[#121211] -z-10 shadow-xs"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              ML
            </m.button>
          </div>

          {/* Open to Work Status Pill with Live Green Beacon (Routes to /contact) */}
          <m.a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              navigate('/contact');
            }}
            whileTap={tapScale}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
            className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md transition-all text-xs sm:text-[13px] font-medium whitespace-nowrap shadow-xs select-none cursor-pointer ${
              path === '/contact'
                ? 'bg-[#121211] text-[#F4F4F2] font-semibold'
                : 'bg-[#E5E5E1]/90 hover:bg-[#D8D8D4] text-[#121211]'
            }`}
            title="Available for select technical contracts & advisory"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3F8A52] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3F8A52] shadow-[0_0_0_2px_rgba(63,138,82,0.25)]" />
            </span>
            <span className="hidden xs:inline">{lang === 'EN' ? 'Open to work' : 'ലഭ്യമാണ് (Open)'}</span>
          </m.a>
        </div>
      </header>

      {/* 3. Dynamically Imported Mobile Drawer with Suspense */}
      <Suspense fallback={null}>
        {mobileMenuOpen && (
          <div className="fixed top-16 inset-x-3 z-40 sm:hidden">
            <MobileMenu
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
              navItems={navItems}
            />
          </div>
        )}
      </Suspense>
    </>
  );
};

export default Navigation;
