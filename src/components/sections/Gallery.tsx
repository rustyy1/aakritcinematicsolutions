
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface GalleryProps {
    id?: string;
    className?: string;
}

interface Video {
    id: number;
    youtube_url: string;
    [key: string]: unknown;
}

const Gallery = ({ id = "gallery", className }: GalleryProps) => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .limit(3);

            if (error) {
                console.error('Error fetching videos:', error);
            } else if (data) {
                console.log('Fetched gallery data:', data);
                setVideos(data);
            }
        };

        fetchVideos();
    }, []);

    const getYouTubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        const id = (match && match[2].length === 11) ? match[2] : null;
        return id;
    };

    // Video slot ordering
    const topVideo = videos.length > 1 ? videos[1] : null;
    const leftVideo = videos.length > 2 ? videos[2] : (videos.length > 0 ? videos[0] : null);
    const rightVideo = videos.length > 2 ? videos[0] : null;

    return (
        <section
            id={id}
            className={clsx(
                "h-screen w-screen flex flex-col bg-primary flex-shrink-0 relative overflow-hidden",
                className
            )}
        >
            <div className="w-full h-full max-w-7xl mx-auto px-8 flex flex-col pt-48 pb-12">
                {/* Title Section */}
                <div className="text-center shrink-0 mb-8">
                    <span className="text-secondary text-xs uppercase tracking-[0.3em] font-mono mb-3 block">Visual Diary</span>
                    <h2 className="text-display-md font-display font-bold text-text leading-tight">
                        Behind The <span className="text-text">Scenes</span>
                    </h2>
                </div>

                {/* Video Gallery Grid */}
                <div className="w-full max-w-[1200px] mx-auto flex-grow flex flex-col gap-[30px] items-center justify-center">

                    {/* First Slot - Top Center (520x310) */}
                    <div
                        className="w-[520px] h-[310px] shrink-0 max-[1023px]:w-[80%] max-[1023px]:h-auto max-[1023px]:aspect-[16/9] max-[1023px]:mt-1 max-[767px]:w-[90%] max-[767px]:mt-0 relative overflow-hidden rounded-[20px] border border-white/10 bg-black transition-transform duration-300 hover:-translate-y-0.5"
                    >
                        {topVideo?.youtube_url ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${getYouTubeId(topVideo.youtube_url)}?rel=0&modestbranding=1`}
                                title="Visual Diary Main"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full object-cover"
                            ></iframe>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-white/50 bg-neutral-900">
                                <span className="mb-2">Main Video Slot (Top)</span>
                                <span className="text-xs">Waiting for Content...</span>
                            </div>
                        )}
                    </div>

                    {/* Second and Third video cards - Side by Side (400x220) with 50px gap */}
                    <div className="flex flex-row justify-center gap-[50px] w-full max-[1023px]:gap-8 max-[1023px]:mt-[60px] max-[767px]:gap-4 max-[767px]:mt-[40px]">
                        {/* Second Slot - Left (400x220) */}
                        <div
                            className="w-[400px] h-[220px] shrink-0 max-[1023px]:w-[46%] max-[1023px]:h-auto max-[1023px]:aspect-[16/9] max-[767px]:w-[42%] relative overflow-hidden rounded-[20px] border border-white/10 bg-black transition-transform duration-300 hover:-translate-y-0.5"
                        >
                            {leftVideo?.youtube_url ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${getYouTubeId(leftVideo.youtube_url)}?rel=0&modestbranding=1`}
                                    title="Visual Diary Left"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full object-cover"
                                ></iframe>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-white/50 bg-neutral-900">
                                    <span className="mb-2">Left Slot</span>
                                    <span className="text-xs">Add video to Supabase</span>
                                </div>
                            )}
                        </div>

                        {/* Third Slot - Right (400x220) */}
                        <div
                            className="w-[400px] h-[220px] shrink-0 max-[1023px]:w-[46%] max-[1023px]:h-auto max-[1023px]:aspect-[16/9] max-[767px]:w-[42%] relative overflow-hidden rounded-[20px] border border-white/10 bg-black transition-transform duration-300 hover:-translate-y-0.5"
                        >
                            {rightVideo?.youtube_url ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${getYouTubeId(rightVideo.youtube_url)}?rel=0&modestbranding=1`}
                                    title="Visual Diary Right"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full object-cover"
                                ></iframe>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-white/50 bg-neutral-900">
                                    <span className="mb-2">Right Slot</span>
                                    <span className="text-xs">Add video to Supabase</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;

