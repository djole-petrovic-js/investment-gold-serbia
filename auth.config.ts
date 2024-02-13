/**
 * Next.js core
 */
import type { NextAuthConfig } from "next-auth"
import { headers } from "next/headers"
/**
 * Environment.
 */
import { API_TOKEN, IS_DEV_ENV } from "./lib/constants/environment"
/**
 * Partial login config.
 */
export const authConfig = {
  pages: {
    signIn: "/login"
  },
  /**
   * Auth module complains about trusted hosts, when testing production localy.
   *
   * Fixes this error:
   *
   * https://errors.authjs.dev#untrustedhost
   */
  trustHost: IS_DEV_ENV,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (!nextUrl.pathname.startsWith("/admin")) {
        return true
      }

      const isLoggedIn =
        !!auth?.user || headers().get("Authorization") === `Bearer ${API_TOKEN}`

      if (!isLoggedIn) {
        return false
      }

      if (nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/admin/dashboard", nextUrl))
      }

      return true
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
