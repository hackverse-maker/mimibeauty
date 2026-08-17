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
  {
    id: "luna-glow",
    slug: "luna-glow",
    name: "Luna Glow",
    category: "Face + Body",
    description: "DEW + 1 Body Oil of customer's choice",
    productIds: ["dew"],
    image: "/02_luna_glow_duo.jpg",
    originalPrice: 8500,
    discountPercent: 10,
    finalPrice: 7650,
    savings: 850,
    configuration: {
      type: "configurable",
      productIds: ["dew"],
      requiresBodyOil: true,
      bodyOilCount: 1,
    },
  },
  {
    id: "root-to-radiance",
    slug: "root-to-radiance",
    name: "Root To Radiance",
    category: "Hair",
    description: "VEIL + HERBA. Nourish your roots, shine through.",
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
  {
    id: "radiant-you",
    slug: "radiant-you",
    name: "Radiant You",
    category: "Face + Hair",
    description: "DEW + VEIL + HERBA for skin that glows and hair that flows.",
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
  {
    id: "the-complete-glow",
    slug: "the-complete-glow",
    name: "The Complete Glow",
    category: "All Four",
    description: "DEW + VEIL + HERBA + 1 Body Oil of customer's choice",
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
  {
    id: "halo-duo",
    slug: "halo-duo",
    name: "Halo Duo",
    category: "Body Oil",
    description: "Any 2 Body Oils of customer's choice",
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
  {
    id: "halo-quartet",
    slug: "halo-quartet",
    name: "Halo Quartet",
    category: "Body Oil",
    description: "All 4 Body Oils: HALO, PEARL, AMALFI & SANTORINI",
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
  {
    id: "the-mimi-collection",
    slug: "the-mimi-collection",
    name: "The Mimi Collection / All In One",
    category: "Complete Collection",
    description: "The complete collection containing all 7 essential products.",
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
  {
    id: "make-your-own-bundle",
    slug: "make-your-own-bundle",
    name: "Mimi's Edit — Mimi Edits",
    category: "Custom Bundle",
    description: "Create your perfect Mimi Beauty ritual, your way.",
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
      (normalized === "luna-glow-duo" && b.slug === "luna-glow") ||
      (normalized === "the-everything-set" && b.slug === "the-mimi-collection") ||
      (normalized === "mimis-edit" && b.slug === "make-your-own-bundle")
  );
}

export function calculateBundlePrice(
  productIds: string[],
  products: Product[],
  discountPercent: number = 10
): { originalPrice: number; finalPrice: number; savings: number } {
  const originalPrice = productIds.reduce((total, id) => {
    const product = products.find((p) => p.slug === id || (id === "herba" && p.slug === "herbe"));
    return total + (product?.price || 0);
  }, 0);

  const savings = Math.round((originalPrice * discountPercent) / 100);
  const finalPrice = originalPrice - savings;

  return { originalPrice, finalPrice, savings };
}
