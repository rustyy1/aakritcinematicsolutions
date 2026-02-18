import { motion } from "framer-motion";
import clsx from "clsx";

import heritageLogo from "../../assets/logo/Heritage-Logo.svg";
import malaiccaLogo from "../../assets/logo/malaicca-logo-01.svg";
import poonamSanduLogo from "../../assets/logo/poonam-sandu-interior-spacess-logo.svg";
import sarnishLogo from "../../assets/logo/sarnish-logo.svg";
import tdfLogo from "../../assets/logo/tdf-diamond-factory-india-private-limited-logo-01.svg";

interface ClientsProps {
    id?: string;
    className?: string;
}

const VIDEO_DATA = [
    { id: 1, youtubeId: "RrxEfXlgCOk", title: "Client_feedback_01" },
    { id: 2, youtubeId: "CSd3O9GAgXY", title: "Client_feedback_02" },
    { id: 3, youtubeId: "BySkjQPpuJE", title: "Client_feedback_03" },
];

const LOGO_DATA = [
    { src: heritageLogo, alt: "Heritage" },
    { src: malaiccaLogo, alt: "Malaicca" },
    { src: poonamSanduLogo, alt: "Poonam Sandu" },
    { src: sarnishLogo, alt: "Sarnish" },
    { src: tdfLogo, alt: "TDF" },
];

const Clients = ({ id = "clients", className }: ClientsProps) => {
    return (
        <section
            id={id}
            className={clsx(
                "relative w-full min-h-screen bg-primary flex flex-col pt-20",
                className
            )}
        >
            <style>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .logo-animate {
                    animation: marquee 30s linear infinite;
                }
                .home-logo-wrapper {
                    display: flex;
                    overflow: hidden;
                    width: 100%;
                }
                .clients-grid {
                    display: flex;
                    flex-shrink: 0;
                    align-items: center;
                    gap: 6rem;
                    padding-right: 6rem;
                }
                .client-logo {
                    height: 2.8rem; 
                    width: auto;
                    max-width: 180px;
                    object-fit: contain;
                    flex-shrink: 0;
                    /* Filter removed to keep original colors */
                }

                .desktop-video-row { display: none; }
                .mobile-video-grid { display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%; padding: 0 1rem 1.5rem 1rem; }

                @media (min-width: 768px) {
                    .desktop-video-row { display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; gap: 3rem; width: 100%; overflow-x: auto; padding: 0 5vw 2.5rem 5vw; scrollbar-width: none; }
                    .desktop-video-row::-webkit-scrollbar { display: none; }
                    .mobile-video-grid { display: none !important; }
                    .client-logo { height: 3.5rem; }
                }
            `}</style>

            {/* Background glow */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            {/* Heading + Videos */}
            <div className="relative z-10 w-full mb-10">
                <div className="flex flex-col items-center text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-retrocia text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tighter text-black mb-12"
                    >
                        Client Feedback
                    </motion.h2>

                    {/* DESKTOP VIDEOS */}
                    <div className="desktop-video-row">
                        {VIDEO_DATA.map((video, index) => (
                            <motion.div
                                key={`desktop-${video.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{ flexShrink: 0, width: "420px", aspectRatio: "3/2", position: "relative" }}
                            >
                                <div style={{ position: "relative", height: "100%", width: "100%", backgroundColor: "black", borderRadius: "1.5rem", overflow: "hidden", border: "6px solid #fea800" }}>
                                    <iframe style={{ width: "100%", height: "100%" }} src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`} title={video.title} allowFullScreen />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* MOBILE VIDEOS */}
                    <div className="mobile-video-grid">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", width: "100%" }}>
                            {VIDEO_DATA.slice(0, 2).map((video, index) => (
                                <div key={`mob-top-${video.id}`} style={{ position: "relative", aspectRatio: "3/2", width: "100%" }}>
                                    <div style={{ position: "relative", height: "100%", width: "100%", backgroundColor: "black", borderRadius: "1rem", overflow: "hidden", border: "4px solid #0a0a0a" }}>
                                        <iframe style={{ width: "100%", height: "100%" }} src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`} title={video.title} allowFullScreen />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ position: "relative", aspectRatio: "3/2", width: "70%" }}>
                            <div style={{ position: "relative", height: "100%", width: "100%", backgroundColor: "black", borderRadius: "1rem", overflow: "hidden", border: "4px solid #0a0a0a" }}>
                                <iframe style={{ width: "100%", height: "100%" }} src={`https://www.youtube.com/embed/${VIDEO_DATA[2].youtubeId}?modestbranding=1&rel=0`} title={VIDEO_DATA[2].title} allowFullScreen />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── ORANGE PILL LOGO SCROLLER ── */}
            <div className="relative z-10 w-full mt-30 bg-black py-16">
                <div className="px-[5vw] mb-8 text-center md:text-left">
                    <h3 className="text-white/20 text-3xl md:text-5xl font-bold tracking-tighter uppercase italic leading-none">
                        WE WORKED WITH
                    </h3>
                </div>

                {/* Orange Pill Container */}
                <div className="mx-auto w-[72%] mt-[5vh]  max-w-6xl">
                    <div className="relative h-24 md:h-32 bg-[#fea800] rounded-full flex items-center overflow-hidden shadow-[0_10px_40px_rgba(255,107,0,0.3)]">

                        <div className="home-logo-wrapper">
                            <div className="clients-grid logo-animate">
                                {LOGO_DATA.map((logo, index) => (
                                    <img key={`a-${index}`} src={logo.src} alt={logo.alt} className="client-logo" loading="eager" />
                                ))}
                            </div>
                            <div className="clients-grid logo-animate">
                                {LOGO_DATA.map((logo, index) => (
                                    <img key={`b-${index}`} src={logo.src} alt={logo.alt} className="client-logo" loading="eager" />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;