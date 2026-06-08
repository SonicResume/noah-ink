// src/react-app/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import { Rocket, Zap, Check, Flame, Sparkles, Heart } from "lucide-react";

// ==========================================
// 📊 PART 1: COMPACT DATA REGISTRY ARRAY
// ==========================================
const PLATFORM_VECTORS = [
  { title: "💼 Career Matrix", desc: "Format messy histories and cover letters into crisp text built to bypass automated screening filters.", icon: Rocket, accent: "#7C3AED", border: "#F3E8FF" },
  { title: "✉️ Email Protocol", desc: "Turn raw bullet concepts into clean, high-open professional pitch layouts or polite corporate escalations.", icon: Zap, accent: "#06B6D4", border: "#CFFAFE" },
  { title: "⚖️ Legal Scope", desc: "Draft crisp, objective contractual arguments, formal notices, and policy summaries stripped of emotional phrasing.", icon: Check, accent: "#EF4444", border: "#FEE2E2" },
  { title: "🛒 Product Block", desc: "Convert flat specifications into high-conversion digital landing pages, store assets, and high-impact ad copy hooks.", icon: Flame, accent: "#10B981", border: "#D1FAE5" },
  { title: "🏠 Property Frame", desc: "Translate generic dimensions into luxury real estate listings that convert browsing views into high-intent buyers.", icon: Sparkles, accent: "#F59E0B", border: "#FEF3C7" },
  { title: "📣 Social Vault", desc: "Produce scroll-stopping hook structures, multi-line list blocks, and targeted metadata platform hashtags instantly.", icon: Heart, accent: "#EC4899", border: "#FCE7F3" }
];

// ==========================================
// 🔮 PART 2: INTERACTIVE VISUAL INTERFACE
// ==========================================
export default function LandingPage() {
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
    >
      {/* Soft Ambient Visual Glow Background Layers */}
      <div style={{ position: "absolute", top: "5%", left: "-10%", width: "350px", height: "350px", background: "rgba(168, 85, 247, 0.25)", borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "35%", right: "-5%", width: "400px", height: "400px", background: "rgba(236, 72, 153, 0.2)", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none" }} />

      {/* 🚀 HERO CONTAINER HEADER */}
      <section style={{ textAlign: "center", padding: "140px 20px 60px 20px", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 20px",
          background: "#FFFFFF",
          color: "#7C3AED",
          borderRadius: "9999px",
          fontSize: "13px",
          fontWeight: "800",
          marginBottom: "32px",
          border: "2px solid #E9D5FF",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          boxShadow: "0 8px 20px -4px rgba(124, 58, 237, 0.12)"
        }}>
          <Sparkles size={14} /> Neural Text Engine Initialized
        </div>

        <h1 style={{ fontSize: "56px", fontWeight: "950", lineHeight: "1.05", letterSpacing: "-0.03em", color: "#0F172A", maxWidth: "850px", margin: "0 auto" }}>
          Fix Messy Text & Turn Rough Ideas Into{" "}
          <span style={{ background: "linear-gradient(90deg, #6D28D9 0%, #D946EF 50%, #FF4E88 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>
            Premium Copy
          </span>
        </h1>

        <p style={{ color: "#475569", marginTop: "28px", fontSize: "19px", fontWeight: "500", maxWidth: "680px", marginInline: "auto", lineHeight: "1.6" }}>
          Stop wrestling with blank screens. Rewrite, expand, and format content for resumes, emails, properties, and social channels instantly.
        </p>

        <p style={{ marginTop: "18px", color: "#94A3B8", fontSize: "12px", fontStyle: "italic", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          ⚡ Zero Signup • Zero Configuration Boundaries • Free Workspace
        </p>

        <div style={{ marginTop: "40px" }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button
              type="button"
              style={{
                padding: "18px 40px",
                background: "linear-gradient(135deg, #7C3AED 0%, #D946EF 100%)",
                color: "white",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "800",
                boxShadow: "0 12px 28px -4px rgba(217, 70, 239, 0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
            >
              Open Console Free ⚡
            </button>
          </Link>
        </div>
      </section>

      {/* 🔮 INTERACTIVE CARDS GRID */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 20px", position: "relative", zIndex: 10 }}>
        <h2 style={{ textAlign: "center", fontSize: "30px", fontWeight: "900", color: "#0F172A", letterSpacing: "-0.02em", marginBottom: "40px" }}>
          6 Dynamic Creation Engines. One Dashboard.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {PLATFORM_VECTORS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                style={{
                  padding: "36px 28px",
                  borderRadius: "24px",
                  background: "#FFFFFF",
                  border: `2px solid ${item.border}`,
                  boxShadow: "0 12px 30px -10px rgba(30, 27, 75, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative"
                }}
              >
                <div>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    background: `${item.accent}15`,
                    color: item.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px"
                  }}>
                    <IconComponent size={20} />
                  </div>

                  {/* 🚀 FIXED STYLE TYPO: LetterSpacing replaces tracking safely */}
                  <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  
                  <p style={{ color: "#475569", fontSize: "14.5px", fontWeight: "500", marginTop: "12px", lineHeight: "1.6" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 📋 PRODUCTION SEQUENCE FOOTER METRICS */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid #F3E8FF", borderBottom: "1px solid #F3E8FF", padding: "50px 20px", marginTop: "60px", textAlign: "center", position: "relative", zIndex: 10 }}>
        <h2 style={{ fontSize: "30px", fontWeight: "900", color: "#0F172A", letterSpacing: "-0.02em", marginBottom: "20px" }}>
          Production Sequence
        </h2>
        <p style={{ color: "#475569", fontSize: "16px", fontWeight: "700", wordSpacing: "2px" }}>
          1. Paste your text &nbsp;•&nbsp; 2. Choose what to do &nbsp;•&nbsp; 3. Get instant results
        </p>
      </section>

      {/* 📣 DEEP CONVERSION TERMINATION CARD */}
      <section style={{ textAlign: "center", padding: "80px 20px 20px 20px", position: "relative", zIndex: 10 }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #4C1D95 0%, #1E1B4B 100%)",
          padding: "50px 40px",
          borderRadius: "32px",
          color: "#FFFFFF",
          boxShadow: "0 24px 50px -12px rgba(76, 29, 149, 0.25)"
        }}>
          <h2 style={{ fontSize: "36px", fontWeight: "900", letterSpacing: "-0.02em" }}>
            Stop Rewriting. Start Launching.
          </h2>
          <p style={{ color: "#DDD6FE", fontSize: "15px", fontWeight: "500", marginTop: "12px", maxWidth: "480px", marginInline: "auto", lineHeight: "1.5" }}>
            Drop manual content creation fatigue, pick your transformation layout target above, and optimize your assets today.
          </p>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <button
              type="button"
              style={{
                marginTop: "32px",
                padding: "16px 36px",
                background: "#FFFFFF",
                color: "#4C1D95",
                borderRadius: "16px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              }}
            >
              Get Workspace Access 🚀
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
