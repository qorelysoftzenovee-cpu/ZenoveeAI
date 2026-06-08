import "server-only";

import Groq from "groq-sdk";

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  throw new Error("Missing GROQ_API_KEY in .env.local.");
}

export const groq = new Groq({
  apiKey: groqApiKey,
});
