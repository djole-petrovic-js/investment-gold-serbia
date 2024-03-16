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
import LoginForm from "@/client/login/components/LoginForm/LoginForm"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
/**
 * Page metadata.
 */
export const metadata: Metadata = {
  title: "IZS - Prijava",
  description: "Investiciono Zlato Srbija - Prijava na sistem"
}
/**
 * Fully dynamic route.
 */
export const dynamic = "force-dynamic"
/**
 * Login page.
 */
export default async function Login() {
  const session = await auth()

  if (session?.user) {
    redirect("/admin/dashboard")
  }

  const t = await getTranslations("Login")

  return (
    <main className="main">
      <div className="flex flex-col items-center justify-center bg-black text-white h-screen">
        <NextIntlClientProvider
          messages={{
            Login: {
              LoginToSystem: t("LoginToSystem"),
              LoginButtonLabel: t("LoginButtonLabel")
            }
          }}
        >
          <LoginForm />
        </NextIntlClientProvider>
      </div>
    </main>
  )
}
