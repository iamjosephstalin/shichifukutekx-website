import React, { useState } from 'react';
import Section from '../ui/Section';
import { Link } from 'react-router-dom';
import FooterArrowGrid from '../ui/FooterArrowGrid';

const Footer: React.FC = () => {
  const [isHoveringTop, setIsHoveringTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian border-t border-white/5 text-white pt-10 z-10 relative font-sans overflow-hidden">
      <Section className="!py-0 relative z-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
          <div className="col-span-2 flex flex-col items-start pr-8 md:pr-0">
            {/* Logo */}
            <img
              src="/images/ShichifukuTekx-White.webp"
              alt="Shichifukutekx"
              className="h-12 md:h-16 w-auto object-contain mb-8 opacity-90"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            <div className="text-silver text-sm max-w-xs leading-relaxed font-light space-y-4">
              <address className="not-italic">
                <strong className="text-white block mb-1">ShichifukuTekx FZE</strong>
                Office - C1 - 1F - Sf10837<br />
                Ajman Free Zone C1 Building<br />
                United Arab Emirates
              </address>
              <div className="flex flex-col gap-1">
                <a href="tel:+971585057791" className="hover:text-neon-cyan transition-colors">+971 58 505 7791</a>
                <a href="mailto:sales@shichifukutekx.ae" className="hover:text-neon-cyan transition-colors">sales@shichifukutekx.ae</a>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-neon-cyan font-display uppercase tracking-wider text-sm">Sitemap</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/work" className="hover:text-white transition-colors">Work</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-neon-cyan font-display uppercase tracking-wider text-sm">Socials</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
      </Section>

      {/* === MAGNETIC ARROW GRID ANIMATION (SEPARATE SECTION) === */}
      <div className="w-full border-t border-white/5 bg-black/40 relative z-10 h-72 group">
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