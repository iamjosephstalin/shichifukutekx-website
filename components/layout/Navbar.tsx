import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none font-sans">
        <div className="pointer-events-auto bg-glass backdrop-blur-md border border-white/5 rounded-full px-6 pl-6 pr-8 py-3 flex items-center gap-12 shadow-2xl shadow-black/20">
          <Link to="/" className="interactive block relative group">
            {/* Logo Image - Replace '/logo-full.png' with your actual file path in public folder */}
            <img
              src="/images/ShichifukuTekx-White.webp"
              alt="Shichifukutekx"
              className="h-8 w-auto md:h-10 object-contain"
              onError={(e) => {
                // Fallback if image not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden text-xl font-display font-bold tracking-widest uppercase text-white hover:text-neon-cyan transition-colors">
              Shichifukutekx
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="relative group overflow-hidden interactive text-sm font-medium text-silver hover:text-white transition-colors uppercase tracking-wider">
                <span className="block">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neon-cyan translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 interactive text-white">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-obsidian/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 font-display"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-5xl font-bold text-white hover:text-neon-cyan transition-colors uppercase"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;