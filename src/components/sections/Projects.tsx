import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, X, Heart, Share2, Volume2, VolumeX, AlertTriangle, Maximize, Minimize } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useState, createContext, useContext, useRef } from 'react';

import { supabase, checkConnection } from '../../lib/supabase';
import MagicBento from '../ui/MagicBento';

// Context for shared video player state
export interface VideoContextType {
    isMuted: boolean;
    setIsMuted: (muted: boolean) => void;
    likedIds: Set<number>;
    toggleLike: (id: number) => void;
}

export const VideoContext = createContext<VideoContextType | undefined>(undefined);

// Improved YouTube ID extraction
export const getYoutubeId = (url: string): string | null => {
    if (!url) return null;

    try {
        // Handle all YouTube formats
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
            /^([a-zA-Z0-9_-]{11})$/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) return match[1];
        }

        // Try to extract from URL parameters
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v') || null;
    } catch (e) {
        console.error('Error extracting YouTube ID:', e);
        return null;
    }
};

import { useYouTubePlayer } from '../../hooks/useYouTubePlayer';

// ... (existing helper functions like getYoutubeId remain the same)

/**
 * HOVER PREVIEW MODAL - This appears when you hover over cards
 */
export const HoverPreviewModal = ({
    project,
    onClose,
    onExpand
}: {
    project: PortfolioItem;
    onClose: () => void;
    onExpand: () => void;
}) => {
    const youtubeId = getYoutubeId(project.youtube_url);
    const modalRef = useRef<HTMLDivElement>(null);
    const playerContainerId = `hover-player-${project.id}`;

    // Initialize YouTube Player
    useYouTubePlayer(playerContainerId, {
        videoId: youtubeId || '',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            loop: 1,
            playlist: youtubeId // Required for loop to work
        }
    });

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const toggleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        const container = document.getElementById(playerContainerId);
        if (!container) return;

        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
            (container as any).webkitRequestFullscreen();
        } else if ((container as any).msRequestFullscreen) {
            (container as any).msRequestFullscreen();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={onClose}
        >
            <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-500"
                style={{ width: 'min(90vw, 800px)', height: 'min(80vh, 450px)' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full h-full relative">
                    {youtubeId ? (
                        <div id={playerContainerId} className="w-full h-full bg-black" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                            <div className="text-center p-8">
                                <AlertTriangle className="w-12 h-12 text-yellow-500/50 mx-auto mb-4" />
                                <p className="text-white/60">Could not load YouTube preview</p>
                                <p className="text-white/40 text-sm mt-2">{project.youtube_url}</p>
                            </div>
                        </div>
                    )}

                    {/* Title Overlay */}
                    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
                        <div className="flex flex-col">
                            <span className="bg-yellow-500 text-black text-xs px-3 py-1 rounded font-bold w-fit mb-2">
                                PREVIEW
                            </span>
                            <h3 className="text-white font-bold text-xl">{project.title}</h3>
                        </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                        <div className="flex justify-between items-center pointer-events-auto">
                            <div className="flex gap-2">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-transform hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                                    title="Fullscreen"
                                >
                                    <Maximize className="w-5 h-5 font-bold" />
                                </button>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onExpand();
                                }}
                                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Play className="w-4 h-4" />
                                Watch Full Video
                            </button>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm z-50 pointer-events-auto"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};



export const useVideoPlayer = () => {
    const context = useContext(VideoContext);
    if (!context) throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
    return context;
};

/**
 * Animated Heart for "Like" feedback
 */
const HeartAnimation = ({ x, y, onComplete }: { x: number; y: number; onComplete: () => void }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0, y: y }}
        animate={{
            scale: [0, 1.5, 1.2, 1],
            opacity: [0, 1, 1, 0],
            y: y - 100,
            x: x + (Math.random() - 0.5) * 50
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={onComplete}
        className="fixed z-[10001] pointer-events-none"
        style={{ left: x, top: y }}
    >
        <Heart className="w-12 h-12 text-red-500 fill-current shadow-xl" />
    </motion.div>
);

export interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    description?: string;
    studio?: string;
    youtube_url: string;
    thumbnail_url?: string;
}

interface PortfolioProps {
    id?: string;
    className?: string;
}

/**
 * Premium Video Modal with social features
 */
export const PremiumVideoModal = ({
    project,
    onClose,
}: {
    project: PortfolioItem;
    onClose: () => void;
}) => {
    const { isMuted: globalMute, setIsMuted: setGlobalMute, likedIds, toggleLike } = useVideoPlayer();
    const [isControlsVisible, setIsControlsVisible] = useState(true);
    const [showHeart, setShowHeart] = useState<{ x: number; y: number } | null>(null);
    const [canClose, setCanClose] = useState(false);
    const controlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const youtubeId = getYoutubeId(project.youtube_url);
    const playerContainerId = `premium-player-${project.id}`;
    const modalContainerRef = useRef<HTMLDivElement>(null);

    // Initialize YouTube Player
    const { isReady, isPlaying, playVideo, pauseVideo, mute, unMute } = useYouTubePlayer(playerContainerId, {
        videoId: youtubeId || '',
        playerVars: {
            autoplay: 1,
            mute: globalMute ? 1 : 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            playsinline: 1
        },
        events: {
            onStateChange: () => {
                // Sync local playing state if needed, hook handles it mostly
            }
        }
    });

    // Sync global mute state with player
    useEffect(() => {
        if (isReady) {
            if (globalMute) mute();
            else unMute();
        }
    }, [globalMute, isReady, mute, unMute]);

    // Prevent immediate closure on click (150ms delay)
    useEffect(() => {
        const timer = setTimeout(() => setCanClose(true), 150);

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        const container = modalContainerRef.current;
        if (!container) return;

        if (!document.fullscreenElement) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if ((container as any).webkitRequestFullscreen) {
                (container as any).webkitRequestFullscreen();
            } else if ((container as any).msRequestFullscreen) {
                (container as any).msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
        }
    };

    const handleInteraction = () => {
        setIsControlsVisible(true);
        if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
        controlsTimeout.current = setTimeout(() => setIsControlsVisible(false), 3000);
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowHeart({ x: e.clientX, y: e.clientY });
        toggleLike(project.id);
        // window.open(project.youtube_url, '_blank'); // Removed external open on generic double click
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(project.youtube_url);
    };

    const togglePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPlaying) pauseVideo();
        else playVideo();
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/98 backdrop-blur-xl"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseMove={handleInteraction}
            onClick={(e) => {
                e.stopPropagation();
                if (canClose) onClose();
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                ref={modalContainerRef}
                className={clsx(
                    "relative bg-black overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-300 mx-6",
                    isFullscreen ? "w-screen h-screen rounded-0 !mx-0" : "w-full max-w-4xl aspect-video rounded-3xl",
                    "shadow-[0_0_0_9999px_rgba(0,0,0,0.8)]"
                )}
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={handleDoubleClick}
            >
                {/* Blurred Placeholder (Visible while loading) */}
                {!isReady && project.thumbnail_url && (
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <img
                            src={project.thumbnail_url}
                            className="w-full h-full object-cover blur-3xl opacity-50 scale-110"
                            alt=""
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-yellow-500/50" />
                        </div>
                    </div>
                )}

                <div className="w-full h-full bg-black relative" onClick={togglePlayPause}>
                    {/* YouTube Embed Container */}
                    {youtubeId ? (
                        <div id={playerContainerId} className="w-full h-full" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                            <div className="text-center p-8">
                                <AlertTriangle className="w-12 h-12 text-yellow-500/50 mx-auto mb-4" />
                                <h3 className="text-white font-bold text-lg">Invalid YouTube URL</h3>
                                <p className="text-white/60 text-sm mt-2">{project.youtube_url}</p>
                                <button
                                    onClick={() => window.open(project.youtube_url, '_blank')}
                                    className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg hover:opacity-90"
                                >
                                    Open in YouTube
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Glassmorphic Controls Overlay */}
                <AnimatePresence>
                    {isControlsVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"
                        >
                            {/* Top Bar */}
                            <div className="flex justify-between items-start pointer-events-auto">
                                <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                                    <h3 className="text-white font-bold text-lg">{project.title}</h3>
                                    <p className="text-white/60 text-xs uppercase tracking-widest">{project.category}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={toggleFullscreen}
                                        className="p-3 bg-white/10 hover:bg-gradient-to-br from-[#E0FE08] to-[#CEFE55] hover:text-black rounded-2xl text-white backdrop-blur-md border border-white/10 transition-all group"
                                        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                                    >
                                        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                                    </button>
                                    <button onClick={handleShare} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white backdrop-blur-md border border-white/10 transition-all">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white backdrop-blur-md border border-white/10 transition-all">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Center Play/Pause Indicator (Optional, mostly for visual feedback on click) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                {!isPlaying && isReady && (
                                    <div className="bg-black/40 backdrop-blur-sm p-4 rounded-full border border-white/10">
                                        <Play className="w-8 h-8 text-white fill-white" />
                                    </div>
                                )}
                            </div>

                            {/* Bottom Bar */}
                            <div className="flex items-center justify-between pointer-events-auto">
                                <div className="flex gap-4">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleLike(project.id); }}
                                        className={clsx(
                                            "p-3 rounded-2xl backdrop-blur-md border transition-all flex items-center gap-2",
                                            likedIds.has(project.id) ? "bg-red-500/20 border-red-500/40 text-red-500" : "bg-white/10 border-white/10 text-white"
                                        )}
                                    >
                                        <Heart className={clsx("w-5 h-5", likedIds.has(project.id) && "fill-current")} />
                                        <span className="text-sm font-medium">{likedIds.has(project.id) ? 'Liked' : 'Like'}</span>
                                    </button>
                                    <button
                                        onClick={togglePlayPause}
                                        className="p-3 bg-yellow-500 text-black rounded-2xl hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                                    >
                                        {isPlaying ? (
                                            <>
                                                <div className="flex gap-1 h-4 items-center">
                                                    <div className="w-1 h-full bg-black rounded-full" />
                                                    <div className="w-1 h-full bg-black rounded-full" />
                                                </div>
                                                <span className="text-sm font-bold">Pause</span>
                                            </>
                                        ) : (
                                            <>
                                                <Play className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-bold">Play</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setGlobalMute(!globalMute); }}
                                        className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white backdrop-blur-md border border-white/10 transition-all"
                                    >
                                        {globalMute ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Floating Heart Feedback */}
            {showHeart && (
                <HeartAnimation x={showHeart.x} y={showHeart.y} onComplete={() => setShowHeart(null)} />
            )}
        </motion.div>
    );
};

const Frame = ({ children }: { children: React.ReactNode }) => (
    <div
        className="relative w-full h-full rounded-3xl overflow-hidden border border-[#F8F7F2]/10 bg-black"
        style={{
            boxSizing: 'border-box',
        }}
    >
        {children}
    </div>
);

/**
 * Individual Project Card with hover intent logic
 */
const PortfolioCard = ({ project, index, onPreview }: { project: PortfolioItem; index: number; onPreview: (p: PortfolioItem | null) => void; }) => {
    const [isHovered, setIsHovered] = useState(false);
    const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const youtubeId = getYoutubeId(project.youtube_url);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const lastClickTime = useRef<number>(0);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const now = Date.now();
        const gap = now - lastClickTime.current;
        lastClickTime.current = now;

        if (gap < 300) {
            // Double Click Detected
            console.log("Portfolio: Double Click");
            if (clickTimeout.current) {
                clearTimeout(clickTimeout.current);
                clickTimeout.current = null;
            }
            if (project && project.youtube_url) {
                window.open(project.youtube_url, '_blank');
            }
        } else {
            // Single Click Potential
            if (clickTimeout.current) clearTimeout(clickTimeout.current);

            clickTimeout.current = setTimeout(() => {
                if (project) {
                    onPreview(project);
                }
                clickTimeout.current = null;
            }, 180);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            style={{
                // Remove fixed width/height constraints to allow responsive resizing via classes
                position: 'relative'
            }}
            className={clsx(
                "group cursor-pointer relative mx-auto", // Added mx-auto for self-centering in grid
                "w-full max-w-[280px] h-[200px]", // Mobile defaults
                "sm:max-w-[300px] sm:h-[220px]", // Tablet
                "min-[900px]:w-[350px] min-[900px]:max-w-none min-[900px]:h-[250px]"  // Desktop (Lowered breakpoint to 900px)
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <MagicBento
                textAutoHide
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={400}
                particleCount={12}
                glowColor="224, 254, 8"
                disableAnimations={false}
            >
                <motion.div
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full h-full"
                >
                    <Frame>
                        {project ? (
                            <div className="block w-full h-full relative group/link">
                                <img
                                    src={project.thumbnail_url || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '/placeholder.jpg')}
                                    alt={project.title}
                                    className={clsx(
                                        "w-full h-full object-cover transition-transform duration-700",
                                        isHovered ? "scale-110 opacity-60" : "scale-100 opacity-100"
                                    )}
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        const src = target.src;

                                        if (src.includes('hqdefault.jpg')) {
                                            target.src = src.replace('hqdefault.jpg', 'mqdefault.jpg');
                                        } else if (src.includes('mqdefault.jpg')) {
                                            target.src = src.replace('mqdefault.jpg', 'default.jpg');
                                        } else if (src.includes('default.jpg')) {
                                            target.src = '/placeholder.jpg';
                                        } else {
                                            target.src = '/placeholder.jpg';
                                        }
                                    }}
                                />
                                <div className={clsx(
                                    "absolute inset-0 bg-black/10 transition-all flex items-center justify-center z-20",
                                    isHovered ? "opacity-100" : "opacity-0"
                                )}>
                                    <div className="w-12 h-12 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-lg backdrop-blur-sm">
                                        <Play className="w-6 h-6 fill-current ml-0.5" />
                                    </div>
                                </div>
                                <div className="absolute left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent bottom-0">
                                    <div className="flex items-center justify-between">
                                        <span className={clsx(
                                            "px-1.5 py-0.5 rounded bg-yellow-500/30 border border-yellow-500/40 text-yellow-700 font-black uppercase tracking-widest leading-none",
                                            "text-[6px] sm:text-[7px]"
                                        )}>
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full bg-yellow-900/10 flex items-center justify-center border-2 border-dashed border-yellow-900/20" />
                        )}
                    </Frame>
                </motion.div>
            </MagicBento>
        </motion.div>
    );
};

interface PortfolioProps {
    id?: string;
    className?: string;
    hoveredProject?: PortfolioItem | null;
    setHoveredProject?: (p: PortfolioItem | null) => void;
    selectedProject?: PortfolioItem | null;
    setSelectedProject?: (p: PortfolioItem | null) => void;
    isMuted?: boolean;
    setIsMuted?: (muted: boolean) => void;
    likedIds?: Set<number>;
    toggleLike?: (id: number) => void;
}

const Portfolio = ({
    id = "portfolio",
    className,
    hoveredProject: externalHovered,
    setHoveredProject: externalSetHovered,
    selectedProject: externalSelected,
    setSelectedProject: externalSetSelected,
    isMuted: externalIsMuted,
    setIsMuted: externalSetIsMuted,
    likedIds: externalLikedIds,
    toggleLike: externalToggleLike
}: PortfolioProps) => {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Fallback to local state if props aren't provided (backwards compatibility)
    const [localIsMuted, localSetIsMuted] = useState(true);
    const [localLikedIds, localSetLikedIds] = useState<Set<number>>(new Set());
    const [localHovered, localSetHovered] = useState<PortfolioItem | null>(null);
    const [localSelected, localSetSelected] = useState<PortfolioItem | null>(null);

    const isMuted = externalIsMuted !== undefined ? externalIsMuted : localIsMuted;
    const setIsMuted = externalSetIsMuted || localSetIsMuted;
    const likedIds = externalLikedIds || localLikedIds;
    const hoveredProject = externalHovered !== undefined ? externalHovered : localHovered;
    const setHoveredProject = externalSetHovered || localSetHovered;
    const selectedProject = externalSelected !== undefined ? externalSelected : localSelected;
    const setSelectedProject = externalSetSelected || localSetSelected;

    const toggleLike = externalToggleLike || ((id: number) => {
        const targetSet = externalLikedIds ? null : localSetLikedIds;
        if (targetSet) {
            targetSet(prev => {
                const next = new Set(prev);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                return next;
            });
        }
    });

    useEffect(() => {
        fetchPortfolio();

        // Ensure the document body has relative positioning for framer-motion
        document.body.style.position = 'relative';

        return () => {
            document.body.style.position = '';
        };
    }, []);

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            const status = await checkConnection();
            if (!status.success) throw new Error("Connection failed: " + status.message);

            const { data, error } = await supabase
                .from('portfolio')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const normalizedData = (data || []).map((item: any) => {
                const id = item.id || item.Id;
                const title = item.title || item.Title || 'Untitled';
                const category = item.category || item.Category || 'Uncategorized';
                const youtube_url = item.youtube_url || item.YoutubeUrl || item.youtubeUrl;
                const youtubeId = getYoutubeId(youtube_url);

                return {
                    id,
                    title,
                    category,
                    youtube_url: youtube_url || '',
                    description: item.description || item.Description || '',
                    studio: item.studio || item.Studio || 'Aakrit',
                    thumbnail_url: item.thumbnail_url || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null) // Changed from maxresdefault to hqdefault
                };
            });

            console.log('Portfolio data loaded:', normalizedData);
            setItems(normalizedData);
        } catch (err: any) {
            console.error('Error fetching portfolio:', err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <VideoContext.Provider value={{ isMuted, setIsMuted, likedIds, toggleLike }}>
            <section
                id={id}
                className={clsx("min-h-[100dvh] lg:h-[100dvh] w-full lg:w-screen flex items-center bg-background flex-shrink-0 relative py-20 lg:py-0", className)}
                style={{ backgroundColor: '#F2DD5E', position: 'relative' }} // Added position relative
            >
                <div className="max-w-[1800px] w-full h-full mx-auto px-8 flex flex-row gap-12 items-center justify-center">

                    {/* PORTFOLIO GRID - CENTERED */}
                    <div className="w-full h-full flex flex-col justify-center pt-8 font-sans overflow-visible items-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-[40px] flex flex-col items-center justify-center flex-shrink-0 animate-float"
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-black uppercase tracking-[0.2em] text-center mb-2">
                                OUR PORTFOLIO
                            </h2>
                            <div className="w-16 h-1 sm:w-20 lg:w-24 bg-yellow-600/40 rounded-full" />
                        </motion.div>



                        {loading ? (
                            <div className="flex justify-center items-center h-[300px] lg:h-[400px]">
                                <Loader2 className="w-10 h-10 animate-spin text-yellow-600" />
                            </div>
                        ) : (
                            <div className="relative w-full mx-auto flex justify-center px-4 md:px-8" style={{ position: 'relative' }}>
                                {/* 
                                    GRID LAYOUT FIX:
                                    - Mobile: 1 column
                                    - Tablet (md >= 768px): 2 columns
                                    - Desktop (lg >= 1024px): 3 columns
                                    - Removed place-items-center to rely on card's own mx-auto for centering
                                */}
                                <div className="grid grid-cols-1 md:grid-cols-2 min-[900px]:grid-cols-3 min-[900px]:gap-x-[60px] min-[900px]:gap-y-[30px] gap-8 w-full min-[900px]:w-fit place-items-center relative z-10 p-4">
                                    {(items.length > 0 ? items.slice(0, 6) : [...Array(6)]).map((project, index) => (
                                        <PortfolioCard
                                            key={project?.id || index}
                                            project={project}
                                            index={index}
                                            onPreview={setHoveredProject}
                                        />
                                    ))}
                                </div>
                            </div>

                        )}
                    </div>
                </div>

                {/* MODALS REMOVED FROM HERE - NOW HANDLED BY HOME EXPERIENCE FOR GLOBAL POSITIONING */}
            </section>
        </VideoContext.Provider >
    );
};

export default Portfolio;