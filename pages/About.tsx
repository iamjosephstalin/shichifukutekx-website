import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/ui/Section';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import Spotlight from '../components/ui/Spotlight';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';
import {
    AlignRight,
    ClipboardCopy,
    FileWarning,
    PenTool,
    Columns,
} from "lucide-react";
import HeroNetwork from '../components/ui/HeroNetwork';

const stats = [
    { value: "200+", label: "Clients" },
    { value: "25", label: "Countries" },
    { value: "50+", label: "Experts" },
    { value: "99%", label: "Client Retention" },
];

const values = [
    {
        title: "Local Insight, Global Expertise",
        desc: "We bring global best practices while respecting Dubai, UAE business cultures, values, and languages.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                <img
                    src="/images/bento-global.png"
                    alt="Global Insight"
                    className="w-full h-full object-cover opacity-60 group-hover/bento:opacity-100 group-hover/bento:scale-110 transition-all duration-500"
                />
            </div>
        ),
        className: "md:col-span-2",
        icon: <ClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Client Success First",
        desc: "Every project begins and ends with your growth in mind. We measure success by your value, trust, and growth.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                <img
                    src="/images/bento-success.png"
                    alt="Client Success"
                    className="w-full h-full object-cover opacity-60 group-hover/bento:opacity-100 group-hover/bento:scale-110 transition-all duration-500"
                />
            </div>
        ),
        className: "md:col-span-1",
        icon: <FileWarning className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Trust & Transparency",
        desc: "We build long-term partnerships based on clarity, reliability, and compliance. No black boxes.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                <img
                    src="/images/bento-trust.png"
                    alt="Trust"
                    className="w-full h-full object-cover opacity-60 group-hover/bento:opacity-100 group-hover/bento:scale-110 transition-all duration-500"
                />
            </div>
        ),
        className: "md:col-span-1",
        icon: <PenTool className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Cultural Intelligence",
        desc: "From Arabic-first AI to Sharia-compliant fintech solutions, our work respects Dubai, UAE values.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                <img
                    src="/images/bento-culture.png"
                    alt="Cultural Intelligence"
                    className="w-full h-full object-cover opacity-60 group-hover/bento:opacity-100 group-hover/bento:scale-110 transition-all duration-500"
                />
            </div>
        ),
        className: "md:col-span-2",
        icon: <Columns className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Innovation with Purpose",
        desc: "Technology is not for show; it is built to deliver measurable results and real-world ROI.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                <img
                    src="/images/bento-innovation.png"
                    alt="Innovation"
                    className="w-full h-full object-cover opacity-60 group-hover/bento:opacity-100 group-hover/bento:scale-110 transition-all duration-500"
                />
            </div>
        ),
        className: "md:col-span-3",
        icon: <AlignRight className="h-4 w-4 text-neutral-500" />,
    }
];

const timeline = [
    { year: "2019", title: "Inception", desc: "ShichifukuTekx FZE was founded with a vision to bridge the gap between cutting-edge AI and real-world business needs." },
    { year: "2020-21", title: "Resilience", desc: "Supported businesses during the pandemic with remote automation, digital workforce solutions, and AI-powered operations continuity." },
    { year: "2022", title: "Expansion", desc: "Recognized for innovation in AI, expanding our presence across Europe, Asia, and Dubai, UAE." },
    { year: "2023-24", title: "Partnership", desc: "Partnered with governments and enterprises in the UAE, Saudi Arabia, Qatar, and Oman to deliver AI aligned with national visions." },
    { year: "Today", title: "Leadership", desc: "We are a leading AI development company in Dubai, UAE, combining scientific rigor, cultural intelligence, and practical business focus." }
];

// Sub-component for the counting animation
const StatCounter: React.FC<{ value: string, label: string }> = ({ value, label }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Parse numeric part and suffix (e.g., "50+" -> 50 and "+")
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const suffix = value.replace(/[0-9]/g, '');

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 20, duration: 2 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            motionValue.set(numericValue);
        }
    }, [isInView, numericValue, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
        return () => unsubscribe();
    }, [springValue]);

    return (
        <div ref={ref} className="text-center md:text-left">
            <span className="block text-5xl md:text-7xl font-display font-bold text-white mb-2 tabular-nums">
                {displayValue}{suffix}
            </span>
            <span className="text-neon-cyan font-mono text-xs uppercase tracking-widest block">
                {label}
            </span>
        </div>
    );
};

const About: React.FC = () => {
    const { scrollY, scrollYProgress } = useScroll();
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useTransform(timelineProgress, [0, 1], [0, 1]);

    // Parallax effect for header
    const yHero = useTransform(scrollY, [0, 500], [0, 100]);

    // Enhanced background animations
    const rotateClockwise = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const rotateCounter = useTransform(scrollYProgress, [0, 1], [0, -180]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.3, 0.3, 0]);

    // Card Stagger Container Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="bg-obsidian min-h-screen pt-32 pb-0 relative overflow-hidden text-white">

            {/* Enhanced Background Decoration */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Ring 1 - Large Clockwise */}
                <motion.div
                    style={{ rotate: rotateClockwise, scale, opacity }}
                    className="absolute top-[-10%] right-[-20%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] border-[1px] border-white/10 rounded-full border-dashed"
                />
                {/* Ring 2 - Medium Counter-Clockwise */}
                <motion.div
                    style={{ rotate: rotateCounter, scale, opacity }}
                    className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] border-[1px] border-neon-cyan/20 rounded-full border-dashed"
                />
            </div>

            {/* Particle Network Overlay */}
            <HeroNetwork />

            <Section>
                {/* Header */}
                <div className="flex flex-col gap-8 md:gap-12 mb-32 relative z-10">
                    <div className="w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div style={{ y: yHero }}>
                                <span className="text-neon-cyan font-mono text-sm tracking-widest uppercase mb-4 block">About ShichifukuTekx FZE</span>
                                <h1 className="text-[10vw] lg:text-[6rem] leading-[0.85] font-display font-bold uppercase break-words hyphens-auto">
                                    Intelligent <br /><motion.span
                                        className="text-outline"
                                        whileInView={{
                                            WebkitTextStroke: ["1px rgba(255,255,255,0.2)", "1px #FFFFFF", "1px #00F0FF"],
                                            color: ["transparent", "rgba(255,255,255,0.8)", "rgba(0, 240, 255, 0.1)"],
                                            textShadow: ["none", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(0,240,255,0.3)"]
                                        }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{ duration: 0.8, times: [0, 0.2, 1], ease: "circOut" }}
                                    >Upgradation.</motion.span>
                                </h1>
                            </motion.div>
                        </motion.div>
                    </div>
                    <div className="w-full max-w-2xl pb-2">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="text-silver text-lg md:text-xl leading-relaxed font-light"
                        >
                            We are the leading artificial intelligence solutions and consulting company in Dubai, UAE. Innovation rooted in tradition.
                        </motion.p>
                    </div>
                </div>

                {/* Stats Section with Counters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-white/10 py-12 relative z-10 bg-obsidian/50 backdrop-blur-sm">
                    {stats.map((stat, i) => (
                        <StatCounter key={i} value={stat.value} label={stat.label} />
                    ))}
                </div>

                {/* Who We Are Section */}
                <div className="flex flex-col lg:flex-row gap-20 mb-32 items-center relative z-10">
                    {/* Lottie Animation Background for this section */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[150%] z-0 opacity-10 pointer-events-none mix-blend-screen">
                        {/* @ts-ignore */}
                        <lottie-player
                            src="https://assets5.lottiefiles.com/packages/lf20_t25ccj.json"
                            background="transparent"
                            speed="0.5"
                            style={{ width: '100%', height: '100%' }}
                            loop
                            autoplay
                        ></lottie-player>
                    </div>

                    <div className="w-full lg:w-1/2 relative z-10">
                        <motion.div
                            animate={{
                                borderRadius: [
                                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                                    "60% 40% 30% 70% / 60% 30% 70% 40%"
                                ]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="aspect-[3/4] overflow-hidden relative shadow-[0_0_50px_rgba(0,240,255,0.2)]"
                        >
                            <div className="absolute inset-0 bg-neon-purple/20 mix-blend-overlay z-10"></div>
                            <img src="/images/dubai-future.png" alt="Dubai Architecture Future" className="w-full h-full object-cover" />
                        </motion.div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-neon-cyan/10 backdrop-blur-md border border-white/10 flex items-center justify-center rounded-full animate-pulse">
                            <span className="font-mono text-xs text-neon-cyan">DUBAI • UAE</span>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 z-10">
                        <span className="text-neon-cyan font-mono text-xs tracking-widest uppercase mb-4 block">Who We Are</span>
                        <h3 className="text-4xl font-display font-bold mb-8 text-white">Partner in Your <br />Intelligent Journey</h3>
                        <div className="space-y-6 text-silver font-light text-lg">
                            <p>
                                At ShichifukuTekx FZE, we are more than a technology company – we are a partner in your journey of intelligent transformation.
                            </p>
                            <p>
                                Founded with the belief that artificial intelligence must serve people, culture, and business growth together, we help organizations across Dubai, UAE and beyond harness the true power of AI. From family-owned enterprises in Kuwait to multinational corporations in Dubai, Riyadh, and Doha, we deliver solutions that combine global expertise with deep local insight.
                            </p>
                            <p>
                                For us, success isn’t measured by algorithms alone – it’s measured by how much value, trust, and growth we bring to our clients.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="mb-32 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-neon-cyan font-mono text-xs tracking-widest uppercase mb-4 block">Our Mission</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">AI for Everyone, Everywhere.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Spotlight className="h-full">
                            <div className="p-8 h-full flex flex-col relative z-10">
                                <div className="w-12 h-12 mb-6 rounded-full bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <h4 className="text-2xl font-display font-bold text-white mb-4">Accessible</h4>
                                <p className="text-silver/80 leading-relaxed">To make AI accessible to every business, regardless of size, demystifying complexity into capability.</p>
                            </div>
                        </Spotlight>
                        <Spotlight className="h-full">
                            <div className="p-8 h-full flex flex-col relative z-10">
                                <div className="w-12 h-12 mb-6 rounded-full bg-neon-purple/10 flex items-center justify-center text-neon-purple">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                </div>
                                <h4 className="text-2xl font-display font-bold text-white mb-4">Practical</h4>
                                <p className="text-silver/80 leading-relaxed">To make AI practical, solving real-world challenges in finance, healthcare, retail, education, and manufacturing.</p>
                            </div>
                        </Spotlight>
                        <Spotlight className="h-full">
                            <div className="p-8 h-full flex flex-col relative z-10">
                                <div className="w-12 h-12 mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h4 className="text-2xl font-display font-bold text-white mb-4">Profitable</h4>
                                <p className="text-silver/80 leading-relaxed">To make AI profitable, delivering measurable ROI and helping Dubai, UAE businesses achieve their Vision 2030 goals.</p>
                            </div>
                        </Spotlight>
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="mb-32 relative z-10" ref={timelineRef}>
                    <h3 className="text-4xl font-display font-bold mb-16 text-center">From Vision to Leadership</h3>
                    <div className="max-w-4xl mx-auto relative pl-8 md:pl-0">
                        {/* Vertical Line Base */}
                        <div className="absolute left-[39px] md:left-[51px] top-0 bottom-0 w-[2px] bg-white/10 origin-top" />
                        {/* Animated Filling Line */}
                        <motion.div
                            style={{ scaleY }}
                            className="absolute left-[39px] md:left-[51px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent origin-top"
                        />

                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                                className="relative pl-12 pb-16 last:pb-0 md:ml-12 group"
                            >
                                {/* Dot */}
                                <div className="absolute left-[-5px] md:top-2 w-4 h-4 rounded-full bg-obsidian border-2 border-white/20 group-hover:border-neon-cyan group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10">
                                    <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-baseline p-6 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all duration-300">
                                    <span className="font-mono text-neon-cyan text-xl md:w-24 flex-shrink-0 font-bold">{item.year}</span>
                                    <div>
                                        <h4 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">{item.title}</h4>
                                        <p className="text-silver text-lg font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-0 relative z-10">
                    <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
                        <h3 className="text-2xl font-mono text-white/50 uppercase tracking-widest">What Defines Us</h3>
                    </div>

                    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
                        {values.map((item, i) => (
                            <BentoGridItem
                                key={i}
                                title={item.title}
                                description={item.desc}
                                header={item.header}
                                className={item.className}
                                icon={item.icon}
                            />
                        ))}
                    </BentoGrid>
                </div>
            </Section>
        </div>
    );
};

export default About;