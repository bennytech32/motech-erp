"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  PlayCircle, Search, ArrowLeft, Clock, Play, X, 
  Award, MonitorPlay, Wrench, ShieldCheck, Loader2
} from 'lucide-react';

export default function AcademyPage() {
  // ==========================================
  // 1. DATA FETCHING STATES (Real Database Connection)
  // ==========================================
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ==========================================
  // 2. FILTERING & VIEW STATES
  // ==========================================
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingVideo, setPlayingVideo] = useState<any | null>(null);

  // ==========================================
  // 3. INITIALIZATION (Fetch Real Data)
  // ==========================================
  useEffect(() => {
    const fetchAcademyVideos = async () => {
      setIsLoading(true);
      try {
        // HAPA NDIPO INAPOVUTA VIDEO KUTOKA KWENYE NEON DATABASE YAKO
        // Mfano: const res = await fetch('/api/academy');
        // const json = await res.json();
        // if(json.success) setVideos(json.data);

        // Kwa sasa tunaiacha tupu (Clean State) ikisubiri Admin aingize data
        setVideos([]);
      } catch (error) {
        console.error("Failed to load academy videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAcademyVideos();
  }, []);

  // ==========================================
  // 4. DYNAMIC FILTERS KUTOKA KWENYE DATA HALISI
  // ==========================================
  // Inajenga Categories kulingana na video zilizopo kwenye Database
  const categories = ["All", ...Array.from(new Set(videos.map(v => v.category)))];

  // FILTER LOGIC
  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || video.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, videos]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      
      {/* 1. HEADER */}
      <nav className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <MonitorPlay size={20} />
            </div>
            <span className="font-extrabold text-slate-900">MoTech-i Academy</span>
          </div>
        </div>
      </nav>

      {/* 2. VIDEO PLAYER MODAL (Popup) */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  {playingVideo.category}
                </span>
                <span className="text-slate-400 text-sm font-medium">{playingVideo.views || '0 views'}</span>
              </div>
              <button 
                onClick={() => setPlayingVideo(null)} 
                className="bg-slate-800 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Container (16:9 Aspect Ratio) */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {/* Iframe ya YouTube/Vimeo itakaa hapa ikitoka kwenye DB */}
              {playingVideo.videoUrl ? (
                <iframe 
                  src={playingVideo.videoUrl} 
                  className="w-full h-full" 
                  allowFullScreen 
                  title={playingVideo.title}
                ></iframe>
              ) : (
                <>
                  <img src={playingVideo.thumbnail} alt="Video Cover" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-blue-600/50">
                      <Play size={32} fill="white" className="text-white ml-2" />
                    </div>
                    <p className="text-white font-bold tracking-widest uppercase text-sm">Video Unavailable</p>
                  </div>
                </>
              )}
            </div>

            {/* Video Details */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">{playingVideo.title}</h2>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                {playingVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. HERO SECTION */}
      <section className="bg-slate-950 py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full mb-6 text-sm font-bold border border-blue-400/20 backdrop-blur-sm">
            <Award size={16} /> Premium Automotive Media
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Master Your <span className="text-blue-500">Vehicle.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            In-depth car reviews, expert diagnostics, and technical masterclasses designed to make you a smarter car owner.
          </p>
        </div>
      </section>

      {/* 4. SMART FILTER & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
        <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-96">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reviews or tutorials..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition font-medium text-sm text-slate-800"
            />
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. VIDEO GRID & LOADING STATE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        {isLoading ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200 flex flex-col items-center">
            <Loader2 size={48} className="animate-spin text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-900">Syncing with Media Server...</h3>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200 px-4">
            <MonitorPlay size={64} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No videos available</h3>
            <p className="text-slate-500 mb-6">The academy library is currently empty or no videos match your search.</p>
            {(searchQuery !== "" || activeCategory !== "All") && (
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
                className="bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-100 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div 
                key={video.id} 
                className="group cursor-pointer flex flex-col"
                onClick={() => setPlayingVideo(video)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all border border-slate-200 bg-slate-100 flex items-center justify-center">
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <PlayCircle size={48} className="text-slate-300" />
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-50">
                    <div className="w-16 h-16 bg-blue-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30">
                      <Play fill="white" className="text-white ml-1" size={28} />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded border border-white/10 flex items-center gap-1.5">
                      <Clock size={12} className="text-white" />
                      <span className="text-white text-[10px] font-bold tracking-wider">{video.duration}</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="px-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
                      {video.category || 'General'}
                    </span>
                    <span className="text-slate-400 text-xs font-semibold">{video.views || 'New'}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. CALL TO ACTION */}
        <div className="mt-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-600/20 border border-blue-500 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Wrench size={150} className="text-white transform rotate-12" />
          </div>
          
          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full mb-4 text-xs font-bold border border-white/30 backdrop-blur-md">
              <ShieldCheck size={14} /> Professional Maintenance
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">Need expert hands on your car?</h2>
            <p className="text-blue-100 font-medium text-lg max-w-xl">
              Watching videos is great, but some things are best left to professionals. Book a service session with our master technicians today.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <Link href="/book" className="w-full md:w-auto bg-white text-blue-700 px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all flex justify-center items-center gap-2 shadow-xl hover:-translate-y-1">
              <Wrench size={20} /> Book a Mechanic
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-8 text-center text-slate-500 border-t border-slate-800">
        <p className="text-sm font-medium">&copy; {new Date().getFullYear()} MoTech-i Academy & Automotive Reviews.</p>
      </footer>

    </div>
  );
}