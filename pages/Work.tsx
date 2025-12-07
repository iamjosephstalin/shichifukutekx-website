import React, { useState } from 'react';
import Section from '../components/ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
    {
        id: 1,
        title: "Autonomous Trading Core",
        client: "FinCorp Global",
        category: "FinTech",
        image: "/images/work-trading-core.png",
        year: "2025",
        tags: ["Algorithm", "Python", "Real-time"]
    },
    {
        id: 2,
        title: "Diagnostic Vision AI",
        client: "MediTech Systems",
        category: "Healthcare",
        image: "/images/work-diagnostic-ai.png",
        year: "2023",
        tags: ["Computer Vision", "TensorFlow", "IoT"]
    },
    {
        id: 3,
        title: "Supply Chain Predictor",
        client: "LogisticsOne",
        category: "Logistics",
        image: "/images/work-supply-chain.png",
        year: "2023",
        tags: ["Predictive Analytics", "Cloud", "Big Data"]
    },
    {
        id: 4,
        title: "Retail Hyper-Personalization",
        client: "RetailX",
        category: "Retail",
        image: "/images/work-retail-ai.png",
        year: "2025",
        tags: ["GenAI", "Recommendation Engine", "Web"]
    },
    {
        id: 5,
        title: "Smart Grid Energy Optimiser",
        client: "EcoPower",
        category: "IoT",
        image: "/images/work-smart-grid.png",
        year: "2022",
        tags: ["IoT", "Edge Computing", "Analytics"]
    },
    {
        id: 6,
        title: "Legal Document Synthesis",
        client: "LawFirm LLP",
        category: "NLP",
        image: "/images/work-legal-ai.png",
        year: "2023",
        tags: ["NLP", "LLM", "Security"]
    }
];

const categories = ["All", "FinTech", "Healthcare", "Logistics", "Retail", "IoT", "NLP"];

import HeroNetwork from '../components/ui/HeroNetwork';

const Work: React.FC = () => {
    const [filter, setFilter] = useState("All");

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="bg-obsidian min-h-screen pt-32 pb-20 relative">
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

            {/* Particle Network Overlay */}
            <HeroNetwork />

            <Section>
                <div className="mb-20">
                    <h1 className="text-7xl md:text-9xl font-display font-bold text-white uppercase leading-[0.8] mb-8">
                        Selected <br /><motion.span
                            className="text-outline"
                            whileInView={{
                                WebkitTextStroke: ["1px rgba(255,255,255,0.2)", "1px #FFFFFF", "1px #00F0FF"],
                                color: ["transparent", "rgba(255,255,255,0.8)", "rgba(0, 240, 255, 0.1)"],
                                textShadow: ["none", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(0,240,255,0.3)"]
                            }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8, times: [0, 0.2, 1], ease: "circOut" }}
                        >Works</motion.span>
                    </h1>
                    <div className="flex flex-wrap gap-4 mt-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full border text-sm font-mono uppercase tracking-wider transition-all duration-300 ${filter === cat
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-silver border-white/20 hover:border-neon-cyan hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden aspect-[4/3] mb-6 rounded-lg">
                                    <div className="absolute inset-0 bg-neon-cyan/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                        <ArrowUpRight className="text-white w-6 h-6" />
                                    </div>
                                </div>

                                <div className="flex justify-between items-start border-b border-white/10 pb-6 group-hover:border-neon-cyan/50 transition-colors">
                                    <div>
                                        <span className="text-neon-cyan text-xs font-mono uppercase tracking-widest mb-2 block">{project.client}</span>
                                        <h3 className="text-3xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">{project.title}</h3>
                                    </div>
                                    <span className="text-silver font-mono text-sm mt-1">{project.year}</span>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs text-gray-500 font-mono uppercase">#{tag}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </Section>
        </div>
    );
};

export default Work;