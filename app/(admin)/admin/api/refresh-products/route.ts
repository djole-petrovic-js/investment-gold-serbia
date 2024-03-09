/**
 * Next.js core.
 */
import { revalidateTag } from "next/cache"
/**
 * App core.
 */
import GVSDistributer from "@/lib/classes/distributers/GVSDistributer"
import TavexDistributer from "@/lib/classes/distributers/TavexDistributer"
/**
 * Database.
 */
import { eq } from "drizzle-orm"
import { db } from "@/lib/database/db"
import { Variables } from "@/lib/database/schema"
/**
 * Providers.
 */
import { getSpotPriceInfo } from "@/lib/providers/http"
/**
 * Utils.
 */
import Timer from "@/lib/utils/timer"
/**
 * Fetch all dynamic data from the scraped pages, and update the database.
 *
 * Revalidate static pages.
 */
export async function GET() {
  const timer = new Timer()

  timer.start()

  const { spotPriceInRsd, eurToRsdConversionRate } = await getSpotPriceInfo()
  /**
   * Timestamp representing when this refreshing has occured.
   * Format it for the Serbian timezone.
   */
  const currentTimestamp = new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Belgrade",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  })
    .format(Date.now())
    .replace(" h ", ":")
    .replace(" min ", ":")
    .replace(" s", "")

  const variables = [
    {
      key: "SPOT_PRICE_IN_RSD",
      value: spotPriceInRsd
    },
    {
      key: "EUR_TO_RSD_CONVERTION_RATE",
      value: eurToRsdConversionRate
    },
    {
      key: "DATA_UPDATED_TIMESTAMP",
      value: currentTimestamp
    }
  ]

  await Promise.all([
    /**
     * Variables.
     */
    ...variables.map(async ({ key, value }) => {
      const [existingVariable] = await db
        .select()
        .from(Variables)
        .where(eq(Variables.key, key))
        .limit(1)

      if (existingVariable) {
        return db
          .update(Variables)
          .set({ value: value as string })
          .where(eq(Variables.key, key))
      }

      return db.insert(Variables).values({ key, value: value as string })
    }),
    /**
     * Distributers and Products.
     */
    ...[TavexDistributer, GVSDistributer].map(async (distributer) => {
      const distributerInstance = new distributer({
        spotPriceInRsd: spotPriceInRsd
      })

      await distributerInstance.fetchProductsData()

      return distributerInstance.saveFormatedDistributerData()
    })
  ])

  revalidateTag("client-side-data")

  timer.end()

  return Response.json({
    success: true,
    timePassedInSeconds: timer.geTimePassedInSeconds()
  })
}
