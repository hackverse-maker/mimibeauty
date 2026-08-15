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

export type ProductTheme = {
  bg: string;         // page background color
  accent: string;     // accent / highlight color
  accentMuted: string; // muted accent for borders / subtle elements
  surface: string;    // card / panel surface color
  glow: string;       // rgba glow color for decorative blobs
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
  storageCaution?: string;
  skinType: string[];
  description: string;
  gallery: string[];
  theme: ProductTheme;
};

export const products: Product[] = [
  {
    slug: "dew",
    name: "Dew",
    tagline: "Barrier Repair Face Serum",
    category: "SERUM",
    collection: "Glow",
    price: 3500,
    originalPrice: 4500,
    size: "30ml",
    image: assets.halo,
    hoverImage: assets.water,
    gallery: [assets.halo, assets.water, assets.lineup, assets.stone],
    rating: 4.9,
    reviews: 428,
    theme: {
      bg: "#0E0E0E",
      accent: "#C9A86A",
      accentMuted: "rgba(201,168,106,0.15)",
      surface: "rgba(255,255,255,0.03)",
      glow: "rgba(201,168,106,0.06)",
    },
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
    storageCaution: "Store in cool, dry place. For external use only. Avoid direct eye contact.",
    skinType: ["All", "Dry", "Sensitive"],
    description:
      "A lightweight face serum that restores moisture, repairs skin barrier, leaves your skin soft, smooth, naturally radiant and blemish free.",
  },
  {
    slug: "veil",
    name: "Veil",
    tagline: "Post Wash Leave-In Serum",
    category: "HAIR",
    collection: "Hydration",
    price: 3500,
    originalPrice: 4500,
    size: "30ml",
    image: assets.veil,
    hoverImage: assets.lineup,
    gallery: [assets.veil, assets.lineup, assets.water, assets.stone],
    rating: 4.8,
    reviews: 312,
    theme: {
      bg: "#1A1008",
      accent: "#C4956A",
      accentMuted: "rgba(196,149,106,0.15)",
      surface: "rgba(196,149,106,0.04)",
      glow: "rgba(196,149,106,0.07)",
    },
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
    storageCaution: "Store in cool, dry place. For external use only. Avoid direct eye contact.",
    skinType: ["All hair types"],
    description:
      "A lightweight glossy finish serum that smooths cuticles, softens hair, enhances natural shine and keeps frizz under control without weighing hair down.\nSuitable for straight/wavy and curly hair.",
  },
  {
    slug: "herbe",
    name: "Herbè",
    tagline: "Pre Wash Scalp Treatment",
    category: "SCALP",
    collection: "Anti Aging",
    price: 4500,
    originalPrice: 5500,
    size: "50ml",
    image: assets.herbe,
    hoverImage: assets.stone,
    gallery: [assets.herbe, assets.stone, assets.water, assets.lineup],
    rating: 4.9,
    reviews: 271,
    theme: {
      bg: "#0C1410",
      accent: "#7AAB6E",
      accentMuted: "rgba(122,171,110,0.15)",
      surface: "rgba(122,171,110,0.04)",
      glow: "rgba(122,171,110,0.07)",
    },
    benefits: [
      "Nourishes the scalp before cleansing",
      "Helps replenish moisture before shampooing",
      "Helps prepare the scalp and hair for cleansing",
      "Leaves hair feeling softer and easier to manage",
      "Lightweight formula that rinses away easily",
      "Suitable for all hair types",
      "Crafted with carefully selected botanical ingredients"
    ],
    ingredients: [
      "Rice Bran Oil",
      "Caprylic/Capric Triglyceride",
      "Simmondsia Chinensis Seed Oil",
      "Pycnogenol",
      "Microphyllus Leaf Extract",
      "Argania Spinosa Seed Oil",
      "Rosa Canina Seed Oil",
      "Polysorbate 80",
      "Tocopherol"
    ],
    directions: "Apply directly, using dropper to scalp and massage gently using fingertips. Leave on for at least 30 mins or overnight. Wash thoroughly with mild shampoo. Use 1–2 times per week.",
    storageCaution: "Store in cool, dry place. For external use only. Avoid direct eye contact.",
    skinType: ["Sensitive scalp", "Oily"],
    description:
      "A nourishing pre-wash treatment that restores scalp pH, activates lazy hair follicles, cleanses scalp and leaves scalp deeply nourished, dandruff free with visibly smooth and healthy hair.",
  },
  {
    slug: "halo",
    name: "Halò",
    tagline: "Satin Glow Body Oil",
    category: "BODY",
    collection: "Glow",
    price: 5000,
    originalPrice: 6500,
    size: "100ml",
    image: assets.dew,
    hoverImage: assets.water,
    gallery: [assets.dew, assets.water, assets.lineup, assets.stone],
    rating: 5.0,
    reviews: 542,
    theme: {
      bg: "#150C0D",
      accent: "#B5717A",
      accentMuted: "rgba(181,113,122,0.15)",
      surface: "rgba(181,113,122,0.04)",
      glow: "rgba(181,113,122,0.08)",
    },
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
    storageCaution: "Store in cool, dry place. For external use only. Avoid direct eye contact.",
    skinType: ["All"],
    description:
      "A nourishing body oil that melts into the skin, it deeply moisturises, reduces hair growth, leaves skin silky-smooth, and naturally luminous without a greasy finish.",
  },
  {
    slug: "pearl",
    name: "Pearl",
    tagline: "Illuminating Body Oil",
    category: "BODY",
    collection: "Glow",
    price: 5000,
    originalPrice: 6500,
    size: "100ml",
    image: assets.dew,
    hoverImage: assets.water,
    gallery: [assets.dew, assets.water, assets.lineup, assets.stone],
    rating: 4.9,
    reviews: 428,
    theme: {
      bg: "#1A1518",
      accent: "#D4B5A0",
      accentMuted: "rgba(212,181,160,0.15)",
      surface: "rgba(212,181,160,0.04)",
      glow: "rgba(212,181,160,0.08)",
    },
    benefits: [
      "Lightweight shimmering formula",
      "Illuminates skin with subtle glow",
      "Deeply hydrates without greasiness",
      "Enhances natural skin radiance",
      "Perfect for special occasions",
      "Suitable for all skin tones",
      "Crafted with illuminating botanicals"
    ],
    ingredients: ["Pearl Extract", "Mica", "Jojoba", "Vitamin E"],
    directions: "Apply to skin and blend in circular motions for a luminous finish.",
    storageCaution: "Store in cool, dry place. For external use only. Avoid direct eye contact.",
    skinType: ["All"],
    description:
      "An illuminating body oil that adds a subtle, sophisticated glow to skin while deeply moisturizing and enhancing natural radiance.",
  },
  {
    slug: "santorini",
    name: "Santorini",
    tagline: "Mediterranean Body Oil",
    category: "BODY",
    collection: "Glow",
    price: 5000,
    originalPrice: 6500,
    size: "100ml",
    image: assets.dew,
    hoverImage: assets.water,
    gallery: [assets.dew, assets.water, assets.lineup, assets.stone],
    rating: 4.8,
    reviews: 389,
    theme: {
      bg: "#151218",
      accent: "#A8C8B8",
      accentMuted: "rgba(168,200,184,0.15)",
      surface: "rgba(168,200,184,0.04)",
      glow: "rgba(168,200,184,0.08)",
    },
    benefits: [
      "Mediterranean botanical blend",
      "Deeply nourishing formula",
      "Leaves skin feeling refreshed",
      "Calming and rejuvenating",
      "Perfect for after-sun care",
      "Suitable for daily use",
      "Crafted with Mediterranean ingredients"
    ],
    ingredients: ["Olive Oil", "Sea Fennel", "Algae Extract", "Aloe"],
    directions: "Massage onto skin after bathing for deep hydration and Mediterranean radiance.",
    storageCaution: "Store in cool, dry place. For external use only. Avoid direct eye contact.",
    skinType: ["All"],
    description:
      "A Mediterranean-inspired body oil that nourishes and rejuvenates skin with a blend of sea botanicals and olive derivatives.",
  },
  {
    slug: "amalfi",
    name: "Amalfi",
    tagline: "Citrus Body Oil",
    category: "BODY",
    collection: "Glow",
    price: 5000,
    originalPrice: 6500,
    size: "100ml",
    image: assets.dew,
    hoverImage: assets.water,
    gallery: [assets.dew, assets.water, assets.lineup, assets.stone],
    rating: 4.9,
    reviews: 456,
    theme: {
      bg: "#1A1612",
      accent: "#E8C87A",
      accentMuted: "rgba(232,200,122,0.15)",
      surface: "rgba(232,200,122,0.04)",
      glow: "rgba(232,200,122,0.08)",
    },
    benefits: [
      "Refreshing citrus blend",
      "Energizing aromatherapy",
      "Deeply moisturizing",
      "Brightens skin appearance",
      "Uplifting citrus scent",
      "Suitable for all skin types",
      "Crafted with citrus botanicals"
    ],
    ingredients: ["Lemon Extract", "Orange Oil", "Grapefruit", "Vitamin C"],
    directions: "Apply to skin with gentle massage for energizing hydration and citrus radiance.",
    storageCaution: "Store in cool, dry place. For external use only. Avoid direct eye contact.",
    skinType: ["All"],
    description:
      "A refreshing citrus body oil that energizes and brightens skin while providing deep hydration with an uplifting Mediterranean citrus blend.",
  },
];

export const ingredientsShowcase = [
  {
    name: "Rosehip Oil",
    note: "Nature’s retinol, rich in antioxidants and essential fatty acids to support smoother, brighter, healthier-looking skin.",
  },
  {
    name: "Cyperus Rotundus Oil",
    note: "An antioxidant-rich botanical that helps calm, strengthen, and support the skin’s natural barrier for a balanced complexion.",
  },
  {
    name: "Argan Oil",
    note: "Rich in vitamin E and essential fatty acids to deeply nourish, soften, and strengthen the skin for a smooth, healthy-looking glow.",
  },
  {
    name: "Castor Oil",
    note: "Rich in essential fatty acids to deeply condition the scalp and hair while supporting softer, stronger, healthier-looking strands.",
  },
  {
    name: "Jojoba Oil",
    note: "Lightweight and fast-absorbing, Jojoba Oil helps smooth, soften, and protect hair while locking in lasting moisture without weighing it down.",
  },
  {
    name: "Vitamin E",
    note: "An antioxidant-rich vitamin that helps protect, condition, and strengthen hair while enhancing softness, moisture, and natural shine.",
  },
  {
    name: "Jaborandi Root Extract",
    note: "Traditionally valued in botanical hair care to help nourish the scalp and support stronger, healthier-looking hair.",
  },
  {
    name: "Lemongrass Botanical Infusion",
    note: "An invigorating botanical infusion that helps refresh, rebalance, and purify the scalp for a clean, revitalised feel.",
  },
  {
    name: "Mimi Signature Accord",
    note: "An exclusive fragrance composition developed to give every formula its distinctive, elegant identity.",
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
