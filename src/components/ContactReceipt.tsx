import React from 'react';

interface ContactReceiptProps {
  email?: string;
  orderNumber?: number;
}

const ZIGZAG_CLIP =
  'polygon(0% 4px, 2.5% 0px, 5% 4px, 7.5% 0px, 10% 4px, 12.5% 0px, 15% 4px, 17.5% 0px, 20% 4px, 22.5% 0px, 25% 4px, 27.5% 0px, 30% 4px, 32.5% 0px, 35% 4px, 37.5% 0px, 40% 4px, 42.5% 0px, 45% 4px, 47.5% 0px, 50% 4px, 52.5% 0px, 55% 4px, 57.5% 0px, 60% 4px, 62.5% 0px, 65% 4px, 67.5% 0px, 70% 4px, 72.5% 0px, 75% 4px, 77.5% 0px, 80% 4px, 82.5% 0px, 85% 4px, 87.5% 0px, 90% 4px, 92.5% 0px, 95% 4px, 97.5% 0px, 100% 4px, 100% 100%, 0% 100%)';

export const ContactReceipt: React.FC<ContactReceiptProps> = ({
  email = 'dhyandev027@gmail.com',
  orderNumber = 27,
}) => {
  // Format today's date dynamically: e.g. "15 NOV 2026"
  const formattedDate = React.useMemo(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const validMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = validMonths[now.getMonth()];
    const year = now.getFullYear();
    return `${day} ${month} ${year}`;
  }, []);

  const formattedOrder = React.useMemo(() => {
    return `NO. ${String(orderNumber).padStart(4, '0')}`;
  }, [orderNumber]);

  return (
    <div className="group flex flex-col items-center">
      <div
        className="w-[220px] lg:w-[240px] bg-[#fafaf8] dark:bg-[#171716] text-[#121211] dark:text-[#f2f2ef] border-x border-b border-[#D6D5CF] dark:border-[rgba(242,242,239,0.16)] font-mono text-[11px] leading-relaxed uppercase tracking-[0.04em] select-text transition-colors relative"
        style={{
          clipPath: ZIGZAG_CLIP,
        }}
        role="region"
        aria-label="Project inquiry receipt"
      >
        {/* Torn top edge hairline decoration */}
        <div className="w-full h-[5px] overflow-hidden" aria-hidden="true">
          <svg
            className="w-full h-[5px] text-[#D6D5CF] dark:text-[rgba(242,242,239,0.16)] block"
            preserveAspectRatio="none"
            viewBox="0 0 100 5"
          >
            <path
              d="M0,4 L2.5,0 L5,4 L7.5,0 L10,4 L12.5,0 L15,4 L17.5,0 L20,4 L22.5,0 L25,4 L27.5,0 L30,4 L32.5,0 L35,4 L37.5,0 L40,4 L42.5,0 L45,4 L47.5,0 L50,4 L52.5,0 L55,4 L57.5,0 L60,4 L62.5,0 L65,4 L67.5,0 L70,4 L72.5,0 L75,4 L77.5,0 L80,4 L82.5,0 L85,4 L87.5,0 L90,4 L92.5,0 L95,4 L97.5,0 L100,4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="px-3.5 pt-2 pb-3">
          {/* Header */}
          <div className="text-center font-bold tracking-wider mb-0.5">
            WAYVE ENTERPRISES
          </div>
          <div className="text-center text-[#6D6C66] dark:text-[#9A9993] text-[10px] tracking-wider mb-2">
            {formattedOrder} / {formattedDate}
          </div>

          {/* Dashed Rule */}
          <div
            className="border-b border-dashed border-[#D6D5CF] dark:border-[rgba(242,242,239,0.16)] my-2"
            aria-hidden="true"
          />

          {/* Service Lines */}
          <div className="space-y-1 my-2">
            <div className="flex justify-between items-baseline">
              <span>CONTRACTING</span>
              <span className="text-[#A5A49E] dark:text-[#52514D] tracking-tighter">........</span>
              <span className="text-[#2fb344] font-semibold whitespace-nowrap">
                <span className="inline-block mr-0.5">•</span>OPEN
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>COMPUTER VISION</span>
              <span className="text-[#A5A49E] dark:text-[#52514D] tracking-tighter">.....</span>
              <span className="text-[#2fb344] font-semibold whitespace-nowrap">
                <span className="inline-block mr-0.5">•</span>OPEN
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>FULL-STACK</span>
              <span className="text-[#A5A49E] dark:text-[#52514D] tracking-tighter">..........</span>
              <span className="text-[#2fb344] font-semibold whitespace-nowrap">
                <span className="inline-block mr-0.5">•</span>OPEN
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>ADVISORY</span>
              <span className="text-[#A5A49E] dark:text-[#52514D] tracking-tighter">............</span>
              <span className="text-[#2fb344] font-semibold whitespace-nowrap">
                <span className="inline-block mr-0.5">•</span>OPEN
              </span>
            </div>
          </div>

          {/* Dashed Rule */}
          <div
            className="border-b border-dashed border-[#D6D5CF] dark:border-[rgba(242,242,239,0.16)] my-2"
            aria-hidden="true"
          />

          {/* SLA & Total */}
          <div className="space-y-1 my-2">
            <div className="text-[#6D6C66] dark:text-[#9A9993] text-[10px]">
              REPLY WITHIN 24H
            </div>
            <div className="font-bold text-[10px] leading-snug">
              TOTAL: LET'S BUILD SOMETHING EXCEPTIONAL
            </div>
          </div>

          {/* Clickable Email Line */}
          <div className="my-2 pt-1 border-t border-[#EBEBE8] dark:border-[rgba(242,242,239,0.1)]">
            <a
              href={`mailto:${email}`}
              className="block text-black dark:text-[#f2f2ef] font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-offset-1 truncate"
            >
              {email}
            </a>
          </div>

          {/* Sign-off */}
          <div className="text-center text-[#6D6C66] dark:text-[#9A9993] text-[10px] tracking-widest mt-2">
            THANK YOU.
          </div>
        </div>
      </div>

      {/* Tiny Mono Hint under strip on desktop hover / focus */}
      <div
        className="text-[9px] font-mono uppercase tracking-widest text-[#8E8D88] dark:text-[#7A7974] text-center pt-1.5 transition-opacity duration-200 pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hidden lg:block"
        aria-hidden="true"
      >
        TEAR TO COPY
      </div>
    </div>
  );
};

export default ContactReceipt;
