import type { Product } from "./products";

export type BundleType = "fixed" | "configurable" | "custom";
export type BundleConfiguration = {
  type: BundleType;
  productIds: string[];
  bodyOilChoice?: "required" | "optional" | "none";
  selectionMode?: "single" | "multiple";
  minSelections?: number;
  maxSelections?: number;
  selectionOptions?: { name: string; price: number; count: number }[];
};

export type Bundle = {
  id: string;
  slug: string;
  name: string;
  description: string;
  productIds: string[];
  image: string;
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  savings: number;
  configuration: BundleConfiguration;
  isFlagship?: boolean;
};

export const bundles: Bundle[] = [
  {
    id: "luna-glow-duo",
    slug: "luna-glow-duo",
    name: "Luna Glow Duo",
    description: "Face and body, daily glow.",
    productIds: ["dew", "halo"],
    image: "/media__1784439730149.png",
    originalPrice: 16950,
    discountPercent: 10,
    finalPrice: 16950,
    savings: 0,
    configuration: {
      type: "fixed",
      productIds: ["dew", "halo"],
    },
  },
  {
    id: "root-to-radiance",
    slug: "root-to-radiance",
    name: "Root to Radiance",
    description: "Nourish your roots, shine through.",
    productIds: ["herbe", "veil"],
    image: "/media__1784439730152.png",
    originalPrice: 15950,
    discountPercent: 10,
    finalPrice: 15950,
    savings: 0,
    configuration: {
      type: "fixed",
      productIds: ["herbe", "veil"],
    },
  },
  {
    id: "radiant-you",
    slug: "radiant-you",
    name: "Radiant You",
    description: "For skin that glows and hair that flows.",
    productIds: ["dew", "veil", "herbe"],
    image: "/media__1784439730149.png",
    originalPrice: 20950,
    discountPercent: 10,
    finalPrice: 20950,
    savings: 0,
    configuration: {
      type: "fixed",
      productIds: ["dew", "veil", "herbe"],
    },
  },
  {
    id: "the-complete-glow",
    slug: "the-complete-glow",
    name: "The Complete Glow",
    description: "All the essentials, all for you.",
    productIds: ["dew", "veil", "herbe", "halo", "pearl", "santorini", "amalfi"],
    image: "/media__1784439730149.png",
    originalPrice: 27950,
    discountPercent: 10,
    finalPrice: 27950,
    savings: 0,
    isFlagship: true,
    configuration: {
      type: "fixed",
      productIds: ["dew", "veil", "herbe", "halo", "pearl", "santorini", "amalfi"],
    },
  },
  {
    id: "halo-duo",
    slug: "halo-duo",
    name: "Halo Duo",
    description: "Double the glow, double the glow.",
    productIds: ["halo", "pearl"],
    image: "/media__1784439730231.png",
    originalPrice: 16950,
    discountPercent: 10,
    finalPrice: 16950,
    savings: 0,
    configuration: {
      type: "fixed",
      productIds: ["halo", "pearl"],
    },
  },
  {
    id: "halo-quartet",
    slug: "halo-quartet",
    name: "Halo Quartet",
    description: "Four shades, endless luminosity.",
    productIds: ["halo", "pearl", "santorini", "amalfi"],
    image: "/media__1784439730231.png",
    originalPrice: 27950,
    discountPercent: 10,
    finalPrice: 27950,
    savings: 0,
    configuration: {
      type: "fixed",
      productIds: ["halo", "pearl", "santorini", "amalfi"],
    },
  },
  {
    id: "the-everything-set",
    slug: "the-everything-set",
    name: "The Everything Set",
    description: "Seven essentials, one complete you.",
    productIds: ["dew", "veil", "herbe", "halo", "pearl", "santorini", "amalfi"],
    image: "/media__1784439730149.png",
    originalPrice: 36950,
    discountPercent: 15,
    finalPrice: 36950,
    savings: 0,
    isFlagship: true,
    configuration: {
      type: "fixed",
      productIds: ["dew", "veil", "herbe", "halo", "pearl", "santorini", "amalfi"],
    },
  },
  {
    id: "mimis-edit",
    slug: "mimis-edit",
    name: "Mimi's Edit",
    description: "A handpicked edit to love, gift or keep.",
    productIds: ["dew", "veil", "halo", "pearl"],
    image: "/media__1784439730149.png",
    originalPrice: 18950,
    discountPercent: 10,
    finalPrice: 18950,
    savings: 0,
    configuration: {
      type: "fixed",
      productIds: ["dew", "veil", "halo", "pearl"],
    },
  },
];

export function findBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

export function calculateBundlePrice(
  productIds: string[],
  products: Product[],
  discountPercent: number
): { originalPrice: number; finalPrice: number; savings: number } {
  const originalPrice = productIds.reduce((total, id) => {
    const product = products.find((p) => p.slug === id);
    return total + (product?.price || 0);
  }, 0);

  const savings = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - savings;

  return { originalPrice, finalPrice, savings };
}
