import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface ContactProps {
    id?: string;
    className?: string;
}

const Contact = ({ id = "contact", className }: ContactProps) => {
    const [status, setStatus] = useState<'idle' | 'success'>('idle');
    const timeoutRef = useRef<number | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('success');

        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            setStatus('idle');
        }, 4000);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <section
            id={id}
            className={clsx(
                "h-[100dvh] w-screen flex items-center justify-center bg-background flex-shrink-0 relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-10",
                className
            )}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

            <div className="mx-auto max-w-[1400px] w-full px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 flex flex-col justify-center">
                <div className="w-full max-w-[800px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8 block"
                    >
                        <span className="text-text font-bold text-xs uppercase tracking-[0.3em] font-mono mb-4 block">Get in Touch</span>
                        <h2 className="text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-display font-bold text-text leading-[0.95]">
                            Let's Create<br />
                            Together
                        </h2>
                    </motion.div>

                    <motion.form

                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="space-y-4 flex flex-col gap-[1em] mt-[1em]"
                    >
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                style={{ height: '60px', padding: '0 24px', borderRadius: '30px' }}
                                className="w-full bg-[#ffe562] focus:bg-[#ffea81] border border-black/20 text-text placeholder:text-muted focus:border-black/50 focus:outline-none transition-colors text-sm"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                style={{ height: '60px', padding: '0 24px', borderRadius: '30px' }}
                                className="w-full bg-[#ffe562] focus:bg-[#ffea81] border border-black/20 text-text placeholder:text-muted focus:border-black/50 focus:outline-none transition-colors text-sm"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Project Type"
                                style={{ height: '60px', padding: '0 24px', borderRadius: '30px' }}
                                className="w-full bg-[#ffe562] focus:bg-[#ffea81] border border-black/20 text-text placeholder:text-muted focus:border-black/50 focus:outline-none transition-colors text-sm"
                            />
                        </div>
                        <div>
                            <textarea
                                rows={4}
                                placeholder="Message"
                                style={{ minHeight: '160px', padding: '24px', borderRadius: '24px' }}
                                className="w-full bg-[#ffe562] focus:bg-[#ffea81] border border-black/20 text-text placeholder:text-muted focus:border-black/50 focus:outline-none transition-colors resize-none text-sm"
                            ></textarea>
                        </div>

                        <div className="pt-4 flex flex-col items-start gap-4">
                            <button
                                type="submit"
                                style={{ padding: '10px 20px', borderRadius: '30px', border: '1px solid black' }}
                                className="group flex items-center gap-2 text-text font-semibold uppercase tracking-wider text-[11px] hover:bg-black/5 transition-colors"
                            >
                                <span>Send Message</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className='mt-[1em]'>
                                <p className="text-text font-semibold text-[11px] tracking-wide">© 2024 Aarkit Cinematic Solutions. All rights reserved.</p>
                            </div>
                        </div>

                        {status === 'success' && (
                            <p className="absolute bottom-[-3em] text-text text-sm uppercase tracking-[0.3em] font-medium mt-4">
                                Message queued — we’ll reply within 24 hours.
                            </p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
