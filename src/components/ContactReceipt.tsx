import React from 'react';

interface ContactReceiptProps {
  email?: string;
  orderNumber?: number;
}

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
    <div
      className="w-[220px] lg:w-[240px] bg-[#fafaf8] text-[#121211] border border-[#D6D5CF] p-4 font-mono text-[11px] leading-relaxed uppercase tracking-[0.04em] select-text"
      role="region"
      aria-label="Project inquiry receipt"
    >
      {/* Header */}
      <div className="text-center font-bold tracking-wider mb-0.5">
        WAYVE ENTERPRISES
      </div>
      <div className="text-center text-[#6D6C66] text-[10px] tracking-wider mb-2">
        {formattedOrder} / {formattedDate}
      </div>

      {/* Dashed Rule */}
      <div className="border-b border-dashed border-[#D6D5CF] my-2" aria-hidden="true" />

      {/* Service Lines */}
      <div className="space-y-1 my-2">
        <div className="flex justify-between items-baseline">
          <span>CONTRACTING</span>
          <span className="text-[#A5A49E] tracking-tighter">........</span>
          <span className="text-[#2fb344] font-semibold whitespace-nowrap">
            <span className="inline-block mr-0.5">•</span>OPEN
          </span>
        </div>
        <div className="flex justify-between items-baseline">
          <span>COMPUTER VISION</span>
          <span className="text-[#A5A49E] tracking-tighter">.....</span>
          <span className="text-[#2fb344] font-semibold whitespace-nowrap">
            <span className="inline-block mr-0.5">•</span>OPEN
          </span>
        </div>
        <div className="flex justify-between items-baseline">
          <span>FULL-STACK</span>
          <span className="text-[#A5A49E] tracking-tighter">..........</span>
          <span className="text-[#2fb344] font-semibold whitespace-nowrap">
            <span className="inline-block mr-0.5">•</span>OPEN
          </span>
        </div>
        <div className="flex justify-between items-baseline">
          <span>ADVISORY</span>
          <span className="text-[#A5A49E] tracking-tighter">............</span>
          <span className="text-[#2fb344] font-semibold whitespace-nowrap">
            <span className="inline-block mr-0.5">•</span>OPEN
          </span>
        </div>
      </div>

      {/* Dashed Rule */}
      <div className="border-b border-dashed border-[#D6D5CF] my-2" aria-hidden="true" />

      {/* SLA & Total */}
      <div className="space-y-1 my-2">
        <div className="text-[#6D6C66] text-[10px]">
          REPLY WITHIN 24H
        </div>
        <div className="font-bold text-[10px] leading-snug">
          TOTAL: LET'S BUILD SOMETHING EXCEPTIONAL
        </div>
      </div>

      {/* Clickable Email Line */}
      <div className="my-2 pt-1 border-t border-[#EBEBE8]">
        <a
          href={`mailto:${email}`}
          className="block text-black font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1 truncate"
        >
          {email}
        </a>
      </div>

      {/* Sign-off */}
      <div className="text-center text-[#6D6C66] text-[10px] tracking-widest mt-2">
        THANK YOU.
      </div>
    </div>
  );
};

export default ContactReceipt;
