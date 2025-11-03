// app/api/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
 


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});


export async function POST(req: Request) {
  try {
    const body = await req.json();
    // body.items: array of { id, title, price, quantity, ...(optional) }
    const items = body.items || [];

    // convert your items into Stripe line_items
    //@
    const line_items = items.map((it: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: it.title,
          // optionally: images: [it.image],
        },
        unit_amount: Math.round(it.price * 100), // in cents
      },
      quantity: it.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: process.env.NEXT_PUBLIC_SUCCESS_URL + "?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: process.env.NEXT_PUBLIC_CANCEL_URL,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message ?? "Unknown error" }, { status: 500 });
  }
}


// ?\

