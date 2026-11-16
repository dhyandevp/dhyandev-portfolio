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
  const initialAngle = dx >= 0 ? -32 : -148;
  const midAngle = dx >= 0 ? 6 : -186;
  const diveAngle = dx >= 0 ? 74 : -106;

  useEffect(() => {
    // Slower, graceful aerodynamic flight sequence (2.0s)
    const flightTimer = setTimeout(() => {
      setHasLanded(true);
      onLanded();
    }, 2000);

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
          strokeWidth="1.75"
          strokeDasharray="5 5"
          initial={{ pathLength: 0, opacity: 0.9 }}
          animate={{ pathLength: 1, opacity: [0.9, 0.7, 0] }}
          transition={{ duration: 2.0, ease: [0.25, 0.8, 0.35, 1] }}
        />
      </svg>

      {/* Origami Paper Airplane Entity */}
      <m.div
        className="absolute -top-3.5 -left-3.5 will-change-transform drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
        initial={{
          x: startX,
          y: startY,
          rotate: initialAngle,
          scale: 0.85,
          opacity: 1,
        }}
        animate={{
          x: [startX, midX, targetX],
          y: [startY, midY, targetY],
          rotate: [initialAngle, midAngle, diveAngle],
          scale: [0.85, 1.25, 0.2],
          opacity: [1, 1, 0.95, 0],
        }}
        transition={{
          duration: 2.0,
          ease: [0.25, 0.8, 0.35, 1],
          times: [0, 0.5, 1],
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-neutral-800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Folded Paper Wing */}
          <path
            d="M2.5 12.5L21.5 2.5L12.5 21.5L9.5 14.5L2.5 12.5Z"
            fill="#FFFFFF"
            stroke="#121211"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Center Crease */}
          <path
            d="M21.5 2.5L9.5 14.5"
            stroke="#121211"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Accent Underfold */}
          <path
            d="M9.5 14.5L14 14.5L21.5 2.5"
            fill="#2fb344"
            fillOpacity="0.3"
            stroke="#121211"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
      </m.div>
    </div>
  );
};

export default FlyingPaperAirplane;
