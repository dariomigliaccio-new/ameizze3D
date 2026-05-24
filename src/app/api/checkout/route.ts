import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import type { CartItem } from "@/store/cart";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });

  const { items }: { items: CartItem[] } = await req.json();

  if (!items?.length) {
    return NextResponse.json({ error: "Empty cart" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: items.map(({ product, quantity }) => ({
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: product.price,
        product_data: {
          name: product.name,
          description: product.description,
        },
      },
    })),
    shipping_address_collection: { allowed_countries: ["US"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free Shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 8 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 999, currency: "usd" },
          display_name: "Express Shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 3 },
          },
        },
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
