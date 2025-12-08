import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Magnetic from './Magnetic';

// Define Zod Schema
const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
    interests: z.array(z.string()).min(1, { message: "Please select at least one interest" }),
    budget: z.string().min(1, { message: "Please select a budget range" }),
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
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsFocused(false);
        setHasValue(e.target.value.length > 0);
    };

    const isActive = isFocused || hasValue;

    return (
        <div className="relative group mb-2 md:mb-4">
            <div className={`relative bg-white/5 border rounded-lg overflow-hidden transition-colors duration-300 ${error ? 'border-red-500/50 bg-red-500/5' : isFocused ? 'border-neon-cyan/50 bg-white/10' : 'border-white/10 hover:border-white/20'}`}>
                <motion.label
                    htmlFor={name}
                    initial={false}
                    animate={{
                        y: isActive ? -10 : 0,
                        scale: isActive ? 0.75 : 1,
                        originX: 0,
                        color: error ? '#ef4444' : isFocused ? '#00F0FF' : '#888899'
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-4 top-3 pointer-events-none font-mono uppercase tracking-widest text-[10px] z-10"
                >
                    {label}
                </motion.label>

                {isTextArea ? (
                    <textarea
                        id={name}
                        {...register(name, {
                            onBlur: handleBlur,
                            onChange: (e) => setHasValue(e.target.value.length > 0)
                        })}
                        onFocus={handleFocus}
                        rows={2}
                        className="w-full bg-transparent border-none p-2 pt-5 md:p-3 md:pt-6 text-white focus:outline-none placeholder-transparent font-light leading-relaxed resize-none text-sm"
                    />
                ) : (
                    <input
                        id={name}
                        {...register(name, {
                            onBlur: handleBlur,
                            onChange: (e) => setHasValue(e.target.value.length > 0)
                        })}
                        type={type}
                        onFocus={handleFocus}
                        className="w-full bg-transparent border-none p-2 pt-5 md:p-3 md:pt-6 text-white focus:outline-none placeholder-transparent font-light text-sm"
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

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            interests: [],
            budget: ""
        }
    });

    // Custom State for Non-Input Fields since React Hook Form handles native inputs best
    const [selectedInterests, setSelectedInterests] = React.useState<string[]>([]);
    const [selectedBudget, setSelectedBudget] = React.useState<string>("");

    // Sync custom state with RHF
    React.useEffect(() => {
        setValue("interests", selectedInterests);
        if (selectedInterests.length > 0) clearErrors("interests");
    }, [selectedInterests, setValue, clearErrors]);

    React.useEffect(() => {
        setValue("budget", selectedBudget);
        if (selectedBudget) clearErrors("budget");
    }, [selectedBudget, setValue, clearErrors]);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
        );
    };

    const interestOptions = [
        "AI Strategy", "Custom Development", "Automation", "Data Analytics", "Cloud Infrastructure", "Other"
    ];

    const budgetOptions = [
        "< 50k", "50k-100k", "100k-200k", "200k+"
    ];

    const onSubmit = async (data: ContactFormData) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form Submitted:", data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 md:space-y-4 relative z-10 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
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
            </div>
            <FloatingInput
                label="Message"
                isTextArea={true}
                name="message"
                register={register}
                error={errors.message?.message}
            />

            {/* INTERESTS FIELD */}
            <div className="space-y-2 md:space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest text-[#888899] ml-1">Interested In</label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {interestOptions.map(option => (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={selectedInterests.includes(option)}
                            onClick={() => toggleInterest(option)}
                            className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs transition-all border ${selectedInterests.includes(option)
                                ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                                : 'bg-white/5 border-white/10 text-silver hover:border-white/30 hover:bg-white/10'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {errors.interests && (
                    <p className="text-red-400 text-xs font-mono mt-1">{errors.interests.message}</p>
                )}
            </div>

            {/* BUDGET FIELD */}
            <div className="space-y-1 md:space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest text-[#888899] ml-1">Your Budget (AED)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                    {budgetOptions.map(option => (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={selectedBudget === option}
                            onClick={() => setSelectedBudget(option)}
                            className={`px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-[10px] md:text-xs transition-all border text-center ${selectedBudget === option
                                ? 'bg-neon-purple/10 border-neon-purple text-neon-purple shadow-[0_0_10px_rgba(180,0,255,0.2)]'
                                : 'bg-white/5 border-white/10 text-silver hover:border-white/30 hover:bg-white/10'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {errors.budget && (
                    <p className="text-red-400 text-xs font-mono mt-1">{errors.budget.message}</p>
                )}
            </div>

            <div className="mt-4 md:mt-8 flex justify-end">
                <Magnetic>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isSubmitting}
                        type="submit"
                        className="px-5 py-2 md:px-8 md:py-3 bg-gradient-to-r from-neon-cyan to-blue-600 rounded-full text-white font-bold font-display uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] hover:bg-white text-[10px] md:text-xs relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {isSubmitting ? 'Processing...' : isSubmitSuccessful ? 'Request Sent' : 'Initialize Request'}
                            {!isSubmitting && !isSubmitSuccessful && <span className="text-lg">→</span>}
                        </span>
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-scanner z-0" />
                    </motion.button>
                </Magnetic>
            </div>

            {isSubmitSuccessful && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neon-cyan text-sm font-mono text-center mt-6"
                >
                    Thank you. We will contact you shortly.
                </motion.p>
            )}
        </form>
    );
};

export default ContactForm;
