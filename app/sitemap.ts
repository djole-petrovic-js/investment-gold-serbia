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
import { locales } from "@/lib/internationalization/navigation"
/**
 * Serve the static sitemap.xml file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap = [
    {
      url: `${SITE_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1
    }
  ]

  for (const locale of locales) {
    sitemap.push({
      url: `${SITE_BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1
    })

    sitemap.push({
      url: `${SITE_BASE_URL}/${locale}/gold-bars`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9
    })

    sitemap.push({
      url: `${SITE_BASE_URL}/${locale}/trade`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9
    })

    sitemap.push(
      ...getBaseProductsSlugs().map((slug) => ({
        url: `${SITE_BASE_URL}/${locale}/trade/${slug}`,
        lastModified: new Date(),
        changeFrequency: "hourly",
        priority: 0.9
      }))
    )

    sitemap.push({
      url: `${SITE_BASE_URL}/${locale}/premium-calculator`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6
    })

    sitemap.push({
      url: `${SITE_BASE_URL}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5
    })
  }

  return sitemap as MetadataRoute.Sitemap
}
