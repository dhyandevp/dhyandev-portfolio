import React, { useState } from 'react';

export const Navigation: React.FC = () => {
  const [lang, setLang] = useState<'EN' | 'ML'>('EN');

  const navItems = lang === 'EN' ? [
    { label: 'Dhyandev P.', href: '#' },
    { label: 'Projects', href: '#projects' },
    { label: 'Laboratory', href: '#notes' },
    { label: 'About', href: '#about' },
    { label: 'Specializations', href: '#specializations' },
    { label: 'Linktree', href: 'https://linktr.ee/DhyandevRTX', external: true }
  ] : [
    { label: 'ധ്യാനദേവ് പി.', href: '#' },
    { label: 'പ്രോജക്ടുകൾ', href: '#projects' },
    { label: 'ലാബ് കുറിപ്പുകൾ', href: '#notes' },
    { label: 'കുറിച്ച്', href: '#about' },
    { label: 'ശേഷികൾ', href: '#specializations' },
    { label: 'ലിങ്ക് ട്രീ', href: 'https://linktr.ee/DhyandevRTX', external: true }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md pt-6 pb-4 border-b border-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Exact Rounded Pill Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full"
        >
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              className="px-4 py-2 rounded-full bg-[#EFEFEF] hover:bg-[#E5E5E5] text-neutral-900 text-[13px] sm:text-sm font-medium transition-colors whitespace-nowrap select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Side: Language Toggle & Availability Status Pill */}
        <div className="flex items-center gap-3 shrink-0">
          {/* 1. Language Toggle Pill (Matching EN / PT in reference) */}
          <div
            role="group"
            aria-label="Language selection"
            className="bg-[#EAEAEA] p-1 rounded-full flex items-center gap-0.5 select-none"
          >
            <button
              type="button"
              onClick={() => setLang('EN')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                lang === 'EN'
                  ? 'bg-[#222222] text-white shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
              aria-pressed={lang === 'EN'}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('ML')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                lang === 'ML'
                  ? 'bg-[#222222] text-white shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
              aria-pressed={lang === 'ML'}
              title="Malayalam (മലയാളം)"
            >
              ML
            </button>
          </div>

          {/* 2. Open to Work Status Pill (Exact match with green dot & mint background) */}
          <a
            href="#reachout"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EAF5ED] text-[#1D7E36] border border-[#CEE8D3] hover:bg-[#E0EFE3] transition-colors text-xs sm:text-[13px] font-medium whitespace-nowrap shadow-xs select-none"
            title="Available for select technical contracts & advisory"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#2FA049] shrink-0 animate-pulse"
              aria-hidden="true"
            />
            <span>{lang === 'EN' ? 'Open to work' : 'ലഭ്യമാണ് (Open)'}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
