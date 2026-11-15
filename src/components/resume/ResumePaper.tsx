import React from 'react';
import { ResumeData, PageMode } from '../../types/resume';

interface ResumePaperProps {
  data: ResumeData;
  pageMode?: PageMode;
  isPrinting?: boolean;
  onPaperClick?: () => void;
}

export const ResumePaper: React.FC<ResumePaperProps> = ({
  data,
  isPrinting: _isPrinting,
  onPaperClick,
}) => {
  return (
    <div className="resume-paper-container w-full flex flex-col items-center print:w-full print:m-0">
      {/* Tear-off perforated line top edge */}
      <div
        className="w-full max-w-[760px] h-3 flex items-center justify-between px-2 opacity-50 print:hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full border-b border-dashed border-neutral-400" />
      </div>

      <div className="w-full max-w-[760px] flex flex-col print:max-w-none">
        {/* ============================================================== */}
        {/* SINGLE CLEAN PROFESSIONAL 1-PAGE RESUME (NO LOGOS, NO PROJECTS) */}
        {/* ============================================================== */}
        <article
          onClick={onPaperClick}
          className="resume-page resume-page-1 relative w-full bg-white text-[#121212] font-sans p-8 sm:p-11 shadow-[0_20px_50px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.06)] border border-neutral-200/80 rounded-sm print:border-none print:shadow-none print:p-0 print:m-0 cursor-pointer select-none transition-shadow hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
          title="Click to download resume PDF"
        >
          {/* 1. Header (Name, Title, Contact Info - Clean, No Logos) */}
          <header className="pb-5 border-b border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h1 className="font-extrabold text-3xl sm:text-4xl text-black tracking-tight leading-none">
                {data.name}
              </h1>
              <span className="text-xs sm:text-sm font-semibold text-neutral-600 tracking-tight">
                Kerala, India
              </span>
            </div>

            <h2 className="font-bold text-sm sm:text-base text-neutral-800 tracking-tight mt-1.5">
              Co-Founder & Systems Architect • Systems & Low-Latency Engineer
            </h2>

            {/* Clean Contact Details Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs text-neutral-600 font-medium">
              <a
                href={`mailto:${data.email}`}
                className="hover:text-black hover:underline transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {data.email}
              </a>
              <span className="text-neutral-300">•</span>
              <a
                href="https://github.com/dhyandevp"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black hover:underline transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                github.com/dhyandevp
              </a>
              <span className="text-neutral-300">•</span>
              <a
                href="https://linkedin.com/in/dhyandev-p-20659524a/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black hover:underline transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                linkedin.com/in/dhyandevp
              </a>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-700">Wayve Enterprises</span>
            </div>
          </header>

          {/* 2. Professional Summary */}
          <section className="py-4 border-b border-neutral-100">
            <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
              Systems engineer and architect specializing in low-latency infrastructure, real-time edge AI, embedded Linux, and distributed platforms. Proven track record directing technical architecture from bare-metal C++ firmware to scalable cloud-native web systems with deterministic performance.
            </p>
          </section>

          {/* 3. Key Metrics / Quantitative Achievements */}
          <section className="py-3.5 border-b border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div>
              <div className="font-extrabold text-lg sm:text-xl text-black tracking-tight leading-none">
                25,000+
              </div>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-tight mt-1">
                Requests & users served on production systems
              </p>
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl text-black tracking-tight leading-none">
                &lt;50ms
              </div>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-tight mt-1">
                Edge vision inference latency on embedded Linux
              </p>
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl text-black tracking-tight leading-none">
                100%
              </div>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-tight mt-1">
                Offline continuity for disaster telemetry nodes
              </p>
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl text-black tracking-tight leading-none">
                12+
              </div>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-tight mt-1">
                Shipped production systems & firmware builds
              </p>
            </div>
          </section>

          {/* 4. Technical Skills Matrix (Pure Stack, No Logos) */}
          <section className="py-4 border-b border-neutral-100">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500 mb-2.5">
              Technical Core & Engineering Stacks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
              <div>
                <span className="font-semibold text-black">Languages: </span>
                <span className="text-neutral-700">C++, Rust, Python, TypeScript, JavaScript, Go, SQL, Bash</span>
              </div>
              <div>
                <span className="font-semibold text-black">Systems & Linux: </span>
                <span className="text-neutral-700">POSIX, Linux Kernel, systemd, Docker, Embedded Linux, ESP-IDF, FreeRTOS</span>
              </div>
              <div>
                <span className="font-semibold text-black">Edge AI & Vision: </span>
                <span className="text-neutral-700">PyTorch, OpenCV, Real-time Edge Inference (&lt;50ms), TensorRT, MediaPipe</span>
              </div>
              <div>
                <span className="font-semibold text-black">Cloud & Full-Stack: </span>
                <span className="text-neutral-700">Next.js, React, Node.js, WebSockets, REST APIs, PostgreSQL, Supabase, Tailwind</span>
              </div>
            </div>
          </section>

          {/* 5. Professional Experience */}
          <section className="py-4 border-b border-neutral-100">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500 mb-3.5">
              Professional Experience
            </h3>

            <div className="space-y-4">
              {/* Wayve */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h4 className="text-xs sm:text-[13px] font-bold text-black">
                    Co-Founder & Systems Architect • <span className="font-semibold text-neutral-800">Wayve Enterprises</span>
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Jan 2026 – Present
                  </span>
                </div>
                <ul className="mt-1 space-y-0.5 text-xs text-neutral-700 list-disc list-inside">
                  <li>Directing technical architecture, infrastructure engineering, and applied AI systems across production ventures.</li>
                  <li>Architected zero-bloat, self-hosted deployment pipelines and low-latency microservices with 99.99% operational uptime.</li>
                </ul>
              </div>

              {/* FLARE */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h4 className="text-xs sm:text-[13px] font-bold text-black">
                    Lead Systems Engineer • <span className="font-semibold text-neutral-800">FLARE Disaster Telemetry</span>
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Jan 2024 – Sep 2025
                  </span>
                </div>
                <ul className="mt-1 space-y-0.5 text-xs text-neutral-700 list-disc list-inside">
                  <li>Engineered decentralized ESP32 C++ telemetry firmware with local WebSocket broadcasting and native companion app.</li>
                  <li>Built 100% offline-first early warning infrastructure delivering sub-second environmental risk scoring during grid blackouts.</li>
                </ul>
              </div>

              {/* GNOME & Linux */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h4 className="text-xs sm:text-[13px] font-bold text-black">
                    Open-Source Systems Developer • <span className="font-semibold text-neutral-800">GNOME & Linux Systems</span>
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Jan 2020 – Nov 2023
                  </span>
                </div>
                <ul className="mt-1 space-y-0.5 text-xs text-neutral-700 list-disc list-inside">
                  <li>Authored Lid Switch GNOME Extension and systemd power management daemon, published on official GNOME Extensions.</li>
                  <li>Implemented local computer vision pipelines with OpenCV, achieving sub-50ms facial detection on edge hardware.</li>
                </ul>
              </div>

              {/* SmartCity */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h4 className="text-xs sm:text-[13px] font-bold text-black">
                    Hardware & IoT Systems Engineer • <span className="font-semibold text-neutral-800">SmartCity Sensor Array</span>
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-500">
                    2019 – 2020
                  </span>
                </div>
                <ul className="mt-1 space-y-0.5 text-xs text-neutral-700 list-disc list-inside">
                  <li>Designed distributed wireless sensor nodes with Raspberry Pi 3B+ central collector and Python AI telemetry daemon.</li>
                  <li>Awarded Joint 3rd, A Grade at Kannur District Sasthrolsavam for autonomous hardware sensor array.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Education & Honors */}
          <section className="pt-4 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500 mb-2.5">
              Education & Honors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="font-bold text-black">Computer Engineering & Systems Architecture</div>
                <div className="text-neutral-600">Technical Engineering Board • 2021 – 2024</div>
                <div className="text-[11px] text-neutral-500 italic">Distinction & First Class with Honors</div>
              </div>
              <div>
                <div className="font-bold text-black">Applied Electronics & Autonomous IoT</div>
                <div className="text-neutral-600">Kannur District Sasthrolsavam • 2023</div>
                <div className="text-[11px] text-neutral-500 italic">Joint 3rd, A Grade Award Winner</div>
              </div>
            </div>
          </section>

          {/* 7. Discreet Clean Footer */}
          <footer className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Dhyandev P. • Clean Technical Resume</span>
            <span>github.com/dhyandevp</span>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default ResumePaper;
