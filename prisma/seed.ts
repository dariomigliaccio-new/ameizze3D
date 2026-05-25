import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "node:path";
import { products } from "../src/lib/products";

const url = process.env.DATABASE_URL ?? `file:${path.join(process.cwd(), "prisma/dev.db")}`;
const adapter = new PrismaLibSql({ url });
const db = new PrismaClient({ adapter });

async function main() {
  for (const p of products) {
    await db.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        price: p.price,
        description: p.description,
        longDescription: p.longDescription,
        image: p.image,
        category: p.category,
        badge: p.badge ?? "",
        features: JSON.stringify(p.features),
        material: p.material,
        dimensions: p.dimensions,
        active: true,
      },
    });
  }

  const defaults = [
    { key: "from_name", value: "Ameizze" },
    { key: "from_company", value: "Ameizze 3D" },
    { key: "from_street1", value: "" },
    { key: "from_street2", value: "" },
    { key: "from_city", value: "" },
    { key: "from_state", value: "" },
    { key: "from_zip", value: "" },
    { key: "from_country", value: "US" },
    { key: "from_email", value: "hello@ameizze.com" },
    { key: "from_phone", value: "" },
  ];

  for (const s of defaults) {
    await db.setting.upsert({ where: { key: s.key }, update: {}, create: s });
  }

  console.log("Seed complete — products and settings loaded.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
