// src/react-app/pages/Contact.tsx

import { Mail, Facebook } from "lucide-react";

export default function ContactPage() {
  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #F5F3FF 0%, #FDF2F8 50%, #EEF2FF 100%)",
        overflowX: "hidden",
        position: "relative",
      }}
      className="flex items-center justify-center px-4 antialiased text-purple-950"
    >
      {/* Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "-10%",
          width: "350px",
          height: "350px",
          background: "rgba(168, 85, 247, 0.25)",
          borderRadius: "50%",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "35%",
          right: "-5%",
          width: "400px",
          height: "400px",
          background: "rgba(236, 72, 153, 0.2)",
          borderRadius: "50%",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <div className="w-full max-w-md rounded-[2.5rem] border border-purple-100 bg-white p-10 shadow-xl shadow-purple-100/40 relative overflow-hidden z-10">

        {/* Header */}
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-md border border-purple-200/30 mb-4 text-purple-600">
            <Mail size={24} />
          </div>

          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">
            Contact
          </h1>

          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1.5">
            Choose How To Reach Us
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">

          <a
            href="https://www.sonicresume.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-md shadow-purple-100 hover:opacity-95"
          >
            <Mail size={14} />
            Contact Business
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61585916721060"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 border border-purple-200 bg-white text-purple-700 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-sm hover:bg-purple-50"
          >
            <Facebook size={14} />
            Facebook Profile
          </a>

        </div>
      </div>
    </div>
  );
}