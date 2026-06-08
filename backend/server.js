import express from "express";
import cors from "cors";
import multer from "multer";
import PQueue from "p-queue";
import path from "path";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Stripe from "stripe";
import axios from "axios";
import nodemailer from "nodemailer";
import fs from "fs";
import dotenv from "dotenv";
import * as pdf from "pdf-parse";

dotenv.config({
  path: "/mnt/d/productboost/sonicresume/backend/.env"
});

import mammoth from "mammoth";

const USERS_FILE = "./users.json";
// load users from file (or empty)
let USERS = [];

if (fs.existsSync(USERS_FILE)) {
  USERS = JSON.parse(fs.readFileSync(USERS_FILE));
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const RESET = {};
const userCredits = {};

const queue = new PQueue({ concurrency: 2 });

const app = express();
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20
});

const PORT = process.env.PORT || 3001;

const OLLAMA_URL = "http://localhost:11434/api/generate";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

/* ---------------- FILE UPLOAD ---------------- */

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2 * 1024 * 1024 }
});

/* ---------------- REQUEST QUEUE ---------------- */

/* ---------------- CACHE ---------------- */

const cache = new Map();

/* ---------------- NORMALIZE TOOL ---------------- */

function normalizeTool(tool) {

  const t = String(tool || "").toLowerCase();

  if (t.includes("rewrite")) return "rewrite";
  if (t.includes("expand")) return "expand";
  if (t.includes("summarize")) return "summarize";
  if (t.includes("grammar")) return "grammar";
  if (t.includes("tone")) return "tone";
  if (t.includes("translate")) return "translate";

  return "rewrite";
}

/* ---------------- CONTENT TYPES ---------------- */

function normalizeContentType(type) {

const map = {
  "legal": "legal writing",
  "product description": "product description",
  "real estate": "real estate content",
  "professional email": "professional email",
  "career": "career documents",
  "social media": "social media content"
};

  const key = String(type || "").toLowerCase();
  return map[key] || "text";
}

/* ---------------- LANGUAGE ---------------- */

function normalizeLanguage(language) {

  const map = {
    spanish: "Spanish",
    french: "French",
    german: "German",
    italian: "Italian",
    portuguese: "Portuguese",
    japanese: "Japanese",
    chinese: "Chinese",
    korean: "Korean"
  };

  const key = String(language || "").toLowerCase();
  return map[key] || "Spanish";
}

/* ---------------- MODEL ROUTER ---------------- */
function pickModel(tool) {

  // 🧠 BEST WRITING
  if (tool === "rewrite") return "llama3.1:8b";
  if (tool === "expand") return "llama3.1:8b";
  if (tool === "tone") return "llama3.1:8b";

  // ✂️ PRECISION TASKS
  if (tool === "grammar") return "qwen2.5:7b";
  if (tool === "summarize") return "qwen2.5:7b";

  // 🌍 TRANSLATION
  if (tool === "translate") return "qwen2.5:7b";

  // ⚡ FALLBACK (FAST)
  return "noahfast";

}/* ---------------- PROMPT BUILDER ---------------- */

function buildPrompt(text, tool, contentType, language, tone) {

  if (tool === "rewrite") {

    // ⚖️ LEGAL
    if (contentType === "legal writing") {
      return `Rewrite the following legal text as a clean, professional legal document.

Rules:
- Use plain text only
- No asterisks or markdown
- Use clear section headings
- Use numbered sections where appropriate
- Keep formatting structured and readable

Text:
${text}

Return only the rewritten text.`;
    }

    // 🔥 DEFAULT REWRITE
    return `Rewrite the following ${contentType} clearly and professionally.

${text}

Return only the rewritten text.`;
  }

  if (tool === "expand") {
    return `Expand the following ${contentType} with more detail and clarity.

${text}

Return only the expanded text.`;
  }

  if (tool === "summarize") {
    return `Summarize the following text clearly.

${text}

Return only the summary.`;
  }

  if (tool === "grammar") {
    return `Fix grammar, spelling and clarity.

${text}

Return only the corrected text.`;
  }

  if (tool === "tone") {
    return `Rewrite the following ${contentType} with a ${tone || "professional"} tone.

${text}

Return only the rewritten text.`;
  }

  if (tool === "translate") {
    return `Translate the following text into ${language}.

Rules:
- Preserve numbers
- Preserve formatting
- Return only translated text

Text:
${text}`;
  }

  return text;
}
/* ---------------- OLLAMA REQUEST ---------------- */

async function runLocal(model, prompt) {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      prompt,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error("Ollama failed");
  }

  const data = await response.json();
  return data.response || "";
}

async function runOpenAI(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("No OpenAI key");
  }

  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data.choices?.[0]?.message?.content || "";
}

async function runModel(model, prompt) {
  try {
    // 🟢 Try local first
    return await runLocal(model, prompt);

  } catch (err) {
    console.log("⚠️ Ollama failed:", err.message);

    try {
      // 🔵 Try OpenAI
      return await runOpenAI(prompt);

    } catch (err2) {
      console.log("⚠️ OpenAI failed:", err2.message);

      try {
        // 🟣 Try Claude
        return await runClaude(prompt);

      } catch (err3) {
        console.log("❌ All providers failed");
        throw err3;
      }
    }
  }
}
/* ---------------- FILE READER ---------------- */

async function readFile(file) {

  const ext = path.extname(file.originalname).toLowerCase();

  // TEXT FILES
if ([".txt", ".md", ".csv", ".json"].includes(ext)) {
  const text = await fs.readFile(file.path, "utf8");
  await fs.unlink(file.path);
  return text;
}

// PDF
if (ext === ".pdf") {
  const dataBuffer = fs.readFileSync(file.path);
  const data = await pdf(dataBuffer);
  await fs.unlink(file.path);
  return data.text;
}

// WORD DOCX
if (ext === ".docx") {
  const data = await mammoth.extractRawText({ path: file.path });
  await fs.unlink(file.path);
  return data.value;
}

throw new Error("Unsupported file type");
}

/* ---------------- PROCESS TEXT ---------------- */

async function processText(text, tool, contentType, language, tone) {

  const normalizedTool = normalizeTool(tool);
  const normalizedType = normalizeContentType(contentType);
  const normalizedLanguage = normalizeLanguage(language);

  const model = pickModel(normalizedTool);

  const prompt = buildPrompt(
    text,
    normalizedTool,
    normalizedType,
    normalizedLanguage,
    tone
  );

  const cacheKey = normalizedTool + normalizedType + text;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const result = await queue.add(() =>
    runModel(model, prompt)
  );

  cache.set(cacheKey, result);

  return result;
}

/* ---------------- ROUTES ---------------- */

/* HEALTH CHECK */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SonicResume API running"
  });
});

console.log("🔥 PAY ROUTE LOADED");

/* PROCESS TEXT */
app.post("/api/process", limiter, async (req, res) => {
  try {
    const { text, tool, contentType, language, tone } = req.body || {};

    // ✅ CREDIT SYSTEM (ADD HERE)
    const id = "guest";
    const today = new Date().toDateString();

    if (!userCredits[id] || userCredits[id].date !== today) {
      userCredits[id] = { credits: 20, date: today };
    }

    if (userCredits[id].credits < 2) {
      return res.json({
        success: false,
        error: "No credits left",
        credits: 0
      });
    }

    if (!text) {
      return res.status(400).json({ error: "text required" });
    }

    const result = await processText(
      text,
      tool,
      contentType,
      language,
      tone
    );

    // ✅ SUBTRACT AFTER SUCCESS
    userCredits[id].credits -= 2;

    const cleanResult = result
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/__/g, "")
      .replace(/`/g, "");

    res.json({
      success: true,
      result: cleanResult,
      credits: userCredits[id].credits
    });

  } catch (err) {
    console.error("OLLAMA ERROR:", err);

    res.status(500).json({
      error: "AI processing failed"
    });
  }
});

/* FILE UPLOAD */

app.post("/api/upload", upload.single("file"), async (req, res) => {

  try {

    const text = await readFile(req.file);

    res.json({
      success: true,
      text
    });

  } catch (err) {

    res.status(400).json({
      error: err.message
    });

  }

});

app.post("/api/pay", async (req, res) => {
  try {
    const { plan } = req.body;

 const priceMap = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
  business: process.env.STRIPE_PRICE_BUSINESS, 
};

    const priceId = priceMap[plan];

    if (!priceId) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:4174",
      cancel_url: "http://localhost:4174",
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Stripe failed" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing fields"
      });
    }

    console.log("📩 CONTACT HIT");

    res.json({ success: true });

  } catch (err) {
    console.error("CONTACT ERROR:", err);
    res.status(500).json({
      success: false,
      error: "Failed"
    });
  }
});
/* START SERVER */

app.listen(PORT, () => {

  console.log(`SonicResume API running on http://localhost:${PORT}`);

});
