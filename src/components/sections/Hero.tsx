import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { ArrowDown, Rocket } from 'lucide-react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface HeroProps {
    id?: string;
    className?: string;
}

const Hero = ({ id = "hero", className }: HeroProps) => {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const highlights = useMemo(
        () => [
            "High-impact commercials",
            "Narrative films",
            "Experiential campaigns"
        ],
        []
    );

    return (
        <section
            id={id}
            ref={ref}
            className={clsx(
                // Mobile: min-h-screen, w-full, flex-col. Desktop: h-screen, fixed height, horizontal logic
                "h-[100dvh] w-screen flex items-center justify-center bg-background flex-shrink-0 relative overflow-hidden",
                className
            )}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

            <motion.div style={{ y, opacity }} className="relative z-10 w-full px-6 sm:px-8 py-20 lg:py-0">
                <div className="mx-auto max-w-[1100px] space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 sm:px-5 sm:py-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-muted backdrop-blur"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Aarkit Cinematic Solutions
                    </motion.div>

                    <div className="grid gap-12 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="font-display text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.95]"
                            >
                                Cinematic{" "}
                                <span className="text-accent">Intelligence</span>
                                <br />
                                Engineered for Impact
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-base leading-relaxed text-muted md:text-xl max-w-2xl"
                            >
                                We craft immersive visual experiences that transcend traditional storytelling.
                                From first spark to final frame, our team merges narrative craftsmanship with
                                bleeding-edge production to leave a lasting imprint on culture.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.4em] text-muted"
                            >
                                {highlights.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-text/80 backdrop-blur"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="flex flex-wrap items-center gap-8 pt-6"
                            >
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => {
                                            document
                                                .getElementById('projects')
                                                ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                        }}
                                        className="group relative overflow-hidden rounded-full border border-accent/60 px-10 py-4 font-mono text-xs uppercase tracking-[0.5em] text-accent transition hover:border-accent hover:bg-accent hover:text-black"
                                    >
                                        <div className="absolute inset-0 translate-y-full bg-accent/20 transition group-hover:translate-y-0" />
                                        <span className="relative flex items-center gap-3">
                                            Explore Work
                                            <ArrowDown className="h-4 w-4 animate-bounce" />
                                        </span>
                                    </button>

                                    <Link
                                        to="/drone"
                                        className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-10 py-4 font-mono text-xs uppercase tracking-[0.5em] text-text transition hover:border-accent hover:text-accent"
                                    >
                                        Launch 3D Lab
                                        <Rocket className="h-4 w-4" />
                                    </Link>
                                </div>

                                <div className="text-sm uppercase tracking-[0.4em] text-muted">
                                    <span className="mr-3 inline-block h-px w-8 bg-accent align-middle" />
                                    Scroll to Explore
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg"
                        >
                            <p className="text-xs uppercase tracking-[0.4em] text-muted">In Production</p>
                            <p className="text-4xl font-bold text-text">04</p>
                            <p className="text-sm text-muted">
                                Active cinematic systems across brand, narrative, and experiential pipelines.
                            </p>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent to-emerald-300" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent opacity-5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};

export default Hero;
