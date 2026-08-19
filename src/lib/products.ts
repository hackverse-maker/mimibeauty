export const assets = {
  dew: "/media__1784439730149.png",
  veil: "/media__1784439730152.png",
  herbe: "/media__1784439730167.png",
  halo: "/media__1784439730231.png",
  lineup: "/hero_dew_collection.jpg",
  water: "/hero_dew_girl_left.jpg",
  stone: "/contact_organic_bg.jpg",
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
    ingredients: [
      "Cyprus Rotundus Root Oil",
      "Simmondsia Chinensis Seed Oil",
      "Argania Spinosa Seed Oil",
      "Rosa Canina Seed Oil",
      "Tocopherol"
    ],
    directions: "After washing your face, apply 2–3 drops to clean, damp skin. Gently spread evenly over the face and neck until fully absorbed. Use morning and night for best results.",
    storageCaution: "Store in cool, dry place.\nFor external use only.\nAvoid direct eye contact.",
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
    ingredients: [
      "Caprylic/Capric Triglyceride",
      "Simmondsia Chinensis Seed Oil",
      "Nutgrass Tuber Oil",
      "Argania Spinosa Seed Oil",
      "Fragrance/Parfum"
    ],
    directions: "Apply 2–3 drops to wet hair after washing. Spread evenly through the mid-length to ends. For curly/wavy hair, use a comb for even distribution. Do not rinse. Towel dry only, then style as desired.",
    storageCaution: "Store in cool, dry place.\nFor external use only.\nAvoid direct eye contact.",
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
    ingredients: [
      "Caprylic/Capric Triglyceride",
      "Simmondsia Chinensis Seed Oil",
      "Argania Spinosa Seed Oil",
      "Rosa Canina Seed Oil",
      "Cyperus Rotundus Root Oil",
      "Tocopherol",
      "Fragrance/Parfum",
      "Mica"
    ],
    directions: "For best results, apply to clean, wet/damp skin for best absorption. If applying to dry skin, use a few pumps and massage well until fully absorbed. Use daily for soft, radiant and nourished skin.",
    storageCaution: "Store in cool, dry place.\nFor external use only.\nAvoid direct eye contact.",
    skinType: ["All"],
    description:
      "A nourishing body oil that melts into the skin, it deeply moisturises, reduces hair growth, leaves skin silky-smooth, and naturally luminous without a greasy finish.",
  },
  {
    slug: "pearl",
    name: "Pearl",
    tagline: "Satin Glow Body Oil",
    category: "BODY",
    collection: "Glow",
    price: 5000,
    originalPrice: 6500,
    size: "100ml",
    image: "/Pearl.png",
    hoverImage: assets.water,
    gallery: ["/Pearl.png", assets.water, assets.lineup, assets.stone],
    rating: 5.0,
    reviews: 328,
    theme: {
      bg: "#151515",
      accent: "#E8E8E8",
      accentMuted: "rgba(232,232,232,0.15)",
      surface: "rgba(232,232,232,0.04)",
      glow: "rgba(232,232,232,0.08)",
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
    ingredients: [
      "Caprylic/Capric Triglyceride",
      "Simmondsia Chinensis Seed Oil",
      "Argania Spinosa Seed Oil",
      "Rosa Canina Seed Oil",
      "Cyperus Rotundus Root Oil",
      "Tocopherol",
      "Fragrance/Parfum",
      "Mica"
    ],
    directions: "For best results, apply to clean, wet/damp skin for best absorption. If applying to dry skin, use a few pumps and massage well until fully absorbed. Use daily for soft, radiant and nourished skin.",
    storageCaution: "Store in cool, dry place. For external use only. Avoid direct eye contact.",
    skinType: ["All"],
    description:
      "A luminous pearl body oil that melts into the skin, it deeply moisturises, reduces hair growth, leaves skin silky-smooth, and naturally luminous without a greasy finish.",
  },
  {
    slug: "amalfi",
    name: "Amalfi",
    tagline: "Satin Glow Body Oil",
    category: "BODY",
    collection: "Glow",
    price: 5000,
    originalPrice: 6500,
    size: "100ml",
    image: "/Amalfi.png",
    hoverImage: assets.water,
    gallery: ["/Amalfi.png", assets.water, assets.lineup, assets.stone],
    rating: 4.9,
    reviews: 256,
    theme: {
      bg: "#1A1810",
      accent: "#D4A574",
      accentMuted: "rgba(212,165,116,0.15)",
      surface: "rgba(212,165,116,0.04)",
      glow: "rgba(212,165,116,0.08)",
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
    ingredients: [
      "Caprylic/Capric Triglyceride",
      "Simmondsia Chinensis Seed Oil",
      "Argania Spinosa Seed Oil",
      "Rosa Canina Seed Oil",
      "Cyperus Rotundus Root Oil",
      "Tocopherol",
      "Fragrance/Parfum",
      "Mica"
    ],
    directions: "For best results, apply to clean, wet/damp skin for best absorption. If applying to dry skin, use a few pumps and massage well until fully absorbed. Use daily for soft, radiant and nourished skin.",
    storageCaution: "Store in cool, dry place. For external use only. Avoid direct eye contact.",
    skinType: ["All"],
    description:
      "A warm golden body oil that melts into the skin, it deeply moisturises, reduces hair growth, leaves skin silky-smooth, and naturally luminous without a greasy finish.",
  },
  {
    slug: "santorini",
    name: "Santorini",
    tagline: "Satin Glow Body Oil",
    category: "BODY",
    collection: "Glow",
    price: 5000,
    originalPrice: 6500,
    size: "100ml",
    image: "/Santorini.png",
    hoverImage: assets.water,
    gallery: ["/Santorini.png", assets.water, assets.lineup, assets.stone],
    rating: 4.9,
    reviews: 189,
    theme: {
      bg: "#14181C",
      accent: "#7FB3D5",
      accentMuted: "rgba(127,179,213,0.15)",
      surface: "rgba(127,179,213,0.04)",
      glow: "rgba(127,179,213,0.08)",
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
    ingredients: [
      "Caprylic/Capric Triglyceride",
      "Simmondsia Chinensis Seed Oil",
      "Argania Spinosa Seed Oil",
      "Rosa Canina Seed Oil",
      "Cyperus Rotundus Root Oil",
      "Tocopherol",
      "Fragrance/Parfum",
      "Mica"
    ],
    directions: "For best results, apply to clean, wet/damp skin for best absorption. If applying to dry skin, use a few pumps and massage well until fully absorbed. Use daily for soft, radiant and nourished skin.",
    storageCaution: "Store in cool, dry place. For external use only. Avoid direct eye contact.",
    skinType: ["All"],
    description:
      "A cool blue body oil that melts into the skin, it deeply moisturises, reduces hair growth, leaves skin silky-smooth, and naturally luminous without a greasy finish.",
  },
];

export const ingredientsShowcase = [
  {
    name: "Trans-Retinoic Acid",
    note: "Nature’s retinol, rich in antioxidants and essential fatty acids to support smoother, brighter, healthier-looking skin.",
  },
  {
    name: "Alpha Cyperone",
    note: "An antioxidant-rich botanical that helps calm, strengthen, and support the skin’s natural barrier for a balanced complexion.",
  },
  {
    name: "Endogenous Squalene",
    note: "Rich in vitamin E and essential fatty acids to deeply nourish, soften, and strengthen the skin for a smooth, healthy-looking glow.",
  },
  {
    name: "Ricinoleic Acid",
    note: "Rich in essential fatty acids to deeply condition the scalp and hair while supporting softer, stronger, healthier-looking strands.",
  },
  {
    name: "Gadoleic Acid",
    note: "Lightweight and fast-absorbing, Gadoleic Acid helps smooth, soften, and protect hair while locking in lasting moisture without weighing it down.",
  },
  {
    name: "Tocotrienols",
    note: "An antioxidant-rich vitamin that helps protect, condition, and strengthen hair while enhancing softness, moisture, and natural shine.",
  },
  {
    name: "Pilocarpine",
    note: "Traditionally valued in botanical hair care to help nourish the scalp and support stronger, healthier-looking hair.",
  },
  {
    name: "Citral",
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
