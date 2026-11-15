import React, { useEffect, useState } from 'react';
import { m } from 'motion/react';

interface FlyingPaperAirplaneProps {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  onLanded: () => void;
}

export const FlyingPaperAirplane: React.FC<FlyingPaperAirplaneProps> = ({
  startX,
  startY,
  targetX,
  targetY,
  onLanded,
}) => {
  const [hasLanded, setHasLanded] = useState(false);

  // Calculate arc trajectory
  const dx = targetX - startX;

  // Arc midpoint with dramatic aerodynamic climb
  const midX = startX + dx * 0.45;
  const midY = Math.min(startY, targetY) - 90;

  // Bank angle calculations
  const initialAngle = dx >= 0 ? -25 : -155;
  const midAngle = dx >= 0 ? 10 : -190;
  const diveAngle = dx >= 0 ? 78 : -102;

  useEffect(() => {
    const flightTimer = setTimeout(() => {
      setHasLanded(true);
      onLanded();
    }, 780);

    return () => clearTimeout(flightTimer);
  }, [onLanded]);

  if (hasLanded) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden="true">
      {/* SVG Arc Vapor Trail */}
      <svg className="absolute inset-0 w-full h-full">
        <m.path
          d={`M ${startX} ${startY} Q ${midX} ${midY} ${targetX} ${targetY}`}
          fill="none"
          stroke="#2fb344"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0.8 }}
          animate={{ pathLength: 1, opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 0.78, ease: [0.25, 1, 0.5, 1] }}
        />
      </svg>

      {/* Origami Paper Airplane Entity */}
      <m.div
        className="absolute -top-3 -left-3 will-change-transform drop-shadow-md"
        initial={{
          x: startX,
          y: startY,
          rotate: initialAngle,
          scale: 0.8,
          opacity: 1,
        }}
        animate={{
          x: [startX, midX, targetX],
          y: [startY, midY, targetY],
          rotate: [initialAngle, midAngle, diveAngle],
          scale: [0.8, 1.15, 0.25],
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 0.78,
          ease: [0.25, 1, 0.45, 1],
          times: [0, 0.55, 1],
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-black dark:text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Folded Paper Wing */}
          <path
            d="M2.5 12.5L21.5 2.5L12.5 21.5L9.5 14.5L2.5 12.5Z"
            fill="#FAFAFA"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Center Crease */}
          <path
            d="M21.5 2.5L9.5 14.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Accent Underfold */}
          <path
            d="M9.5 14.5L14 14.5L21.5 2.5"
            fill="#2fb344"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
      </m.div>
    </div>
  );
};

export default FlyingPaperAirplane;
