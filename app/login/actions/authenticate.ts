"use server"
/**
 * Next.js core.
 */
import { AuthError } from "next-auth"
/**
 * Auth.
 */
import { signIn } from "@/auth"
/**
 *
 * Try to log in the user, using the provided credentials.
 *
 * @param {String | undefined} _prevState - Not used
 * @param {FormData} formData
 * @returns
 */
export default async function authenticate(
  _prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin/dashboard"
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return "Invalid credentials."
        }
        default: {
          return "Something went wrong."
        }
      }
    }

    throw error
  }
}
