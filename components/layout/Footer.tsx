import React from 'react';
import Section from '../ui/Section';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian border-t border-white/5 text-white pt-10 pb-10 z-10 relative font-sans">
      <Section className="!py-0">
        {/* Top row removed as requested */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
          <div className="col-span-2 flex flex-col items-start pr-8 md:pr-0">
            {/* Logo moved here top of address */}
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
              <p className="text-white/20 pt-4">© 2025 ShichifukuTekx Inc.</p>
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
    </footer>
  );
};

export default Footer;