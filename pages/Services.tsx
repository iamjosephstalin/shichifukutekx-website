import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus, ArrowRight } from 'lucide-react';
import { servicesData, ServiceData } from '../data/servicesData';
import Magnetic from '../components/ui/Magnetic';

const Services: React.FC = () => {
    return (
        <div className="bg-obsidian min-h-screen pt-32 pb-32 text-ink font-sans relative">
            {/* Background Elements */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

            <Section>
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">

                    {/* Left Column: Sticky Title & Intro */}
                    <div className="lg:w-5/12 relative z-10">
                        <div className="lg:sticky lg:top-40">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h4 className="text-neon-cyan text-sm font-mono tracking-widest uppercase mb-6">Capabilities</h4>

                                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-8 leading-[0.9] text-white">
                                    Our <br />
                                    <motion.span
                                        className="text-outline text-white/10"
                                        whileInView={{
                                            WebkitTextStroke: ["1px rgba(255,255,255,0.2)", "1px #FFFFFF", "1px #00F0FF"],
                                            color: ["transparent", "rgba(255,255,255,0.8)", "rgba(0, 240, 255, 0.1)"],
                                            textShadow: ["none", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(0,240,255,0.3)"]
                                        }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{ duration: 0.8, times: [0, 0.2, 1], ease: "circOut" }}
                                    >Expertise</motion.span>
                                </h1>
                                <p className="text-silver text-lg leading-relaxed max-w-md font-light">
                                    We don't just write code; we engineer intelligence. Our multidisciplinary approach bridges the gap between theoretical AI research and robust enterprise application.
                                </p>

                                {/* Decorative Tech Specs */}
                                <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase font-mono tracking-wider mb-2">Architecture</span>
                                        <span className="font-display font-bold text-neon-cyan text-xl">Cloud-Native</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase font-mono tracking-wider mb-2">Security</span>
                                        <span className="font-display font-bold text-neon-cyan text-xl">ISO 27001</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: Interactive List */}
                    <div className="lg:w-7/12 flex flex-col z-10">
                        {servicesData.map((service, index) => (
                            <ServiceItem key={service.id} data={service} index={index} />
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
};

interface ServiceItemProps {
    data: ServiceData;
    index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ data, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
            className="group border-t border-white/10 relative overflow-hidden cursor-pointer"
        >
            {/* Hover Background Swipe */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-transparent z-0 pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '0%' : '-100%' }}
                transition={{ duration: 0.4, ease: "circOut" }}
            />

            <div className="relative z-10 py-12 px-2 md:px-8">
                <div className="flex items-start justify-between gap-6">
                    <div className="flex items-baseline gap-6 md:gap-12">
                        <span className={`font-mono text-sm md:text-base transition-colors duration-300 ${isHovered ? 'text-neon-cyan' : 'text-gray-600'}`}>
                            {data.id}
                        </span>
                        <h3 className={`text-2xl md:text-4xl lg:text-5xl font-display font-bold uppercase transition-transform duration-500 ${isHovered ? 'translate-x-4 text-white' : 'text-silver'}`}>
                            {data.title}
                        </h3>
                    </div>

                    <motion.div
                        animate={{ rotate: isHovered ? 90 : 0 }}
                        className={`p-2 rounded-full border transition-colors duration-300 ${isHovered ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10' : 'border-white/20 text-white/50'}`}
                    >
                        {isHovered ? <ArrowUpRight size={20} /> : <Plus size={20} />}
                    </motion.div>
                </div>

                {/* Expandable Content */}
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: isHovered ? 'auto' : 0,
                        opacity: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden pl-0 md:pl-[4.5rem]"
                >
                    <div className="pt-8 pb-4 max-w-2xl">
                        <p className="text-lg text-silver leading-relaxed mb-8 font-light">
                            {data.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {data.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-white/10 rounded-full text-gray-400 bg-white/5 group-hover:border-neon-cyan/30 group-hover:text-neon-cyan transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* CTA to Detail Page */}
                        <div className="flex">
                            <Link to={`/services/${data.slug}`} onClick={(e) => e.stopPropagation()}>
                                <Magnetic>
                                    <button className="px-6 py-3 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black rounded-full flex items-center gap-2 transition-all font-bold text-sm tracking-wide uppercase">
                                        Explore Full Capability
                                        <ArrowRight size={16} />
                                    </button>
                                </Magnetic>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Services;