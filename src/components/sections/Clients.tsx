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
                "h-[100dvh] w-screen flex flex-col items-center justify-center flex-shrink-0 relative overflow-hidden",
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
                }

                .desktop-video-row { display: none; }
                .mobile-video-grid { display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%; padding: 0 1rem 1.5rem 1rem; }

                @media (min-width: 768px) {
                    .desktop-video-row { display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; justify-content: center; gap: 3rem; width: 100%; overflow-x: auto; padding: 0 2rem 1.5rem 2rem; scrollbar-width: none; }
                    .desktop-video-row::-webkit-scrollbar { display: none; }
                    .mobile-video-grid { display: none !important; }
                    .client-logo { height: 3.5rem; }
                }
            `}</style>

            {/* Background glow Optional */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            {/* Central Content */}
            <div className="w-full max-w-[1400px] mx-auto z-10 flex flex-col items-center justify-center px-6 md:px-12">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-retrocia text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tighter text-black mb-8 text-center"
                >
                    Client Feedback
                </motion.h2>

                {/* DESKTOP VIDEOS */}
                <div className="desktop-video-row w-full mb-8">
                    {VIDEO_DATA.map((video) => (
                        <div
                            key={`desktop-${video.id}`}
                            style={{
                                flexShrink: 0,
                                width: "420px",
                                aspectRatio: "16/10",
                                position: "relative"
                            }}
                        >
                            <div className="absolute inset-x-10 -bottom-4 h-1/2 bg-black/20 blur-3xl -z-10" />
                            <div className={clsx(
                                "h-full w-full bg-[#141414] overflow-hidden",
                                "rounded-[2rem] p-[8px]",
                                "shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)]",
                            )}>
                                <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-black group">
                                    <div className="absolute inset-0 z-10 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute inset-0 z-10 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)] pointer-events-none" />
                                    <iframe
                                        style={{ width: "100%", height: "100%", border: "none" }}
                                        src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0&controls=1`}
                                        title={video.title}
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MOBILE VIDEOS */}
                <div className="mobile-video-grid flex flex-col gap-4 w-full mb-8">
                    {VIDEO_DATA.map((video) => (
                        <div key={`mob-${video.id}`} style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
                            <div style={{ position: "relative", height: "100%", width: "100%", backgroundColor: "black", borderRadius: "1rem", overflow: "hidden", border: "4px solid #0a0a0a" }}>
                                <iframe style={{ width: "100%", height: "100%" }} src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`} title={video.title} allowFullScreen />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── ORANGE PILL LOGO SCROLLER ── */}
                <div className="w-full flex flex-col items-center mt-4">
                    <h3 className="text-black/80 font-bold tracking-widest uppercase italic text-sm mb-4">
                        WE WORKED WITH
                    </h3>

                    {/* Orange Pill Container */}
                    <div className="w-full max-w-5xl px-4 md:px-0">
                        <div className="relative h-16 md:h-20 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] px-12 rounded-full flex items-center overflow-hidden shadow-[0_15px_45px_rgba(245,158,11,0.25)] border border-black/10">
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
            </div>
        </section>
    );
};

export default Clients;