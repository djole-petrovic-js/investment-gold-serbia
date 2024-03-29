/**
 * Next.js core
 */
import type { Metadata } from "next"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
/**
 * Constants
 */
import { CDN_URL } from "@/lib/constants/environment"
/**
 * Components.
 */
import DistributersListing from "@/lib/components/distributers/DistributersListing"
/**
 * Providers.
 */
import goldBardsDataProvider from "@/lib/providers/bars/provider"
/**
 * Utils.
 */
import getImagePlaiceholder from "@/lib/utils/images/getImagePlaiceholder"
/**
 * Fully dynamic route.
 */
export const dynamic = "force-dynamic"
/**
 * Page metadata
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("GoldBars.Metadata")

  return {
    title: t("Title"),
    description: t("Description"),
    keywords: t("Keywords").split(",")
  }
}
/**
 * Display all gold bars from recommended distributers.
 */
export default async function GoldBars() {
  const imageCoverUrl = `https://${CDN_URL}/images/gold-bars.webp`

  const [distributers, t] = await Promise.all([
    goldBardsDataProvider(),
    getTranslations("GoldBars")
  ])

  return (
    <main className="main text-white">
      {/* Begin - Cover photo with short info */}
      <div className="mt-1">
        <div className="absolute h-screen">
          <Image
            src={imageCoverUrl}
            alt={t("CoverImageAlt")}
            width={2560}
            height={1440}
            className="h-screen object-cover"
            priority={true}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={await getImagePlaiceholder(imageCoverUrl)}
          />
        </div>

        <div className="flex relative h-screen justify-center items-center">
          <div className="bg-black bg-opacity-60 rounded-sm border border-white p-5 w-4/5 lg:w-4/6 xl:w-1/2 2xl:w-1/2">
            <h3 className="text-4xl text-center mb-10">{t("GoldBars")}</h3>

            <h4 className="text-2xl tracking-widest space-y-4">
              <p>{t("Highlighted-FirstParagraph")}</p>
              <p>{t("Highlighted-SecondParagraph")}</p>
              <p>{t("Highlighted-ThirdParagraph")}</p>
            </h4>
          </div>
        </div>
      </div>
      {/* END - Cover photo with short info */}
      {/* BEGIN - Info about gold bars */}
      <div className="p-5">
        <h1 className="mainH1">{t("WhyGoldBars")}</h1>

        <div className="space-y-5 text-xl">
          <p>{t("Main-FirstParagraph")}</p>
          <p>{t("Main-SecondParagraph")}</p>
          <p>{t("Main-ThirdParagraph")}</p>
          <p>{t("Main-FourthParagraph")}</p>
        </div>
      </div>
      {/* BEGIN - Info about gold bars */}
      <DistributersListing distributers={distributers} />
    </main>
  )
}
