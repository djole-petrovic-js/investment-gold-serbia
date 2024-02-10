/**
 * Next.js core
 */
import type { Metadata } from 'next'
import Image from "next/image"
/**
 * App core
 */
import TavexDistributer from '@/lib/classes/distributers/TavexDistributer'
import GVSDistributer from '@/lib/classes/distributers/GVSDistributer'
/**
 * Components
 */
import DistributersListing from '@/lib/components/distributers/DistributersListing'
/**
 * Providers
 */
import { getSpotPriceInfo } from '@/lib/providers/http'
/**
 * Page Images
 */
import goldCoinsCoverImage from "@/public/images/gold-coins.jpg"
/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: 'IZS - Kovanice',
  description: 'Investiciono Zlato Srbija - Kovanice',
}
/**
 * Display all coins from recommended distributers. 
 */
export default async function Home() {
  const { spotPriceInRsd } = await getSpotPriceInfo();

  const distributersInstances = [TavexDistributer, GVSDistributer].map((distributor) => new distributor({
    spotPriceInRsd: spotPriceInRsd,
    productTypes: ['COINS'],
  }));

  return (
    <main className="bg-black">
      <div className="mt-1">
        <div className="absolute h-screen">
          <Image
            src={goldCoinsCoverImage}
            priority={true}
            className="h-screen object-cover"
            alt="Gold bars"
            sizes="(min-width: 2700px) 2560px, calc(94.96vw + 15px)"
          />
        </div>

        <div className="flex relative z-10 h-screen justify-center items-center">
          <div className="bg-black bg-opacity-60 rounded-sm text-white border border-white p-5 w-4/5 lg:w-4/6 xl:w-1/2 2xl:w-1/2">
            <h3 className="text-4xl text-center mb-10">Zlatne kovanice</h3>

            <h4 className="text-2xl tracking-widest">
              Najlikvidnije investiciono zlato.
              <br />
              <br />
              Zakonsko sredstvo placanja u zemljama porekla, sa jakim sigurnostnim elementima.
              <br />
              <br />
              Prepoznatljive sirom sveta.
            </h4>
          </div>
        </div>
      </div>
      
      <DistributersListing distributers={distributersInstances} />
    </main>
  )
}