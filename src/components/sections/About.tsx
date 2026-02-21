import { motion } from 'framer-motion';
import clsx from 'clsx';

interface AboutProps {
    id?: string;
    className?: string;
}

const stats = [
    { value: '100+', label: 'Projects Delivered' },
    { value: '5+', label: 'Years of Craft' },
    { value: '3D', label: 'VFX & Animation' },
    { value: '∞', label: 'Stories Untold' },
];

const pillars = [
    {
        number: '01',
        title: 'Origin',
        text: 'Born from a simple yet powerful thought — to contribute to India\'s animation and film industry and show the world its true creative strength.',
    },
    {
        number: '02',
        title: 'Meaning',
        text: 'Aakrit, rooted in Sanskrit, means "to create". Grounded in Sanskriti, we stay humble while our ambition pushes us to deliver on global standards.',
    },
    {
        number: '03',
        title: 'Vision',
        text: 'To place Indian animation and production on the global map — proving our industry is not just evolving, it is roaring with potential.',
    },
    {
        number: '04',
        title: 'Promise',
        text: 'Every frame is creation. Every project is passion. Every story is a new possibility. From the smallest detail to the final output — excellence is non-negotiable.',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

const About = ({ id = 'about', className }: AboutProps) => {
    return (
        <section
            id={id}
            className={clsx(
                'h-[100dvh] w-screen flex-shrink-0 flex items-center justify-center bg-background relative overflow-hidden',
                className
            )}
        >
            {/* Subtle grid texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />


            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
                className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-10"
            >
                {/* ── TOP ROW: Label + Headline + Stats ── */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                    {/* Left: headline */}
                    <motion.div variants={itemVariants} className="max-w-xl">
                        <span className="text-[11px] uppercase tracking-[0.35em] font-bold text-black/40 block mb-3">
                            Who we are
                        </span>
                        <h2 className="text-[clamp(3rem,6vw,6rem)] font-bold text-black leading-[0.9] tracking-tight">
                            Architects<br />of Imagination
                        </h2>
                    </motion.div>

                    {/* Right: stats */}
                    <motion.div variants={itemVariants} className="flex mt-4 gap-8 md:gap-12 flex-wrap">
                        {stats.map((s) => (
                            <div key={s.label} className="flex flex-col p-[1em] items-start">
                                <span className="text-[2.6rem] md:text-[3.2rem] font-bold text-black leading-none">{s.value}</span>
                                <span className="text-[11px] uppercase tracking-[0.2em] text-black/70 font-semibold mt-1.5">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── DIVIDER ── */}
                <motion.div variants={itemVariants} className="h-px w-full bg-black/10" />

                {/* ── BOTTOM ROW: 4 Pillars ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {pillars.map((p) => (
                        <motion.div
                            key={p.number}
                            variants={itemVariants}
                            style={{ padding: '2rem' }}
                            className="group flex flex-col gap-4 rounded-2xl border border-black/10 bg-black/[0.03] hover:bg-black/[0.07] transition-colors duration-300"
                        >
                            <span className="text-[11px] font-bold text-black/30 tracking-[0.3em]">{p.number}</span>
                            <h3 className="text-base md:text-lg font-bold text-black uppercase tracking-wide">{p.title}</h3>
                            <p className="text-xs md:text-sm text-black/65 leading-relaxed">{p.text}</p>
                        </motion.div>
                    ))}
                </div>

                {/* ── TAGLINE BAR ── */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 border-t border-black/10 pt-[1em]"
                >
                    <p className="text-sm md:text-base font-bold italic text-black/70 tracking-wide">
                        This is Aakrit. &nbsp;·&nbsp; Bringing ideas to life. &nbsp;·&nbsp; Pure Cinematic Creation.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;
