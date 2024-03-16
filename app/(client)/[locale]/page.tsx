/**
 * Next.js core.
 */
import Image from "next/image"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
/**
 * Environment.
 */
import { GOOGLE_SITE_VERIFICATION } from "@/lib/constants/environment"
/**
 * Components.
 */
import DistributersListing from "@/lib/components/distributers/DistributersListing"
/**
 * Providers.
 */
import coinsDataProvider from "@/lib/providers/coins/provider"
/**
 * Utils.
 */
import getImagePlaiceholderForLocalImage from "@/lib/utils/images/getImagePlaiceholderForLocalImage"
/**
 * Page Images.
 */
import goldCoinsCoverImage from "@/public/images/gold-coins.jpg"
/**
 * Fully dynamic route.
 */
export const dynamic = "force-dynamic"
/**
 * Page metadata.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Home.Metadata")

  return {
    title: t("Title"),
    description: t("Description"),
    keywords: t("Keywords").split(","),
    other: {
      "google-site-verification": GOOGLE_SITE_VERIFICATION
    }
  }
}
/**
 * Display all coins from recommended distributers.
 */
export default async function Home() {
  const [distributers, t] = await Promise.all([
    coinsDataProvider(),
    getTranslations("Home")
  ])

  return (
    <main className="main">
      {/* BEGIN - Cover photo with short info */}
      <div className="mt-1">
        <div className="absolute h-screen">
          <Image
            src={goldCoinsCoverImage}
            priority={true}
            className="h-screen object-cover"
            alt={t("CoverImageAlt")}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={await getImagePlaiceholderForLocalImage(
              "gold-coins.jpg"
            )}
          />
        </div>

        <div className="flex relative h-screen justify-center items-center">
          <div className="bg-black bg-opacity-60 rounded-sm text-white border border-white p-5 w-4/5 lg:w-4/6 xl:w-1/2 2xl:w-1/2">
            <h3 className="text-4xl text-center mb-10">{t("GoldCoins")}</h3>

            <h4 className="text-2xl tracking-widest">
              <p className="mb-4">{t("Highlighted-FirstParagraph")}</p>
              <p className="mb-4">{t("Highlighted-SecondsParagraph")}</p>
              <p>{t("Highlighted-ThirdParagraph")}</p>
            </h4>
          </div>
        </div>
      </div>
      {/* END - Cover photo with short info */}
      {/* BEGIN - Info about gold coins */}
      <div className="text-white p-5">
        <h1 className="mainH1">{t("WhyCoins")}</h1>

        <div className="space-y-5 text-xl">
          <p>{t("Main-FirstParagraph")}</p>

          <p>{t("Main-SecondParagraph")}</p>

          <p>{t("Main-ThirdParagraph")}</p>

          <p>{t("Main-FourthParagraph")}</p>
        </div>
      </div>
      {/* END - Info about gold coins */}
      <DistributersListing distributers={distributers} />
    </main>
  )
}
