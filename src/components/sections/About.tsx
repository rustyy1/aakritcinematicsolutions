import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import UrviSvg from '../../assets/URvi-01.svg';
import ChiragSvg from '../../assets/CHIRAG-01.svg';
import ParasSvg from '../../assets/PARAS-01.svg';
import RupeshSvg from '../../assets/RUPESH-01.svg';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    description: string;
    image: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Urvi Shah",
        role: "Founder & Studio Head",
        description: "Visionary leader driving Aakrit's mission to elevate Indian animation to global standards through creative excellence and strategic innovation.",
        image: UrviSvg,
    },
    {
        id: 2,
        name: "Chirag K. Mali",
        role: "Creative Head",
        description: "Artistic visionary specializing in immersive visual storytelling and conceptual architecture, transforming bold ideas into cinematic reality.",
        image: ChiragSvg,
    },
    {
        id: 3,
        name: "Paras Sharma",
        role: "3D Generalist",
        description: "Technical expert in high-fidelity computer graphics, dedicated to crafting hyper-realistic environments and seamless visual effects.",
        image: ParasSvg,
    },
    {
        id: 4,
        name: "Rupesh Gupta",
        role: "Multimedia Artist",
        description: "Versatile multimedia expert specializing in high-impact visual storytelling, motion design, and integrated digital experiences that bridge art and technology.",
        image: RupeshSvg,
    },
];

interface AboutProps {
    id?: string;
    className?: string;
}

const About = ({ id = 'about', className }: AboutProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tappedIndex, setTappedIndex] = useState<number | null>(null);

    const activeIndex = hoveredIndex ?? tappedIndex;

    const handleTap = (index: number) => {
        setTappedIndex(prev => (prev === index ? null : index));
    };

    return (
        <section
            id={id}
            className={clsx(
                'min-h-[100dvh] w-screen flex flex-col items-center justify-center flex-shrink-0 relative overflow-hidden',
                className
            )}
        >
            <div className="w-full max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center py-12 md:py-20 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center space-y-4 mb-16 md:mb-24 lg:mb-32"
                >
                    <h1
                        className="text-5xl sm:text-6xl md:text-8xl lg:text-[60rem] font-black tracking-tighter text-black/10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-center select-none uppercase leading-none whitespace-nowrap lg:whitespace-normal"
                        style={{ fontFamily: "'Special Gothic Expanded One', sans-serif" }}
                    >
                        About Us
                    </h1>
                    <div className="h-1.5 w-24 md:h-2 md:w-96 bg-black rounded-full opacity-60 shadow-md shrink-0" />
                </motion.div>

                {/* Team Cards Container */}
                <div className="flex flex-wrap lg:flex-nowrap gap-10 md:gap-16 lg:gap-20 justify-center w-full px-4 overflow-visible">
                    {teamMembers.map((member, index) => {
                        const isActive = activeIndex === index;
                        const hasActive = activeIndex !== null;
                        const isLastCard = index === teamMembers.length - 1;

                        return (
                            <motion.div
                                key={member.name}
                                className={clsx(
                                    "relative flex-shrink-0 group transition-all duration-500",
                                    isActive ? "z-50" : "z-10"
                                )}
                                style={{ width: 'clamp(220px, 18vw, 280px)' }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => handleTap(index)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <div
                                    className="relative"
                                    style={{
                                        perspective: '1200px',
                                        width: 'clamp(220px, 18vw, 280px)',
                                        height: '100%',
                                        minHeight: typeof window !== 'undefined' && window.innerWidth < 1024 ? '380px' : 'auto'
                                    }}
                                >
                                    <motion.div
                                        className="relative w-full h-full"
                                        style={{ transformStyle: 'preserve-3d' }}
                                        animate={{
                                            rotateY: (typeof window !== 'undefined' && window.innerWidth < 1024 && isActive) ? 180 : 0
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 20
                                        }}
                                    >
                                        {/* Main SVG Card (Front Face on Mobile) */}
                                        <motion.div
                                            className={clsx(
                                                'relative cursor-pointer transition-all duration-500 rounded-[2.5rem] md:rounded-[3rem]',
                                                hasActive && !isActive && 'blur-sm scale-[0.9] opacity-30 shadow-none'
                                            )}
                                            animate={{
                                                scale: isActive ? 1.05 : 1,
                                                x: (isActive && isLastCard && typeof window !== 'undefined' && window.innerWidth >= 1024) ? '-40%' : '0%',
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20
                                            }}
                                            style={{
                                                zIndex: 40,
                                                backfaceVisibility: typeof window !== 'undefined' && window.innerWidth < 1024 ? 'hidden' : 'visible',
                                                boxShadow: isActive
                                                    ? '0 40px 80px rgba(0,0,0,0.6), 0 0 30px rgba(242,221,94,0.3)'
                                                    : '0 15px 35px rgba(0,0,0,0.15)',
                                            }}
                                        >
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-auto block rounded-[2.5rem] md:rounded-[3rem]"
                                                draggable={false}
                                            />
                                        </motion.div>

                                        {/* Info Panel - Slides on desktop, Back face on mobile */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={typeof window !== 'undefined' && window.innerWidth < 1024 ? {
                                                        opacity: 0,
                                                        rotateY: 180
                                                    } : {
                                                        x: '5%',
                                                        opacity: 0,
                                                        scale: 0.95
                                                    }}
                                                    animate={typeof window !== 'undefined' && window.innerWidth < 1024 ? {
                                                        opacity: 1,
                                                        rotateY: 180
                                                    } : {
                                                        x: isLastCard ? '30%' : '60%',
                                                        opacity: 1,
                                                        scale: 1
                                                    }}
                                                    exit={typeof window !== 'undefined' && window.innerWidth < 1024 ? {
                                                        opacity: 0,
                                                        rotateY: 180
                                                    } : {
                                                        x: '5%',
                                                        opacity: 0,
                                                        scale: 0.95
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 150,
                                                        damping: 25
                                                    }}
                                                    className="absolute z-10 rounded-[2.5rem] md:rounded-[4rem] flex flex-col justify-center border backdrop-blur-3xl overflow-hidden"
                                                    style={{
                                                        top: typeof window !== 'undefined' && window.innerWidth < 1024 ? '0' : '10%',
                                                        left: '0',
                                                        width: typeof window !== 'undefined' && window.innerWidth < 1024 ? '100%' : '160%',
                                                        height: typeof window !== 'undefined' && window.innerWidth < 1024 ? '100%' : '80%',
                                                        paddingLeft: typeof window !== 'undefined' && window.innerWidth < 1024 ? '1.5rem' : '35%',
                                                        paddingRight: '1.5rem',
                                                        paddingTop: '1.5rem',
                                                        paddingBottom: '1.5rem',
                                                        background: 'rgba(10, 10, 10, 0.98)',
                                                        borderColor: 'rgba(242, 221, 94, 0.4)',
                                                        boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                                                        backfaceVisibility: typeof window !== 'undefined' && window.innerWidth < 1024 ? 'hidden' : 'visible',
                                                        pointerEvents: typeof window !== 'undefined' && window.innerWidth < 1024 ? 'auto' : 'none',
                                                        transform: typeof window !== 'undefined' && window.innerWidth < 1024 ? 'rotateY(180deg)' : 'none'
                                                    }}
                                                >
                                                    <div className="space-y-3 md:space-y-4 text-left">
                                                        <h3
                                                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight"
                                                            style={{
                                                                fontFamily: "'Special Gothic Expanded One', sans-serif",
                                                                color: '#F2DD5E',
                                                                textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                                                            }}
                                                        >
                                                            {member.name}
                                                        </h3>
                                                        <p className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#F2DD5E]">
                                                            {member.role}
                                                        </p>
                                                    </div>
                                                    <div className="h-[2px] md:h-[3px] w-12 md:w-16 bg-[#F2DD5E] my-4 md:my-6 lg:my-8 rounded-full" />
                                                    <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-bold text-[#FFA500]">
                                                        {member.description}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
};

export default About;
