/**
 * Next.js core.
 */
import type { Metadata } from "next"
import Image from "next/image"
/**
 * Components.
 */
import DistributersListing from "@/lib/components/distributers/DistributersListing"
/**
 * Utils.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
/**
 * Page Images.
 */
import goldCoinsCoverImage from "@/public/images/gold-coins.jpg"
/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: "IZS - Kovanice",
  description: "Investiciono Zlato Srbija - Kovanice",
  keywords: ["zlato", "investiranje", "kovanice"]
}
/**
 * Display all coins from recommended distributers.
 */
export default async function Home() {
  const distributers = await fetchDistributersByProductTypes(["COINS"])

  return (
    <main className="bg-black">
      {/* BEGIN - Cover photo with short info */}
      <div className="mt-1">
        <div className="absolute h-screen">
          <Image
            src={goldCoinsCoverImage}
            priority={true}
            className="h-screen object-cover"
            alt="Zlatne Kovanice Cover Slika"
            sizes="100vw"
          />
        </div>

        <div className="flex relative z-10 h-screen justify-center items-center">
          <div className="bg-black bg-opacity-60 rounded-sm text-white border border-white p-5 w-4/5 lg:w-4/6 xl:w-1/2 2xl:w-1/2">
            <h3 className="text-4xl text-center mb-10">Zlatne kovanice</h3>

            <h4 className="text-2xl tracking-widest">
              <p className="mb-4">Najlikvidnije investiciono zlato.</p>
              <p className="mb-4">
                Zakonsko sredstvo placanja u zemljama porekla, sa jakim
                sigurnostnim elementima.
              </p>
              <p>Prepoznatljive sirom sveta.</p>
            </h4>
          </div>
        </div>
      </div>
      {/* END - Cover photo with short info */}
      {/* BEGIN - Info about gold coins */}
      <div className="text-white p-5">
        <h1 className="text-5xl mb-5 italic">Zasto kovanice?</h1>

        <p className="text-xl mb-10">
          Zbog svog kvaliteta izrade, i reputacije proizvodaca, kovanice su
          priznate sirom sveta, i lako se i kupuju i prodaju, kako kod velikih
          tako i malih trgovaca investicionim zlatom. Uglavnom zbog svog
          kvaliteta i estetike su skuplje od poluga, pa im je tako i razlika u
          prodajnoj i kupovnoj ceni veca.
        </p>

        <p className="text-xl mb-10">
          Kovanice koje izdaju centralne banke suverenih drzava predstavljaju
          zakonsko sredstvo placanja u toj zemlji. Na kovanicama se nalazi
          nominalna vrednost izrazena u aktuelnoj valuti. Npr. filhamronija 1
          unca 100 evra, zlatni orao 100 dolara, i sl. Time su kovanice
          zasticenim istim zakonima, kojima je zasticen i papirni novac. Samim
          tim, posledice falsifikovanja su znatno vece. S tim u vezi, kovanice
          su sticale jake sigurnosne elemente godinama jos od kad se proizvode,
          npr nazubljene ivice. Danas postoje jos i jace modernije mere, npr
          Britania hologramski katanac, kanadski javorov list ima mikrotekst na
          samoj kovanici itd.
        </p>

        <p className="text-xl mb-10">
          Proizvode se dugi niz godina, npr. Juznoafricki Krugerand jos od 1967,
          Sto ih cini prepoznatljivim, lakim za testiranje, i samim tim i laksim
          za investiranje. Posto se dugo proizvode pod istim standardima, ocuvan
          je integritet svih kovanica, pa je i lako utvrditi validnost.
        </p>

        <p className="text-xl">
          Pogledajte ponudu najboljih distributera investicionog zlata u srbiji
          ispod.
        </p>
      </div>
      {/* END - Info about gold coins */}
      <DistributersListing distributers={distributers} />
    </main>
  )
}
