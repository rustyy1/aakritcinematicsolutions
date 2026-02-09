import { motion } from "framer-motion";

const AboutHeader = () => {
    return (
        <motion.div
            className="flex flex-col items-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h1
                className="text-5xl sm:text-6xl md:text-8xl font-black tracking-widest text-[#1a1a1a] drop-shadow-2xl text-center select-none uppercase"
                style={{ fontFamily: "'Special Gothic Expanded One', sans-serif" }}
            >
                About Us
            </h1>
        </motion.div>
    );
};

export default AboutHeader;
