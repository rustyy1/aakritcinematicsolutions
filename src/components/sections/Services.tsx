import { motion } from 'framer-motion';
import { Camera, Clapperboard, MonitorPlay, Mic2 } from 'lucide-react';
import clsx from 'clsx';

interface ServicesProps {
    id?: string;
    className?: string;
}

const Services = ({ id = "services", className }: ServicesProps) => {
    const services = [
        {
            icon: <Clapperboard className="w-8 h-8" />,
            title: "Film Production",
            description: "End-to-end production for commercials, documentaries, and branded content with cinema-grade quality."
        },
        {
            icon: <Camera className="w-8 h-8" />,
            title: "Photography",
            description: "High-end product, fashion, and editorial photography that captures the essence of your brand."
        },
        {
            icon: <MonitorPlay className="w-8 h-8" />,
            title: "Post-Production",
            description: "Advanced editing, color grading, and VFX to polish your visual narrative to perfection."
        },
        {
            icon: <Mic2 className="w-8 h-8" />,
            title: "Sound Design",
            description: "Immersive audio engineering and custom soundscapes that elevate the visual experience."
        }
    ];

    return (
        <section
            id={id}
            className={clsx(
                "h-[100dvh] w-screen flex items-center justify-center bg-background flex-shrink-0 relative overflow-hidden py-20 lg:py-0",
                className
            )}
        >
            <div className="max-w-7xl px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-accent text-xs uppercase tracking-[0.3em] font-mono mb-4 block">Our Expertise</span>
                    <h2 className="text-display-md font-display font-bold text-text mb-6">
                        Comprehensive<br />
                        <span className="text-accent">Solutions</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-primary/50 backdrop-blur-sm border border-white/10 p-8 hover:border-accent/50 transition-colors duration-300 group"
                        >
                            <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-text mb-4">{service.title}</h3>
                            <p className="text-muted text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
