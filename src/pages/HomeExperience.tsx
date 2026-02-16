import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SeamlessBackground from '../components/ui/SeamlessBackground';
import HorizontalScrollContainer from '../components/layout/HorizontalScrollContainer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Gallery from '../components/sections/Gallery';
import Projects, { type PortfolioItem, HoverPreviewModal, PremiumVideoModal, VideoContext } from '../components/sections/Projects';
import Clients from '../components/sections/Clients';
import Contact from '../components/sections/Contact';
import CanvasCursor from '../components/ui/CanvasCursor';
import Loader from '../components/ui/Loader';
import useMediaQuery from '../hooks/useMediaQuery';


const HomeExperience = () => {
    const [isLoading, setIsLoading] = useState(true);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const [isLandingComplete, setIsLandingComplete] = useState(false);

    const [hoveredProject, setHoveredProject] = useState<PortfolioItem | null>(null);
    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

    // Context state for global playback
    const [isMuted, setIsMuted] = useState(true);
    const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

    const toggleLike = (id: number) => {
        setLikedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <VideoContext.Provider value={{ isMuted, setIsMuted, likedIds, toggleLike }}>
            <div className="bg-background text-text antialiased lg:overflow-hidden min-h-screen relative">
                <CanvasCursor />

                <AnimatePresence mode="wait">
                    {isLoading && (
                        <Loader onLoadingComplete={() => setIsLoading(false)} />
                    )}
                </AnimatePresence>

                {!isLoading && (
                    <>
                        <SeamlessBackground scrollerRef={scrollerRef} isVisible={isLandingComplete} />
                        <HorizontalScrollContainer
                            scrollerRef={scrollerRef}
                            isDesktop={isDesktop}
                            onLandingComplete={() => setIsLandingComplete(true)}
                        >
                            <Hero id="hero" />
                            <Services id="services" />
                            <Projects
                                id="portfolio"
                                hoveredProject={hoveredProject}
                                setHoveredProject={setHoveredProject}
                                selectedProject={selectedProject}
                                setSelectedProject={setSelectedProject}
                                isMuted={isMuted}
                                setIsMuted={setIsMuted}
                                likedIds={likedIds}
                                toggleLike={toggleLike}
                            />
                            <Gallery id="gallery" />
                            <Clients id="clients" />
                            <About id="about" />
                            <Contact id="contact" />
                        </HorizontalScrollContainer>

                        {/* GLOBAL MODALS - Rendered outside the scroller for perfect centering and visibility */}
                        <AnimatePresence>
                            {hoveredProject && !selectedProject && (
                                <HoverPreviewModal
                                    key={`hover-${hoveredProject.id}`}
                                    project={hoveredProject}
                                    onClose={() => setHoveredProject(null)}
                                    onExpand={() => {
                                        setSelectedProject(hoveredProject);
                                        setHoveredProject(null);
                                    }}
                                />
                            )}

                            {selectedProject && (
                                <PremiumVideoModal
                                    key={`premium-${selectedProject.id}`}
                                    project={selectedProject}
                                    onClose={() => setSelectedProject(null)}
                                />
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </VideoContext.Provider>
    );
};

export default HomeExperience;




