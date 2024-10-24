/**
 * Next.js core.
 */
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
/**
 * Constants.
 */
import {
  gvsMainUrl,
  livePriceOfGold,
  nbsUrl,
  projectGithubUrl,
  tavexMainUrl,
} from "@/lib/constants/urls"
/**
 * Page metadata.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About.Metadata")

  return {
    title: t("Title"),
    description: t("Description"),
    keywords: t("Keywords").split(","),
  }
}
/**
 * Fully dynamic route.
 */
export const dynamic = "force-dynamic"
/**
 * About page.
 */
export default async function About() {
  const t = await getTranslations("About")

  return (
    <main className="main">
      <div className="w-full px-5 pt-5 text-white md:mx-auto md:w-4/5">
        <h1 className="mainH1">{t("AboutUs")}</h1>

        <div className="space-y-5 text-xl">
          <p>{t("FirstParagraph")}</p>

          <p>{t("SecondsParagraph")}</p>

          <p>{t("ThirdParagraph")}</p>

          <div className="py-5">
            <h2 className="mb-5">{t("Links")}:</h2>

            <p>
              Tavex :{" "}
              <a className="underline" href={tavexMainUrl} target="_blank">
                {t("LinkToSite")}.
              </a>
            </p>

            <p>
              GVS Srbija :{" "}
              <a className="underline" href={gvsMainUrl} target="_blank">
                {t("LinkToSite")}.
              </a>
            </p>

            <p>
              {t("EuroExchangeRate")}{" "}
              <a className="underline" href={nbsUrl} target="_blank">
                {t("Here")}.
              </a>
            </p>

            <p>
              {t("PageWithSpotPrice")}{" "}
              <a className="underline" href={livePriceOfGold} target="_blank">
                {t("Here")}.
              </a>
            </p>

            <p>
              {t("OpenSourceProject")}{" "}
              <a className="underline" href={projectGithubUrl} target="_blank">
                {t("Here")}.
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
