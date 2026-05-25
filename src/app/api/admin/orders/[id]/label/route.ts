import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createShipment, purchaseLabel } from "@/lib/shippo";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { weightOz, rateId } = await req.json();

  const order = await db.order.findUnique({ where: { id } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  // Load sender address from settings
  const settings = await db.setting.findMany();
  const s = Object.fromEntries(settings.map((x) => [x.key, x.value]));

  const from = {
    name: s.from_name ?? "Ameizze",
    company: s.from_company ?? "",
    street1: s.from_street1 ?? "",
    street2: s.from_street2 ?? "",
    city: s.from_city ?? "",
    state: s.from_state ?? "",
    zip: s.from_zip ?? "",
    country: s.from_country ?? "US",
    email: s.from_email ?? "",
    phone: s.from_phone ?? "",
  };

  const to = {
    name: order.customerName,
    street1: order.addressLine1,
    street2: order.addressLine2,
    city: order.addressCity,
    state: order.addressState,
    zip: order.addressZip,
    country: order.addressCountry,
    email: order.customerEmail,
  };

  const parcel = {
    length: "10",
    width: "8",
    height: "4",
    distance_unit: "in" as const,
    weight: String(weightOz),
    mass_unit: "oz" as const,
  };

  // If rateId provided, purchase directly. Otherwise get rates first.
  if (rateId) {
    const label = await purchaseLabel(rateId);
    const updated = await db.order.update({
      where: { id },
      data: {
        labelUrl: label.label_url,
        trackingNumber: label.tracking_number,
        shippoTransactionId: label.object_id,
        status: "processing",
      },
    });
    return NextResponse.json(updated);
  }

  // Get rates
  const shipment = await createShipment(from, to, parcel);
  const rates = shipment.rates as Array<{
    object_id: string;
    provider: string;
    servicelevel: { name: string };
    amount: string;
    currency: string;
    estimated_days: number;
  }>;

  return NextResponse.json({ shipmentId: shipment.object_id, rates });
}
