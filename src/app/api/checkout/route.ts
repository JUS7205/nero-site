import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();

    // Map the internal price IDs to hardcoded amounts for simulation purposes
    const lineItems = [
      {
        price_data: {
          currency: 'zar',
          product_data: {
            name: priceId === 'price_tee' ? 'The Foundation Tee' : 
                  priceId === 'price_hoodie' ? 'The Compound Hoodie' : 'The Session Short',
          },
          unit_amount: priceId === 'price_tee' ? 79900 : 
                       priceId === 'price_hoodie' ? 189900 : 119900,
        },
        quantity: 1,
      },
    ];

    // Attempt to create a standard Stripe Checkout session
    // This will error locally unless STRIPE_SECRET_KEY is legitimately set
    if (process.env.STRIPE_SECRET_KEY) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/?success=true`,
        cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      });

      return NextResponse.json({ url: session.url });
    } else {
      // Simulate Stripe URL response if testing locally without API keys
      console.log('Stripe API Key missing. Simulating checkout for:', priceId);
      return NextResponse.json({ url: '/?success=true&simulated=true' });
    }

  } catch (err: any) {
    console.error('Stripe Integration Error:', err);
    return NextResponse.json({ error: 'Internal server error while starting checkout' }, { status: 500 });
  }
}
