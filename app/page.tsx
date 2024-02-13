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
  description: "Investiciono Zlato Srbija - Kovanice"
}
/**
 * Display all coins from recommended distributers.
 */
export default async function Home() {
  const distributers = await fetchDistributersByProductTypes(["COINS"])

  return (
    <main className="bg-black">
      <div className="mt-1">
        <div className="absolute h-screen">
          <Image
            src={goldCoinsCoverImage}
            priority={true}
            className="h-screen object-cover"
            alt="Gold bars"
            sizes="100vh"
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

      <DistributersListing distributers={distributers} />
    </main>
  )
}
