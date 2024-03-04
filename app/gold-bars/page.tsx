/**
 * Next.js core
 */
import type { Metadata } from "next"
import Image from "next/image"
/**
 * Components
 */
import DistributersListing from "@/lib/components/distributers/DistributersListing"
/**
 * Utils.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
import getImagePlaiceholderForLocalImage from "@/lib/utils/images/getImagePlaiceholderForLocalImage"
/**
 * Page Images.
 */
import imageCover from "@/public/images/gold-bars.webp"
/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: "IZS - Poluge",
  description: "Investiciono zlato Srbija - Poluge",
  keywords: ["zlato", "investiranje", "poluge"]
}
/**
 * Display all gold bars from recommended distributers.
 */
export default async function GoldBars() {
  const distributers = await fetchDistributersByProductTypes(["BARS"])

  return (
    <main className="main text-white">
      {/* Begin - Cover photo with short info */}
      <div className="mt-1">
        <div className="absolute h-screen">
          <Image
            className="h-screen object-cover"
            src={imageCover}
            alt="Zlatne Poluge Cover Slika"
            priority={true}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={await getImagePlaiceholderForLocalImage(
              "gold-bars.webp"
            )}
          />
        </div>

        <div className="flex relative h-screen justify-center items-center">
          <div className="bg-black bg-opacity-60 rounded-sm border border-white p-5 w-4/5 lg:w-4/6 xl:w-1/2 2xl:w-1/2">
            <h3 className="text-4xl text-center mb-10">Zlatne poluge</h3>

            <h4 className="text-2xl tracking-widest space-y-4">
              <p>Dolaze u zastitnim pakovanjima, pa su lake za cuvanje.</p>
              <p>
                Jeftinije od kovanica, sa manjom izmedju kupovne i prodajne
                cene.
              </p>
              <p>Razne vrste proizvodjaca.</p>
            </h4>
          </div>
        </div>
      </div>
      {/* END - Cover photo with short info */}
      {/* BEGIN - Info about gold bars */}
      <div className="p-5">
        <h1 className="mainH1">Zasto poluge?</h1>

        <div className="space-y-5 text-xl">
          <p>
            Takozvana &#39;assay&#39; pakovanja su idealna za cuvanje zlatnih
            poluga, jer je zlato u njima hermeticki zatvoreno i potpuno
            zasticeno od ogrebotina, udaraca, otisaka prstiju i sl. Zahvaljujuci
            modernim tehnologijama za ispitivanje autenticnosti metala, zlato u
            ovakvim pakovanjima je lako testirati i utvrditi da je pravo.
          </p>

          <p>
            Zbog jednostavnosti izrade, poluge su nesto jeftinije od kovanica,
            pa predstavljaju mozda i efikasniji nacin za kupovinu vece kolicine
            zlata. Takodje, razlika izmedju kupovne i prodajne cene (spread) je
            takodje manja, sto ih cini pogodnim za investiranje.
          </p>

          <p>
            Na trzistu se prodaju poluge kako suverenih kovnica, tako i
            privatnih. Za razliku od kovanica, prodaju se i velicine vece od
            jedne unce, npr. zlatna poluga od 100gr, pa i od jednog kilograma.
          </p>

          <p>
            Pogledajte ponudu istaknutih distributera investicionog zlata u
            srbiji ispod.
          </p>
        </div>
      </div>
      {/* BEGIN - Info about gold bars */}
      <DistributersListing distributers={distributers} />
    </main>
  )
}
