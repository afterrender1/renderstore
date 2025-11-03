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

const fruits = [
  {
    id: "fruit-1",
    title: "Fresh Mango",
    image: "/images/fruits/mango.png",
    price: 4.99,
    category: "groceries",
    description: "Juicy ripe mangoes packed with natural sweetness.",
  },
  {
    id: "fruit-2",
    title: "Banana Bunch",
    image: "/images/fruits/banana.png",
    price: 3.29,
    category: "groceries",
    description: "Naturally sweet bananas perfect for breakfast and smoothies.",
  },
  {
    id: "fruit-3",
    title: "Organic Apple",
    image: "/images/fruits/apple.png",
    price: 5.49,
    category: "groceries",
    description: "Crisp organic apples grown without synthetic fertilizers.",
  },
  {
    id: "fruit-4",
    title: "Watermelon",
    image: "/images/fruits/watermelon.png",
    price: 9.99,
    category: "groceries",
    description: "Large, juicy watermelon perfect for hot days.",
  },
  {
    id: "fruit-5",
    title: "Strawberries",
    image: "/images/fruits/straw.png",
    price: 6.49,
    category: "groceries",
    description: "Sweet, red strawberries full of vitamin C.",
  },
  {
    id: "fruit-6",
    title: "Pineapple",
    image: "/images/fruits/pineapple.png",
    price: 7.99,
    category: "groceries",
    description: "Golden pineapples rich in tropical flavor.",
  },
  {
    id: "fruit-7",
    title: "Blueberries",
    image: "/images/fruits/blueberry.png",
    price: 5.99,
    category: "groceries",
    description: "Fresh, antioxidant-rich blueberries.",
  },
  {
    id: "fruit-8",
    title: "Oranges",
    image: "/images/fruits/orange.png",
    price: 4.49,
    category: "groceries",
    description: "Vitamin C-rich oranges, juicy and sweet.",
  },
  {
    id: "fruit-9",
    title: "Grapes",
    image: "/images/fruits/grapes.png",
    price: 5.29,
    category: "groceries",
    description: "Seedless grapes with natural sweetness.",
  },
  {
    id: "fruit-10",
    title: "Papaya",
    image: "/images/fruits/papaya.png",
    price: 6.79,
    category: "groceries",
    description: "Tropical papayas rich in vitamins A and C.",
  },
];