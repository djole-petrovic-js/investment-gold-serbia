/**
 * Next.js core.
 */
import type { Metadata } from "next"
import Image from "next/image"
/**
 * Environment.
 */
import { GOOGLE_SITE_VERIFICATION } from "@/lib/constants/environment"
/**
 * Components.
 */
import DistributersListing from "@/lib/components/distributers/DistributersListing"
import GoogleAnalytics from "@/lib/components/GoogleAnalytics"
/**
 * Utils.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
import getImagePlaiceholderForLocalImage from "@/lib/utils/images/getImagePlaiceholderForLocalImage"
/**
 * Page Images.
 */
import goldCoinsCoverImage from "@/public/images/gold-coins.jpg"
/**
 * Page metadata.
 */
export const metadata: Metadata = {
  title: "IZS - Kovanice",
  description: "Investiciono Zlato Srbija - Kovanice",
  keywords: ["zlato", "investiranje", "kovanice"],
  other: {
    "google-site-verification": GOOGLE_SITE_VERIFICATION
  }
}
/**
 * To keep the view data fresh.
 */
export const dynamic = "force-dynamic"

import { unstable_cache as cache } from 'next/cache';

const fetchProductsHome = cache(async () => {
  return fetchDistributersByProductTypes(["COINS"])
}, ['Home::fetch'], {
  tags: ['client-side-data']
})
/**
 * Display all coins from recommended distributers.
 */
export default async function Home() {
  const distributers = await fetchProductsHome();

  return (
    <main className="main">
      {/* BEGIN - Cover photo with short info */}
      <div className="mt-1">
        <div className="absolute h-screen">
          <Image
            src={goldCoinsCoverImage}
            priority={true}
            className="h-screen object-cover"
            alt="Zlatne Kovanice Cover Slika"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={await getImagePlaiceholderForLocalImage(
              "gold-coins.jpg"
            )}
          />
        </div>

        <div className="flex relative h-screen justify-center items-center">
          <div className="bg-black bg-opacity-60 rounded-sm text-white border border-white p-5 w-4/5 lg:w-4/6 xl:w-1/2 2xl:w-1/2">
            <h3 className="text-4xl text-center mb-10">Zlatne kovanice</h3>

            <h4 className="text-2xl tracking-widest">
              <p className="mb-4">Najlikvidnije investiciono zlato.</p>
              <p className="mb-4">
                Zakonsko sredstvo placanja u zemljama porekla, sa jakim
                sigurnosnim elementima.
              </p>
              <p>Prepoznatljive sirom sveta.</p>
            </h4>
          </div>
        </div>
      </div>
      {/* END - Cover photo with short info */}
      {/* BEGIN - Info about gold coins */}
      <div className="text-white p-5">
        <h1 className="mainH1">Zasto kovanice?</h1>

        <div className="space-y-5 text-xl">
          <p>
            Zbog svog kvaliteta izrade, i reputacije proizvodaca, kovanice su
            priznate sirom sveta, i lako se i kupuju i prodaju, kako kod velikih
            tako i malih trgovaca investicionim zlatom. Uglavnom zbog svog
            kvaliteta i estetike su skuplje od poluga, pa im je tako i razlika u
            prodajnoj i kupovnoj ceni veca.
          </p>

          <p>
            Kovanice koje izdaju centralne banke suverenih drzava predstavljaju
            zakonsko sredstvo placanja u toj zemlji. Na kovanicama se nalazi
            nominalna vrednost izrazena u aktuelnoj valuti. Npr. filhamronija 1
            unca 100 evra, zlatni orao 100 dolara, i sl. Time su kovanice
            zasticenim istim zakonima, kojima je zasticen i papirni novac. Samim
            tim, posledice falsifikovanja su znatno vece. S tim u vezi, kovanice
            su sticale jake sigurnosne elemente godinama jos od kad se
            proizvode, npr nazubljene ivice. Danas postoje jos i jace modernije
            mere, npr Britania hologramski katanac, kanadski javorov list ima
            mikrotekst na samoj kovanici itd.
          </p>

          <p>
            Proizvode se dugi niz godina, npr. Juznoafricki Krugerand jos od
            1967, Sto ih cini prepoznatljivim, lakim za testiranje, i samim tim
            i laksim za investiranje. Posto se dugo proizvode pod istim
            standardima, ocuvan je integritet svih kovanica, pa je i lako
            utvrditi validnost.
          </p>

          <p>
            Pogledajte ponudu istaknutih distributera investicionog zlata u
            srbiji ispod.
          </p>
        </div>
      </div>
      {/* END - Info about gold coins */}
      <DistributersListing distributers={distributers} />
      <GoogleAnalytics />
    </main>
  )
}
