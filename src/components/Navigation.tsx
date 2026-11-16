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

  interface NavItem {
    label: string;
    href: string;
    external?: boolean;
  }

  const navItems: NavItem[] = lang === 'EN' ? [
    { label: 'Dhyandev P', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Specializations', href: '/specializations' },
    { label: 'Laboratory', href: '/notes' },
    { label: 'Resume', href: '/resume' },
    { label: 'Links', href: 'https://links.dhyandev.sbs', external: true }
  ] : [
    { label: 'ധ്യാനദേവ് പി', href: '/' },
    { label: 'കുറിച്ച്', href: '/about' },
    { label: 'പ്രോജക്ടുകൾ', href: '/projects' },
    { label: 'ശേഷികൾ', href: '/specializations' },
    { label: 'ലാബ് കുറിപ്പുകൾ', href: '/notes' },
    { label: 'റെസ്യുമെ', href: '/resume' },
    { label: 'ലിങ്കുകൾ', href: 'https://links.dhyandev.sbs', external: true }
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
        className="fixed top-0 inset-x-0 h-[calc(6rem+env(safe-area-inset-top,0px))] bg-gradient-to-b from-[#F4F4F2]/90 via-[#F4F4F2]/65 to-transparent backdrop-blur-[6px] pointer-events-none z-40 transition-opacity will-change-transform transform-gpu"
        aria-hidden="true"
      />

      {/* 2. Floating Pill Navigation Header */}
      <header className="fixed top-[calc(0.75rem+env(safe-area-inset-top,0px))] sm:top-5 inset-x-3 sm:inset-x-8 z-50 flex items-center justify-between gap-3 pointer-events-none will-change-transform transform-gpu">
        {/* Left Side: Exact Rounded Pill Navigation Capsules */}
        <nav
          aria-label="Primary Navigation"
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 min-w-0 flex-1 sm:flex-initial pointer-events-auto touch-pan-x overscroll-x-contain"
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
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[13px] sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap select-none cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
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
            className="sm:hidden p-2 rounded-full bg-[#E5E5E1]/90 text-[#121211] shadow-xs cursor-pointer"
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
              className={`relative z-10 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-150 cursor-pointer ${
                lang === 'EN' ? 'text-white' : 'text-[#6D6C66] hover:text-[#121211]'
              }`}
              aria-pressed={lang === 'EN'}
            >
              {lang === 'EN' && (
                <m.span
                  layoutId="langPillThumb"
                  className="absolute inset-0 rounded-full bg-[#121211] -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              EN
            </m.button>

            <m.button
              type="button"
              onClick={() => setLang('ML')}
              whileTap={tapScale}
              className={`relative z-10 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-150 cursor-pointer ${
                lang === 'ML' ? 'text-white' : 'text-[#6D6C66] hover:text-[#121211]'
              }`}
              aria-pressed={lang === 'ML'}
              title="Malayalam (മലയാളം)"
            >
              {lang === 'ML' && (
                <m.span
                  layoutId="langPillThumb"
                  className="absolute inset-0 rounded-full bg-[#121211] -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              ML
            </m.button>
          </div>

          {/* Open to Work Status Pill (Routes to /contact) */}
          <m.a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              navigate('/contact');
            }}
            whileTap={tapScale}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`hidden sm:inline-flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md transition-colors duration-150 text-xs sm:text-[13px] font-medium whitespace-nowrap shadow-xs select-none cursor-pointer ${
              path === '/contact'
                ? 'bg-[#121211] text-[#F4F4F2] font-semibold'
                : 'bg-[#E5E5E1]/90 hover:bg-[#D8D8D4] text-[#121211]'
            }`}
            title="Available for select technical contracts & advisory"
          >
            <span>{lang === 'EN' ? 'Open to work' : 'ലഭ്യമാണ് (Open)'}</span>
          </m.a>
        </div>
      </header>

      {/* 3. Dynamically Imported Mobile Drawer with Suspense */}
      <Suspense fallback={null}>
        {mobileMenuOpen && (
          <div className="fixed top-[calc(3.75rem+env(safe-area-inset-top,0px))] inset-x-3 z-40 sm:hidden">
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
