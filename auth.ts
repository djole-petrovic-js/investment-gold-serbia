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
import sequelize from "./lib/database/sequelize"

import { IUserModel } from "./lib/database/models/User"
import Password from "./lib/classes/core/Password"
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

        const user = (await sequelize.models.User.findOne({
          where: { email }
        })) as IUserModel

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
