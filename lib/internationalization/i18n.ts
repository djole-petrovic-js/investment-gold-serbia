/**
 * Next.js Core.
 */
import { getRequestConfig } from "next-intl/server"
/**
 * Next-intl getRequestConfig.
 */
export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (
      await import(`@/lib/internationalization/messages/${locale}.json`)
    ).default
  }
})
