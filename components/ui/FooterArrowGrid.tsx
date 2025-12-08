import React, { useEffect, useRef, useState } from 'react';

interface FooterArrowGridProps {
    isHoveringTop?: boolean;
}

const FooterArrowGrid: React.FC<FooterArrowGridProps> = ({ isHoveringTop = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const arrowsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Grid configuration
    const rows = 4; // 4 rows
    const [cols, setCols] = useState(20); // Dynamic based on width

    // Update columns on resize
    useEffect(() => {
        const updateCols = () => {
            if (containerRef.current) {
                const width = containerRef.current.clientWidth;
                // Approx 60px per arrow width for density + padding adjustment
                setCols(Math.floor(width / 60));
            }
        };

        updateCols();
        window.addEventListener('resize', updateCols);
        return () => window.removeEventListener('resize', updateCols);
    }, []);

    useEffect(() => {
        const updateArrows = (targetX: number, targetY: number) => {
            if (!containerRef.current) return;

            // If hovering top, force override is main priority
            if (isHoveringTop) {
                arrowsRef.current.forEach((arrow) => {
                    if (arrow) arrow.style.transform = `rotate(0deg)`;
                });
                return;
            }

            const rect = containerRef.current.getBoundingClientRect();

            arrowsRef.current.forEach((arrow) => {
                if (!arrow) return;

                // Get arrow center position relative to container
                const arrowRect = arrow.getBoundingClientRect();
                const arrowX = arrowRect.left + arrowRect.width / 2 - rect.left;
                const arrowY = arrowRect.top + arrowRect.height / 2 - rect.top;

                // Adjust target coordinates to be relative to container, just like mouseX was
                // Actually mouseX/Y derived from clientX/Y needs to be relative to rect
                const relativeTargetX = targetX - rect.left;
                const relativeTargetY = targetY - rect.top;

                // Calculate angle
                const deltaX = relativeTargetX - arrowX;
                const deltaY = relativeTargetY - arrowY;
                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

                // Add 90 degrees because intrinsic arrow points up
                arrow.style.transform = `rotate(${angle + 90}deg)`;
            });
        };

        const handleMouseMove = (e: MouseEvent) => updateArrows(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            // We don't prevent default here to allow scrolling, but the arrows will track
            if (e.touches.length > 0) {
                updateArrows(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        // If isHoveringTop is true, we force an update immediately to ensure they snap to UP
        if (isHoveringTop) {
            arrowsRef.current.forEach((arrow) => {
                if (arrow) arrow.style.transform = `rotate(0deg)`;
            });
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [cols, isHoveringTop]);

    // Reset refs array when cols changes
    arrowsRef.current = arrowsRef.current.slice(0, rows * cols);

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex flex-wrap justify-center content-center gap-6 py-8 px-4 md:px-12 relative z-0 transition-opacity duration-500 opacity-60 hover:opacity-100"
        >
            {Array.from({ length: rows * cols }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (arrowsRef.current[i] = el)}
                    className={`w-10 h-10 flex items-center justify-center transition-all ease-out will-change-transform ${isHoveringTop ? 'duration-500' : 'duration-75'}`}
                >
                    {/* Gradient Arrow SVG - 3D Stealth Shape */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-full h-full transition-all duration-300 drop-shadow-md"
                    >
                        <defs>
                            <linearGradient id={`arrow-gradient-default-${i}`} x1="50%" y1="0%" x2="50%" y2="100%">
                                <stop offset="0%" stopColor="#00f3ff" /> {/* Neon Cyan */}
                                <stop offset="100%" stopColor="#0066ff" /> {/* Deep Blue */}
                            </linearGradient>
                            <linearGradient id={`arrow-gradient-active-${i}`} x1="50%" y1="0%" x2="50%" y2="100%">
                                <stop offset="0%" stopColor="#bc13fe" /> {/* Neon Purple */}
                                <stop offset="100%" stopColor="#ff00cc" /> {/* Neon Pink */}
                            </linearGradient>
                            {/* Shadow/Side Gradient for depth */}
                            <linearGradient id={`arrow-gradient-depth-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
                                <stop offset="50%" stopColor="rgba(0,0,0,0)" />
                                <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
                            </linearGradient>
                        </defs>

                        {/* Main Body */}
                        <path
                            d="M12 2L2 22L12 18L22 22L12 2Z"
                            fill={`url(#${isHoveringTop ? `arrow-gradient-active-${i}` : `arrow-gradient-default-${i}`})`}
                        />

                        {/* Center Spine Shadow for 3D effect */}
                        <path
                            d="M12 2L12 18L22 22L12 2Z"
                            fill="black"
                            fillOpacity="0.2"
                        />
                    </svg>
                </div>
            ))}

            {/* Gradient Mask for fading edges - Only Bottom now */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent pointer-events-none" />
        </div>
    );
};

export default FooterArrowGrid;
