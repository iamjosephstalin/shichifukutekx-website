import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrambleTextProps {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
    revealDirection?: 'start' | 'end' | 'center';
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

const ScrambleText: React.FC<ScrambleTextProps> = ({
    text,
    className = "",
    duration = 2000,
    delay = 0,
}) => {
    const [displayText, setDisplayText] = useState(text.split('').map(() => ' '));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isInView && !isAnimating) {
            const startTimeout = setTimeout(() => {
                setIsAnimating(true);
                let iteration = 0;
                const totalIterations = text.length + 10; // Extra cycles for effect
                const intervalDuration = duration / totalIterations;

                const interval = setInterval(() => {
                    setDisplayText(prev =>
                        text.split('').map((char, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                    );

                    if (iteration >= text.length) {
                        clearInterval(interval);
                        setDisplayText(text.split(''));
                    }

                    iteration += 1 / 3; // Slower resolve
                }, 30); // Fast scramble

                return () => clearInterval(interval);
            }, delay * 1000);

            return () => clearTimeout(startTimeout);
        }
    }, [isInView, text, duration, delay, isAnimating]);

    return (
        <span ref={ref} className={className}>
            {displayText.join('')}
        </span>
    );
};

export default ScrambleText;
