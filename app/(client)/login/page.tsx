/**
 * Next.js core.
 */
import { Metadata } from "next"
import { redirect } from "next/navigation"
/**
 * Auth.
 */
import { auth } from "@/auth"
/**
 * Components.
 */
import LoginForm from "@/app/(client)/login/components/LoginForm/LoginForm"
/**
 * Page metadata.
 */
export const metadata: Metadata = {
  title: "IZS - Prijava",
  description: "Investiciono Zlato Srbija - Prijava na sistem"
}
/**
 * This route should not be cached.
 */
export const revalidate = 0
/**
 * Login page. Should not be a part of the statically rendered views.
 *
 * /login.
 */
export default async function Login() {
  const session = await auth()

  if (session?.user) {
    redirect("/admin/dashboard")
  }

  return (
    <main className="main">
      <div className="flex flex-col items-center justify-center bg-black text-white h-screen">
        <LoginForm />
      </div>
    </main>
  )
}
