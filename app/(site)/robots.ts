import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://adlen.kz");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/demo/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
