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
 * Majestic Commercial Airliner Flight Simulation
 * - Real Boeing 737-800 jet aircraft scaled up for commanding presence
 * - Guidelines removed for a clean, distraction-free aesthetic
 * - Performs a thrilling 360° acrobatic backflip loop at high cruising altitude over the headline
 * - Ultra-smooth continuous trajectory powered by Motion (motion.dev)
 * - Precision touchdown on Airport Runway 27L triggering receipt print
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

  // 10-waypoint flight trajectory with 360° acrobatic backflip
  const { waypoints, headings, pitches, rolls, scales, times } = useMemo(() => {
    const p0 = { x: startX, y: startY };

    // Get section bounds to calibrate section-wide airspace
    const sectionEl = document.getElementById('reachout');
    const sRect = sectionEl ? sectionEl.getBoundingClientRect() : null;

    const sLeft = sRect ? Math.max(16, sRect.left + 24) : Math.max(16, startX - 700);
    const sTop = sRect ? sRect.top : Math.max(20, targetY - 120);
    const sWidth = sRect ? sRect.width : 900;
    const sHeight = sRect ? sRect.height : 600;

    // P1: Low sweep across the message console
    const p1 = messageRect
      ? {
          x: messageRect.left + messageRect.width * 0.3,
          y: messageRect.top + messageRect.height * 0.55,
        }
      : {
          x: startX - Math.min(420, sWidth * 0.42),
          y: startY - 35,
        };

    // P2: Climbing up western perimeter past headline
    const p2 = {
      x: sLeft + Math.min(90, sWidth * 0.08),
      y: sTop + sHeight * 0.44,
    };

    // P3: Pulling up nose steeply into the backflip
    const p3 = {
      x: sLeft + Math.min(200, sWidth * 0.18),
      y: Math.max(80, sTop + 65),
    };

    // P4: Inverted apex of the backflip (upside-down loop peak!)
    const p4 = {
      x: sLeft + Math.min(310, sWidth * 0.28),
      y: Math.max(60, sTop + 20),
    };

    // P5: Pulling out of the backflip into level flight
    const p5 = {
      x: sLeft + Math.min(420, sWidth * 0.40),
      y: Math.max(80, sTop + 60),
    };

    // P6: High scenic cruise across the top of the contact section
    const p6 = {
      x: sLeft + sWidth * 0.64,
      y: Math.max(70, sTop + 35),
    };

    // P7: Base turn angling south toward runway alignment
    const p7 = {
      x: targetX + 50,
      y: Math.max(40, targetY - 145),
    };

    // P8: Short final approach descending runway centerline
    const p8 = {
      x: targetX,
      y: targetY - 50,
    };

    // P9: Touchdown on Runway 27L threshold
    const p9 = {
      x: targetX,
      y: targetY + 16,
    };

    const pts = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9];

    // Compass Headings (yaw in degrees: 0 = North, 90 = East, 180 = South, 270 = West)
    const rotHeadings = [-140, -168, -85, -35, 0, 25, 42, 75, 90, 90];

    // Pitch & Acrobatic Backflip (rotateX in degrees: full 360° backflip during P3 -> P4 -> P5 -> P6)
    // 0° = level, -75° = nose up into loop, -180° = inverted upside-down, -360° = back right-side up!
    const rotPitches = [0, 8, 20, -75, -180, -290, -360, 8, 4, 0];

    // Aerodynamic Banking / Roll (rotateY / tilt in degrees for authentic flight feel)
    const rotRolls = [0, -15, -25, -5, 0, 15, 10, 20, 0, 0];

    // Dynamic scale (aircraft altitude): larger, commanding presence up to 1.6x wingspan
    const scaleValues = [0.85, 1.15, 1.32, 1.48, 1.60, 1.48, 1.35, 1.15, 0.75, 0.20];

    // Perfectly balanced time splits across 4.2 seconds
    const keyframeTimes = [0, 0.12, 0.24, 0.35, 0.45, 0.55, 0.67, 0.80, 0.92, 1.0];

    return {
      waypoints: pts,
      headings: rotHeadings,
      pitches: rotPitches,
      rolls: rotRolls,
      scales: scaleValues,
      times: keyframeTimes,
    };
  }, [startX, startY, targetX, targetY, messageRect]);

  const FLIGHT_DURATION = 4.2; // 4.2s smooth, majestic aerial journey with backflip

  useEffect(() => {
    const flightTimer = setTimeout(() => {
      setHasLanded(true);
      onLanded();
    }, FLIGHT_DURATION * 1000);

    return () => clearTimeout(flightTimer);
  }, [onLanded, FLIGHT_DURATION]);

  if (hasLanded) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden [perspective:1400px]"
      aria-hidden="true"
    >
      {/* 
        Clean Flight Airspace (guidelines removed as requested)
        Large Commercial Jet Airliner (Boeing 737-800) with 3D Backflip
      */}
      <m.div
        className="absolute -top-[42px] -left-[42px] will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{
          x: waypoints[0].x,
          y: waypoints[0].y,
          rotate: headings[0],
          rotateX: pitches[0],
          rotateY: rolls[0],
          scale: scales[0],
          opacity: 1,
        }}
        animate={{
          x: waypoints.map((p) => p.x),
          y: waypoints.map((p) => p.y),
          rotate: headings,
          rotateX: pitches,
          rotateY: rolls,
          scale: scales,
          opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0.95, 0],
        }}
        transition={{
          duration: FLIGHT_DURATION,
          ease: 'easeInOut',
          times,
        }}
      >
        <RealAirliner size={84} />
      </m.div>
    </div>
  );
};

export default FlyingPaperAirplane;
