'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { Resend } from 'resend';

// Initialize Resend conditionally so local dev doesn't crash if omitted
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Enforce extremely strict email validation to prevent NoSQL/SQL injection and bad actors
const waitlistSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).max(150),
});

// A lightweight, memory-based rate-limiter to stop basic bot floods.
// (Note: For Vercel Edge/Serverless production, we recommend using @upstash/ratelimit for global persistence)
const recentIPs = new Map<string, number>();

export async function joinWaitlist(email: string, ipHash: string | null = 'anonymous') {
  try {
    // 1. Rate Limiting Check
    const now = Date.now();
    const userIPKey = ipHash || 'anonymous';
    const lastRequestTime = recentIPs.get(userIPKey);
    
    // Limits users to 1 request every 10 seconds per IP block
    if (lastRequestTime && now - lastRequestTime < 10000) {
      return { status: 'error', message: 'Too many requests' };
    }
    recentIPs.set(userIPKey, now);

    // 2. Strict Input Validation via Zod
    const parsed = waitlistSchema.safeParse({ email });
    if (!parsed.success) {
      return { status: 'error', message: 'Invalid email structure' };
    }
    
    const validEmail = parsed.data.email.toLowerCase().trim();

    // 3. Database Insertion
    await prisma.waitlist.create({
      data: { email: validEmail },
    });

    // 4. Send Welcome Email via Resend
    if (resend) {
      // In production, update 'onboarding@resend.dev' with your verified domain email
      await resend.emails.send({
        from: 'NERO <onboarding@resend.dev>',
        to: validEmail,
        subject: 'Welcome to NERO Phase 01',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
            <p style="font-size: 10px; letter-spacing: 2px; color: #666666; text-transform: uppercase;">BE FIRST</p>
            <h1 style="color: #0A0A0A; letter-spacing: -1px;">You're in.</h1>
            <p style="color: #666666; line-height: 1.6;">
              Welcome to the waitlist. You will receive exclusive early access to Collection 001 and behind-the-scenes updates on the construction of the ecosystem.
            </p>
            <br />
            <p style="color: #B8976A; font-weight: bold;">Forged in darkness. Built for everywhere.</p>
          </div>
        `,
      });
    }

    // 5. Send Discord Webhook Notification
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **ALARM:** New NERO VIP joined the waitlist! — \`${validEmail}\``
        })
      }).catch(e => console.error('Discord webhook failed', e));
    }

    return { status: 'success', message: 'Email saved and welcome dispatched' };
    
  } catch (error: any) {
    if (error?.code === 'P2002') {
      // User is already in the database. Return success to prevent enumeration attacks.
      return { status: 'success', message: 'Already subscribed' };
    }
    
    console.error('Waitlist runtime error:', error);
    return { status: 'error', message: 'Internal server error' };
  }
}
