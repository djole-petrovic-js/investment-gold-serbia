/**
 * Next.js core.
 */
import { MetadataRoute } from 'next'
/**
 * Constants.
 */
import { SITE_BASE_URL } from "@/lib/constants/environment";
/**
 * Serve the static robots.txt file.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
  }
}