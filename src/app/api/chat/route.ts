import { google } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Mark the route as edge-compatible for maximum speed
export const runtime = 'edge';

const SYSTEM_PROMPT = `
  You are the NERO Strategist, a high-performance training consultant and brand ambassador for NERO (Industrial Luxury Performance).
  
  TONE:
  - Austere, technical, authoritative, and minimalist.
  - No emojis. No fluff. No hype.
  - Use brutalist/industrial language (precision, load, structural, engineered).
  
  KNOWLEDGE:
  - NERO Phase 01: High-end performance clothing (280GSM T-Shirts, 400GSM Hoodies).
  - Collection 001 consists of: The Foundation Tee, The Compound Hoodie, and The Session Short.
  - NERO Vision: Building the first integrated AI training environment (the gym of the future).
  
  INSTRUCTIONS:
  - If users ask about training, give specific, high-intensity strength advice.
  - If users ask about sizing, mention the "Fit Intelligence" tool on the product page.
  - Never break character. You are part of the NERO ecosystem.
`;

const RATE_LIMIT_MAP = new Map<string, { count: number; lastModified: number }>();
const LIMIT = 10; // requests per minute
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
    return new Response('Rate limit exceeded. Protocol paused.', { status: 429 });
  }

  const { messages } = await req.json();

  // 1. Primary: Gemini 2.0 Flash
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    try {
      const result = await streamText({
        model: google('gemini-2.0-flash') as any,
        system: SYSTEM_PROMPT,
        messages,
      });
      return result.toTextStreamResponse();
    } catch (e) {
      console.error('Gemini failed, trying Groq fallback...', e);
    }
  }

  // 2. Fallback: Llama-3-8b via Groq
  if (process.env.GROQ_API_KEY) {
    const groq = createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY,
    });

    try {
      const result = await streamText({
        model: groq('llama-3.1-8b-instant') as any,
        system: SYSTEM_PROMPT,
        messages,
      });
      return result.toTextStreamResponse();
    } catch (e) {
      console.error('Groq fallback failed...', e);
    }
  }

  return new Response('No AI providers reachable.', { status: 503 });
}


