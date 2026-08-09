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
  gallery: string[];
};

export const products: Product[] = [
  {
    slug: "dew",
    name: "Dew",
    tagline: "Barrier Repair · Dewy Glow Face Serum",
    category: "Serum",
    collection: "Glow",
    price: 3500,
    originalPrice: 4500,
    size: "30ml",
    image: "/products/dew-hero.png",
    hoverImage: "/products/dew-detail.png",
    gallery: ["/products/dew-hero.png", "/products/dew-detail.png", "/products/dew-texture.png", assets.water],
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
    price: 3500,
    originalPrice: 4500,
    size: "30ml",
    image: "/products/veil-hero.png",
    hoverImage: "/products/veil-detail.png",
    gallery: ["/products/veil-hero.png", "/products/veil-detail.png", "/products/veil-texture.png", assets.lineup],
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
    price: 4500,
    originalPrice: 5500,
    size: "50ml",
    image: "/products/herbe-hero.png",
    hoverImage: "/products/herbe-detail.png",
    gallery: ["/products/herbe-hero.png", "/products/herbe-detail.png", "/products/herbe-texture.png", assets.stone],
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
    price: 5000,
    originalPrice: 6500,
    size: "100ml",
    image: "/products/halo-hero.png",
    hoverImage: "/products/halo-detail.png",
    gallery: ["/products/halo-hero.png", "/products/halo-detail.png", "/products/halo-texture.png", assets.water],
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

export const ingredientsShowcase = [
  {
    name: "Niacinamide",
    note: "Evens tone, refines pores, and supports a stronger skin barrier.",
  },
  {
    name: "Vitamin C",
    note: "Brightens dullness, protects against oxidative stress, and supports radiance.",
  },
  {
    name: "Retinol",
    note: "Encourages cell renewal, improves texture, and supports smoother skin.",
  },
  {
    name: "Jojoba Oil",
    note: "Balances oil production, hydrates deeply, and supports a healthy barrier.",
  },
  {
    name: "Rosehip Oil",
    note: "Nourishes dry skin, softens texture, and restores a healthy-looking glow.",
  },
  {
    name: "Hyaluronic Acid",
    note: "Draws in lasting hydration for a plumper, softer, more supple finish.",
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

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
