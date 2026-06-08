import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const navigate = useNavigate();

  const handleCheckout = async (plan: string) => {
    try {
      const res = await fetch("http://localhost:3001/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("No checkout URL returned");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout error");
    }
  };

  return (
    <div style={page}>
      <h1 style={title}>Pricing</h1>

      <p style={{ color: "#475569", fontWeight: "500", marginBottom: 30 }}>
        Use AI tools across multiple categories to transform your content instantly.
      </p>

      <div style={row}>
        <Card
          name="Free"
          price="$0"
          desc="Basic access to core tools"
          features={[
            "All categories (Legal, Career, Email, etc.)",
            "Rewrite, summarize, grammar tools",
            "Limited daily usage",
          ]}
          button="Start Free"
          onClick={() => navigate("/login")}
        />

        <Card
          name="Pro"
          price="$15"
          desc="Full access with higher limits"
          features={[
            "All tools: Rewrite, Expand, Tone, Translate",
            "Higher usage limits",
            "Faster responses",
            "Save outputs",
          ]}
          button="Upgrade to Pro"
          highlight
          onClick={() => handleCheckout("pro")}
        />

        <Card
          name="Business"
          price="$49"
          desc="Advanced usage and performance"
          features={[
            "All Pro features",
            "Priority processing",
            "Large text handling",
            "High-volume usage",
          ]}
          button="Upgrade to Business"
          onClick={() => handleCheckout("business")}
        />
      </div>
    </div>
  );
}

function Card({
  name,
  price,
  desc,
  features,
  button,
  onClick,
  highlight,
}: any) {
  return (
    <div
      style={{
        ...card,
        // ⚡ Blends the custom highlight parameter into your dopamine wave border styles
        border: highlight ? "2px solid #7C3AED" : "2px solid #F3E8FF",
        boxShadow: highlight ? "0 12px 28px -4px rgba(217, 70, 239, 0.2)" : "0 10px 20px -5px rgba(124, 58, 237, 0.04)"
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#0F172A", letterSpacing: "-0.01em" }}>{name}</h2>

      <div style={priceStyle}>
        {price}
        <span style={{ fontSize: 14, color: "#64748B", fontWeight: "600" }}>/mo</span>
      </div>

      <p style={descStyle}>{desc}</p>

      <ul style={{ textAlign: "left", marginBottom: 20, paddingLeft: 0, listStyle: "none" }}>
        {features.map((f: string, i: number) => (
          <li key={i} style={{ marginBottom: 8, fontSize: "14px", fontWeight: "600", color: "#475569" }}>
            <span style={{ color: "#10B981", marginRight: "6px", fontWeight: "900" }}>✓</span> {f}
          </li>
        ))}
      </ul>

      <button onClick={onClick} style={highlight ? btnMain : btn}>
        {button}
      </button>
    </div>
  );
}

/* styles */

const page = {
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  background: "linear-gradient(135deg, #F5F3FF 0%, #FDF2F8 50%, #EEF2FF 100%)",
  minHeight: "100vh",
  padding: "80px 20px",
  textAlign: "center" as const,
  color: "#1E1B4B"
};

const title = {
  fontSize: 44,
  fontWeight: "950",
  letterSpacing: "-0.03em",
  color: "#0F172A",
  marginBottom: 16,
};

const row = {
  display: "flex",
  justifyContent: "center",
  gap: 30,
  flexWrap: "wrap" as const,
  marginTop: "40px"
};

const card = {
  width: 260,
  padding: "36px 28px",
  borderRadius: 24,
  background: "#ffffff",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between"
};

const priceStyle = {
  fontSize: 36,
  fontWeight: "950",
  color: "#0F172A",
  letterSpacing: "-0.02em",
  margin: "12px 0",
};

const descStyle = {
  color: "#64748B",
  fontSize: "14px",
  fontWeight: "500",
  marginBottom: 20,
};

const btn = {
  width: "100%",
  padding: "12px 20px",
  borderRadius: 12,
  border: "2px solid #E9D5FF",
  background: "white",
  color: "#7C3AED",
  fontWeight: "800",
  fontSize: "13px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
  cursor: "pointer",
  transition: "all 0.15s ease"
};

const btnMain = {
  ...btn,
  background: "linear-gradient(135deg, #7C3AED 0%, #D946EF 100%)",
  color: "#ffffff",
  border: "none",
  padding: "14px 20px",
  boxShadow: "0 8px 20px -4px rgba(217, 70, 239, 0.3)"
};
