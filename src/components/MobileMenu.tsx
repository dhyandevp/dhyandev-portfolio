import React, { useEffect } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { tapScale, MOTION_EASE } from '../lib/motion';

interface MobileMenuProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly navItems: readonly { label: string; href: string; external?: boolean }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems }) => {
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
          {navItems.map((item, idx) => (
            <m.a
              key={idx}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              onClick={onClose}
              whileTap={tapScale}
              className={`block px-3 py-2.5 rounded-xl text-neutral-800 hover:text-black hover:bg-neutral-100/70 font-medium transition-colors ${
                item.external ? 'font-mono text-xs font-semibold' : ''
              }`}
            >
              {item.label}
            </m.a>
          ))}
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
