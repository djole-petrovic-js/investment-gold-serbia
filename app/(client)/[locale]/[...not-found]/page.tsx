/**
 * Next.js core.
 */
import { getTranslations } from "next-intl/server"
import Link from "next/link"
/**
 * Show a friendly 404 page.
 * Allow user to go back to the home page.
 */
export default async function NotFound() {
  const t = await getTranslations("NotFound")

  return (
    <main className="mt-1">
      <div className="flex flex-col items-center justify-center bg-black text-white h-screen p-5 text-center">
        <h1 className="text-3xl mb-5">404 | {t("PageNotFound")}</h1>

        <h2 className="text-2xl">
          {t("PageNotFoundDescription")}{" "}
          <Link className="underline" href="/">
            {t("Here")}
          </Link>
        </h2>
      </div>
    </main>
  )
}
