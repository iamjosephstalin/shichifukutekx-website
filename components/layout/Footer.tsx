import React, { useState } from 'react';
import Section from '../ui/Section';
import { Link } from 'react-router-dom';
import FooterArrowGrid from '../ui/FooterArrowGrid';
import { Linkedin, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const [isHoveringTop, setIsHoveringTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian border-t border-white/5 text-white pt-10 z-10 relative font-sans overflow-hidden">
      <Section className="!py-0 relative z-20 pb-12">

        {/* Main Footer Content */}
        <div className="border-t border-white/5 pt-12">

          {/* Top Row: Logo + Social Icons */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-8">

            {/* Logo */}
            <div>
              <img
                src="/images/ShichifukuTekx-White.webp"
                alt="Shichifukutekx"
                className="h-12 md:h-16 w-auto object-contain opacity-90"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Social Icons - Horizontal */}
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-11 h-11 rounded-lg bg-obsidian border border-white/10 flex items-center justify-center hover:border-neon-cyan transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] hover:bg-neon-cyan/5"
              >
                <Linkedin className="w-5 h-5 text-white/60 group-hover:text-neon-cyan transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-11 h-11 rounded-lg bg-obsidian border border-white/10 flex items-center justify-center hover:border-neon-purple transition-all duration-300 hover:shadow-[0_0_25px_rgba(188,19,254,0.5)] hover:bg-neon-purple/5"
              >
                <Twitter className="w-5 h-5 text-white/60 group-hover:text-neon-purple transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-11 h-11 rounded-lg bg-obsidian border border-white/10 flex items-center justify-center hover:border-neon-cyan transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] hover:bg-neon-cyan/5"
              >
                <Instagram className="w-5 h-5 text-white/60 group-hover:text-neon-cyan transition-colors" />
              </a>
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid md:grid-cols-3 gap-8 pb-8">

            {/* Company Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple mb-4">
                ShichifukuTekx FZE
              </h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neon-cyan mt-1 flex-shrink-0" />
                <address className="not-italic text-silver/80 text-sm leading-relaxed">
                  Office - C1 - 1F - Sf10837<br />
                  Ajman Free Zone C1 Building<br />
                  United Arab Emirates
                </address>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs font-semibold text-neon-cyan uppercase tracking-wider">Phone</span>
              </div>
              <a
                href="tel:+971585057791"
                className="text-white text-lg font-medium hover:text-neon-cyan transition-colors inline-block"
              >
                +971 58 505 7791
              </a>
            </div>

            {/* Email */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs font-semibold text-neon-cyan uppercase tracking-wider">Email</span>
              </div>
              <a
                href="mailto:sales@shichifukutekx.ae"
                className="text-white text-lg font-medium hover:text-neon-cyan transition-colors inline-block break-all"
              >
                sales@shichifukutekx.ae
              </a>
            </div>

          </div>

        </div>
      </Section>

      {/* === MAGNETIC ARROW GRID ANIMATION (SEPARATE SECTION) === */}
      <div className="w-full relative z-10 h-72 group mt-[-1px]">
        {/* The Grid Component */}
        <div className="absolute inset-0">
          <FooterArrowGrid isHoveringTop={isHoveringTop} />
        </div>

        {/* Top of Site Button - Circular App Themed with Gradient */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHoveringTop(true)}
          onMouseLeave={() => setIsHoveringTop(false)}
          className={`absolute -top-6 right-8 md:right-12 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border shadow-lg group/btn hover:scale-110 ${isHoveringTop
            ? 'bg-gradient-to-br from-neon-purple to-[#ff00cc] border-neon-purple text-white shadow-[0_0_30px_rgba(180,0,255,0.6)]'
            : 'bg-gradient-to-br from-obsidian to-[#1a1a2e] border-white/20 text-white hover:border-neon-cyan'
            }`}
          aria-label="Go to top"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 transition-all duration-300"
          >
            <defs>
              <linearGradient id="top-btn-gradient-default" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#999999" />
              </linearGradient>
              <linearGradient id="top-btn-gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bc13fe" />
                <stop offset="100%" stopColor="#ff00cc" />
              </linearGradient>
            </defs>
            <path
              d="M12 19V5 M5 12l7-7 7 7"
              stroke={`url(#${isHoveringTop ? 'top-btn-gradient-active' : 'top-btn-gradient-default'})`}
            />
          </svg>
        </button>

        {/* Grid Overlay for depth inside this section */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0 opacity-10" />
      </div>
    </footer>
  );
};

export default Footer;