/**
 * Next.js core.
 */
import { MetadataRoute } from 'next'
/**
 * Constants.
 */
import { SITE_BASE_URL } from "@/lib/constants/environment";
/**
 * Serve the static sitemap.xml file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: `${SITE_BASE_URL}/`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 1,
  }, {
    url: `${SITE_BASE_URL}/premium-calculator`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }, {
    url: `${SITE_BASE_URL}/gold-bars`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 0.9,
  }]
}