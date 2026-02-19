import { useState } from 'react';
import { Film, Box, MonitorPlay, Building2, Camera, Video, FileVideo, Scissors, Pencil } from 'lucide-react';
import clsx from 'clsx';
import Folder from '../ui/Folder';
import mascot from '../../assets/images/mascot.png';

interface ServicesProps {
    id?: string;
    className?: string;
}

const Services = ({ id = "services", className }: ServicesProps) => {
    const [openFolderIndex, setOpenFolderIndex] = useState<number | null>(null);

    const handleFolderToggle = (index: number) => {
        setOpenFolderIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const productionServices = [
        {
            icon: <Video className="w-8 h-8" />,
            title: "Product Packshot",
            description: ""
        },
        {
            icon: <Camera className="w-8 h-8" />,
            title: <>Digital &<br />Corporate Films</>,
            description: ""
        },
        {
            icon: <Scissors className="w-8 h-8" />,
            title: "Editing",
            description: ""
        },
    ];

    const postProductionServices = [
        {
            icon: <MonitorPlay className="w-8 h-8" />,
            title: "VFX",
            description: ""
        },
        {
            icon: <Film className="w-8 h-8" />,
            title: <>Animation<br />(2D & 3D)</>,
            description: ""
        },
        {
            icon: <FileVideo className="w-8 h-8" />, // Moved from Production
            title: "Architectural Walkthrough",
            description: ""
        },
        {
            icon: <Box className="w-8 h-8" />,
            title: "3D Modelling",
            description: ""
        }
    ];

    const designServices = [
        {
            icon: <Box className="w-8 h-8" />,
            title: "Pre-Visualisation",
            description: ""
        },
        {
            icon: <Building2 className="w-8 h-8" />,
            title: "Layout Animation",
            description: ""
        },
        {
            icon: <Pencil className="w-8 h-8" />,
            title: <>Story Boarding &<br />Concept Art</>,
            description: ""
        }
    ];

    return (
        <section
            id={id}
            className={clsx(
                "h-[100dvh] w-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 flex-shrink-0 relative py-20 lg:py-0",
                className
            )}
        >
            <div className="max-w-7xl px-8 w-full">


                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start py-10 w-full relative z-10 px-4 space-y-32 lg:space-y-0 lg:space-x-12">

                    {/* Folder 1: Production */}
                    <div className="relative flex flex-col items-center" style={{ zIndex: openFolderIndex === 0 ? 50 : 1 }}>
                        <Folder
                            size={openFolderIndex === null ? 2 : openFolderIndex === 0 ? 2.3 : 1.5}
                            color="#8b5cf6" // Purple
                            className="z-10"
                            isOpen={openFolderIndex === 0}
                            onToggle={() => handleFolderToggle(0)}
                            maxItems={3}
                            spreadDirection="center"
                            items={productionServices.slice(0, 3).map((service, index) => (
                                <div key={index} className="flex flex-col items-center justify-center h-full w-full p-6 text-center bg-white rounded-[10px] card-shadow relative overflow-hidden">
                                    {/* Mascot Placeholder - User to replace src with local asset */}
                                    <img src={mascot} alt="Mascot" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 object-contain opacity-10 pointer-events-none select-none" />
                                    <h4 className="font-bold text-xs text-black mb-1 font-retroica relative z-10">{service.title}</h4>
                                    {service.description && (
                                        <p className="text-[8px] leading-tight text-gray-600 line-clamp-3">
                                            {service.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        />

                    </div>

                    {/* Folder 2: Post-Production */}
                    <div className="relative flex flex-col items-center" style={{ zIndex: openFolderIndex === 1 ? 50 : 1 }}>
                        <Folder
                            size={openFolderIndex === null ? 2 : openFolderIndex === 1 ? 2.3 : 1.5}
                            color="#8b5cf6" // Purple
                            className="z-10"
                            isOpen={openFolderIndex === 1}
                            onToggle={() => handleFolderToggle(1)}
                            maxItems={4}
                            spreadDirection="center"
                            items={postProductionServices.slice(0, 4).map((service, index) => (
                                <div key={index} className="flex flex-col items-center justify-center h-full w-full p-6 text-center bg-white rounded-[10px] card-shadow relative overflow-hidden">
                                    {/* Mascot Placeholder */}
                                    <img src={mascot} alt="Mascot" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 object-contain opacity-10 pointer-events-none select-none" />
                                    <h4 className="font-bold text-xs text-black mb-1 font-retroica relative z-10">{service.title}</h4>
                                    {service.description && (
                                        <p className="text-[8px] leading-tight text-gray-600 line-clamp-3">
                                            {service.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        />

                    </div>

                    {/* Folder 3: 3D & Architecture */}
                    <div className="relative flex flex-col items-center" style={{ zIndex: openFolderIndex === 2 ? 50 : 1 }}>
                        <Folder
                            size={openFolderIndex === null ? 2 : openFolderIndex === 2 ? 2.3 : 1.5}
                            color="#8b5cf6" // Purple
                            className="z-10"
                            isOpen={openFolderIndex === 2}
                            onToggle={() => handleFolderToggle(2)}
                            maxItems={3}
                            spreadDirection="center"
                            items={designServices.slice(0, 3).map((service, index) => (
                                <div key={index} className="flex flex-col items-center justify-center h-full w-full p-6 text-center bg-white rounded-[10px] card-shadow relative overflow-hidden">
                                    {/* Mascot Placeholder */}
                                    <img src={mascot} alt="Mascot" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 object-contain opacity-10 pointer-events-none select-none" />
                                    <h4 className="font-bold text-xs text-black mb-1 font-retroica relative z-10">{service.title}</h4>
                                    {service.description && (
                                        <p className="text-[8px] leading-tight text-gray-600 line-clamp-3">
                                            {service.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
