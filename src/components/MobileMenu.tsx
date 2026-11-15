import React, { useEffect } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { tapScale, MOTION_EASE } from '../lib/motion';
import { useRouter } from '../lib/router';

interface MobileMenuProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly navItems: readonly { label: string; href: string; external?: boolean }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems }) => {
  const { path, navigate } = useRouter();

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Clean background scroll lock without content jumping
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  const handleItemClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (item.external) return;
    e.preventDefault();
    onClose();
    navigate(item.href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: MOTION_EASE }}
          className="bg-white/95 backdrop-blur-md border border-hairline rounded-2xl shadow-xl p-5 space-y-2 font-sans text-sm overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {navItems.map((item, idx) => {
            const active = item.href === '/' ? path === '/' : path === item.href;

            return (
              <m.a
                key={idx}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                onClick={(e) => handleItemClick(e, item)}
                whileTap={tapScale}
                className={`block px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                  active
                    ? 'bg-[#121211] text-[#F4F4F2] font-semibold'
                    : 'text-neutral-800 hover:text-black hover:bg-neutral-100/70'
                } ${item.external ? 'font-mono text-xs font-semibold' : ''}`}
              >
                {item.label}
              </m.a>
            );
          })}

          {/* Contact / Open to work mobile pill */}
          <m.a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              navigate('/contact');
            }}
            whileTap={tapScale}
            className={`mt-2 flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
              path === '/contact'
                ? 'bg-[#121211] text-[#F4F4F2] font-semibold'
                : 'bg-[#EAF5ED] text-[#1D7E36] hover:bg-[#E0EFE3]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2FA049] shrink-0 animate-pulse" />
              <span>Open to work (Contact)</span>
            </span>
            <span className="font-mono text-xs font-semibold">↗</span>
          </m.a>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
