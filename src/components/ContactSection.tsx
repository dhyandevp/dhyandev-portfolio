import React, { useState } from 'react';
import { m } from 'motion/react';
import { DeveloperProfile } from '../types/portfolio';
import { Copy, Check, ArrowUpRight, Mail, Linkedin, Github, Globe } from 'lucide-react';
import { revealVariant, standardViewport, tapScale } from '../lib/motion';

interface ContactSectionProps {
  readonly profile: DeveloperProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      }
    } catch {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = profile.email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        // Silently continue
      }
    }
  };

  return (
    <section
      id="reachout"
      className="w-full py-20 md:py-32 border-b border-hairline bg-transparent content-visibility-auto relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Marker */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint mb-8 pb-3 border-b border-hairline"
        >
          <span className="text-black font-semibold">[05]</span>
          <span>INITIATE CONTACT</span>
          <span className="text-hairline">/</span>
          <span>PROFESSIONAL REACHOUT</span>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="max-w-3xl mb-12 space-y-6"
        >
          <h2 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.1]">
            Let's build something exceptional together.
          </h2>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
            As Co-Founder of Wayve Enterprises, I'm available for technical contracting, computer vision architecture,
            full-stack systems engineering, and strategic advisory. Reach out directly or explore my channels on Linktree.
          </p>
        </m.div>

        {/* Primary Contact Card */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="p-8 md:p-12 border border-hairline bg-[#FAFAFA] mb-12 relative"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-hairline">
            <div>
              <span className="block font-mono text-[11px] text-ink-faint uppercase tracking-wider mb-2">
                DIRECT INBOX TRANSMISSION
              </span>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => handleCopy()}
                className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-black hover:opacity-75 transition-opacity"
              >
                {profile.email}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <m.button
                type="button"
                onClick={handleCopy}
                whileTap={tapScale}
                className="inline-flex items-center gap-2 px-5 py-3 border border-hairline bg-white hover:border-black text-black text-xs font-mono font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </m.button>

              <m.a
                href={`mailto:${profile.email}?subject=Project%20Inquiry%20-%20Development%20Specialist`}
                whileTap={tapScale}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-mono font-medium uppercase tracking-wider transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>WRITE AN EMAIL</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </m.a>
            </div>
          </div>

          {/* SLA & Availability Guarantee */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <span className="block text-[10px] text-ink-faint uppercase mb-1">RESPONSE TIME</span>
              <span className="text-black font-semibold">Guaranteed within 24 hours</span>
            </div>
            <div>
              <span className="block text-[10px] text-ink-faint uppercase mb-1">CONTRACT FORMAT</span>
              <span className="text-black font-semibold">Remote & Direct Collaboration</span>
            </div>
            <div>
              <span className="block text-[10px] text-ink-faint uppercase mb-1">STATUS</span>
              <span className="text-black font-semibold">Available for Select Projects</span>
            </div>
          </div>
        </m.div>

        {/* Profile Channels Grid */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="grid grid-cols-1 sm:grid-cols-3 border border-hairline divide-y sm:divide-y-0 sm:divide-x divide-hairline bg-white"
        >
          <m.a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            whileTap={tapScale}
            className="p-6 flex items-center justify-between hover:bg-[#FDFDFD] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-black" />
              <div>
                <span className="block font-sans font-bold text-sm text-black">LinkedIn</span>
                <span className="block font-mono text-[11px] text-ink-muted">dhyandev-p</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-black transition-colors" />
          </m.a>

          <m.a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            whileTap={tapScale}
            className="p-6 flex items-center justify-between hover:bg-[#FDFDFD] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-black" />
              <div>
                <span className="block font-sans font-bold text-sm text-black">GitHub</span>
                <span className="block font-mono text-[11px] text-ink-muted">@{profile.handle}</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-black transition-colors" />
          </m.a>

          <m.a
            href={profile.linktreeUrl}
            target="_blank"
            rel="noreferrer"
            whileTap={tapScale}
            className="p-6 flex items-center justify-between hover:bg-[#FDFDFD] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-black" />
              <div>
                <span className="block font-sans font-bold text-sm text-black">Linktree</span>
                <span className="block font-mono text-[11px] text-ink-muted">DhyandevRTX</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-black transition-colors" />
          </m.a>
        </m.div>
      </div>
    </section>
  );
};

export default ContactSection;
