import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

interface ProjectsProps {
    id?: string;
    className?: string;
}

const Projects = ({ id = "projects", className }: ProjectsProps) => {
    const projects = [
        {
            id: 1,
            title: "Apex Dynamics",
            category: "Brand Film",
            year: "2024",
            color: "from-emerald-500/20 to-teal-600/20"
        },
        {
            id: 2,
            title: "Nebula Protocol",
            category: "Commercial",
            year: "2024",
            color: "from-violet-500/20 to-purple-600/20"
        },
        {
            id: 3,
            title: "Vertex Labs",
            category: "Documentary",
            year: "2023",
            color: "from-blue-500/20 to-cyan-600/20"
        },
        {
            id: 4,
            title: "Meridian Rise",
            category: "Music Video",
            year: "2023",
            color: "from-amber-500/20 to-orange-600/20"
        },
    ];

    return (
        <section
            id={id}
            className={clsx(
                "h-[100dvh] w-screen flex items-center justify-center bg-secondary flex-shrink-0 relative overflow-hidden py-20 lg:py-0",
                className
            )}
        >
            <div className="w-full max-w-7xl px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <span className="text-accent text-xs uppercase tracking-[0.3em] font-mono mb-6 block">Selected Work</span>
                    <h2 className="text-display-md font-display font-bold text-text leading-tight">
                        Recent<br />
                        <span className="text-accent">Projects</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group relative h-[400px] overflow-hidden cursor-pointer rounded-xl"
                        >
                            {/* Glassmorphism Container */}
                            <div className="absolute inset-0 bg-surface/50 backdrop-blur-sm border border-white/5 transition-all duration-500 group-hover:border-accent/50 group-hover:bg-surface/80 z-0" />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0`} />

                            {/* Content */}
                            <div className="relative z-10 h-full p-8 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-xs uppercase tracking-[0.2em] font-mono backdrop-blur-md">
                                        {project.category}
                                    </span>
                                    <span className="text-muted text-xs font-mono">{project.year}</span>
                                </div>

                                <div>
                                    <h3 className="text-3xl md:text-4xl font-display font-bold text-text mb-4 group-hover:text-accent transition-colors duration-300 drop-shadow-lg">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-muted group-hover:text-text transition-colors duration-300">
                                        <span className="text-sm uppercase tracking-wider font-medium">View Case Study</span>
                                        <div className="p-1 rounded-full bg-white/5 group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                                            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute -inset-px bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
