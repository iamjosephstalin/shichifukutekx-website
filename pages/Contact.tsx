import React, { useState } from 'react';
import Section from '../components/ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import HeroNetwork from '../components/ui/HeroNetwork';
import ContactForm from '../components/ui/ContactForm';
import Magnetic from '../components/ui/Magnetic';

const Contact: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen pt-32 text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

      {/* Particle Network Overlay */}
      <HeroNetwork />

      <Section className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10">
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="relative z-20">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-8xl xl:text-9xl font-display font-bold mb-8 text-white uppercase leading-[0.8]"
              style={{ willChange: "transform, opacity" }}
            >
              Let's <br /> <motion.span
                className="text-outline"
                whileInView={{
                  WebkitTextStroke: ["1px rgba(255,255,255,0.2)", "1px #FFFFFF", "1px #00F0FF"],
                  color: ["transparent", "rgba(255,255,255,0.8)", "rgba(0, 240, 255, 0.1)"],
                  textShadow: ["none", "0 0 20px rgba(255,255,255,0.5)", "0 0 10px rgba(0,240,255,0.3)"]
                }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, times: [0, 0.2, 1], ease: "circOut" }}
              >Talk.</motion.span>
            </motion.h1>
            <p className="text-xl text-silver mb-12 max-w-md font-light leading-relaxed">
              Interested in transforming your enterprise with AI? Fill out the form or send us a direct email.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-neon-cyan uppercase text-xs font-mono tracking-widest mb-1">Email</h3>
                <a href="mailto:sales@shichifukutekx.ae" className="text-2xl md:text-3xl hover:text-neon-purple transition-colors interactive font-medium font-display group flex items-center gap-2 w-fit">
                  sales@shichifukutekx.ae
                  <span className="w-0 overflow-hidden group-hover:w-auto group-hover:pl-2 transition-all block text-lg">→</span>
                </a>
              </div>

              <div>
                <h3 className="text-neon-cyan uppercase text-xs font-mono tracking-widest mb-1">Phone</h3>
                <a href="tel:+971585057791" className="text-2xl font-light text-silver hover:text-white transition-colors">+971 58 505 7791</a>
              </div>

              <div>
                <h3 className="text-neon-cyan uppercase text-xs font-mono tracking-widest mb-1">Office</h3>
                <address className="text-xl font-light text-silver not-italic leading-relaxed opacity-80">
                  <strong className="text-white block mb-1 font-bold">ShichifukuTekx FZE</strong>
                  Office - C1 - 1F - Sf10837<br />
                  Ajman Free Zone C1 Building<br />
                  United Arab Emirates
                </address>
              </div>
            </div>
          </div>



          {/* Additional Glow */}
          <div className="absolute bottom-0 right-1/2 w-[400px] h-[400px] bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none -z-10" />
        </div>

        <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Form Ambient Light */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[80px] pointer-events-none"></div>

            <ContactForm />
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;