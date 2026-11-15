import React from 'react';

interface SectionHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly index: string; // e.g. "01"
  readonly tag?: string;
  readonly children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  index,
  tag,
  children
}) => {
  return (
    <div className="w-full pb-8 md:pb-12 border-b border-hairline mb-10 md:mb-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-ink-muted mb-3">
            <span className="text-cobalt font-bold">[{index}]</span>
            {tag && (
              <>
                <span className="text-hairline">/</span>
                <span className="tracking-widest uppercase">{tag}</span>
              </>
            )}
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight uppercase">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-3 text-sm md:text-base text-ink-muted max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {children && <div className="flex items-center gap-3">{children}</div>}
      </div>
    </div>
  );
};
