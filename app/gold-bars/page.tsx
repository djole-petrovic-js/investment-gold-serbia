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
/**
 * Page Images.
 */
import imageCover from "@/public/images/gold-bars.webp"
/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: "IZS - Poluge",
  description: "Investiciono zlato Srbija - Poluge"
}
/**
 * Display all gold bars from recommended distributers.
 */
export default async function GoldBars() {
  const distributers = await fetchDistributersByProductTypes(["BARS"])

  return (
    <main className="bg-black">
      <div className="mt-1">
        <div className="absolute h-screen">
          <Image
            className="h-screen object-cover"
            src={imageCover}
            alt="Gold bars"
            priority={true}
            sizes="100vh"
          />
        </div>

        <div className="flex relative z-10 h-screen justify-center items-center">
          <div className="bg-black bg-opacity-60 rounded-sm text-white border border-white p-5 w-4/5 lg:w-4/6 xl:w-1/2 2xl:w-1/2">
            <h3 className="text-4xl text-center mb-10">Zlatne poluge</h3>

            <h4 className="text-2xl tracking-widest">
              <p className="mb-4">
                Dolaze u zastitnim pakovanjima, pa su lake za cuvanje.
              </p>
              <p className="mb-4">
                Jeftinije od kovanica, sa manjom izmedju kupovne i prodajne
                cene.
              </p>
              <p>Razne vrste proizvodjaca.</p>
            </h4>
          </div>
        </div>
      </div>

      <DistributersListing distributers={distributers} />
    </main>
  )
}
