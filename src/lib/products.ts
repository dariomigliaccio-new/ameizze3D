export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  badge?: string;
  features: string[];
  material: string;
  dimensions: string;
};

export const products: Product[] = [
  {
    id: "prod_001",
    slug: "universal-phone-stand",
    name: "Universal Phone Stand",
    price: 1899,
    description: "Adjustable desktop stand compatible with all smartphones.",
    longDescription:
      "Precision-engineered for stability and style. This stand keeps your phone at the perfect viewing angle for video calls, streaming, and productivity. Compatible with all phone sizes including cases.",
    image: "/products/phone-stand.jpg",
    category: "Desk Accessories",
    badge: "Best Seller",
    features: [
      "Universal compatibility — all phone sizes",
      "Stable non-slip base",
      "Cable routing channel",
      "Scratch-resistant surface",
    ],
    material: "PLA+ (high-strength)",
    dimensions: "4.5\" × 3.2\" × 5.1\"",
  },
  {
    id: "prod_002",
    slug: "cable-management-clip-set",
    name: "Cable Management Clip Set",
    price: 1299,
    description: "Keep your desk clean with this set of 6 cable organizer clips.",
    longDescription:
      "Say goodbye to cable chaos. These precision-printed clips mount to any desk edge or surface and keep your cables organized and tangle-free. Set includes 6 clips in two sizes.",
    image: "/products/cable-clips.jpg",
    category: "Cable Management",
    badge: "New",
    features: [
      "Set of 6 clips (3 small + 3 large)",
      "Strong adhesive backing included",
      "Fits cables up to 0.4\" diameter",
      "Easy install, no tools needed",
    ],
    material: "PETG (flexible & durable)",
    dimensions: "1.2\" × 0.8\" each",
  },
  {
    id: "prod_003",
    slug: "dual-monitor-riser",
    name: "Monitor Riser",
    price: 3499,
    description: "Elevate your monitor to ergonomic height with built-in storage.",
    longDescription:
      "Designed for the modern home office. This monitor riser lifts your screen to eye level while providing a hidden storage shelf underneath for remotes, notepads, and small accessories.",
    image: "/products/monitor-riser.jpg",
    category: "Desk Accessories",
    features: [
      "Supports monitors up to 27\"",
      "Built-in storage shelf",
      "Cable pass-through slots",
      "Anti-slip rubber pads",
    ],
    material: "PLA+ (high-strength)",
    dimensions: "22\" × 9\" × 4\"",
  },
  {
    id: "prod_004",
    slug: "headphone-stand",
    name: "Headphone Stand",
    price: 2199,
    description: "Sleek stand to display and store your headphones on your desk.",
    longDescription:
      "Protect your investment with a stand designed to preserve your headphone's shape while keeping them within easy reach. The minimalist design fits any desk aesthetic.",
    image: "/products/headphone-stand.jpg",
    category: "Desk Accessories",
    badge: "Popular",
    features: [
      "Fits all headphone sizes",
      "Weighted base for stability",
      "No sharp edges — safe for headband",
      "Compact footprint",
    ],
    material: "PLA+ (high-strength)",
    dimensions: "4\" × 4\" × 9\"",
  },
  {
    id: "prod_005",
    slug: "desk-organizer-pro",
    name: "Desk Organizer Pro",
    price: 2799,
    description: "5-compartment organizer for pens, cards, and desk essentials.",
    longDescription:
      "The ultimate desktop organizer. Five compartments of varying sizes keep your pens, business cards, sticky notes, and small items perfectly organized and always within reach.",
    image: "/products/desk-organizer.jpg",
    category: "Organization",
    features: [
      "5 compartments — various sizes",
      "Business card slot",
      "Phone rest slot",
      "Non-slip base",
    ],
    material: "PLA+ (high-strength)",
    dimensions: "8\" × 5\" × 4\"",
  },
  {
    id: "prod_006",
    slug: "tablet-stand-adjustable",
    name: "Adjustable Tablet Stand",
    price: 2499,
    description: "Foldable stand for iPads and tablets up to 13 inches.",
    longDescription:
      "The perfect companion for working with your tablet. The adjustable angle lets you find your ideal viewing position for reading, drawing, video calls, or streaming.",
    image: "/products/tablet-stand.jpg",
    category: "Desk Accessories",
    features: [
      "Fits tablets 7\"–13\"",
      "3 adjustable viewing angles",
      "Foldable for portability",
      "Soft grip padding",
    ],
    material: "PETG (flexible & durable)",
    dimensions: "6\" × 5\" × 7\"",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
