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
                "relative w-full min-h-screen bg-primary flex flex-col",
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

                /* ── DESKTOP ROW: hidden by default (mobile + tablet) ── */
                .desktop-video-row {
                    display: none;
                }

                /* ── MOBILE/TABLET GRID: shown on mobile + tablet ── */
                .mobile-video-grid {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.85rem;
                    width: 100%;
                    padding: 0 1.1rem 2.5rem 1.1rem;
                }

                /* Top row: 2 videos side by side */
                .mobile-top-row {
                    display: flex;
                    flex-direction: row;
                    gap: 0.75rem;
                    width: 100%;
                }

                .mobile-top-row .mobile-video-card {
                    flex: 1;
                    aspect-ratio: 16/10;
                    position: relative;
                }

                /* Bottom row: 1 video centered */
                .mobile-bottom-row {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }

                .mobile-bottom-row .mobile-video-card {
                    width: 60%;
                    aspect-ratio: 16/10;
                    position: relative;
                }

                .mobile-video-inner {
                    height: 100%;
                    width: 100%;
                    background-color: #141414;
                    overflow: hidden;
                    border-radius: 1.1rem;
                    padding: 6px;
                    border: 1px solid rgba(255,255,255,0.07);
                    box-shadow: 0 12px 35px -8px rgba(0,0,0,0.55);
                }

                .mobile-video-screen {
                    position: relative;
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    border-radius: 0.75rem;
                    background-color: black;
                }

                /* Heading: more top padding on mobile/tablet to clear navbar */
                .mobile-heading-area {
                    padding-top: 80px;
                    padding-bottom: 1.5rem;
                }

                /* ── DESKTOP ONLY: 1024px and above ── */
                @media (min-width: 1024px) {
                    .desktop-video-row {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: center;
                        gap: 3rem;
                        width: 100%;
                        overflow-x: auto;
                        padding: 0 5vw 2.5rem 5vw;
                        scrollbar-width: none;
                    }
                    .desktop-video-row::-webkit-scrollbar { display: none; }
                    .mobile-video-grid { display: none !important; }
                    .mobile-heading-area { padding-top: 50px; padding-bottom: 0; }
                    .client-logo { height: 3.5rem; }
                }

                /* Tablet tweaks (768px–1023px): slightly larger cards + padding */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .mobile-video-grid {
                        padding: 0 2rem 3rem 2rem;
                        gap: 1.2rem;
                    }
                    .mobile-top-row {
                        gap: 1.2rem;
                    }
                    .mobile-bottom-row .mobile-video-card {
                        width: 55%;
                    }
                    .mobile-video-inner {
                        border-radius: 1.4rem;
                        padding: 8px;
                    }
                    .mobile-video-screen {
                        border-radius: 1rem;
                    }
                    .mobile-heading-area {
                        padding-top: 100px;
                        padding-bottom: 2rem;
                    }
                    .client-logo { height: 3rem; }
                }
            `}</style>

            {/* Background glow */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            {/* ── HEADING + VIDEOS ── */}
            <div className="relative z-10 w-full flex flex-col items-center text-center">

                {/* ── HEADING CONTAINER ── */}
                <div className="flex flex-col items-center mb-8 mobile-heading-area">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-retrocia text-[clamp(4rem,5vw,4rem)] font-bold tracking-tighter text-black"
                    >
                        Client Feedback
                    </motion.h2>
                    {/* Decorative Line */}
                    <div className="h-1 w-12 bg-black mt-4 rounded-full" />
                </div>

                {/* ── DESKTOP VIDEOS SCROLLER ── */}
                <div className="desktop-video-row w-full" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                    {VIDEO_DATA.map((video) => (
                        <div
                            key={`desktop-${video.id}`}
                            style={{
                                flexShrink: 0,
                                width: "450px",
                                aspectRatio: "16/10",
                                position: "relative"
                            }}
                        >
                            <div className={clsx(
                                "h-full w-full bg-[#0f0f0f] overflow-hidden transition-transform duration-500 hover:scale-[1.02]",
                                "rounded-[2.2rem] p-[10px]",
                                "shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,0,0,0.1)]",
                                "border border-white/5"
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
                            <div className="mt-8 flex items-center justify-between px-6">
                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                                    <p className="text-black text-[10px] font-black uppercase tracking-[0.2em]"></p>
                                </div>
                                <p className="text-black/40 text-[9px] font-mono"></p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── MOBILE + TABLET VIDEOS: 2 on top, 1 centered below ── */}
                <div className="mobile-video-grid">

                    {/* Top row: video 1 + video 2 */}
                    <div className="mobile-top-row">
                        {[VIDEO_DATA[0], VIDEO_DATA[1]].map((video) => (
                            <div key={`mob-top-${video.id}`} className="mobile-video-card">
                                <div className="mobile-video-inner">
                                    <div className="mobile-video-screen">
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

                    {/* Bottom row: video 3 centered */}
                    <div className="mobile-bottom-row">
                        <div className="mobile-video-card">
                            <div className="mobile-video-inner">
                                <div className="mobile-video-screen">
                                    <iframe
                                        style={{ width: "100%", height: "100%", border: "none" }}
                                        src={`https://www.youtube.com/embed/${VIDEO_DATA[2].youtubeId}?modestbranding=1&rel=0&controls=1`}
                                        title={VIDEO_DATA[2].title}
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* ── ORANGE PILL LOGO SCROLLER ── */}
            <div className="relative z-10 w-full bg-black py-20 rounded-t-[4rem] shadow-2xl">
                <div className="px-[5vw] mb-8 text-center md:text-left">
                    <h3 className="text-white/20 text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
                        WE WORKED WITH
                    </h3>
                </div>

                {/* Orange Pill Container */}
                <div className="mx-auto w-[70%] mt-[4vh] max-w-7xl">
                    <div className={clsx(
                        "relative flex items-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] px-12",
                        "h-36 md:h-48",
                        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                    )}>
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