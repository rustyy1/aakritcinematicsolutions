import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SeamlessBackground from '../components/ui/SeamlessBackground';
import HorizontalScrollContainer from '../components/layout/HorizontalScrollContainer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Gallery from '../components/sections/Gallery';
import Projects from '../components/sections/Projects';
import Clients from '../components/sections/Clients';
import Contact from '../components/sections/Contact';
import CanvasCursor from '../components/ui/CanvasCursor';
import Loader from '../components/ui/Loader';
import useMediaQuery from '../hooks/useMediaQuery';


const HomeExperience = () => {
    const [isLoading, setIsLoading] = useState(true);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return (
        <div className="bg-background text-text antialiased lg:overflow-hidden min-h-screen relative">
            <CanvasCursor />

            <AnimatePresence>
                {isLoading && (
                    <Loader onLoadingComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            <SeamlessBackground scrollerRef={scrollerRef} isVisible={true} />
            <HorizontalScrollContainer
                scrollerRef={scrollerRef}
                isDesktop={isDesktop}
                startLanding={!isLoading}
            >
                <Hero id="hero" />
                <Services id="services" />
                <Projects id="projects" />
                <Gallery id="gallery" />
                <Clients id="clients" />
                <About id="about" />
                <Contact id="contact" />
            </HorizontalScrollContainer>
        </div>
    );
};

export default HomeExperience;




