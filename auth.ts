/**
 * Next.js core
 */
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
/**
 * App config
 */
import { authConfig } from "./auth.config"
/**
 * Database
 */
import User from "@/models/User"
/**
 * Try to authorize a user.
 */
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(7) })
          .safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
        }

        const { email, password } = parsedCredentials.data

        const user = await User.findOne({ where: { email } })

        if (!user || !(await user.comparePasswords(password))) {
          return null
        }

        return {
          id: String(user.id),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: ""
        }
      }
    })
  ]
})
