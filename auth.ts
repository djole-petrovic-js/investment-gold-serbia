/**
 * Next.js core
 */
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
/**
 * App Core.
 */
import Password from "@/lib/classes/core/Password"
/**
 * App config
 */
import { authConfig } from "@/auth.config"
/**
 * Database
 */
import { eq } from "drizzle-orm"
import { db } from "@/lib/database/db"
import { Users } from "@/lib/database/schema"
/**
 * Try to authorize a user.
 */
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60 // 4 hours
  },
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

        const [user] = await db
          .select()
          .from(Users)
          .where(eq(Users.email, email))
          .limit(1)

        if (!user) {
          return null
        }

        const { isMatched } = await new Password(password).comparePasswords(
          user.password
        )

        if (!isMatched) {
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
