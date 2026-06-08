// src/react-app/components/Navbar.tsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
      maxWidth: "1100px",
      margin: "0 auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>

      {/* LEFT BRAND LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="/logo.png" style={{ width: "30px", height: "30px", objectFit: "contain" }} alt="Logo" />
        <Link to="/" style={{ fontWeight: "800", textDecoration: "none", color: "#0c4a6e", letterSpacing: "-0.02em" }}>
         NOAH Ink
        </Link>
      </div>

      {/* CENTER LINK NAVIGATION POOL */}
      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <Link to="/" style={link}>Home</Link>
        <Link to="/blog" style={link}>Blog</Link>
        <Link to="/pricing" style={link}>Pricing</Link>
        <Link to="/contact" style={link}>Contact</Link>
      </div>

      {/* RIGHT ACTION BUTTON TRIGGER */}
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button style={button}>Start Free</button>
        </Link>
      </div>

    </nav>
  );
}

const link = {
  textDecoration: "none",
  color: "#475569",
  fontSize: "14px",
  fontWeight: "600",
};

const button = {
  padding: "10px 20px",
  background: "linear-gradient(135deg, #0284c7 0%, #db2777 100%)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.03em",
};
