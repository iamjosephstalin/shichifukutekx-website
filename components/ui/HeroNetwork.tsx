import React from 'react';
import { motion } from 'framer-motion';

const HeroNetwork: React.FC = () => {
    // Cyberpunk City Grid: Rectilinear lines (H/V) with reliable Framer Motion animations
    // Fixed: Dots now correctly follow lines instead of bunching at top-left.

    // Expanded Grid for better coverage
    const gridLines = [
        // Horizontal lines (y fixed)
        { x1: "0%", x2: "100%", y: "15%", duration: 10, delay: 0 },
        { x1: "20%", x2: "80%", y: "30%", duration: 12, delay: 2 },
        { x1: "0%", x2: "100%", y: "50%", duration: 15, delay: 1 },
        { x1: "10%", x2: "90%", y: "70%", duration: 11, delay: 3 },
        { x1: "5%", x2: "95%", y: "85%", duration: 14, delay: 0.5 },
        { x1: "0%", x2: "100%", y: "92%", duration: 18, delay: 4 },

        // Vertical lines (x fixed)
        { x: "10%", y1: "0%", y2: "100%", duration: 9, delay: 1 },
        { x: "25%", y1: "10%", y2: "90%", duration: 13, delay: 2.5 },
        { x: "50%", y1: "0%", y2: "100%", duration: 15, delay: 0 },
        { x: "75%", y1: "15%", y2: "85%", duration: 11, delay: 3.5 },
        { x: "90%", y1: "0%", y2: "100%", duration: 10, delay: 1.5 },
        { x: "35%", y1: "20%", y2: "80%", duration: 12, delay: 4.5 },
        { x: "65%", y1: "5%", y2: "95%", duration: 14, delay: 2 },
    ];

    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden mix-blend-screen opacity-60">
            <svg className="w-full h-full" width="100%" height="100%">
                <defs>
                    <linearGradient id="gridGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
                        <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#7B2CBF" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gridGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
                        <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#7B2CBF" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Draw Grid Lines & Dots */}
                {gridLines.map((line, i) => {
                    const isHorizontal = 'y' in line;
                    return (
                        <React.Fragment key={i}>
                            {/* Base Line */}
                            <motion.line
                                x1={isHorizontal ? line.x1 : line.x}
                                y1={isHorizontal ? line.y : line.y1}
                                x2={isHorizontal ? line.x2 : line.x}
                                y2={isHorizontal ? line.y : line.y2}
                                stroke={isHorizontal ? "url(#gridGradientH)" : "url(#gridGradientV)"}
                                strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: [0, 1, 1, 0],
                                    opacity: [0, 0.4, 0.4, 0]
                                }}
                                transition={{
                                    duration: line.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: line.delay
                                }}
                            />

                            {/* Moving Data Packet (Dot) - Pure Framer Motion for reliability */}
                            <motion.circle
                                cx={isHorizontal ? line.x1 : line.x}
                                cy={isHorizontal ? line.y : line.y1}
                                r="2.5"
                                fill={i % 2 === 0 ? "#00F0FF" : "#7B2CBF"} // Alternating colors
                                animate={isHorizontal
                                    ? { cx: [line.x1!, line.x2!], opacity: [0, 1, 1, 0] }
                                    : { cy: [line.y1!, line.y2!], opacity: [0, 1, 1, 0] }
                                }
                                transition={{
                                    duration: line.duration * 0.8,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: line.delay
                                }}
                            />
                        </React.Fragment>
                    );
                })}
            </svg>
        </div>
    );
};

export default HeroNetwork;
