import React, { useEffect, useRef, useState } from 'react';

interface FooterArrowGridProps {
    isHoveringTop?: boolean;
}

const FooterArrowGrid: React.FC<FooterArrowGridProps> = ({ isHoveringTop = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const arrowsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Grid configuration
    const rows = 5; // Fixed number of rows for footer height
    const [cols, setCols] = useState(20); // Dynamic based on width

    // Update columns on resize
    useEffect(() => {
        const updateCols = () => {
            if (containerRef.current) {
                const width = containerRef.current.clientWidth;
                // Approx 50px per arrow width for density
                setCols(Math.floor(width / 40));
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
            className="w-full h-40 overflow-hidden flex flex-wrap justify-center content-center gap-4 py-4 relative z-0 transition-opacity duration-500 opacity-60 hover:opacity-100"
        >
            {Array.from({ length: rows * cols }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (arrowsRef.current[i] = el)}
                    className={`w-6 h-6 flex items-center justify-center transition-all ease-out will-change-transform ${isHoveringTop ? 'duration-500' : 'duration-75'}`}
                >
                    {/* Simple Arrow SVG pointing UP */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`w-full h-full transition-colors duration-300 ${isHoveringTop ? 'text-neon-purple' : 'text-neon-cyan'}`}
                    >
                        <path d="M12 19V5" />
                        <path d="M5 12l7-7 7 7" />
                    </svg>
                </div>
            ))}

            {/* Gradient Mask for fading edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-transparent pointer-events-none" />
        </div>
    );
};

export default FooterArrowGrid;
