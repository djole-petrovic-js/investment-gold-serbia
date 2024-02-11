"use server"
/**
 * Auth.
 */
import { signOut } from "@/auth"
/**
 * Log out the current user, and redirect to the Home page.
 */
export default async function logOut() {
  await signOut({ redirectTo: "/" })
}
