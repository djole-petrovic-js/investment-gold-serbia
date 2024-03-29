/**
 * Next.js core.
 */
import { headers } from "next/headers"
import type { NextAuthConfig } from "next-auth"
import createMiddleware from "next-intl/middleware"
/**
 * Constants.
 */
import { CRON_SECRET } from "@/lib/constants/environment"
/**
 * Internationalization.
 */
import { locales, localePrefix } from "@/lib/internationalization/navigation"
/**
 * Partial login config.
 */
export const authConfig = {
  pages: {
    signIn: "/sr/login"
  },
  /**
   * Auth module complains about trusted hosts, when testing production localy.
   *
   * Fixes this error:
   *
   * https://errors.authjs.dev#untrustedhost
   */
  trustHost: true,
  callbacks: {
    authorized({ auth, request }) {
      /**
       * For protected route, let the auth middleware do it's thing.
       */
      if (request.nextUrl.pathname.startsWith("/admin")) {
        const isLoggedIn =
          !!auth?.user ||
          headers().get("Authorization") === `Bearer ${CRON_SECRET}`

        return isLoggedIn
      }
      /**
       * For other routes, since we have multi-language pages, use another middleware.
       */
      return createMiddleware({
        /**
         * A list of all locales that are supported
         */
        locales,
        localePrefix,
        /**
         * Used when no locale matches
         */
        defaultLocale: "sr",
        localeDetection: false
      })(request)
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub || ""
      }

      return session
    }
  },
  providers: []
} satisfies NextAuthConfig
