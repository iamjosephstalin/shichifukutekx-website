import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import HeroNetwork from '../components/ui/HeroNetwork';
import Magnetic from '../components/ui/Magnetic';
import { ArrowUpRight, Cpu, Globe, Zap, ArrowRight, Activity, ArrowDown, TrendingUp, ShoppingBag, Factory, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrambleText from '../components/ui/ScrambleText';

gsap.registerPlugin(ScrollTrigger);

// ... (existing imports)

const services = [
    {
        id: 1,
        title: 'Healthcare & Life Sciences',
        subtitle: 'Life Sciences',
        desc: 'Diagnostic AI, patient management, drug discovery.',
        icon: <Activity className="w-6 h-6" />,
        gradient: 'from-emerald-500/40 via-emerald-900/40 to-obsidian', // Darker gradient for text readability
        accent: 'text-emerald-400',
        borderColor: 'group-hover:border-emerald-500/50',
        image: "/images/Healthcare-Life-Sciences.webp"
    },
    {
        id: 2,
        title: 'Financial Services',
        subtitle: 'FinTech',
        desc: 'Fraud detection, risk assessment, algorithmic trading.',
        icon: <TrendingUp className="w-6 h-6" />,
        gradient: 'from-blue-500/40 via-blue-900/40 to-obsidian',
        accent: 'text-blue-400',
        borderColor: 'group-hover:border-blue-500/50',
        image: "/images/Financial-Services-main.webp"
    },
    {
        id: 3,
        title: 'Retail & E-commerce',
        subtitle: 'Commerce',
        desc: 'Personalization, inventory optimization, demand forecasting.',
        icon: <ShoppingBag className="w-6 h-6" />,
        gradient: 'from-neon-purple/40 via-purple-900/40 to-obsidian',
        accent: 'text-neon-purple',
        borderColor: 'group-hover:border-neon-purple/50',
        image: "/images/Retail-E-commerce.webp"
    },
    {
        id: 4,
        title: 'Manufacturing',
        subtitle: 'Industry 4.0',
        desc: 'Predictive maintenance, quality control, supply chain optimization.',
        icon: <Factory className="w-6 h-6" />,
        gradient: 'from-orange-500/40 via-orange-900/40 to-obsidian',
        accent: 'text-orange-400',
        borderColor: 'group-hover:border-orange-500/50',
        image: "/images/Manufacturing.webp"
    },
    {
        id: 5,
        title: 'Logistics',
        subtitle: 'Supply Chain',
        desc: 'Route optimization, fleet management, demand planning.',
        icon: <Truck className="w-6 h-6" />,
        gradient: 'from-indigo-500/40 via-indigo-900/40 to-obsidian',
        accent: 'text-indigo-400',
        borderColor: 'group-hover:border-indigo-500/50',
        image: "/images/Logistics-Transportation.webp"
    },
    {
        id: 6,
        title: 'Technology & SaaS',
        subtitle: 'Software',
        desc: 'Product intelligence, user behavior analysis, automated testing.',
        icon: <Cpu className="w-6 h-6" />,
        gradient: 'from-neon-cyan/40 via-cyan-900/40 to-obsidian',
        accent: 'text-neon-cyan',
        borderColor: 'group-hover:border-neon-cyan/50',
        image: "/images/Technology-SaaS-1.webp"
    },
];

const selectedWorks = [
    {
        id: 1,
        client: "Strategic AI Adoption",
        title: "AI Tech Consulting",
        img: "/images/AI-Tech-Consulting-–-Strategic-AI-Adoption.webp",
        gradient: "from-neon-cyan/40 via-blue-900/40 to-obsidian",
        tags: ["Strategic Roadmap", "Feasibility", "ROI Analysis"],
        desc: "Smart Strategy Starts Here. AI success doesn’t begin with coding - it begins with a plan that works. We help enterprises in Dubai, Riyadh, and Doha identify opportunities and craft strategies aligned with Vision 2030."
    },
    {
        id: 2,
        client: "Next-Gen Intelligent Systems",
        title: "AI Development Services",
        img: "/images/AI-Development-Services.webp",
        gradient: "from-neon-purple/40 via-purple-900/40 to-obsidian",
        tags: ["Python", "TensorFlow", "PyTorch", "Docker"],
        desc: "Building Smarter Applications That Understand Your World. Our engineers design and build custom AI and ML models that are practical, scalable, and optimized for businesses in Dubai, UAE."
    },
    {
        id: 3,
        client: "Business Automation",
        title: "Automation & Insights",
        img: "/images/AI-for-Business-Automation-Insights.webp",
        gradient: "from-emerald-500/40 via-emerald-900/40 to-obsidian",
        tags: ["RPA", "NLP", "Power BI", "Workflow GenAI"],
        desc: "Turn Workflows Into Wins. Manual processes cost time, money, and opportunities. Our automation tools transform everyday operations into seamless, intelligent workflows, achieving 35–50% efficiency improvements."
    },
    {
        id: 4,
        client: "Tailored Intelligence",
        title: "Industry-Specific AI",
        img: "/images/Industry-Specific-AI-Solutions-1.webp",
        gradient: "from-orange-500/40 via-orange-900/40 to-obsidian",
        tags: ["IoT Integration", "Computer Vision", "Healthcare Data"],
        desc: "Every sector has unique challenges. We build specialized solutions for Healthcare, Fintech, EdTech, and Smart Manufacturing industries shaping the future of Dubai, UAE."
    },
    {
        id: 5,
        client: "System Upgrades",
        title: "AI-Integrated Development",
        img: "/images/AI-Integrated-Development-Services.webp",
        gradient: "from-blue-600/40 via-indigo-900/40 to-obsidian",
        tags: ["Node.js", "React", "API Integration", "Cloud Native"],
        desc: "Upgrade Without Disruption. Already have digital platforms? We make them smarter with AI integration. Python backends, Node.js automation, and Arabic-first intelligent frontends."
    }
];

const Home: React.FC = () => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const [activeService, setActiveService] = useState(1);

    // Parallax Hero Text
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 500], [0, 200]);
    const yBg = useTransform(scrollY, [0, 500], [0, 50]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    const textBlur = useTransform(scrollY, [0, 500], ["0px", "10px"]); // Blur effect on scroll

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal Scroll Logic
            if (sliderRef.current && triggerRef.current) {
                const slider = sliderRef.current;
                const trigger = triggerRef.current;

                // Calculate the exact distance to translate
                // Translation = Total Width of Slider - 1 Viewport Width
                // This ensures the last panel stops exactly when it fills the screen
                const getScrollAmount = () => {
                    return -(slider.scrollWidth - window.innerWidth);
                };

                // The duration of the scroll (how long we pin)
                // Setting it to the translation distance creates a natural 1:1 scroll feel
                const getScrollDistance = () => {
                    return slider.scrollWidth - window.innerWidth;
                };

                gsap.to(slider, {
                    x: getScrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: trigger,
                        start: "top top",
                        end: () => `+=${getScrollDistance()}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
            }

            // Text Reveal Animation for "Architecting Intelligence"
            gsap.from(".reveal-text", {
                scrollTrigger: {
                    trigger: ".reveal-section",
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "power4.out"
            });

        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-obsidian min-h-screen overflow-x-hidden text-ink font-sans">

            {/* HERO SECTION */}
            <section ref={heroRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-obsidian">

                {/* Animated Noise Overlay */}
                <div className="absolute inset-0 z-20 bg-noise opacity-30 pointer-events-none"></div>

                {/* === DUBAI + AI BACKGROUND === */}
                <motion.div style={{ y: yBg, scale: 1.1 }} className="absolute inset-0 z-0">
                    <img
                        src="/images/dubai-ai-hero.png"
                        alt="Dubai AI Future"
                        className="w-full h-full object-cover object-[center_30%] opacity-60"
                    />
                    {/* Dark Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-transparent to-obsidian/90" />
                </motion.div>

                {/* === VECTOR NETWORK OVERLAY === */}
                <HeroNetwork />

                {/* === TOP META DATA (MOVED TO TOP) === */}
                <div className="hidden md:flex absolute top-0 left-0 right-0 z-30 px-6 py-8 w-full max-w-[1800px] mx-auto justify-between items-start">
                    <div className="flex flex-col">
                        <span className="text-neon-cyan text-xs font-mono tracking-widest mb-1">LOCATION</span>
                        <div className="flex items-center gap-2">
                            <img src="/images/gcc-clipart.png" alt="GCC" className="h-6 w-auto object-contain" />
                            <span className="text-silver text-xs font-mono">GCC Region</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                        <span className="text-neon-cyan text-xs font-mono tracking-widest">AI Enabled Solutions</span>
                    </div>
                </div>

                {/* Main Content (Centered & Blurred on Scroll) */}
                <div className="z-10 relative px-4 w-full max-w-[1800px] mx-auto h-full flex flex-col justify-center">
                    <motion.div style={{ y: yText, opacity, filter: `blur(${textBlur})` }} className="flex flex-col justify-center h-full pt-20">

                        {/* Hero Headline */}
                        {/* Hero Headline & Subtext */}
                        {/* Animated Headline Sequence */}
                        <div className="max-w-6xl relative z-20">

                            {/* Step 1: Fade In */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                className="text-neon-purple text-base md:text-xl font-mono tracking-widest uppercase mb-2"
                            >
                                Empower Your Business.
                            </motion.p>

                            {/* Step 2: Slide Up */}
                            <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                                className="text-xl md:text-4xl font-light text-white/90 mb-6 md:mb-8"
                            >
                                Accelerate with <span className="text-neon-cyan font-semibold">Intelligence.</span>
                            </motion.h3>

                            {/* Step 3: Reveal Title */}
                            <h1 className="text-[8.5vw] xl:text-[6.5vw] leading-[1.1] md:leading-[0.85] font-display font-bold tracking-tighter text-white uppercase mix-blend-normal mb-6 md:mb-8">
                                <span className="block overflow-hidden">
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                                        className="block flex flex-col md:flex-row gap-y-0 md:gap-x-8 items-start"
                                    >
                                        <ScrambleText
                                            text="ShichifukuTekx"
                                            delay={2.5}
                                            duration={1500}
                                            className="inline-block whitespace-nowrap"
                                        />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple inline-block">
                                            <ScrambleText
                                                text="FZE"
                                                delay={3.0}
                                                duration={1000}
                                            />
                                        </span>
                                    </motion.span>
                                </span>
                                <span className="block overflow-hidden mt-2 md:mt-2">
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="block text-lg md:text-3xl font-sans tracking-normal normal-case text-silver font-light"
                                    >
                                        AI for Dubai’s Most Ambitious Enterprises
                                    </motion.span>
                                </span>
                            </h1>

                            {/* Animated Subtext */}
                            <motion.div
                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                transition={{ duration: 1.5, delay: 3.2, ease: "easeOut" }}
                                className="max-w-3xl mb-8 md:mb-12 border-l-2 border-neon-cyan pl-4 md:pl-6"
                            >
                                <p className="text-base md:text-lg text-silver/80 leading-relaxed">
                                    Precision-engineered AI solutions built to optimize, automate, and revolutionize operations.
                                    Human-centered design meets deep technical expertise to create intelligence that truly performs.
                                </p>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 3.5 }}
                                className="flex justify-start"
                            >
                                <Magnetic>
                                    <button className="group relative px-8 py-4 md:px-10 md:py-5 bg-obsidian border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                        <div className="relative flex items-center gap-4">
                                            <span className="text-sm md:text-base font-bold uppercase tracking-widest text-white group-hover:text-neon-cyan transition-colors">Start Your AI Transformation</span>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-cyan group-hover:text-black transition-colors">
                                                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </button>
                                </Magnetic>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="py-2 border-y border-white/5 bg-charcoal/30 backdrop-blur-md relative z-20">
                <div className="overflow-hidden whitespace-nowrap">
                    <motion.div
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                        className="flex gap-16 items-center text-5xl md:text-7xl font-display font-bold select-none w-max"
                    >
                        {/* Set 1 */}
                        <span className="text-white">INTELLIGENCE</span>
                        <span className="text-5xl text-neon-purple"><Activity /></span>
                        <span className="text-outline">SCALABILITY</span>
                        <span className="text-5xl text-neon-cyan"><Activity /></span>
                        <span className="text-white">AUTONOMY</span>
                        <span className="text-5xl text-neon-purple"><Activity /></span>
                        <span className="text-outline">SECURITY</span>
                        <span className="text-5xl text-neon-cyan"><Activity /></span>
                        <span className="text-white">INNOVATION</span>
                        <span className="text-5xl text-neon-purple"><Activity /></span>
                        <span className="text-outline">PRECISION</span>
                        <span className="text-5xl text-neon-cyan"><Activity /></span>
                        <span className="text-white">ADAPTABILITY</span>
                        <span className="text-5xl text-neon-purple"><Activity /></span>
                        <span className="text-outline">VISION</span>
                        <span className="text-5xl text-neon-cyan"><Activity /></span>

                        {/* Set 2 (Duplicate for seamless loop) */}
                        <span className="text-white">INTELLIGENCE</span>
                        <span className="text-5xl text-neon-purple"><Activity /></span>
                        <span className="text-outline">SCALABILITY</span>
                        <span className="text-5xl text-neon-cyan"><Activity /></span>
                        <span className="text-white">AUTONOMY</span>
                        <span className="text-5xl text-neon-purple"><Activity /></span>
                        <span className="text-outline">SECURITY</span>
                        <span className="text-5xl text-neon-cyan"><Activity /></span>
                        <span className="text-white">INNOVATION</span>
                        <span className="text-5xl text-neon-purple"><Activity /></span>
                        <span className="text-outline">PRECISION</span>
                        <span className="text-5xl text-neon-cyan"><Activity /></span>
                        <span className="text-white">ADAPTABILITY</span>
                        <span className="text-5xl text-neon-purple"><Activity /></span>
                        <span className="text-outline">VISION</span>
                        <span className="text-5xl text-neon-cyan"><Activity /></span>
                    </motion.div>
                </div>
            </div>

            {/* SERVICES - "KINETIC MONOLITHS" DESIGN */}
            <Section className="relative z-20 bg-obsidian py-32 reveal-section">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <div className="max-w-3xl">
                        <h4 className="text-neon-cyan text-sm font-mono tracking-widest uppercase mb-6">Core Industries</h4>
                        <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter reveal-text text-white leading-[0.9]">
                            Our <motion.span
                                className="text-outline"
                                whileInView={{
                                    WebkitTextStroke: ["1px rgba(255,255,255,0.2)", "1px #FFFFFF", "1px #00F0FF"],
                                    color: ["transparent", "rgba(255,255,255,0.8)", "rgba(0, 240, 255, 0.1)"],
                                    textShadow: ["none", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(0,240,255,0.3)"]
                                }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.8, times: [0, 0.2, 1], ease: "circOut" }}
                            >Expertise.</motion.span>
                        </h2>
                    </div>
                    <Link to="/services" className="hidden md:flex mt-8 md:mt-0 px-8 py-4 border border-white/20 rounded-full items-center gap-2 hover:bg-white/5 hover:border-neon-cyan transition-all interactive group">
                        <span className="text-sm uppercase tracking-wider font-bold">Explore Capabilities</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                {/* Interactive Monolith Container */}
                <div className="flex flex-col lg:flex-row w-full h-[800px] lg:h-[650px] gap-2">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            layout
                            onHoverStart={() => setActiveService(service.id)}
                            onClick={() => setActiveService(service.id)}
                            animate={{
                                flex: activeService === service.id ? 10 : 1,
                                opacity: 1 // Always fully visible structure, controlling inner opacity
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className={`relative rounded-none first:rounded-l-2xl last:rounded-r-2xl border border-white/10 bg-charcoal overflow-hidden cursor-pointer group hover:border-white/30 transition-all duration-500`}
                        >
                            {/* Background Image with Animation */}
                            <div className="absolute inset-0 overflow-hidden z-0">
                                <motion.div
                                    className="w-full h-full"
                                    animate={{
                                        scale: activeService === service.id ? 1.1 : 1,
                                        opacity: activeService === service.id ? 0.9 : 0.4,
                                        filter: activeService === service.id ? "grayscale(0%)" : "grayscale(100%)"
                                    }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                {/* Gradient Overlay for Text Readability */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient}`} />
                                <div className="absolute inset-0 bg-obsidian/10" />
                            </div>

                            {/* Content Layout */}
                            <div className="relative z-10 h-full w-full p-6 md:p-8 flex flex-col justify-between">
                                {/* Icon - Animated Layout */}
                                <motion.div
                                    layout
                                    className={`z-20 ${activeService === service.id ? 'self-end' : 'hidden md:block absolute top-6 md:top-8 left-0 right-0 mx-auto w-fit h-fit'}`}
                                >
                                    <div className={`${service.accent} bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/5`}>
                                        {service.icon}
                                    </div>
                                </motion.div>

                                {/* Middle/Bottom Content */}
                                <div className="mt-auto">
                                    {/* Collapsed State Title (Vertical on Desktop, Horizontal on Mobile) */}
                                    {activeService !== service.id && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 pointer-events-none">
                                            <h3 className="text-xl md:text-2xl font-display font-bold text-white/70 whitespace-nowrap rotate-0 lg:-rotate-90 tracking-widest uppercase drop-shadow-md">
                                                {service.subtitle}
                                            </h3>
                                        </div>
                                    )}

                                    {/* Expanded State Content */}
                                    <div className="relative overflow-hidden">
                                        <motion.h3
                                            layout="position"
                                            className={`text-3xl lg:text-5xl font-display font-bold mb-4 uppercase leading-[0.9] drop-shadow-lg ${activeService === service.id ? 'text-white' : 'text-transparent'}`}
                                        >
                                            {service.title}
                                        </motion.h3>

                                        <AnimatePresence>
                                            {activeService === service.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-light drop-shadow-md">
                                                        {service.desc}
                                                    </p>

                                                    <div className="flex items-center gap-6 border-t border-white/20 pt-6">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-white/70 uppercase tracking-widest font-mono">Expertise</span>
                                                            <span className="font-mono text-neon-cyan text-sm font-bold shadow-black drop-shadow-sm">Deep Tech</span>
                                                        </div>
                                                        <div className="w-[1px] h-8 bg-white/20" />
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-white/70 uppercase tracking-widest font-mono">Impact</span>
                                                            <span className="font-mono text-neon-cyan text-sm font-bold shadow-black drop-shadow-sm">Scalable</span>
                                                        </div>

                                                        <button className="ml-auto p-4 rounded-full border border-white/20 hover:bg-white/10 transition-all group/btn bg-black/20 backdrop-blur-sm">
                                                            <ArrowRight size={20} className="text-white group-hover/btn:translate-x-1 transition-transform" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* HORIZONTAL SCROLL CONTAINER */}
            <div ref={triggerRef} className="bg-obsidian border-t border-white/5 relative z-20 h-screen overflow-hidden">
                <div ref={sliderRef} className="flex h-full w-fit">

                    {/* PANEL 1: Title Card */}
                    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center bg-obsidian border-r border-white/5 relative p-6 md:p-24 panel-item">
                        <div className="max-w-4xl w-full">
                            <span className="text-neon-cyan font-mono text-xs md:text-sm tracking-widest mb-4 block">SOLUTIONS</span>
                            <h2 className="text-5xl md:text-[10vw] font-display font-bold mb-6 md:mb-8 text-white leading-[0.9]">
                                AI<br />
                                <motion.span
                                    className="text-outline"
                                    whileInView={{
                                        WebkitTextStroke: ["1px rgba(255,255,255,0.2)", "1px #FFFFFF", "1px #00F0FF"],
                                        color: ["transparent", "rgba(255,255,255,0.8)", "rgba(0, 240, 255, 0.1)"],
                                        textShadow: ["none", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(0,240,255,0.3)"]
                                    }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    transition={{ duration: 0.8, times: [0, 0.2, 1], ease: "circOut" }}
                                >Services</motion.span>
                            </h2>
                            <p className="text-lg md:text-2xl text-silver max-w-xl leading-relaxed font-light">
                                End-to-end artificial intelligence capabilities designed to modernize enterprises and drive growth across Dubai and the UAE.
                            </p>
                            <div className="mt-8 md:mt-12 flex items-center gap-4 text-neon-cyan">
                                <span className="text-xs md:text-sm font-mono tracking-widest">DISCOVER OFFERINGS</span>
                                <ArrowRight className="animate-pulse" />
                            </div>
                        </div>
                        <div className="absolute inset-0 z-[-1] opacity-20 bg-noise"></div>
                    </div>

                    {/* PANEL 2-N: Case Studies / Selected Works */}
                    {selectedWorks.map((work, index) => (
                        <div key={work.id} className="w-screen h-screen flex-shrink-0 flex flex-col md:flex-row relative bg-charcoal border-r border-white/5 panel-item overflow-hidden">

                            {/* Image Side */}
                            <div className="w-full h-[35vh] md:w-3/5 md:h-full relative overflow-hidden group order-1 md:order-none">
                                <div className={`absolute inset-0 bg-gradient-to-t ${work.gradient} z-10 transition-opacity duration-700 opacity-100 group-hover:opacity-0`}></div>
                                <img
                                    src={work.img}
                                    alt={work.title}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 grayscale group-hover:grayscale-0"
                                />
                            </div>

                            {/* Content Side */}
                            <div className="w-full h-[65vh] md:w-2/5 md:h-full p-6 md:p-16 lg:p-20 flex flex-col justify-center bg-obsidian relative z-10 border-t border-white/10 md:border-t-0 md:border-l overflow-y-auto md:overflow-hidden order-2 md:order-none">
                                <div className="hidden md:block absolute top-6 right-6 md:top-10 md:right-10 text-8xl md:text-9xl font-display font-bold text-white/5 select-none">
                                    0{index + 1}
                                </div>

                                <div className="space-y-4 md:space-y-8">
                                    <div className="flex justify-between items-center">
                                        <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 border border-neon-cyan/20 rounded-full text-neon-cyan text-[10px] md:text-xs font-mono tracking-widest uppercase bg-neon-cyan/5">
                                            {work.client}
                                        </span>
                                        <span className="md:hidden text-4xl font-display font-bold text-white/10">0{index + 1}</span>
                                    </div>


                                    <h3 className="text-3xl md:text-[2.75rem] font-display font-bold text-white leading-[1.0] w-full uppercase">
                                        {work.title}
                                    </h3>

                                    <p className="text-silver text-sm md:text-lg font-light leading-relaxed">
                                        {work.desc}
                                    </p>

                                    <div className="pt-4 md:pt-8 flex flex-wrap gap-2 md:gap-3">
                                        {/* @ts-ignore */}
                                        {work.tags && work.tags.map((tag, i) => (
                                            <span key={i} className="px-2 py-1 md:px-3 md:py-1 border border-white/10 rounded-full text-[10px] md:text-xs font-mono text-neon-cyan/80 bg-neon-cyan/5 backdrop-blur-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TESTIMONIALS SECTION - INFINITE VERTICAL SCROLL */}
            <Section className="py-32 relative z-10">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex flex-col md:flex-row gap-12 items-start md:items-end mb-20 relative z-10">
                    <div className="md:w-1/2">
                        <h2 className="text-5xl md:text-7xl font-display font-bold uppercase leading-[0.9]">
                            Client <br />
                            <motion.span
                                className="text-outline"
                                whileInView={{
                                    WebkitTextStroke: ["1px rgba(255,255,255,0.2)", "1px #FFFFFF", "1px #00F0FF"],
                                    color: ["transparent", "rgba(255,255,255,0.8)", "rgba(0, 240, 255, 0.1)"],
                                    textShadow: ["none", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(0,240,255,0.3)"]
                                }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.8, times: [0, 0.2, 1], ease: "circOut" }}
                            >Voices</motion.span>
                        </h2>
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-silver text-lg font-light leading-relaxed max-w-sm">
                            Trusted by visionaries who are reshaping the future of the GCC region.
                        </p>
                    </div>
                </div>

                {/* INFINITE VERTICAL SCROLL CONTAINER */}
                <div className="relative h-[600px] overflow-hidden w-full mask-linear-fade">
                    {/* Gradient Masks for Fade Effect */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-obsidian/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-obsidian/80 to-transparent z-20 pointer-events-none" />

                    {/* Scrolling Track */}
                    <motion.div
                        className="flex flex-col gap-8 w-full items-center"
                        animate={{ y: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40,
                            repeatType: "loop"
                        }}
                        whileHover={{ opacity: 1 }}
                        onHoverStart={() => {
                            // Framer motion doesn't have an easy 'pause' prop without animation controls
                            // But typically users want to read. We can slow it down drastically or use a state
                            // For now, simpler is better: hover preserves interactions
                        }}
                        style={{ willChange: "transform" }}
                    >
                        {/* Content Logic: Duplicated Array for Seamless Loop */}
                        {[
                            ...[
                                {
                                    quote: "ShichifukuTekx transformed our operational efficiency by 40% in just three months. Their AI models are nothing short of revolutionary.",
                                    author: "Ahmed Al-Mansouri",
                                    role: "CTO, FinTech Arabia",
                                    border: "group-hover:border-neon-cyan",
                                    glow: "group-hover:shadow-[0_0_50px_-10px_rgba(0,240,255,0.2)]"
                                },
                                {
                                    quote: "The strategic insight provided for our digital transformation was impeccable. A true partner for Vision 2030 initiatives.",
                                    author: "Sarah Johnson",
                                    role: "Director, HealthLife UAE",
                                    border: "group-hover:border-neon-purple",
                                    glow: "group-hover:shadow-[0_0_50px_-10px_rgba(180,0,255,0.2)]"
                                },
                                {
                                    quote: "Their team doesn't just build software; they engineer intelligent ecosystems that scale with our ambitions.",
                                    author: "Faisal Bin Laden",
                                    role: "Head of Innovation, SmartCity",
                                    border: "group-hover:border-emerald-500",
                                    glow: "group-hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.2)]"
                                },
                                {
                                    quote: "An absolute game-changer for our logistics operations. The predictive models saved us millions in the first quarter.",
                                    author: "Omar Khalid",
                                    role: "VP Operations, TransGulf",
                                    border: "group-hover:border-orange-500",
                                    glow: "group-hover:shadow-[0_0_50px_-10px_rgba(249,115,22,0.2)]"
                                }
                            ],
                            ...[
                                { quote: "ShichifukuTekx transformed our operational efficiency by 40% in just three months. Their AI models are nothing short of revolutionary.", author: "Ahmed Al-Mansouri", role: "CTO, FinTech Arabia", border: "group-hover:border-neon-cyan", glow: "group-hover:shadow-[0_0_50px_-10px_rgba(0,240,255,0.2)]" },
                                { quote: "The strategic insight provided for our digital transformation was impeccable. A true partner for Vision 2030 initiatives.", author: "Sarah Johnson", role: "Director, HealthLife UAE", border: "group-hover:border-neon-purple", glow: "group-hover:shadow-[0_0_50px_-10px_rgba(180,0,255,0.2)]" },
                                { quote: "Their team doesn't just build software; they engineer intelligent ecosystems that scale with our ambitions.", author: "Faisal Bin Laden", role: "Head of Innovation, SmartCity", border: "group-hover:border-emerald-500", glow: "group-hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.2)]" },
                                { quote: "An absolute game-changer for our logistics operations. The predictive models saved us millions in the first quarter.", author: "Omar Khalid", role: "VP Operations, TransGulf", border: "group-hover:border-orange-500", glow: "group-hover:shadow-[0_0_50px_-10px_rgba(249,115,22,0.2)]" }
                            ]
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: Math.random() > 0.5 ? 1 : -1,
                                    skewX: Math.random() > 0.5 ? 2 : -2,
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }} // Bouncy "Jelly" physics
                                className={`w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 p-12 md:p-14 rounded-2xl transition-colors duration-300 ${t.border} ${t.glow} group cursor-pointer relative overflow-hidden flex flex-col md:flex-row gap-8 items-start hover:bg-white/10`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-scanner pointer-events-none" /> {/* Glitch Scanner */}
                                <div className="text-neon-cyan text-6xl font-serif leading-none opacity-50">"</div>
                                <div>
                                    <p className="text-2xl md:text-3xl text-white font-light leading-normal mb-8 relative z-10">
                                        {t.quote}
                                    </p>
                                    <div>
                                        <h4 className="font-display font-bold text-xl text-white group-hover:text-neon-cyan transition-colors">{t.author}</h4>
                                        <span className="text-sm font-mono text-silver uppercase tracking-wider">{t.role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Section>

            {/* BLOG / INSIGHTS SECTION */}
            <Section className="py-32 relative z-10 border-t border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="flex justify-between items-end mb-20 relative z-10">
                    <h2 className="text-5xl md:text-7xl font-display font-bold uppercase leading-[0.9]">
                        Latest <br />
                        <motion.span
                            className="text-outline"
                            whileInView={{
                                WebkitTextStroke: ["1px rgba(255,255,255,0.2)", "1px #FFFFFF", "1px #00F0FF"],
                                color: ["transparent", "rgba(255,255,255,0.8)", "rgba(0, 240, 255, 0.1)"],
                                textShadow: ["none", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(0,240,255,0.3)"]
                            }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8, times: [0, 0.2, 1], ease: "circOut" }}
                        >Insights</motion.span>
                    </h2>
                    <Link to="/work" className="hidden md:flex items-center gap-2 text-neon-cyan hover:text-white transition-colors uppercase font-mono text-xs tracking-widest">
                        Read All Articles <ArrowRight size={14} />
                    </Link>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
                >
                    {[
                        {
                            title: "The Future of Generative AI in GCC Governments",
                            date: "DEC 02, 2025",
                            category: "GOVTECH",
                            img: "/images/AI-Development-Services.webp",
                            color: "bg-neon-cyan",
                            glow: "group-hover:shadow-[0_20px_40px_-15px_rgba(0,240,255,0.3)]",
                            border: "group-hover:border-neon-cyan/50"
                        },
                        {
                            title: "Sustainable Smart Cities: AI at the Edge",
                            date: "NOV 28, 2025",
                            category: "INFRASTRUCTURE",
                            img: "/images/Industry-Specific-AI-Solutions-1.webp",
                            color: "bg-neon-purple",
                            glow: "group-hover:shadow-[0_20px_40px_-15px_rgba(180,0,255,0.3)]",
                            border: "group-hover:border-neon-purple/50"
                        },
                        {
                            title: "FinTech 2.0: Beyond Algorithmic Trading",
                            date: "NOV 15, 2025",
                            category: "FINANCE",
                            img: "/images/Financial-Services-main.webp",
                            color: "bg-emerald-500",
                            glow: "group-hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)]",
                            border: "group-hover:border-emerald-500/50"
                        }
                    ].map((post, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            whileHover={{ y: -10 }}
                            className={`group cursor-pointer relative rounded-sm transition-all duration-500 border border-white/10 ${post.border} ${post.glow} overflow-hidden`}
                        >
                            {/* Scanner Light Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-scanner z-30 pointer-events-none" />

                            <div className="relative h-[300px] overflow-hidden mb-6 border-b border-white/10">
                                <div className="absolute inset-0 bg-obsidian/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                <motion.img
                                    src={post.img}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.7 }}
                                />
                                <div className={`absolute top-4 left-4 ${post.color} text-black text-[10px] font-bold px-3 py-1 font-mono uppercase tracking-widest z-20`}>
                                    {post.category}
                                </div>
                            </div>

                            <div className="px-6 pb-8">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-neon-cyan text-xs font-mono tracking-wider">{post.date}</span>
                                    <div className="h-[1px] w-8 bg-white/20" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white leading-tight group-hover:text-neon-cyan transition-colors mb-4">
                                    {post.title}
                                </h3>
                                <span className="inline-flex items-center gap-2 text-sm text-silver group-hover:text-white transition-colors border-b border-transparent group-hover:border-neon-cyan pb-0.5">
                                    Read Article <ArrowUpRight size={14} />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            {/* CTA SECTION */}
            <Section className="bg-obsidian text-center min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden z-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-[120px]" />
                </div>

                <h2 className="text-6xl md:text-9xl font-display font-bold z-10 mb-16 text-white relative leading-[0.85]">
                    Ready to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Evolve?</span>
                </h2>

                <Link to="/contact">
                    <Magnetic>
                        <div className="w-56 h-56 md:w-72 md:h-72 rounded-full relative flex items-center justify-center group z-10 interactive cursor-pointer">
                            {/* Electric Border Ring */}
                            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-transparent transition-colors duration-300" />

                            {/* Spinning Electric Gradient - Visible on Hover */}
                            <motion.div
                                className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-neon-cyan via-transparent to-neon-purple opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Shockwave Ripple */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-neon-cyan opacity-0"
                                whileHover={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />

                            {/* Core Content */}
                            <div className="absolute inset-[2px] rounded-full bg-obsidian/80 backdrop-blur-md flex items-center justify-center z-20 border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                                <span className="text-2xl font-display font-bold text-white group-hover:text-neon-cyan group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300">
                                    Get in Touch
                                </span>
                            </div>
                        </div>
                    </Magnetic>
                </Link>
            </Section>
        </div>
    );
};

export default Home;