import type { MetadataRoute } from "next";

const BASE_URL = "https://inspirenigerianchild.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/gallery", priority: 0.8 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}
