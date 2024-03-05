/**
 * Next.js core.
 */
import { MetadataRoute } from "next"
/**
 * Constants.
 */
import { SITE_BASE_URL } from "@/lib/constants/environment"
/**
 * Utils.
 */
import getBaseProductsSlugs from "@/lib/utils/getBaseProductsSlugs"
/**
 * Serve the static sitemap.xml file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1
    },
    {
      url: `${SITE_BASE_URL}/gold-bars`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9
    },
    {
      url: `${SITE_BASE_URL}/trade`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9
    },
    ...getBaseProductsSlugs().map((slug: string) => ({
      url: `${SITE_BASE_URL}/trade/${slug}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9
    })),
    {
      url: `${SITE_BASE_URL}/premium-calculator`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6
    },
    {
      url: `${SITE_BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5
    }
  ] as MetadataRoute.Sitemap
}
