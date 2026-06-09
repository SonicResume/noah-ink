// src/react-app/pages/Contact.tsx
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Mail, Loader2, ArrowLeft, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await fetch("https://my-backend-a42n.onrender.com/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      setSuccess("Message sent successfully ✅");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        minHeight: "100vh",
        // 🌊 EXACT LANDING PAGE BACKGROUND MATRICES
        background: "linear-gradient(135deg, #F5F3FF 0%, #FDF2F8 50%, #EEF2FF 100%)",
        overflowX: "hidden",
        position: "relative"
      }}
      className="flex items-center justify-center px-4 antialiased text-purple-950"
    >
      {/* EXACT LANDING PAGE AMBIENT BLUR GLOW LAYERS */}
      <div style={{ position: "absolute", top: "5%", left: "-10%", width: "350px", height: "350px", background: "rgba(168, 85, 247, 0.25)", borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "35%", right: "-5%", width: "400px", height: "400px", background: "rgba(236, 72, 153, 0.2)", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none" }} />
      
      {/* 🛡️ CONTACT CARD FRAME */}
      <div className="w-full max-w-md rounded-[2.5rem] border border-purple-100 bg-white p-10 shadow-xl shadow-purple-100/40 relative overflow-hidden z-10">

        {/* HEADER BRANDING */}
        <div className="mb-8 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-md border border-purple-200/30 mb-4 text-purple-600">
            <Mail size={24} />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">
            Noah <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Ink</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1.5">
            Communication Hub
          </p>
        </div>

        <h2 className="text-xl font-extrabold text-center text-slate-900 mb-6 tracking-tight">
          Contact Us
        </h2>

        {/* 📥 FORM PROCESSING CONTAINER */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="YOUR NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-2xl border border-purple-100 bg-slate-50/50 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-600/5 focus:border-purple-500 transition-all shadow-inner"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl border border-purple-100 bg-slate-50/50 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-600/5 focus:border-purple-500 transition-all shadow-inner"
            />
          </div>

          <div>
            <textarea
              placeholder="YOUR MESSAGE..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 rounded-2xl border border-purple-100 bg-slate-50/50 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-600/5 focus:border-purple-500 h-32 resize-none transition-all shadow-inner custom-scrollbar"
            />
          </div>

          {/* DYNAMIC FEEDBACK NOTIFICATION */}
          {success && (
            <p className="text-emerald-600 text-[10px] font-black uppercase bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl text-center tracking-widest animate-in fade-in duration-200">
              {success}
            </p>
          )}

          {/* SYSTEM RUNTIME TRIGGER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-md shadow-purple-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={12} />
                Send Message
              </>
            )}
          </button>
        </form>

        {/* COMPLIANCE RETREAT BLOCK */}
        <div className="mt-8 pt-5 border-t border-slate-100 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-purple-600 transition-colors"
          >
            <ArrowLeft size={12} /> Back to home
          </Link>
        </div>

      </div>
    </div>
  );
}
