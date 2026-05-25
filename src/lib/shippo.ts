const SHIPPO_API = "https://api.goshippo.com";

function headers() {
  return {
    Authorization: `ShippoToken ${process.env.SHIPPO_API_KEY}`,
    "Content-Type": "application/json",
  };
}

export type ShippoAddress = {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email?: string;
  phone?: string;
};

export type ShippoParcel = {
  length: string;
  width: string;
  height: string;
  distance_unit: "in" | "cm";
  weight: string;
  mass_unit: "oz" | "lb" | "g" | "kg";
};

export type ShippoRate = {
  object_id: string;
  provider: string;
  servicelevel: { name: string; token: string };
  amount: string;
  currency: string;
  estimated_days: number;
};

export type ShippoLabel = {
  object_id: string;
  label_url: string;
  tracking_number: string;
  tracking_url_provider: string;
  status: string;
};

export async function createShipment(
  from: ShippoAddress,
  to: ShippoAddress,
  parcel: ShippoParcel
) {
  const res = await fetch(`${SHIPPO_API}/shipments/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      address_from: from,
      address_to: to,
      parcels: [parcel],
      async: false,
    }),
  });
  if (!res.ok) throw new Error(`Shippo shipment error: ${await res.text()}`);
  return res.json();
}

export async function purchaseLabel(rateId: string): Promise<ShippoLabel> {
  const res = await fetch(`${SHIPPO_API}/transactions/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      rate: rateId,
      label_file_type: "PDF",
      async: false,
    }),
  });
  if (!res.ok) throw new Error(`Shippo label error: ${await res.text()}`);
  return res.json();
}
