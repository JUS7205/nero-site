import { google } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const SYSTEM_PROMPT = `
  You are the NERO Fit Intelligence Engine.
  Your task is to provide precise, technical sizing recommendations for NERO garments.
  
  PRODUCT SPECS:
  - The Foundation Tee: 280GSM, Oversized, Boxy, Drop shoulder. Intended to be loose.
  - The Compound Hoodie: 400GSM, Structured, French Terry, Tapered but roomy.
  - The Session Short: 4-way stretch, 7" inseam, Athletic compression-friendly.
  
  GUIDELINES:
  - Be direct and technical.
  - Recommend S, M, L, XL, or XXL.
  - If height/weight suggests a range, favor the fit preference (Oversized vs Standard).
  - Output format: One paragraph of max 3 sentences. No fluff.
`;

const RATE_LIMIT_MAP = new Map<string, { count: number; lastModified: number }>();
const LIMIT = 5; // sizing engine is more restricted (5 per minute)
const WINDOW = 60 * 1000; // 1 minute in ms

export async function POST(req: Request) {
  // 0. Security Protocol: Rate Limiting
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const userData = RATE_LIMIT_MAP.get(ip) || { count: 0, lastModified: now };

  if (now - userData.lastModified > WINDOW) {
    userData.count = 1;
    userData.lastModified = now;
  } else {
    userData.count++;
  }

  RATE_LIMIT_MAP.set(ip, userData);

  if (userData.count > LIMIT) {
    return new Response(JSON.stringify({ recommendation: 'Protocol throttled. Please wait one minute.' }), { 
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { height, weight, preferredFit, productName } = await req.json();
  const prompt = `Suggest a size for: ${productName}. User Height: ${height}cm, Weight: ${weight}kg, Preference: ${preferredFit}.`;

  // 1. Primary: Gemini 2.0 Flash
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    try {
      const { text } = await generateText({
        model: google('gemini-2.0-flash') as any,
        system: SYSTEM_PROMPT,
        prompt,
      });
      return new Response(JSON.stringify({ recommendation: text }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      console.error('Gemini Fit Engine failed, trying Groq fallback...', e);
    }
  }

  // 2. Fallback: Llama-3-8b via Groq
  if (process.env.GROQ_API_KEY) {
    const groq = createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY,
    });

    try {
      const { text } = await generateText({
        model: groq('llama-3.1-8b-instant') as any,
        system: SYSTEM_PROMPT,
        prompt,
      });
      return new Response(JSON.stringify({ recommendation: text }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      console.error('Groq Fit fallback failed...', e);
    }
  }

  return new Response(JSON.stringify({ recommendation: 'Sizing protocols temporarily unavailable. Please refer to standard size chart.' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });
}


