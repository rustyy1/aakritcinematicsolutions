import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import clsx from 'clsx';

interface GalleryProps {
    id?: string;
    className?: string;
}

const Gallery = ({ id = "gallery", className }: GalleryProps) => {
    // Placeholder images - using simple colored blocks or gradient placeholders if real images aren't available
    const images = [
        { title: "Cinematic 1", color: "bg-red-500/20" },
        { title: "Cinematic 2", color: "bg-blue-500/20" },
        { title: "Cinematic 3", color: "bg-green-500/20" },
        { title: "Cinematic 4", color: "bg-purple-500/20" },
        { title: "Cinematic 5", color: "bg-yellow-500/20" },
        { title: "Cinematic 6", color: "bg-pink-500/20" },
    ];

    return (
        <section
            id={id}
            className={clsx(
                "h-[100dvh] w-screen flex items-center justify-center bg-primary flex-shrink-0 relative overflow-hidden py-20 lg:py-0",
                className
            )}
        >
            <div className="max-w-7xl px-8 w-full h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <span className="text-accent text-xs uppercase tracking-[0.3em] font-mono mb-4 block">Visual Diary</span>
                    <h2 className="text-display-md font-display font-bold text-text">
                        Behind The<br />
                        <span className="text-accent">Scenes</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[50vh]">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={clsx(
                                "rounded-lg border border-white/5 relative group overflow-hidden cursor-pointer",
                                img.color
                            )}
                        >
                            <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                <ImageIcon className="w-8 h-8 text-white/50" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-white text-sm font-medium">{img.title}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
