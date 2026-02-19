import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

function Portfolio({
    id = "portfolio", className
}: { id?: string; className?: string; }) {
    const [videos, setVideos] = useState<any[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const { data, error } = await supabase.from('portfolio').select('*').limit(6);
            if (error) console.error('Error fetching portfolio:', error);
            if (data) {
                console.log('Portfolio videos:', data);
                setVideos(data);
            }
        };
        fetchVideos();
    }, []);

    const getYoutubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <section
            id={id}
            className={clsx("min-h-[100dvh] lg:h-[100dvh] w-full lg:w-screen flex items-center bg-background flex-shrink-0 relative py-20 lg:py-0", className)}
            style={{ position: 'relative' }}
        >
            <div className="max-w-[800px] w-full h-full mx-auto px-8 flex flex-row gap-8 items-center justify-center">

                {/* PORTFOLIO GRID - CENTERED */}
                <div className="w-full h-full flex flex-col justify-center pt-8 font-sans overflow-visible items-center">
                    <div
                        className="mb-[40px] flex flex-col items-center justify-center flex-shrink-0"
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text uppercase tracking-[0.2em] text-center mb-2">
                            OUR PORTFOLIO
                        </h2>
                    </div>
                    <div className="relative w-full mx-auto px-4 md:px-8">
                        {(!videos || videos.length === 0) ? (
                            <div className="text-center text-white/50 py-10">
                                <p>Loading videos...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-6 auto-rows-[150px]">
                                {videos.map((video, index) => {
                                    if (!video) return null;

                                    // Use the specific schema column 'youtube_url' first, fallbacks for safety
                                    const videoInitial = String(video.youtube_url || video.link || video.url || video.video_link || video.video_url || "");
                                    const videoId = getYoutubeId(videoInitial);

                                    // BENTO GRID LAYOUT LOGIC
                                    // [0] Big Box (Top Left)      [1] Small (Top Right)
                                    //                             [2] Small (Mid Right)
                                    // [3] Small (Bottom Left)     [5] Big Box (Bottom Right)
                                    // [4] Small (Bottom Left)

                                    let gridClass = "col-span-1 row-span-1"; // Default: Small 1x1

                                    if (index === 0) {
                                        gridClass = "col-span-2 row-span-2"; // 2x2 Top Left
                                    } else if (index === 1) {
                                        gridClass = "col-start-3 row-start-1"; // Top Right
                                    } else if (index === 2) {
                                        gridClass = "col-start-3 row-start-2"; // Mid Right
                                    } else if (index === 3) {
                                        gridClass = "col-start-1 row-start-3"; // Bottom Left
                                    } else if (index === 4) {
                                        gridClass = "col-start-1 row-start-4"; // Bottom Left
                                    } else if (index === 5) {
                                        gridClass = "col-span-2 row-span-2 col-start-2 row-start-3"; // 2x2 Bottom Right
                                    }

                                    if (!videoId) return null;

                                    return (
                                        <div
                                            key={video.id || index}
                                            className={clsx(
                                                "relative overflow-hidden rounded-2xl bg-black/20 border border-white/5",
                                                gridClass
                                            )}
                                        >
                                            <iframe
                                                src={`https://www.youtube.com/embed/${videoId}`}
                                                title={video.Title || `Portfolio Video ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Portfolio;
