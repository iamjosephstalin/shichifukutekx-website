import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Section from '../components/ui/Section';
import { motion, useScroll, useTransform } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.slug === slug);
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);

  // Handle case where service isn't found
  useEffect(() => {
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);

  if (!service) return null;

  // Find next service for navigation
  const currentIndex = servicesData.findIndex(s => s.slug === slug);
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];

  // Animation Variants
  const containerVariants = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-obsidian min-h-screen text-ink font-sans relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-neon-purple/5 blur-[150px] rounded-full mix-blend-screen animate-blob" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-neon-cyan/5 blur-[150px] rounded-full mix-blend-screen animate-blob animation-delay-2000" />
         <div className="absolute inset-0 bg-noise opacity-20"></div>
      </div>

      {/* Back Button */}
      <div className="fixed top-24 left-4 md:left-12 z-50 mix-blend-difference">
        <Link to="/services" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase text-xs font-mono tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
        </Link>
      </div>

      {/* Hero Section */}
      <Section className="relative z-10 pt-40 md:pt-60 pb-20">
        <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-2/3">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-neon-cyan font-mono text-sm tracking-widest uppercase mb-6 block">
                        Service 0{service.id}
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase leading-[0.9] text-white mb-8">
                        {service.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-3 mb-12">
                        {service.tags.map((tag, i) => (
                            <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-xs font-mono uppercase tracking-wider text-silver bg-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
            
            <div className="w-full md:w-1/3 flex items-center justify-center md:justify-end relative">
                <motion.div style={{ y: yHero }} className="hidden md:block relative z-10">
                     <div className="text-neon-cyan opacity-80 mix-blend-screen">
                        {/* Render Icon Scaled Up */}
                        <div className="w-32 h-32 md:w-48 md:h-48 [&>svg]:w-full [&>svg]:h-full">
                            {service.icon}
                        </div>
                     </div>
                </motion.div>
            </div>
        </div>
      </Section>

      {/* Deep Dive Content */}
      <Section className="relative z-10 border-t border-white/5">
        <div className="flex flex-col lg:flex-row gap-20">
            {/* Left: Sticky Title */}
            <div className="lg:w-1/3">
                <div className="lg:sticky lg:top-32">
                    <h3 className="text-2xl font-display font-bold text-white mb-4">Deep Dive</h3>
                    <p className="text-silver/50 text-sm font-mono uppercase tracking-widest">
                        Technical Overview & Methodology
                    </p>
                </div>
            </div>

            {/* Right: Text Content */}
            <div className="lg:w-2/3">
                 <p className="text-xl md:text-2xl leading-relaxed text-silver font-light mb-12">
                     {service.fullDescription}
                 </p>

                 {/* Process Steps */}
                 <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="space-y-8 mt-20 relative"
                 >
                    {/* Animated Vertical Line */}
                    <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute left-[13px] top-2 w-[1px] bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent z-0"
                    />

                    <h4 className="text-white font-display font-bold text-xl border-b border-white/10 pb-4 mb-8">Implementation Process</h4>
                    
                    {service.process.map((step, idx) => (
                        <motion.div 
                            key={idx}
                            variants={itemVariants}
                            className="flex gap-6 md:gap-10 group relative z-10"
                        >
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-obsidian border border-neon-cyan/50 flex items-center justify-center text-[10px] font-mono text-neon-cyan">
                                {idx + 1}
                            </div>
                            <div className="pb-8">
                                <h5 className="text-xl text-white font-bold mb-2 group-hover:text-neon-cyan transition-colors">{step.title}</h5>
                                <p className="text-silver text-sm leading-relaxed max-w-md">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                 </motion.div>
            </div>
        </div>
      </Section>

      {/* Benefits Grid */}
      <Section className="bg-charcoal/30 relative z-10">
         <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Key Benefits</h2>
            <div className="h-1 w-20 bg-neon-cyan"></div>
         </div>
         
         <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
         >
            {service.benefits.map((benefit, idx) => (
                <motion.div 
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -5, borderColor: 'rgba(0, 240, 255, 0.4)' }}
                    className="p-8 border border-white/10 bg-white/5 transition-all rounded-xl group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <ArrowRight className="-rotate-45 text-neon-cyan w-6 h-6" />
                    </div>
                    <CheckCircle2 className="text-neon-cyan w-8 h-8 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-display font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-silver text-sm leading-relaxed">{benefit.desc}</p>
                </motion.div>
            ))}
         </motion.div>
      </Section>

      {/* Next Service Navigation */}
      <section className="py-32 px-4 md:px-12 border-t border-white/10 relative z-10 flex justify-center text-center">
         <Link to={`/services/${nextService.slug}`} className="group relative inline-block">
             <span className="block text-sm font-mono text-silver uppercase tracking-widest mb-4">Next Capability</span>
             <h2 className="text-5xl md:text-8xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-cyan group-hover:to-neon-purple transition-all duration-500">
                {nextService.title}
             </h2>
             <div className="mt-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                 <div className="p-4 rounded-full border border-white/20">
                    <ArrowRight className="text-white w-6 h-6" />
                 </div>
             </div>
         </Link>
      </section>

    </div>
  );
};

export default ServiceDetail;