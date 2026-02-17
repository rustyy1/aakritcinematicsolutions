

import clsx from 'clsx';
import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { gsap } from 'gsap';

interface GalleryProps {
    id?: string;
    className?: string;
}

// Helpers
const createParticleElement = (x: number, y: number, color: string) => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(${color}, 1);
        box-shadow: 0 0 6px rgba(${color}, 0.6);
        pointer-events: none;
        z-index: 100;
        left: ${x}px;
        top: ${y}px;
    `;
    return el;
};

// Inline MagicBentoCard Component
interface MagicBentoCardProps {
    children: React.ReactNode;
    className?: string;
    width?: string | number;
    height?: string | number;
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    enableStars?: boolean;
    enableTilt?: boolean;
    enableMagnetism?: boolean;
    clickEffect?: boolean;
    glowColor?: string; // RGB string "r, g, b"
    particleCount?: number;
}

const MagicBentoCard: React.FC<MagicBentoCardProps> = ({
    children,
    className = "",
    width,
    height,
    enableBorderGlow = true,
    enableStars = true,
    enableTilt = true,
    enableMagnetism = true,
    clickEffect = true,
    glowColor = "224, 254, 8", // Default Chartreuse
    particleCount = 12
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLElement[]>([]);
    const timeoutsRef = useRef<number[]>([]);
    const isHoveredRef = useRef(false);
    const memoizedParticles = useRef<HTMLElement[]>([]);
    const particlesInitialized = useRef(false);
    const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

    // CSS for the component (Dynamic based on glowColor)
    const styleString = `
        .magic-bento-card {
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: #000;
            transition: all 0.3s ease;
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 300px;
            --glow-rgb: ${glowColor};
        }

        .magic-bento-card:hover {
            transform: translateY(-2px);
            box-shadow: 
                0 4px 20px rgba(0, 0, 0, 0.4),
                0 0 30px rgba(${glowColor}, 0.15); /* Ambient glow */
        }

        /* Border Trace Effect */
        .magic-bento-card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 3px; /* Border thickness */
            background: radial-gradient(
                var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, 1) 0%,
                rgba(${glowColor}, 0.5) 30%,
                transparent 60%
            );
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            z-index: 50; /* Above content */
        }

        .particle {
             pointer-events: none;
        }

        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(${glowColor}, 0.6) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
            pointer-events: none;
            z-index: 1000;
        }
    `;

    // --- Particle Logic ---
    const initializeParticles = useCallback(() => {
        if (particlesInitialized.current || !cardRef.current) return;
        const { width, height } = cardRef.current.getBoundingClientRect();
        memoizedParticles.current = Array.from({ length: particleCount }, () =>
            createParticleElement(Math.random() * width, Math.random() * height, glowColor)
        );
        particlesInitialized.current = true;
    }, [particleCount, glowColor]);

    const clearAllParticles = useCallback(() => {
        timeoutsRef.current.forEach(window.clearTimeout);
        timeoutsRef.current = [];
        magnetismAnimationRef.current?.kill();

        particlesRef.current.forEach(particle => {
            gsap.to(particle, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'back.in(1.7)',
                onComplete: () => {
                    if (particle.parentNode) particle.parentNode.removeChild(particle);
                }
            });
        });
        particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
        if (!cardRef.current || !isHoveredRef.current) return;
        if (!particlesInitialized.current) initializeParticles();

        memoizedParticles.current.forEach((particle, index) => {
            const timeoutId = window.setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return;

                const clone = particle.cloneNode(true) as HTMLElement;
                const { width, height } = cardRef.current!.getBoundingClientRect();
                clone.style.left = `${Math.random() * width}px`;
                clone.style.top = `${Math.random() * height}px`;

                cardRef.current!.appendChild(clone);
                particlesRef.current.push(clone);

                gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

                gsap.to(clone, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    rotation: Math.random() * 360,
                    duration: 2 + Math.random() * 2,
                    ease: 'none',
                    repeat: -1,
                    yoyo: true
                });

                gsap.to(clone, {
                    opacity: 0.3,
                    duration: 1.5,
                    ease: 'power2.inOut',
                    repeat: -1,
                    yoyo: true
                });
            }, index * 100);
            timeoutsRef.current.push(timeoutId);
        });
    }, [initializeParticles]);


    // --- Mouse & Animation Effects ---
    useEffect(() => {
        const element = cardRef.current;
        if (!element) return;

        const handleMouseEnter = () => {
            isHoveredRef.current = true;
            if (enableStars) animateParticles();

            // Reveal border glow fully
            element.style.setProperty('--glow-intensity', '1');

            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 0, // Reset first
                    duration: 0.3
                });
            }
        };

        const handleMouseLeave = () => {
            isHoveredRef.current = false;
            if (enableStars) clearAllParticles();
            // Hide border glow
            element.style.setProperty('--glow-intensity', '0');

            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            if (enableMagnetism) {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Border Glow Logic (Local)
            const relativeX = (x / rect.width) * 100;
            const relativeY = (y / rect.height) * 100;
            element.style.setProperty('--glow-x', `${relativeX}%`);
            element.style.setProperty('--glow-y', `${relativeY}%`);
            element.style.setProperty('--glow-intensity', '1'); // Always intense on hover

            // Tilt & Magnetism
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            if (enableTilt) {
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                gsap.to(element, {
                    rotateX,
                    rotateY,
                    duration: 0.1,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }

            if (enableMagnetism) {
                const magnetX = (x - centerX) * 0.05;
                const magnetY = (y - centerY) * 0.05;
                magnetismAnimationRef.current = gsap.to(element, {
                    x: magnetX,
                    y: magnetY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const handleClick = (e: MouseEvent) => {
            if (!clickEffect) return;
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate max distance to corners
            const maxDistance = Math.max(
                Math.hypot(x, y),
                Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height),
                Math.hypot(x - rect.width, y - rect.height)
            );

            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.width = `${maxDistance * 2}px`;
            ripple.style.height = `${maxDistance * 2}px`;
            ripple.style.left = `${x - maxDistance}px`;
            ripple.style.top = `${y - maxDistance}px`;

            element.appendChild(ripple);

            gsap.fromTo(ripple,
                { scale: 0, opacity: 1 },
                { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() }
            );
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('click', handleClick);

        return () => {
            isHoveredRef.current = false;
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('click', handleClick);
            clearAllParticles();
        };
    }, [enableStars, enableTilt, enableMagnetism, clickEffect, animateParticles, clearAllParticles]);


    const cardClasses = clsx(
        'magic-bento-card',
        enableBorderGlow && 'magic-bento-card--border-glow',
        className
    );

    return (
        <>
            <style>{styleString}</style>
            <div
                ref={cardRef}
                className={cardClasses}
                style={{ width, height, aspectRatio: '16 / 9' }}
            >
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            </div>
        </>
    );
};




const Gallery = ({ id = "gallery", className }: GalleryProps) => {
    const [videos, setVideos] = useState<any[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .limit(3);

            if (error) {
                console.error('Error fetching videos:', error);
            } else if (data) {
                console.log('Fecthed gallery data:', data);
                setVideos(data);
            }
        };

        fetchVideos();
    }, []);

    const getYouTubeId = (url: string) => {
        if (!url) return null;
        // Regex to find video ID
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        const id = (match && match[2].length === 11) ? match[2] : null;
        console.log(`URL: ${url} -> ID: ${id}`); // Debug log
        return id;
    };

    // Logic to determine which video goes where
    // User Request 1: "Right(v2) to Top, Top(v0) to Right" -> Top=v2, Left=v1, Right=v0 (Initial swap)
    // User Request 2: "Left(v1) to Top, Top(v2) to Left"   -> Top=v1, Left=v2, Right=v0 (Previous turn)
    // User Request 3: "Left(v2) to Top, Top(v1) to Left"   -> Top=v2, Left=v1, Right=v0 (Back to original swap)

    // So Top is v2, Left is v1, Right is v0.
    // User Request: "replace the left video to top center and top enter to the left video"
    // Previous: Top=v2, Left=v1, Right=v0
    // New: Top=v1, Left=v2, Right=v0

    const topVideo = videos.length > 1 ? videos[1] : null; // Was Left
    const leftVideo = videos.length > 2 ? videos[2] : (videos.length > 0 ? videos[0] : null); // Was Top
    const rightVideo = videos.length > 2 ? videos[0] : null;

    return (
        <section
            id={id}
            className={clsx(
                "h-screen w-screen flex flex-col bg-primary flex-shrink-0 relative overflow-hidden",
                className
            )}
        >
            <div className="w-full h-full max-w-7xl mx-auto px-8 flex flex-col pt-24 pb-12">
                {/* Title Section - Single Line */}
                <div className="text-center shrink-0 mb-8">
                    <span className="text-secondary text-xs uppercase tracking-[0.3em] font-mono mb-3 block">Visual Diary</span>
                    <h2 className="text-display-md font-display font-bold text-text leading-tight">
                        Behind The <span className="text-text">Scenes</span>
                    </h2>
                </div>

                {/* Video Gallery Grid - Specific Dimensions & Gaps */}
                <div className="w-full max-w-[1200px] mx-auto flex-grow flex flex-col gap-[30px] items-center justify-center">

                    {/* First Slot - Top Center (520x310) */}
                    <MagicBentoCard
                        className="w-[520px] h-[310px] shrink-0 max-[1023px]:w-[80%] max-[1023px]:h-auto max-[1023px]:aspect-[16/9] max-[1023px]:mt-1 max-[767px]:w-[90%] max-[767px]:mt-0"
                        enableSpotlight
                        enableStars
                        enableTilt
                        enableBorderGlow
                        enableMagnetism
                        clickEffect
                        glowColor="224, 254, 8"
                    >
                        {topVideo?.youtube_url ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${getYouTubeId(topVideo.youtube_url)}?rel=0&modestbranding=1`}
                                title="Visual Diary Main"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full object-cover"
                            ></iframe>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-white/50 bg-neutral-900">
                                <span className="mb-2">Main Video Slot (Top)</span>
                                <span className="text-xs">Waiting for Content...</span>
                            </div>
                        )}
                    </MagicBentoCard>

                    {/* Second and Third video cards - Side by Side (400x220) with 50px gap */}
                    <div className="flex flex-row justify-center gap-[50px] w-full max-[1023px]:gap-8 max-[1023px]:mt-[60px] max-[767px]:gap-4 max-[767px]:mt-[40px]">
                        {/* Second Slot - Left (400x220) */}
                        <MagicBentoCard
                            className="w-[400px] h-[220px] shrink-0 max-[1023px]:w-[46%] max-[1023px]:h-auto max-[1023px]:aspect-[16/9] max-[767px]:w-[42%]"
                            enableSpotlight
                            enableStars
                            enableTilt
                            enableBorderGlow
                            enableMagnetism
                            clickEffect
                            glowColor="224, 254, 8"
                        >
                            {leftVideo?.youtube_url ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${getYouTubeId(leftVideo.youtube_url)}?rel=0&modestbranding=1`}
                                    title="Visual Diary Left"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full object-cover"
                                ></iframe>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-white/50 bg-neutral-900">
                                    <span className="mb-2">Left Slot</span>
                                    <span className="text-xs">Add video to Supabase</span>
                                </div>
                            )}
                        </MagicBentoCard>

                        {/* Third Slot - Right (400x220) */}
                        <MagicBentoCard
                            className="w-[400px] h-[220px] shrink-0 max-[1023px]:w-[46%] max-[1023px]:h-auto max-[1023px]:aspect-[16/9] max-[767px]:w-[42%]"
                            enableSpotlight
                            enableStars
                            enableTilt
                            enableBorderGlow
                            enableMagnetism
                            clickEffect
                            glowColor="224, 254, 8"
                        >
                            {rightVideo?.youtube_url ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${getYouTubeId(rightVideo.youtube_url)}?rel=0&modestbranding=1`}
                                    title="Visual Diary Right"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full object-cover"
                                ></iframe>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-white/50 bg-neutral-900">
                                    <span className="mb-2">Right Slot</span>
                                    <span className="text-xs">Add video to Supabase</span>
                                </div>
                            )}
                        </MagicBentoCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;

