import express from "express";
import cors from "cors";
import multer from "multer";
import rateLimit from "express-rate-limit";
import fs from "fs";
import path from "path";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());

const users = {};

const userCredits = {};

const BOOK = fs.readFileSync("./data/lso.txt", "utf-8");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2 * 1024 * 1024 }
});

const paidUsers = {};

const TRIBUNALS = [
  {
    name: "Human Rights Tribunal of Ontario",
    keywords: ["hrto", "human rights", "discrimination"],
    link: "https://tribunalsontario.ca/hrto/forms-and-filing/"
  },

  {
    name: "Landlord and Tenant Board",
    keywords: ["tenant", "landlord", "rent", "eviction"],
    link: "https://tribunalsontario.ca/ltb/forms/"
  },

  {
    name: "Licence Appeal Tribunal",
    keywords: ["accident", "insurance", "benefits", "licence"],
    link: "https://tribunalsontario.ca/lat/forms/"
  },

  {
    name: "Social Benefits Tribunal",
    keywords: ["odsp", "ow", "welfare", "social assistance"],
    link: "https://tribunalsontario.ca/sbt/forms/"
  },

  {
    name: "Assessment Review Board",
    keywords: ["property tax", "assessment", "arb"],
    link: "https://tribunalsontario.ca/arb/forms/"
  },

  {
    name: "Animal Care Review Board",
    keywords: ["animal", "welfare", "animal care"],
    link: "https://tribunalsontario.ca/acrb/forms/"
  },

  {
    name: "Child and Family Services Review Board",
    keywords: ["child services", "cas", "family services"],
    link: "https://tribunalsontario.ca/cfsrb/forms/"
  },

  {
    name: "Custody Review Board",
    keywords: ["custody review", "youth detention"],
    link: "https://tribunalsontario.ca/crb/"
  },

  {
    name: "Fire Safety Commission",
    keywords: ["fire safety", "fire code"],
    link: "https://tribunalsontario.ca/fsc/"
  },

  {
    name: "Ontario Special Education Tribunal",
    keywords: ["special education", "iep", "school tribunal"],
    link: "https://tribunalsontario.ca/oset/"
  },

  {
    name: "Ontario Parole Board",
    keywords: ["parole", "temporary absence"],
    link: "https://tribunalsontario.ca/opb/"
  },

  // ===== FEDERAL =====

  {
    name: "Refugee Appeal Division",
    keywords: ["refugee", "asylum", "rad", "immigration appeal"],
    link: "https://irb-cisr.gc.ca/en/refugee-appeals/Pages/index.aspx"
  }

];

// ===== STATUTES =====

const HTA = fs.readFileSync(
  "/mnt/d/productboost/soniclegal/backend/data/statutes/highway_traffic_act.txt",
  "utf-8"
);

const HRC = fs.readFileSync(
  "/mnt/d/productboost/soniclegal/backend/data/statutes/human_rights_code.txt",
  "utf-8"
);

const POA = fs.readFileSync(
  "/mnt/d/productboost/soniclegal/backend/data/statutes/provincial_offences_act.txt",
  "utf-8"
);

const RTA = fs.readFileSync(
  "/mnt/d/productboost/soniclegal/backend/data/statutes/residential_tenancies_act.txt",
  "utf-8"
);

const CHRA = fs.readFileSync(
  "/mnt/d/productboost/soniclegal/backend/data/statutes/canadian_human_rights_act.txt",
  "utf-8"
);

const LAW_LIBRARY = [
  BOOK,
  HTA,
  HRC,
  POA,
  RTA,
  CHRA
].join("\n\n");
// ================= HELPERS =================

function isCaseLaw(text) {
  return keywords.some(k => text.toLowerCase().includes(k));
}

function detectStatutes(context, text = "") {
  const lower = (context + " " + text).toLowerCase();

  const statutes = [];

  if (lower.includes("provincial offences")) {
    statutes.push("Provincial Offences Act");
  }

  if (lower.includes("traffic") || lower.includes("driving") || lower.includes("speeding")) {
    statutes.push("Highway Traffic Act");
  }

  if (lower.includes("criminal") && !lower.includes("traffic") && !lower.includes("driving")) {
  statutes.push("Criminal Code");
}

  return statutes.length ? [...new Set(statutes)] : ["Unknown statute"];
}
function extractSections(context) {
  if (!context) return [];

  // fix broken line breaks like "s.\n2"
  const cleaned = context.replace(/s\.\s*\n\s*(\d+)/g, "s. $1");

  const matches = cleaned.match(/s\.\s?\d+(\(\d+\))?/g);

  return matches ? [...new Set(matches)] : [];
}
function searchBook(input, text) {
  const lowerInput = input.toLowerCase();
  const chunks = text.split("\n\n");

  const filtered = chunks.filter(c => {
    const lower = c.toLowerCase();

    // ❌ BLOCK garbage
    if (lower.includes("table of contents")) return false;
    if (lower.includes("detailed table")) return false;
    if (lower.match(/\d+\.\d+/)) return false; // section index lines

    // ✅ REQUIRE relevance
    return (
      lower.includes("speed") ||
      lower.includes("ticket") ||
      lower.includes("driving") ||
      lower.includes("traffic")
    );
  });

  const base = filtered.length ? filtered : chunks;

  return base.slice(0, 1).join("\n\n");
}

/* ---------------- FILE UPLOAD ---------------- */
app.post("/api/process", upload.single("file"), async (req, res) => {
  try {
    const { text = "", id = "guest" } = req.body;

    // ✅ INIT credits
    if (!userCredits[id]) userCredits[id] = 9;

    // ❌ BLOCK if not enough credits
    if (userCredits[id] < 3) {
      return res.json({
        success: false,
        error: "No credits left",
        credits: userCredits[id]
      });
    }

    // 🔻 DEDUCT 3 credits
    userCredits[id] -= 3;

    // ===== YOUR EXISTING LOGIC =====
    const finalText = text;

    const lawContext = searchBook(finalText, LAW_LIBRARY);

    const short = lawContext
      .replace(/\f/g, "")
      .replace(/\.+\s*\d+/g, "")
      .replace(/DETAILED TABLE OF CONTENTS/gi, "")
      .replace(/\d+\.\d+.*\n/g, "")
      .split("\n")
      .slice(0, 5)
      .join("\n");

    res.json({
      success: true,
      result: short,
      credits: userCredits[id] // ✅ return remaining credits
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
// ================= ROUTES =================

app.get("/api/health", (req, res) => {
  res.json({ success: true });
});

app.post("/api/process", async (req, res) => {
  try {
    const { text, id = "guest" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "text required" });
    }

    // credits init
    if (!userCredits[id]) userCredits[id] = 20;

    if (userCredits[id] < 1) {
      return res.json({
        success: false,
        error: "No credits left",
        credits: 0
      });
    }

    // keyword boost
    let enhanced = text;

    if (text.includes("ticket") || text.includes("speeding")) {
      enhanced += " provincial offences act offence notice trial";
    }

    // case law mode
    let finalText = enhanced;

    const lawContext = searchBook(finalText, BOOK);
    const statutes = detectStatutes(lawContext, finalText);
   const allSections = extractSections(lawContext)
  .filter(s => !["s. 35", "s. 11"].includes(s));

let sections = [];

// prioritize careless driving (s.130)
if (text.toLowerCase().includes("careless")) {
  const s130 = allSections.find(s => s.includes("130"));
  if (s130) sections.push(s130);
}

// add remaining
sections = [
  ...sections,
  ...allSections.filter(s => !sections.includes(s))
].slice(0, 5);


const shortAnswer = lawContext
  .split("\n")
  .filter(line => line.trim().length > 40) // ignore junk lines
  .slice(0, 3)
  .join(" ");

let result = `
Answer:
${shortAnswer}

Law:
${statutes.join(", ")}

Sections:
${sections.join(", ") || "None"}
`;

userCredits[id]--;

res.json({
  success: true,
  result,
  credits: userCredits[id]
});

} catch (err) {
  console.error(err);
  res.status(500).json({ error: err.message });
}
});

app.post("/api/pay", async (req, res) => {
  try {
    const { type, id } = req.body;

    let priceId;

    if (type === "forms") {
      priceId = "price_1TI27QPE4wCsfg73kGgLgKI4";
    } 
    else if (type === "demand") {
    priceId = "price_1TI22MPE4wCsfg73dJdLWMNN";
    } 
    else if (type === "small_claims") {
      priceId = "price_1TI28zPE4wCsfg73FrcSkwzP";
    } 
    else {
      return res.status(400).json({ error: "Invalid type" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
    success_url: "http://localhost:5174/success",
    cancel_url: "http://localhost:5174/",
      metadata: { id, type }
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (users[email]) {
    return res.status(400).json({ message: "User already exists" });
  }

  users[email] = { email, password };

  res.json({ success: true, message: "User created" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users[email];

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid password" });
  }

  res.json({ success: true, user });
});

// ================= START =================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
