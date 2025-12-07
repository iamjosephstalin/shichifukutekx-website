import React, { useState } from 'react';
import Section from '../components/ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import HeroNetwork from '../components/ui/HeroNetwork';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define Zod Schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FloatingInputProps {
  label: string;
  name: keyof ContactFormData;
  register: UseFormRegister<ContactFormData>;
  error?: string;
  type?: string;
  isTextArea?: boolean;
}

const FloatingInput: React.FC<FloatingInputProps> = ({ label, name, register, error, type = 'text', isTextArea = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false); // Track value locally for UI state only

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
  };

  const isActive = isFocused || hasValue;

  return (
    <div className="relative group mb-6">
      <div className={`relative bg-white/5 border rounded-lg overflow-hidden transition-colors duration-300 ${error ? 'border-red-500/50 bg-red-500/5' : isFocused ? 'border-neon-cyan/50 bg-white/10' : 'border-white/10 hover:border-white/20'}`}>
        <motion.label
          initial={false}
          animate={{
            y: isActive ? -10 : 0,
            scale: isActive ? 0.75 : 1,
            originX: 0,
            color: error ? '#ef4444' : isFocused ? '#00F0FF' : '#888899'
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-4 top-5 pointer-events-none font-mono uppercase tracking-widest text-xs z-10"
        >
          {label}
        </motion.label>

        {isTextArea ? (
          <textarea
            {...register(name, {
              onBlur: handleBlur,
              onChange: (e) => setHasValue(e.target.value.length > 0)
            })}
            onFocus={handleFocus}
            rows={4}
            className="w-full bg-transparent border-none p-4 pt-8 text-white focus:outline-none placeholder-transparent font-light leading-relaxed resize-none"
          />
        ) : (
          <input
            {...register(name, {
              onBlur: handleBlur,
              onChange: (e) => setHasValue(e.target.value.length > 0)
            })}
            type={type}
            onFocus={handleFocus}
            className="w-full bg-transparent border-none p-4 pt-8 text-white focus:outline-none placeholder-transparent font-light"
          />
        )}

        {/* Bottom Glow Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0, backgroundColor: error ? '#ef4444' : '#00F0FF' }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 w-full h-[1px] origin-left"
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute right-0 -bottom-5 text-red-400 text-xs font-mono"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form Submitted:", data);
    reset();
  };

  return (
    <div className="bg-obsidian min-h-screen pt-32 text-white font-sans relative">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

      {/* Particle Network Overlay */}
      <HeroNetwork />

      <Section className="flex flex-col md:flex-row gap-12 lg:gap-24">
        <div className="w-full md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-display font-bold mb-8 text-white uppercase leading-[0.8]"
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
          <p className="text-xl text-silver mb-12 max-w-md font-light">
            Interested in transforming your enterprise with AI? Fill out the form or send us a direct email.
          </p>

          <div className="mb-10">
            <h3 className="text-neon-cyan uppercase text-xs font-mono tracking-widest mb-2">Email</h3>
            <a href="mailto:sales@shichifukutekx.ae" className="text-2xl md:text-3xl hover:text-neon-purple transition-colors interactive font-medium font-display">sales@shichifukutekx.ae</a>
          </div>

          <div className="mb-10">
            <h3 className="text-neon-cyan uppercase text-xs font-mono tracking-widest mb-2">Phone</h3>
            <a href="tel:+971585057791" className="text-2xl font-light text-silver hover:text-white transition-colors">+971 58 505 7791</a>
          </div>

          <div>
            <h3 className="text-neon-cyan uppercase text-xs font-mono tracking-widest mb-2">Office</h3>
            <address className="text-xl font-light text-silver not-italic leading-relaxed">
              <strong className="text-white block mb-1 font-bold">ShichifukuTekx FZE</strong>
              Office - C1 - 1F - Sf10837<br />
              Ajman Free Zone C1 Building<br />
              United Arab Emirates
            </address>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl relative z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FloatingInput
              label="Name"
              name="name"
              register={register}
              error={errors.name?.message}
            />
            <FloatingInput
              label="Email"
              type="email"
              name="email"
              register={register}
              error={errors.email?.message}
            />
            <FloatingInput
              label="Message"
              isTextArea={true}
              name="message"
              register={register}
              error={errors.message?.message}
            />

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#00F0FF', color: '#000000' }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              transition={{ duration: 0.3 }}
              type="submit"
              className="w-full bg-white text-black font-bold font-display uppercase tracking-wider py-5 rounded-lg transition-colors interactive shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : isSubmitSuccessful ? 'Request Sent' : 'Initialize Request'}
            </motion.button>
            {isSubmitSuccessful && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-neon-cyan text-sm font-mono text-center mt-4"
              >
                Thank you. We will contact you shortly.
              </motion.p>
            )}
          </form>
        </div>
      </Section>
    </div>
  );
};

export default Contact;