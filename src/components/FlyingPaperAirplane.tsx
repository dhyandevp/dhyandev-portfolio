import React, { useEffect, useState, useMemo } from 'react';
import { m } from 'motion/react';
import { RealAirliner } from './RealAirliner';

interface FlyingAirplaneProps {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  messageRect?: { left: number; top: number; width: number; height: number };
  onLanded: () => void;
}

/**
 * Authentic Commercial Airliner Flight Simulation
 * - Real Boeing 737-800 jet aircraft with wings, turbofans, and navigation strobes
 * - Scenic travel circuit around the contact section (takeoff -> across message field -> 
 *   up the left flank -> high cruise over headline -> base turn -> final approach onto Runway 27)
 * - Lands directly onto the Airport Runway Receipt Printer
 */
export const FlyingPaperAirplane: React.FC<FlyingAirplaneProps> = ({
  startX,
  startY,
  targetX,
  targetY,
  messageRect,
  onLanded,
}) => {
  const [hasLanded, setHasLanded] = useState(false);

  // Compute 8-point scenic travel route around the contact section
  const { waypoints, angles, scales, vaporPath } = useMemo(() => {
    // P0: Takeoff position from the Send button
    const p0 = { x: startX, y: startY };

    // Get section bounds to enable a grand flight across the whole section
    const sectionEl = document.getElementById('reachout');
    const sRect = sectionEl ? sectionEl.getBoundingClientRect() : null;

    const sLeft = sRect ? Math.max(16, sRect.left + 24) : Math.max(16, startX - 700);
    const sTop = sRect ? sRect.top : Math.max(20, targetY - 120);
    const sWidth = sRect ? sRect.width : 900;
    const sHeight = sRect ? sRect.height : 600;

    // P1: Low climb across the message field / console
    const p1 = messageRect
      ? {
          x: messageRect.left + messageRect.width * 0.25,
          y: messageRect.top + messageRect.height * 0.65,
        }
      : {
          x: startX - Math.min(420, sWidth * 0.45),
          y: startY - 35,
        };

    // P2: Outbound bank climbing up the western perimeter past the headline
    const p2 = {
      x: sLeft + Math.min(80, sWidth * 0.08),
      y: sTop + sHeight * 0.42,
    };

    // P3: Cresting top-left over the headline at cruising altitude
    const p3 = {
      x: sLeft + Math.min(260, sWidth * 0.24),
      y: Math.max(30, sTop + 55),
    };

    // P4: High scenic cruise across the top of the contact section
    const p4 = {
      x: sLeft + sWidth * 0.58,
      y: Math.max(20, sTop + 25),
    };

    // P5: Base turn heading south to align with Airport Runway 27
    const p5 = {
      x: targetX + 45,
      y: Math.max(30, targetY - 150),
    };

    // P6: Final approach descending down the runway centerline
    const p6 = {
      x: targetX,
      y: targetY - 55,
    };

    // P7: Touchdown onto the runway threshold / printer gate
    const p7 = {
      x: targetX,
      y: targetY + 18,
    };

    const pts = [p0, p1, p2, p3, p4, p5, p6, p7];

    // Authentic aircraft heading / banking angles (0° = North, 90° = East, 180° = South, 270° = West)
    // P0: Takeoff heading Northwest (-145°)
    // P1: Gliding West across console (-175°)
    // P2: Banking North along left perimeter (-85°)
    // P3: Turning Northeast over the top headline (-20°)
    // P4: Cruising East-Southeast across top (+30°)
    // P5: Base turn angling South-Southeast (+75°)
    // P6: Aligned straight down the runway centerline (+90°)
    // P7: Rolling to a halt on the runway (+90°)
    const rotAngles = [-145, -175, -85, -20, 30, 75, 90, 90];

    // Dynamic flight altitude / scale
    // P0: 0.75 (takeoff roll)
    // P1: 1.15 (climbing)
    // P2: 1.35 (cruising altitude)
    // P3: 1.40 (peak altitude, maximum wingspan visible)
    // P4: 1.35 (cruising over top)
    // P5: 1.10 (descending on base leg)
    // P6: 0.75 (short final approach)
    // P7: 0.20 (touchdown and rollout into gate)
    const scaleValues = [0.75, 1.15, 1.35, 1.4, 1.35, 1.1, 0.75, 0.2];

    // Construct smooth continuous cubic bezier curve through all 8 flight waypoints
    let pathD = `M ${p0.x} ${p0.y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;

      const cp1x = prev.x + dx * 0.45;
      const cp1y = prev.y + dy * 0.15;
      const cp2x = curr.x - dx * 0.45;
      const cp2y = curr.y - dy * 0.15;

      pathD += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
    }

    return {
      waypoints: pts,
      angles: rotAngles,
      scales: scaleValues,
      vaporPath: pathD,
    };
  }, [startX, startY, targetX, targetY, messageRect]);

  const FLIGHT_DURATION = 3.6; // 3.6s majestic scenic travel around the section

  useEffect(() => {
    const flightTimer = setTimeout(() => {
      setHasLanded(true);
      onLanded();
    }, FLIGHT_DURATION * 1000);

    return () => clearTimeout(flightTimer);
  }, [onLanded, FLIGHT_DURATION]);

  if (hasLanded) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden="true">
      {/* SVG Navigation Flight Path & Jet Vapor Trail */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Outer subtle glow trail */}
        <m.path
          d={vaporPath}
          fill="none"
          stroke="rgba(47, 179, 68, 0.25)"
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: [0.6, 0.4, 0] }}
          transition={{ duration: FLIGHT_DURATION, ease: [0.35, 0.85, 0.45, 1] }}
        />
        {/* Core crisp navigation airway trail */}
        <m.path
          d={vaporPath}
          fill="none"
          stroke="#2fb344"
          strokeWidth="1.8"
          strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0.95 }}
          animate={{ pathLength: 1, opacity: [0.95, 0.8, 0] }}
          transition={{ duration: FLIGHT_DURATION, ease: [0.35, 0.85, 0.45, 1] }}
        />
      </svg>

      {/* Commercial Jet Airliner Entity (Boeing 737-800) */}
      <m.div
        className="absolute -top-7 -left-7 will-change-transform"
        initial={{
          x: waypoints[0].x,
          y: waypoints[0].y,
          rotate: angles[0],
          scale: scales[0],
          opacity: 1,
        }}
        animate={{
          x: waypoints.map((p) => p.x),
          y: waypoints.map((p) => p.y),
          rotate: angles,
          scale: scales,
          opacity: [1, 1, 1, 1, 1, 1, 0.95, 0],
        }}
        transition={{
          duration: FLIGHT_DURATION,
          ease: 'easeInOut',
          times: [0, 0.16, 0.34, 0.52, 0.68, 0.82, 0.94, 1.0],
        }}
      >
        <RealAirliner size={56} />
      </m.div>
    </div>
  );
};

export default FlyingPaperAirplane;
