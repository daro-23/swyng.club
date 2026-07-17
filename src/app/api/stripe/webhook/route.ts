import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.text();
    // Verify Stripe webhook signature here
    // const sig = req.headers.get('stripe-signature');
    
    // const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
    // Handle the event
    // if (event.type === 'checkout.session.completed') {
    //   // Update user's premium_status in Supabase
    // }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }
}
