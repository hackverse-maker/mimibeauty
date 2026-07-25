import dewAsset from "@/assets/dew.asset.json";
import veilAsset from "@/assets/veil.asset.json";
import herbeAsset from "@/assets/herbe.asset.json";
import haloAsset from "@/assets/halo.asset.json";
import lineupAsset from "@/assets/lineup.asset.json";
import waterAsset from "@/assets/water.asset.json";
import stoneAsset from "@/assets/stone.asset.json";
import logoAsset from "@/assets/logo.asset.json";

export const assets = {
  dew: "/media__1784439730149.png",
  veil: "/media__1784439730152.png",
  herbe: "/media__1784439730167.png",
  halo: "/media__1784439730231.png",
  lineup: lineupAsset.url,
  water: waterAsset.url,
  stone: stoneAsset.url,
  logo: "/logo.png",
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  collection: string;
  price: number;
  originalPrice: number;
  size: string;
  image: string;
  hoverImage: string;
  rating: number;
  reviews: number;
  benefits: string[];
  ingredients: string[];
  directions: string;
  skinType: string[];
  description: string;
};

export const products: Product[] = [
  {
    slug: "dew",
    name: "Dew",
    tagline: "Barrier Repair · Dewy Glow Face Serum",
    category: "Serum",
    collection: "Glow",
    price: 68,
    originalPrice: 85,
    size: "30ml",
    image: assets.dew,
    hoverImage: assets.water,
    rating: 4.9,
    reviews: 428,
    benefits: ["Hydrate", "Repair", "Glow"],
    ingredients: ["Niacinamide 5%", "Hyaluronic Acid", "Ceramides", "Squalane"],
    directions: "Apply 3–4 drops to clean skin, morning and night. Follow with moisturizer.",
    skinType: ["All", "Dry", "Sensitive"],
    description:
      "A weightless, deeply hydrating serum that rebuilds the moisture barrier while leaving skin with a soft, luminous finish.",
  },
  {
    slug: "veil",
    name: "Veil",
    tagline: "Post Wash · Leave-In Hair Serum",
    category: "Hair",
    collection: "Hydration",
    price: 54,
    originalPrice: 72,
    size: "30ml",
    image: assets.veil,
    hoverImage: assets.lineup,
    rating: 4.8,
    reviews: 312,
    benefits: ["Smooth", "Protect", "Shine"],
    ingredients: ["Argan Oil", "Silk Proteins", "Vitamin E", "Camellia"],
    directions: "Warm 2–3 drops between palms and glide through damp or dry lengths.",
    skinType: ["All hair types"],
    description:
      "A silken finishing serum that seals cuticles, shields against heat, and leaves a mirrored, weightless shine.",
  },
  {
    slug: "herbe",
    name: "Herbé",
    tagline: "Pre Wash · Scalp Treatment",
    category: "Scalp",
    collection: "Anti Aging",
    price: 62,
    originalPrice: 78,
    size: "50ml",
    image: assets.herbe,
    hoverImage: assets.stone,
    rating: 4.9,
    reviews: 271,
    benefits: ["Nourish", "Strengthen", "Balance"],
    ingredients: ["Rosemary", "Peptides", "Tea Tree", "Green Tea"],
    directions: "Massage into dry scalp. Leave 10 minutes before cleansing.",
    skinType: ["Sensitive scalp", "Oily"],
    description:
      "A botanical scalp ritual that rebalances the follicular ecosystem for longer, stronger, more resilient hair.",
  },
  {
    slug: "halo",
    name: "Hálo",
    tagline: "Satin Glow · Body Oil",
    category: "Body",
    collection: "Glow",
    price: 78,
    originalPrice: 98,
    size: "100ml",
    image: assets.halo,
    hoverImage: assets.water,
    rating: 5.0,
    reviews: 542,
    benefits: ["Radiance", "Hydrate", "Replenish"],
    ingredients: ["Rosehip", "Vitamin C", "Jojoba", "Rose Absolute"],
    directions: "Mist onto damp skin after bathing. Massage in circular motions.",
    skinType: ["All"],
    description:
      "A luminous, fast-absorbing body oil layered with rose absolute for a soft-focus satin finish that lingers.",
  },
];

export const categories = [
  "Cleanser",
  "Serum",
  "Moisturizer",
  "Toner",
  "Sunscreen",
  "Face Mask",
  "Eye Care",
  "Lip Care",
];

export const collections = [
  { slug: "glow", name: "Glow Collection", tone: "from-[oklch(0.86_0.08_78)] to-[oklch(0.74_0.09_78)]" },
  { slug: "hydration", name: "Hydration Collection", tone: "from-[oklch(0.85_0.05_220)] to-[oklch(0.65_0.09_220)]" },
  { slug: "anti-aging", name: "Anti Aging", tone: "from-[oklch(0.35_0.06_145)] to-[oklch(0.22_0.05_145)]" },
  { slug: "sensitive", name: "Sensitive Skin", tone: "from-[oklch(0.9_0.03_20)] to-[oklch(0.78_0.06_20)]" },
  { slug: "acne", name: "Acne Care", tone: "from-[oklch(0.6_0.15_15)] to-[oklch(0.4_0.1_15)]" },
];

export const ingredientsShowcase = [
  { name: "Niacinamide", note: "Even tone · Refine pores", category: "Brightening" },
  { name: "Vitamin C", note: "Brighten · Antioxidant shield", category: "Antioxidant" },
  { name: "Retinol", note: "Renew · Smooth texture", category: "Renewal" },
  { name: "Ceramides", note: "Restore barrier · Comfort", category: "Barrier" },
  { name: "Peptides", note: "Firm · Rebuild collagen", category: "Firming" },
  { name: "Hyaluronic Acid", note: "Plump · Deep hydration", category: "Hydration" },
];

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
