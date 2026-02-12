import { motion } from "framer-motion";
import clsx from "clsx";

interface ClientsProps {
    id?: string;
    className?: string;
}

const VIDEO_DATA = [
    { id: 1, youtubeId: "HykInVYwRiA", title: "Client_feedback_01" },
    { id: 2, youtubeId: "SeNeIppmQlM", title: "Client_feedback_02" },
    { id: 3, youtubeId: "HykInVYwRiA", title: "Client_feedback_03" },
];

const LOGO_DATA = [
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1703591283/cvent_24b078703c.png", alt: "Cvent" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1703590779/JSW_logo_770f0648f3.png", alt: "JSW Cement" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1701938100/Raymond_logo_7462355f71.png", alt: "Raymond" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1742214497/airtel_84b315ed5d.png", alt: "Airtel" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1703591971/polycab_df9ce7878a.png", alt: "Polycab" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1703593791/sbi_life_3739c22a6a.png", alt: "SBI Life Insurance" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1703593988/AM_NS_473d3019c5.png", alt: "AM/NS" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1742214585/boat_1585425796.png", alt: "Boat" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1703668393/jsw_paints_cb5c2ba731.png", alt: "JSW Paints" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1703669032/npci_94e7e6619b.png", alt: "NPCI" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1703669409/wadhwa_0725f2732b.png", alt: "Wadhwa" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1703762844/yes_bank_c97db56e4e.png", alt: "Yes Bank" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1704197828/tvs_e237d69019.png", alt: "TVS" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1704279240/fi_a094e228f7.png", alt: "Fi" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1704280017/hdfc_ergo_a1137f9a16.png", alt: "HDFC Ergo" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1704279476/pbazzar_92506c7743.png", alt: "Policy Bazaar" },
    { src: "https://res.cloudinary.com/dccjqha6a/image/upload/v1705044251/tata_metalicks_dd3814a083.png", alt: "TATA Metalicks" },
];

const Clients = ({ id = "clients", className }: ClientsProps) => {
    return (
        <section
            id={id}
            className={clsx(
                "min-h-[100dvh] w-screen flex flex-col items-center bg-primary flex-shrink-0 relative overflow-hidden pt-[4vh]",
                className
            )}
        >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.8),transparent_70%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            <div className="relative z-10 w-full mb-10">
                <div className="flex flex-col items-center justify-start text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-black mb-12"
                    >
                        Our Feedback
                    </motion.h2>

                    {/* Feedback Videos */}
                    <div className="flex flex-row flex-nowrap items-center gap-12 w-full overflow-x-auto px-[5vw] pb-20 no-scrollbar">
                        {VIDEO_DATA.map((video, index) => (
                            <motion.div
                                key={`${video.id}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -30 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative aspect-[3/2] w-[320px] md:w-[420px] lg:w-[480px] flex-shrink-0 mx-auto"
                            >
                                <div
                                    className="relative h-full w-full bg-black rounded-3xl overflow-hidden border-[6px]"
                                    style={{ borderColor: '#0a0a0aff' }}
                                >
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`}
                                        title={video.title}
                                        allowFullScreen
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- INFINITE LOGO SCROLLER --- */}
            {/* --- INFINITE LOGO SCROLLER --- */}
            {/* CHANGE: I updated 'mt-20' to 'mt-40' and 'md:mt-32' to 'md:mt-80'. 
    This creates a much larger gap below the video frames.
*/}
            <div className="relative z-10 w-full mt-40 md:mt-80 bg-black py-10">

                {/* CHANGE: I added 'pt-10' to ensure the "WE WORKED WITH" text 
        starts lower inside the black bar.
    */}
                <div className="px-[5vw] pt-10 mb-8">
                    <h3 className="text-white/30 text-4xl md:text-6xl font-bold tracking-tighter uppercase italic">
                        WE WORKED WITH
                    </h3>
                </div>

                <div className="flex overflow-hidden relative">
                    {/* Gradient Fades */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20" />

                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 25,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="flex flex-row whitespace-nowrap items-center"
                    >
                        {[...LOGO_DATA, ...LOGO_DATA].map((logo, index) => (
                            <div
                                key={index}
                                // 'h-[80px]' keeps the logo bar slim and professional
                                className="flex justify-center items-center h-[80px] min-w-[120px] md:min-w-[150px] px-4"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity brightness-0 invert"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Clients;