// src/react-app/blog/[slug]/data.ts

export type UseCase = "legal" | "product" | "real_estate" | "email" | "career" | "social";

export interface ContentBlock {
  type: "paragraph" | "heading" | "spec_list" | "app_cta";
  text?: string;
  items?: string[];
  ctaText?: string;
}

export interface ArticleData {
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  content: ContentBlock[];
}

export const MOCK_ARTICLE: ArticleData = {
  title: "Crushing Content Friction: How to Handle 6 Massive Life Tasks Without Blowing Your Schedule 🚀",
  category: "Life Hack Protocol 🧠",
  date: "June 8, 2026",
  author: "SonicResume Hype Crew",
  readTime: "2 min fast read ⏱️",
  excerpt: "Staring at a blank screen while trying to draft an application, format a legal notification, or script a viral hook is a direct vibe killer. Here is the framework to write fast and build momentum.",
  content: [
    {
      type: "paragraph",
      text: "Let’s be totally honest: context-switching between completely different types of writing is exhausting. Writing a formal dispute notice requires a different brain space than cracking a high-CTR product landing headline or scripting a quick TikTok hook. If you don't use a structured system, your day slips away into total analysis paralysis."
    },
    {
      type: "heading",
      text: "⚡ Speed Running the 6 Structural Writing Scopes"
    },
    {
      type: "paragraph",
      text: "To get store-ready copy or high-intent text without draining your creative battery, break your tasks down into 6 straightforward, zero-fluff channels:"
    },
    {
      type: "spec_list",
      items: [
        "⚖️ Legal: Keep it clinical, formal, and authoritative. State the terms plainly without emotional clutter.",
        "🛒 Product: Focus heavily on consumer pain points. Don't sell the feature; sell the immediate rescue.",
        "🏠 Real Estate: Build a lifestyle narrative. People don't just lease square footage; they acquire space memories.",
        "✉️ Email: Keep it tight. Punchy subject lines, brief body layouts, and an explicit, obvious call to action.",
        "💼 Career: Clean up your chronology. Use strict action metrics instead of passive descriptions to slice through automated screening software.",
        "📣 Social: Hook them in the first 3 seconds. Use bold text contrasts and end with direct audience interaction prompts."
      ]
    },
    {
      type: "heading",
      text: "🎨 Workstations and High-Volume Consistency"
    },
    {
      type: "paragraph",
      text: "The secret to scaling your output isn't hidden magic; it is setting up an interface that minimizes friction. Working inside a dark and light purple layout workspace helps eliminate heavy contrast glare, keeping your head in the zone while you map parameters and manage document execution states."
    },
    {
      type: "app_cta",
      ctaText: "Sign Up & Unlock Workspace Console ⚡" // 👈 Updated text model to match Auth
    }
  ]
};
