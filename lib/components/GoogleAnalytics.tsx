/**
 * Next.js Core.
 */
import { GoogleAnalytics as GoogleAnalyticsNextJs } from "@next/third-parties/google"
/**
 * Constants.
 */
import { GOOGLE_ANALYTICS } from "@/lib/constants/environment"

export default function GoogleAnalytics() {
  return (
    <>{GOOGLE_ANALYTICS && <GoogleAnalyticsNextJs gaId={GOOGLE_ANALYTICS} />}</>
  )
}
