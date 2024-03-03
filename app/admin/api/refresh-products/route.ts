/**
 * Next.js core.
 */
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
/**
 * App core.
 */
import GVSDistributer from "@/lib/classes/distributers/GVSDistributer"
import TavexDistributer from "@/lib/classes/distributers/TavexDistributer"
/**
 * Database and it's utils.
 */
import sequelize from "@/lib/database/sequelize"
import createOrUpdateRecord from "@/lib/utils/database/createOrUpdateRecord"
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
      return createOrUpdateRecord(
        sequelize.models.Variable,
        { key },
        {
          key,
          value
        }
      )
    })
  ])
  /**
   * Distributers and Products.
   *
   * Note : This can be wrapped inside of a Promise.all call, but the ordering of
   * the products in the database wont be right.
   *
   * Maybe try to think of a better solution.
   */
  for (const distributer of [TavexDistributer, GVSDistributer]) {
    const distributerInstance = new distributer({
      spotPriceInRsd: spotPriceInRsd
    })

    await distributerInstance.fetchProductsData()
    await distributerInstance.saveFormatedDistributerData()
  }

  revalidatePath("/")
  revalidatePath("/gold-bars")
  revalidatePath("/premium-calculator")
  revalidatePath("/trade")

  timer.end()

  return NextResponse.json({
    success: true,
    timePassedInSeconds: timer.geTimePassedInSeconds()
  })
}
