import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://mimibeauty.com";
  const paths = [
    "",
    "/shop",
    "/collections",
    "/quiz",
    "/blog",
    "/about",
    "/contact",
    "/product/dew",
    "/product/veil",
    "/product/herbe",
    "/product/halo",
  ];

  return paths.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
}
