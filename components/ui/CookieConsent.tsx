import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check session storage on mount
        const consent = sessionStorage.getItem('cookie-consent');
        if (!consent) {
            // Add a small delay for better UX (don't pop up instantly on load)
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        sessionStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        sessionStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[100] w-[calc(100%-3rem)] md:w-96"
                >
                    <div className="bg-obsidian/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative group">
                        {/* Decorative Gradient Glows */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/20 blur-[60px] rounded-full pointer-events-none -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-cyan/10 blur-[60px] rounded-full pointer-events-none -ml-16 -mb-16" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-white font-display font-bold text-lg tracking-wide">
                                    Cookie Consent
                                </h3>
                                <button
                                    onClick={handleDecline}
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <p className="text-silver text-sm leading-relaxed mb-6 font-light">
                                We use cookies to optimize site functionality and give you the best possible experience.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 bg-white text-obsidian font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest hover:bg-neon-cyan transition-colors duration-300"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 border border-white/10 text-white font-medium py-2.5 rounded-lg text-xs uppercase tracking-widest hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
