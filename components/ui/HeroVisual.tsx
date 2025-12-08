import React from 'react';
import { motion } from 'framer-motion';

const HeroVisual: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative perspective-1000">
            <motion.div
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="relative w-[500px] h-[500px] flex items-center justify-center bg-contain bg-no-repeat bg-center"
            >
                <img
                    src="/images/3D shapes/20.png"
                    alt="Abstract AI Shape"
                    className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,240,255,0.3)]"
                />

                {/* Subtle Glow Behind */}
                <div className="absolute inset-0 bg-neon-purple/20 blur-[100px] -z-10 rounded-full" />
            </motion.div>
        </div>
    );
};

export default HeroVisual;
