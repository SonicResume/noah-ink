// src/react-app/blog/[slug]/page.tsx
"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Bookmark, 
  Check, 
  ThumbsUp, 
  MessageSquare,
  Rocket,
  Flame,
  PartyPopper,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { MOCK_ARTICLE } from "./data";

export default function BlogPostPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [likes, setLikes] = useState(7294); 
  const [hasLiked, setHasLiked] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div 
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F5F3FF 0%, #FDF2F8 50%, #EEF2FF 100%)",
        color: "#1E1B4B",
        paddingBottom: "100px",
        overflowX: "hidden",
        position: "relative"
      }}
      className="antialiased"
    >
      {/* Ambient neon blur layers */}
      <div style={{ position: "absolute", top: "5%", left: "-10%", width: "350px", height: "350px", background: "rgba(168, 85, 247, 0.25)", borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "35%", right: "-5%", width: "400px", height: "400px", background: "rgba(236, 72, 153, 0.2)", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none" }} />
      
      {/* Home return button navigation link */}
      <div className="max-w-3xl mx-auto px-4 pt-8 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-950 transition-all hover:-translate-x-1"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      {/* MAIN VESSEL */}
      <main className="max-w-3xl mx-auto px-4 py-8 relative z-10">
        
        {/* Bright white floating container section */}
        <div className="bg-white border-2 border-purple-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-purple-100/40 relative overflow-hidden">
          
          {/* ARTICLE HEADER */}
          <header className="space-y-6 mb-8 border-b-2 border-purple-50 pb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 font-black text-xs uppercase tracking-wider rounded-full shadow-sm">
              <Rocket size={12} className="text-pink-500" /> {MOCK_ARTICLE.category}
            </span>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {MOCK_ARTICLE.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-pink-400 pl-4 bg-purple-50/30 py-2 rounded-r-xl">
              "{MOCK_ARTICLE.excerpt}"
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-purple-700/80 pt-2 w-full">
              <div className="flex items-center gap-1.5"><User size={14} className="text-purple-400" /><span>{MOCK_ARTICLE.author}</span></div>
              <div className="flex items-center gap-1.5"><Calendar size={14} className="text-purple-400" /><span>{MOCK_ARTICLE.date}</span></div>
              <div className="flex items-center gap-1.5"><Clock size={14} className="text-purple-400" /><span>{MOCK_ARTICLE.readTime}</span></div>
            </div>
          </header>

          {/* HERO IMAGE CONTAINER */}
          <div className="w-full h-64 md:h-80 relative rounded-2xl overflow-hidden mb-10 border-2 border-purple-100 shadow-md bg-gradient-to-br from-purple-500 via-pink-400 to-indigo-500 flex flex-col items-center justify-center text-white p-6 text-center group">
            <img 
              src="/assets/og-image.png" 
              alt="Workspace backdrop blueprint"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] z-10"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div className="relative z-0 flex flex-col items-center gap-3">
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                <Flame size={32} className="text-white animate-bounce" />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase drop-shadow-sm">Workspace Active ⚡</h3>
            </div>
          </div>

          {/* CONTENT BODY */}
          <article className="space-y-6 text-slate-700 text-[16px] md:text-[17.5px] leading-relaxed font-medium">
            {MOCK_ARTICLE.content && MOCK_ARTICLE.content.map((block: any, index: number) => {
              if (block.type === "heading") {
                return (
                  <h2 key={index} className="text-xl md:text-2xl font-black text-slate-900 tracking-tight pt-4 mt-8 mb-2 flex items-center gap-2">
                    <PartyPopper size={20} className="text-pink-500" />
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "spec_list" && block.items) {
                return (
                  <ul key={index} className="space-y-2.5 pl-2 border-l-2 border-purple-200">
                    {block.items.map((item: any, i: number) => (
                      <li key={i} className="text-sm font-semibold text-slate-700 bg-purple-50/50 p-4 rounded-xl border border-purple-100 shadow-sm">{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "app_cta") {
                return (
                  <div key={index} className="my-8 text-center sm:text-left">
                    {/* 🚀 SIGN IN ROUTE: Pointed directly to your /login gate wrapper */}
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-sm rounded-2xl transition-all shadow-md shadow-purple-200/50 hover:shadow-xl hover:scale-[1.02] group uppercase tracking-wider"
                    >
                      {block.ctaText}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                );
              }
              return (
                <p key={index} className="whitespace-pre-wrap" style={{ margin: "16px 0" }}>
                  {block.text}
                </p>
              );
            })}
          </article>

          {/* FOOTER ACTIONS */}
          <footer className="mt-12 pt-6 border-t-2 border-purple-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={handleLike} type="button" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border shadow-sm bg-white border-purple-200 text-purple-800 hover:border-purple-400 hover:bg-purple-50/50">
                <ThumbsUp size={14} className={hasLiked ? "animate-bounce" : ""} />
                <span>{likes} Units</span>
              </button>
              <button type="button" className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-purple-200 text-purple-800 hover:border-purple-400 rounded-2xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm">
                <MessageSquare size={14} className="text-purple-400" />
                <span>Comment</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={handleShare} type="button" className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-purple-200 text-purple-800 hover:border-purple-400 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm active:scale-95">
                {isCopied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} className="text-purple-500" />}
                <span>{isCopied ? "Teleported!" : "Share"}</span>
              </button>
              <button onClick={() => setIsBookmarked(!isBookmarked)} type="button" className={`p-3 rounded-2xl border transition-all shadow-sm ${isBookmarked ? "bg-purple-100 border-purple-300 text-purple-700" : "bg-white border-purple-200 text-purple-400 hover:border-purple-400"}`}>
                <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
              </button>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}
