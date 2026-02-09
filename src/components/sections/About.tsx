import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import UrviSvg from '../../assets/Team/URvi-01.svg';
import ChiragSvg from '../../assets/Team/CHIRAG-01.svg';
import ParasSvg from '../../assets/Team/PARAS-01.svg';
import RupeshSvg from '../../assets/Team/RUPESH-01.svg';

interface TeamMember {
  name: string;
  position: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { name: 'Urvi Shah', position: 'Founder', role: 'Creative Director & Visionary behind Aarkit Cinematic Solutions', image: UrviSvg },
  { name: 'Chirag', position: 'Cinematographer', role: 'Capturing cinematic visuals with precision and artistry', image: ChiragSvg },
  { name: 'Paras', position: 'Editor', role: 'Crafting seamless narratives through post-production excellence', image: ParasSvg },
  { name: 'Rupesh', position: 'VFX Artist', role: 'Bringing imagination to life with stunning visual effects', image: RupeshSvg },
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
        'h-[100dvh] w-screen flex flex-col items-center justify-center flex-shrink-0 relative overflow-hidden',
        className
      )}
      style={{ background: '#F2DD5E' }}
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 md:mb-14 text-center"
        style={{ fontFamily: "'UnifrakturCook', cursive", color: '#1a1a1a' }}
      >
        About Us
      </motion.h2>

      {/* Team Cards Row */}
      <div className="w-full max-w-7xl px-4 md:px-8">
        <div className="flex flex-nowrap gap-5 md:gap-6 lg:gap-8 justify-center overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none">
          {teamMembers.map((member, index) => {
            const isActive = activeIndex === index;
            const hasActive = activeIndex !== null;

            return (
              <motion.div
                key={member.name}
                className="relative flex-shrink-0 snap-center"
                style={{ width: 'clamp(220px, 22vw, 300px)' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleTap(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
              >
                {/* SVG Card - main visible card */}
                <motion.div
                  className={clsx(
                    'relative z-10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500',
                    hasActive && !isActive && 'blur-[3px] scale-[0.96] opacity-50'
                  )}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    boxShadow: isActive
                      ? '0 20px 60px rgba(0,0,0,0.3), 0 0 0 2px #F2DD5E'
                      : '0 8px 30px rgba(0,0,0,0.15)',
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-auto block"
                    draggable={false}
                  />

                </motion.div>

                {/* Info card sliding out to the right from behind */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ x: 0, opacity: 0 }}
                      animate={{ x: '90%', opacity: 1 }}
                      exit={{ x: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute top-0 left-0 z-0 rounded-2xl px-5 py-6 flex flex-col justify-center"
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                        boxShadow: '-4px 4px 24px rgba(0,0,0,0.4)',
                        border: '1.5px solid #F2DD5E',
                      }}
                    >
                      <p
                        className="text-base md:text-lg font-bold uppercase tracking-wider"
                        style={{ color: '#F2DD5E' }}
                      >
                        {member.name}
                      </p>
                      <p
                        className="text-xs md:text-sm font-semibold uppercase tracking-widest mt-1"
                        style={{ color: '#E0C040' }}
                      >
                        {member.position}
                      </p>
                      <p
                        className="text-[11px] md:text-xs mt-3 leading-relaxed"
                        style={{ color: '#bbb' }}
                      >
                        {member.role}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile: always-visible name below card */}
                <div className="lg:hidden mt-3 text-center">
                  <p className="text-xs font-bold" style={{ color: '#1a1a1a' }}>{member.name}</p>
                  <p className="text-[10px]" style={{ color: '#555' }}>{member.position}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
