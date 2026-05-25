import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const shipping = session.shipping_details;
    if (!shipping?.address) {
      return NextResponse.json({ ok: true });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

    const items = lineItems.data.map((item) => ({
      name: item.description,
      quantity: item.quantity,
      price: item.amount_total,
    }));

    try {
      await db.order.create({
        data: {
          stripeSessionId: session.id,
          customerName: shipping.name ?? session.customer_details?.name ?? "Unknown",
          customerEmail: session.customer_details?.email ?? "",
          addressLine1: shipping.address.line1 ?? "",
          addressLine2: shipping.address.line2 ?? "",
          addressCity: shipping.address.city ?? "",
          addressState: shipping.address.state ?? "",
          addressZip: shipping.address.postal_code ?? "",
          addressCountry: shipping.address.country ?? "US",
          items: JSON.stringify(items),
          total: session.amount_total ?? 0,
          status: "pending",
        },
      });
    } catch (e: unknown) {
      if ((e as { code?: string }).code === "P2002") {
        // Already exists — ignore duplicate webhook
      } else {
        throw e;
      }
    }
  }

  return NextResponse.json({ ok: true });
}
