import type { Product } from "./products";

export type BundleType = "fixed" | "configurable" | "custom";

export type BundleConfiguration = {
  type: BundleType;
  productIds: string[];
  requiresBodyOil?: boolean;
  bodyOilCount?: number;
};

export type Bundle = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  productIds: string[];
  image: string;
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  savings: number;
  configuration: BundleConfiguration;
  isFlagship?: boolean;
  isCustom?: boolean;
};

export const bundles: Bundle[] = [
  // 1. HAIR BUNDLE — VEIL + HERBÉ
  {
    id: "hair-bundle",
    slug: "hair-bundle",
    name: "Hair Bundle",
    category: "Hair",
    description: "VEIL + HERBÉ. Nourish your roots and elevate your hair ritual.",
    productIds: ["veil", "herbe"],
    image: "/03_root_to_radiance.jpg",
    originalPrice: 8000,
    discountPercent: 10,
    finalPrice: 7200,
    savings: 800,
    configuration: {
      type: "fixed",
      productIds: ["veil", "herbe"],
    },
  },

  // 2. FACE + HAIR BUNDLE — DEW + VEIL + HERBÉ
  {
    id: "face-hair-bundle",
    slug: "face-hair-bundle",
    name: "Face + Hair Bundle",
    category: "Face + Hair",
    description: "DEW + VEIL + HERBÉ. Skin that glows and hair that flows.",
    productIds: ["dew", "veil", "herbe"],
    image: "/04_radiant_you.jpg",
    originalPrice: 11500,
    discountPercent: 10,
    finalPrice: 10350,
    savings: 1150,
    configuration: {
      type: "fixed",
      productIds: ["dew", "veil", "herbe"],
    },
  },

  // 3. ALL 4 PRODUCTS — DEW + VEIL + HERBÉ + 1 Body Oil
  {
    id: "all-four-bundle",
    slug: "all-four-bundle",
    name: "All 4 Products",
    category: "Complete Ritual",
    description: "DEW + VEIL + HERBÉ + your preferred body oil. The full Mimi ritual.",
    productIds: ["dew", "veil", "herbe"],
    image: "/05_complete_glow.jpg",
    originalPrice: 16500,
    discountPercent: 10,
    finalPrice: 14850,
    savings: 1650,
    configuration: {
      type: "configurable",
      productIds: ["dew", "veil", "herbe"],
      requiresBodyOil: true,
      bodyOilCount: 1,
    },
  },

  // 4a. BODY LAVA — 2 OILS
  {
    id: "body-lava-duo",
    slug: "body-lava-duo",
    name: "Body Lava — 2 Oils",
    category: "Body Oil",
    description: "Choose any 2 body oils from HALO, PEARL, SANTORINI & AMALFI.",
    productIds: [],
    image: "/06_halo_duo.jpg",
    originalPrice: 10000,
    discountPercent: 10,
    finalPrice: 9000,
    savings: 1000,
    configuration: {
      type: "configurable",
      productIds: [],
      requiresBodyOil: true,
      bodyOilCount: 2,
    },
  },

  // 4b. BODY LAVA — ALL 4 OILS
  {
    id: "body-lava-quartet",
    slug: "body-lava-quartet",
    name: "Body Lava — All 4 Oils",
    category: "Body Oil",
    description: "All 4 body oils: HALO, PEARL, SANTORINI & AMALFI.",
    productIds: ["halo", "pearl", "amalfi", "santorini"],
    image: "/07_halo_quartet.jpg",
    originalPrice: 20000,
    discountPercent: 10,
    finalPrice: 18000,
    savings: 2000,
    configuration: {
      type: "fixed",
      productIds: ["halo", "pearl", "amalfi", "santorini"],
    },
  },

  // 5. ALL-IN-ONE — All 7 products
  {
    id: "all-in-one",
    slug: "all-in-one",
    name: "All-In-One Bundle",
    category: "Complete Collection",
    description: "All 7 products: DEW, VEIL, HERBÉ, HALO, PEARL, SANTORINI & AMALFI.",
    productIds: ["dew", "veil", "herbe", "halo", "pearl", "amalfi", "santorini"],
    image: "/08_everything_set.jpg",
    originalPrice: 31500,
    discountPercent: 20,
    finalPrice: 25200,
    savings: 6300,
    isFlagship: true,
    configuration: {
      type: "fixed",
      productIds: ["dew", "veil", "herbe", "halo", "pearl", "amalfi", "santorini"],
    },
  },

  // 6. MAKE YOUR OWN BUNDLE
  {
    id: "make-your-own-bundle",
    slug: "make-your-own-bundle",
    name: "Mimi's Edit — Make Your Own",
    category: "Custom Bundle",
    description: "Create your perfect Mimi Beauty ritual, your way. 10% off any 2+ products.",
    productIds: [],
    image: "/09_mimis_edit.jpg",
    originalPrice: 0,
    discountPercent: 10,
    finalPrice: 0,
    savings: 0,
    isCustom: true,
    configuration: {
      type: "custom",
      productIds: [],
    },
  },
];

export function findBundle(slug: string): Bundle | undefined {
  const normalized = slug.toLowerCase();
  return bundles.find(
    (b) =>
      b.slug === normalized ||
      b.id === normalized ||
      // Legacy slug aliases
      (normalized === "luna-glow" && b.slug === "hair-bundle") ||
      (normalized === "luna-glow-duo" && b.slug === "hair-bundle") ||
      (normalized === "root-to-radiance" && b.slug === "hair-bundle") ||
      (normalized === "radiant-you" && b.slug === "face-hair-bundle") ||
      (normalized === "the-complete-glow" && b.slug === "all-four-bundle") ||
      (normalized === "halo-duo" && b.slug === "body-lava-duo") ||
      (normalized === "halo-quartet" && b.slug === "body-lava-quartet") ||
      (normalized === "the-mimi-collection" && b.slug === "all-in-one") ||
      (normalized === "the-everything-set" && b.slug === "all-in-one") ||
      (normalized === "mimis-edit" && b.slug === "make-your-own-bundle")
  );
}

export function calculateBundlePrice(
  productIds: string[],
  products: Product[],
  discountPercent: number = 10
): { originalPrice: number; finalPrice: number; savings: number } {
  const originalPrice = productIds.reduce((total, id) => {
    const product = products.find(
      (p) => p.slug === id || (id === "herba" && p.slug === "herbe")
    );
    return total + (product?.price || 0);
  }, 0);

  const savings = Math.round((originalPrice * discountPercent) / 100);
  const finalPrice = originalPrice - savings;

  return { originalPrice, finalPrice, savings };
}
