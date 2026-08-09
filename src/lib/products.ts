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
    tagline: "A Daily Ritual for Balanced, Healthy-Looking Skin",
    category: "Serum",
    collection: "Glow",
    price: 3500,
    originalPrice: 4500,
    size: "30ml",
    image: assets.halo,
    hoverImage: assets.water,
    gallery: [assets.halo, assets.water, assets.lineup, assets.stone],
    rating: 4.9,
    reviews: 428,
    benefits: [
      "Lightweight, fast-absorbing dry oil formula",
      "Helps maintain balanced hydration",
      "Supports a healthy skin barrier",
      "Helps calm the appearance of stressed, blemish-prone skin",
      "Leaves skin soft, smooth, and naturally radiant",
      "Comfortable, non-greasy finish",
      "Suitable for daily morning and evening use",
      "Crafted with carefully selected botanical ingredients"
    ],
    ingredients: ["Niacinamide 5%", "Hyaluronic Acid", "Ceramides", "Squalane"],
    directions: "Apply 3–4 drops to clean skin, morning and night. Follow with moisturizer.",
    skinType: ["All", "Dry", "Sensitive"],
    description:
      "Healthy skin begins with balance. When skin becomes dehydrated or repeatedly stripped of moisture, it often responds by producing excess oil in an effort to protect itself. Over time, this imbalance can leave your complexion feeling dry, congested, oily, or more prone to visible blemishes.\n\nDEW is designed to help restore that balance. Powered by a carefully curated blend of botanical oils that work in harmony with the skin's natural barrier, its lightweight formula absorbs effortlessly to replenish moisture, reinforce barrier function, and leave skin feeling soft, comfortable, and naturally radiant without a heavy or greasy finish.\n\nA resilient skin barrier is the foundation of calm, balanced skin. By helping strengthen and support the skin's natural protective barrier, DEW encourages a complexion that feels less reactive and better able to maintain lasting hydration and comfort over time.\n\nRather than simply providing temporary hydration, DEW works alongside your skin to support long-term balance, resilience, and everyday radiance.\n\nSimple. Effective. Intentionally balanced.",
  },
  {
    slug: "veil",
    name: "Veil",
    tagline: "A Lightweight Finish. Everyday Protection.",
    category: "Hair",
    collection: "Hydration",
    price: 3500,
    originalPrice: 4500,
    size: "30ml",
    image: assets.veil,
    hoverImage: assets.lineup,
    gallery: [assets.veil, assets.lineup, assets.water, assets.stone],
    rating: 4.8,
    reviews: 312,
    benefits: [
      "Lightweight, fast-absorbing dry oil formula",
      "Helps protect against everyday heat styling",
      "Helps reduce frizz",
      "Enhances softness, smoothness, and natural shine",
      "Leaves hair feeling silky without weighing it down",
      "Suitable for damp or dry hair",
      "Designed for all hair types and textures",
      "Crafted with carefully selected botanical ingredients"
    ],
    ingredients: ["Argan Oil", "Silk Proteins", "Vitamin E", "Camellia"],
    directions: "Warm 2–3 drops between palms and glide through damp or dry lengths.",
    skinType: ["All hair types"],
    description:
      "The care your hair receives after cleansing is just as important as the care it receives before. Freshly washed hair is more vulnerable to moisture loss, frizz, and heat damage. VEIL Post-Wash Hair Serum is formulated to nourish and protect every strand while enhancing softness, smoothness, and natural shine without weighing it down.\n\nIts lightweight dry oil formula absorbs effortlessly into damp or dry hair, smoothing the hair cuticle while creating a breathable protective layer around each strand to help shield against everyday heat styling. The result is hair that feels silky, polished, beautifully manageable, and refreshed with every application, turning your routine into an indulgent sensory experience. Designed for every hair texture, VEIL enhances your hair's natural character rather than masking it, leaving curls defined, waves soft and bouncy, and straight hair sleek with a luminous, healthy-looking finish.\n\nA simple finishing ritual for hair that feels nourished, protected, and effortlessly refined.",
  },
  {
    slug: "herbe",
    name: "Herbé",
    tagline: "Prepare Your Scalp. Nourish Your Hair.",
    category: "Scalp",
    collection: "Anti Aging",
    price: 4500,
    originalPrice: 5500,
    size: "50ml",
    image: assets.herbe,
    hoverImage: assets.stone,
    gallery: [assets.herbe, assets.stone, assets.water, assets.lineup],
    rating: 4.9,
    reviews: 271,
    benefits: [
      "Nourishes the scalp before cleansing",
      "Helps replenish moisture before shampooing",
      "Helps prepare the scalp and hair for cleansing",
      "Leaves hair feeling softer and easier to manage",
      "Lightweight formula that rinses away easily",
      "Suitable for all hair types",
      "Crafted with carefully selected botanical ingredients"
    ],
    ingredients: ["Rosemary", "Peptides", "Tea Tree", "Green Tea"],
    directions: "Massage into dry scalp. Leave 10 minutes before cleansing.",
    skinType: ["Sensitive scalp", "Oily"],
    description:
      "Healthy hair begins with a healthy scalp. Repeated shampooing after conventional scalp treatments to remove product build-up can leave the scalp feeling stripped of its natural oils, making it more prone to dryness and discomfort. HERBÈ Pre-Wash Scalp Treatment helps replenish moisture before cleansing, creating the ideal foundation for a healthier scalp and softer, stronger-looking hair.\n\nPowered by a carefully selected blend of botanical oils and plant extracts, its lightweight formula helps nourish the scalp, condition the hair, and prepare both scalp and hair before cleansing without leaving behind a heavy or greasy feel. Applied before shampooing, HERBÈ transforms wash day into a simple ritual of intentional care, leaving the scalp feeling refreshed while hair feels softer, smoother, healthier, and easier to manage after every wash.",
  },
  {
    slug: "halo",
    name: "Hálo",
    tagline: "Lightweight Nourishment. Lasting Comfort.",
    category: "Body",
    collection: "Glow",
    price: 5000,
    originalPrice: 6500,
    size: "100ml",
    image: assets.dew,
    hoverImage: assets.water,
    gallery: [assets.dew, assets.water, assets.lineup, assets.stone],
    rating: 5.0,
    reviews: 542,
    benefits: [
      "Lightweight, fast-absorbing dry oil formula",
      "Deeply nourishes without feeling greasy",
      "Helps support the skin's natural moisture barrier",
      "Leaves skin soft, smooth, and naturally radiant",
      "Comforts skin after shaving or waxing",
      "Suitable for everyday use",
      "Crafted with carefully selected botanical ingredients"
    ],
    ingredients: ["Rosehip", "Vitamin C", "Jojoba", "Rose Absolute"],
    directions: "Mist onto damp skin after bathing. Massage in circular motions.",
    skinType: ["All"],
    description:
      "Healthy skin deserves more than surface hydration. While many body moisturisers create a temporary layer that can feel heavy or sticky, HÁLO Body Oil is crafted with a carefully balanced blend of botanical oils that absorb beautifully into the skin, delivering lasting nourishment without residue.\n\nIts lightweight dry oil texture helps replenish moisture, support the skin's natural barrier, and leave skin feeling soft, supple, and comfortably hydrated with a natural, healthy glow.\n\nWhether applied after showering, following shaving or waxing, or whenever your skin needs extra care, HÁLO melts effortlessly into the skin, providing lasting comfort and a silky finish that never feels greasy.\n\nA simple daily ritual for skin that feels nourished, balanced, and beautifully radiant.",
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
