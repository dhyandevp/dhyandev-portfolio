import React, { useState } from 'react';
import { DeveloperProfile } from '../types/portfolio';
import { Copy, Check, ArrowUpRight, Mail, Linkedin, Github, Globe } from 'lucide-react';

interface ContactSectionProps {
  readonly profile: DeveloperProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="reachout" className="w-full py-20 md:py-32 border-b border-hairline bg-white content-visibility-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Marker */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint mb-8 pb-3 border-b border-hairline">
          <span className="text-black font-semibold">[04]</span>
          <span>INITIATE CONTACT</span>
          <span className="text-hairline">/</span>
          <span>PROFESSIONAL REACHOUT</span>
        </div>

        <div className="max-w-3xl mb-12">
          <h2 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.1] mb-6">
            Let's build something exceptional together.
          </h2>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
            I'm available for technical contracting, computer vision architecture, full-stack systems engineering,
            and infrastructure advisory. Reach out directly to discuss your engineering roadmap.
          </p>
        </div>

        {/* Primary Contact Card */}
        <div className="p-8 md:p-12 border border-hairline bg-[#FAFAFA] mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-hairline">
            <div>
              <span className="block font-mono text-[11px] text-ink-faint uppercase tracking-wider mb-2">
                DIRECT INBOX TRANSMISSION
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-black hover:opacity-75 transition-opacity"
              >
                {profile.email}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-5 py-3 border border-hairline bg-white hover:border-black text-black text-xs font-mono font-medium uppercase tracking-wider transition-colors"
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
              </button>

              <a
                href={`mailto:${profile.email}?subject=Project%20Inquiry%20-%20Development%20Specialist`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-mono font-medium uppercase tracking-wider transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>WRITE AN EMAIL</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
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
        </div>

        {/* Profile Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-hairline divide-y sm:divide-y-0 sm:divide-x divide-hairline bg-white">
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
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
          </a>

          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
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
          </a>

          <a
            href={profile.linktreeUrl}
            target="_blank"
            rel="noreferrer"
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
          </a>
        </div>
      </div>
    </section>
  );
};
