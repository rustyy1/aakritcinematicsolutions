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
                /* ── Marquee ── */
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .logo-animate {
                    animation: marquee 30s linear infinite;
                }
                .home-logo-wrapper {
                    position: relative;
                    display: flex;
                    overflow: hidden;
                    width: 100%;
                }
                .clients-grid {
                    display: flex;
                    flex-shrink: 0;
                    align-items: center;
                    gap: 4rem;
                    padding-right: 4rem;
                }
                .client-logo {
                    height: 5.5rem;
                    width: auto;
                    object-fit: contain;
                    opacity: 0.9;
                    flex-shrink: 0;
                }
                .home-logo-left-gradient {
                    position: absolute;
                    top: 0; left: 0; bottom: 0;
                    width: 8rem;
                    background: linear-gradient(to right, black, transparent);
                    z-index: 20;
                    pointer-events: none;
                }
                .home-logo-left-gradient.right {
                    left: auto; right: 0;
                    background: linear-gradient(to left, black, transparent);
                }

                /* ── Desktop: horizontal scroll row ── */
                .desktop-video-row {
                    display: none;
                }
                /* ── Mobile: 2+1 grid ── */
                .mobile-video-grid {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    width: 100%;
                    padding: 0 1rem 1.5rem 1rem;
                }

                @media (min-width: 768px) {
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
                    .mobile-video-grid {
                        display: none !important;
                    }
                }
            `}</style>

            {/* Background glow */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            {/* Heading + Videos */}
            <div className="relative z-10 w-full mb-10" style={{ flex: "0 0 45%" }}>
                <div className="flex flex-col items-center text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-black mb-12"
                    >
                        Our Feedback
                    </motion.h2>

                    {/* ── DESKTOP: all 3 videos side by side, horizontal scroll ── */}
                    <div className="desktop-video-row">
                        {VIDEO_DATA.map((video, index) => (
                            <motion.div
                                key={`desktop-${video.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}

                                transition={{ delay: index * 0.1 }}
                                style={{
                                    flexShrink: 0,
                                    width: "420px",
                                    aspectRatio: "3/2",
                                    position: "relative",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        height: "90%",
                                        width: "100%",
                                        backgroundColor: "black",
                                        borderRadius: "1.5rem",
                                        overflow: "hidden",
                                        border: "6px solid #0e1201ff",
                                    }}
                                >
                                    <iframe
                                        style={{ width: "100%", height: "100%" }}
                                        src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`}
                                        title={video.title}
                                        allowFullScreen
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ── MOBILE: 2 on top row + 1 centered below ── */}
                    <div className="mobile-video-grid">

                        {/* Row 1: first 2 videos */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", width: "100%" }}>
                            {VIDEO_DATA.slice(0, 2).map((video, index) => (
                                <motion.div
                                    key={`mob-top-${video.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{ position: "relative", aspectRatio: "3/2", width: "100%" }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            height: "100%",
                                            width: "100%",
                                            backgroundColor: "black",
                                            borderRadius: "1rem",
                                            overflow: "hidden",
                                            border: "4px solid #0a0a0a",
                                        }}
                                    >
                                        <iframe
                                            style={{ width: "100%", height: "100%" }}
                                            src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`}
                                            title={video.title}
                                            allowFullScreen
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Row 2: 3rd video centered at 70% width */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            style={{ position: "relative", aspectRatio: "3/2", width: "70%" }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    height: "100%",
                                    width: "100%",
                                    backgroundColor: "black",
                                    borderRadius: "1rem",
                                    overflow: "hidden",
                                    border: "4px solid #0a0a0a",
                                }}
                            >
                                <iframe
                                    style={{ width: "100%", height: "100%" }}
                                    src={`https://www.youtube.com/embed/${VIDEO_DATA[2].youtubeId}?modestbranding=1&rel=0`}
                                    title={VIDEO_DATA[2].title}
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* ── INFINITE LOGO SCROLLER ── */}
            <div className="relative z-10 w-full mt-[5vh] bg-black py-12">
                <div className="px-[5vw] mb-8">
                    <h3 className="text-white/30 text-4xl md:text-6xl font-bold tracking-tighter uppercase italic">
                        WE WORKED WITH
                    </h3>
                </div>

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
                    <div className="home-logo-left-gradient" />
                    <div className="home-logo-left-gradient right" />
                </div>
            </div>
        </section>
    );
};

export default Clients;