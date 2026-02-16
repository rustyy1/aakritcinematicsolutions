import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import gsap from 'gsap';

interface MagicBentoProps {
    children: React.ReactNode;
    className?: string;
    textAutoHide?: boolean;
    enableStars?: boolean;
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    enableTilt?: boolean;
    enableMagnetism?: boolean; // Not implemented in this version to keep performance high
    clickEffect?: boolean;
    spotlightRadius?: number;
    particleCount?: number;
    glowColor?: string; // Kept for API compatibility, but we enforce brand colors
    disableAnimations?: boolean;
}

const MagicBento: React.FC<MagicBentoProps> = ({
    children,
    className,
    enableStars = false,
    enableSpotlight = false,
    enableBorderGlow = true,
    enableTilt = false,
    clickEffect = false,
    spotlightRadius = 600,
    particleCount = 12,
    disableAnimations = false,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const starContainerRef = useRef<HTMLDivElement>(null);
    const borderGlowRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isPressed, setIsPressed] = useState(false);



    useEffect(() => {
        if (disableAnimations || !containerRef.current) return;

        const container = containerRef.current;
        const stars: HTMLDivElement[] = [];

        // --- 1. SETUP STARS ---
        if (enableStars && starContainerRef.current) {
            // Clear previous stars if any
            starContainerRef.current.innerHTML = '';

            for (let i = 0; i < particleCount; i++) {
                const star = document.createElement('div');
                star.style.position = 'absolute';
                star.style.width = window.innerWidth < 768
                    ? `${Math.random() * 1.5 + 1}px` // Smaller on mobile (1.5px - 2.5px)
                    : `${Math.random() * 2 + 2}px`;   // Normal on desktop (2px - 4px)
                star.style.height = star.style.width;
                star.style.backgroundColor = i % 2 === 0 ? '#E0FE08' : '#CEFE55';
                star.style.borderRadius = '50%';
                star.style.opacity = '0';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.pointerEvents = 'none';
                starContainerRef.current.appendChild(star);
                stars.push(star);
            }

            // Twinkle animation
            stars.forEach((star) => {
                gsap.to(star, {
                    opacity: 'random(0.7, 1)', // Much brighter twinkling
                    scale: 'random(1, 1.5)',
                    duration: 'random(1, 3)',
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: 'random(0, 2)' // Random start time
                });
            });
        }

        const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Reuse the same animation logic
            updateAnimations(x, y, centerX, centerY);
        };

        const updateAnimations = (x: number, y: number, centerX: number, centerY: number) => {
            // --- TILT EFFECT ---
            if (enableTilt && contentRef.current) {
                const tiltX = (y - centerY) / centerY * 10; // Max 10 deg rotation
                const tiltY = (centerX - x) / centerX * 10;

                gsap.to(contentRef.current, {
                    rotationX: tiltX,
                    rotationY: tiltY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }

            // --- SPOTLIGHT & BORDER GLOW POSITION ---
            if (enableSpotlight || enableBorderGlow) {
                const gradientPos = `radial-gradient(${spotlightRadius}px circle at ${x}px ${y}px, rgba(224, 254, 8, 1), rgba(206, 254, 85, 0.8), transparent 60%)`;

                if (enableBorderGlow && borderGlowRef.current) {
                    borderGlowRef.current.style.background = gradientPos;
                    gsap.to(borderGlowRef.current, { opacity: 1, duration: 0.3 });
                }

                if (enableSpotlight && spotlightRef.current) {
                    const innerSpotlight = `radial-gradient(${spotlightRadius * 0.8}px circle at ${x}px ${y}px, rgba(224, 254, 8, 0.4), transparent 50%)`;
                    spotlightRef.current.style.background = innerSpotlight;
                    gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
                }
            }

            // --- PARALLAX STARS ---
            if (enableStars && stars.length > 0) {
                gsap.to(stars, {
                    x: (x - centerX) * 0.05,
                    y: (y - centerY) * 0.05,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            updateAnimations(x, y, centerX, centerY);
        };

        const onMouseLeave = () => {
            resetAnimations();
        };

        const onTouchEnd = () => {
            resetAnimations();
        };

        const resetAnimations = () => {
            // Reset Tilt
            if (enableTilt && contentRef.current) {
                gsap.to(contentRef.current, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }

            // Fade out glows
            if (enableBorderGlow && borderGlowRef.current) {
                gsap.to(borderGlowRef.current, { opacity: 0, duration: 0.5 });
            }
            if (enableSpotlight && spotlightRef.current) {
                gsap.to(spotlightRef.current, { opacity: 0, duration: 0.5 });
            }

            if (clickEffect) setIsPressed(false);
        };

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseLeave);
        container.addEventListener('touchmove', onTouchMove, { passive: true });
        container.addEventListener('touchstart', onTouchMove, { passive: true }); // Trigger on initial touch too
        container.addEventListener('touchend', onTouchEnd);

        return () => {
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseleave', onMouseLeave);
            container.removeEventListener('touchmove', onTouchMove);
            container.removeEventListener('touchstart', onTouchMove);
            container.removeEventListener('touchend', onTouchEnd);

            // Cleanup GSAP tweens
            gsap.killTweensOf(stars);
            if (contentRef.current) gsap.killTweensOf(contentRef.current);
            if (borderGlowRef.current) gsap.killTweensOf(borderGlowRef.current);
            if (spotlightRef.current) gsap.killTweensOf(spotlightRef.current);
        };

    }, [enableStars, enableSpotlight, enableBorderGlow, enableTilt, spotlightRadius, particleCount, disableAnimations, clickEffect]);


    // Click effect handling
    const handleMouseDown = () => { if (clickEffect) setIsPressed(true); };
    const handleMouseUp = () => { if (clickEffect) setIsPressed(false); };


    return (
        <div
            ref={containerRef}
            className={clsx('relative w-full h-full group perspective-1000', className)} // Added perspective
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{ perspective: '1000px' }}
        >
            {/* Content Wrapper for Tilt */}
            <motion.div
                ref={contentRef}
                className="relative w-full h-full transform-style-3d bg-black rounded-[24px]" // Ensures 3D transform works
                animate={isPressed ? { scale: 0.98 } : { scale: 1 }}
                transition={{ duration: 0.1 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Border Glow Layer (Behind content) */}
                {enableBorderGlow && (
                    <div
                        ref={borderGlowRef}
                        className="absolute -inset-[2px] rounded-[24px] opacity-0 transition-opacity duration-300 z-0 pointer-events-none"
                    // Style set by JS logic
                    />
                )}

                {/* Inner Background & Content Container */}
                <div className="absolute inset-[2px] bg-[#111] rounded-[20px] overflow-hidden z-10 flex flex-col h-[calc(100%-4px)] w-[calc(100%-4px)]">

                    {/* Actual Content - Bottom Layer */}
                    <div className="relative z-30 w-full h-full">
                        {children}
                    </div>

                    {/* Spotlight Layer - Overlay */}
                    {enableSpotlight && (
                        <div
                            ref={spotlightRef}
                            className="absolute inset-0 opacity-0 pointer-events-none z-40 mix-blend-screen"
                        // Style set by JS logic
                        />
                    )}

                    {/* Stars Layer - Top Overlay */}
                    {enableStars && (
                        <div
                            ref={starContainerRef}
                            className="absolute inset-0 z-50 pointer-events-none"
                        />
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default MagicBento;
