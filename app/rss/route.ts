/**
 * Next.js core
 */
import RSS from "rss";
/**
 * Constants
 */
import { SITE_BASE_URL } from "@/lib/constants/environment";
/**
 * This route should not be cached, since it can be updated.
 */
export const revalidate = 0;
/**
 * Create the RSS feed.
 */
export async function GET() {
  const feed = new RSS({
    title: 'Investiciono Zlato Srbija',
    description: 'Investiciono Zlato Srbija',
    site_url: SITE_BASE_URL,
    feed_url: `${SITE_BASE_URL}/rss`,
    copyright: 'Investiciono Zlato Srbija',
    language: 'sr',
    pubDate: new Date(),
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}