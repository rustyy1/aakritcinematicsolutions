import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

function Portfolio({
    id = "portfolio", className
}: { id?: string; className?: string; }) {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Check for environment variables
                const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
                const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

                if (!supabaseUrl || !supabaseKey) {
                    throw new Error("Missing Supabase environment variables! Check your .env file or build configuration.");
                }

                const { data, error } = await supabase.from('portfolio').select('*').limit(6);

                if (error) throw error;

                if (data) {
                    console.log('Portfolio videos:', data);
                    setVideos(data);
                }
            } catch (err: any) {
                console.error('Error fetching portfolio:', err);
                setError(err.message || 'Failed to load videos');
            } finally {
                setLoading(false);
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
            className={clsx("h-[100dvh] w-full lg:w-screen flex flex-col bg-background flex-shrink-0 relative", className)}
            style={{ paddingTop: '100px', paddingBottom: '130px' }}
        >
            {/* Hide scrollbar CSS */}
            <style>{`
                .portfolio-scroll::-webkit-scrollbar { display: none; }
                .portfolio-scroll { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* HEADING */}
            <div className="flex-shrink-0 text-center px-8" style={{ position: 'relative', zIndex: 10, marginBottom: '50px' }}>
                <h2
                    className="font-black text-text uppercase tracking-[0.2em] text-center"
                    style={{ fontSize: '3.5rem' }}
                >
                    OUR PORTFOLIO
                </h2>
                <div style={{ width: '960px', height: '4px', background: '#000000', margin: '2px auto 0', borderRadius: '2px' }} />
            </div>

            {/* SCROLLABLE VIDEO CONTAINER */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden portfolio-scroll mb-8" style={{ background: 'rgba(254, 168, 0, 0.85)', borderRadius: '32px', maxWidth: '96%', margin: '0 auto' }}>
                <div className="w-full mx-auto" style={{ padding: '40px' }}>
                    {loading ? (
                        <div className="text-center text-white/50 py-10">
                            <p>Loading portfolio...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-10">
                            <p className="font-bold">Error loading videos:</p>
                            <p>{error}</p>
                            <p className="text-sm mt-2 text-white/60">Check console for details.</p>
                        </div>
                    ) : (!videos || videos.length === 0) ? (
                        <div className="text-center text-white/50 py-10">
                            <p>No videos found in the portfolio.</p>
                        </div>
                    ) : (
                        <div
                            className="grid grid-cols-3 gap-[20px]"
                            style={{ gridAutoRows: 'calc((100vh - 520px) / 2)' }}
                        >
                            {videos.map((video, index) => {
                                if (!video) return null;

                                const videoInitial = String(video.youtube_url || video.link || video.url || video.video_link || video.video_url || "");
                                const videoId = getYoutubeId(videoInitial);

                                let gridClass = "col-span-1 row-span-1";

                                if (index === 0) {
                                    gridClass = "col-span-2 row-span-2"; // Big top-left
                                } else if (index === 1) {
                                    gridClass = "col-start-3 row-start-1"; // Small top-right
                                } else if (index === 2) {
                                    gridClass = "col-start-3 row-start-2"; // Small mid-right
                                } else if (index === 3) {
                                    gridClass = "col-start-1 row-start-3"; // Small bottom-left
                                } else if (index === 4) {
                                    gridClass = "col-start-1 row-start-4"; // Small bottom-left
                                } else if (index === 5) {
                                    gridClass = "col-span-2 row-span-2 col-start-2 row-start-3"; // Big bottom-right
                                }

                                if (!videoId) return null;

                                return (
                                    <div
                                        key={video.id || index}
                                        className={clsx(
                                            "relative overflow-hidden rounded-2xl bg-black/30 border border-white/10 p-2 transition-all duration-300 hover:shadow-[0_0_45px_rgba(255,255,0,0.8)] hover:border-yellow-400/60",
                                            gridClass
                                        )}
                                    >
                                        <div className="w-full h-full overflow-hidden rounded-xl">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${videoId}`}
                                                title={video.Title || `Portfolio Video ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
export default Portfolio;
