import React from 'react';
import { motion } from 'framer-motion';

// Refined list with specific filters for dark-mode visibility.
const techs = [
    {
        name: "Python",
        url: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Python_logo_and_wordmark.svg",
        class: "h-16 md:h-20"
    },
    {
        name: "Node.js",
        url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
        class: "h-16 md:h-20 drop-shadow-[0_0_1px_white]" // Outline text
    },
    {
        name: "React",
        url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        class: "h-16 md:h-20"
    },
    {
        name: "TypeScript",
        url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
        class: "h-16 md:h-20"
    },
    {
        name: "OpenAI",
        url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
        // OpenAI is black. Needs full inversion to white.
        class: "h-12 md:h-16 brightness-0 invert"
    },
    {
        name: "TensorFlow",
        url: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-ar21.svg",
        class: "h-12 md:h-16"
    },
    {
        name: "PyTorch",
        url: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg",
        class: "h-16 md:h-20"
    },
    {
        name: "Google Cloud",
        url: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-ar21.svg",
        class: "h-12 md:h-16"
    }
];

const marqueeItems = [...techs, ...techs, ...techs];

const TechMarquee: React.FC = () => {
    return (
        <section className="py-24 relative z-20 overflow-hidden border-t border-white/5 bg-obsidian">
            {/* Gradient title for context */}
            <div className="text-center mb-20 px-6">
                <span className="text-neon-cyan font-mono text-xs tracking-[0.3em] uppercase opacity-80">
                    Built With
                </span>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white mt-4">
                    Best-in-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">Technologies</span>
                </h3>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

                <div className="flex w-full items-center">
                    <motion.div
                        className="flex gap-20 md:gap-32 items-center pr-20 md:pr-32"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 35,
                            repeatType: "loop"
                        }}
                    >
                        {marqueeItems.map((tech, index) => (
                            <div
                                key={`${tech.name}-${index}`}
                                className="relative shrink-0 flex items-center justify-center"
                            >
                                <img
                                    src={tech.url}
                                    alt={tech.name}
                                    className={`
                                        ${tech.class} w-auto object-contain
                                        drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]
                                        hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]
                                        transition-all duration-300
                                    `}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TechMarquee;
