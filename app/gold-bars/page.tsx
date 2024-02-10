/**
 * Next.js core
 */
import type { Metadata } from 'next'
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
 * Page metadata
 */
export const metadata: Metadata = {
  title: 'IZS - Poluge',
  description: 'Investiciono zlato Srbija - Poluge',
}

import Image from "next/image"
import imageCover from "@/public/images/gold-bars.webp"

/**
 * Display all gold bars from recommended distributers.
 */
export default async function GoldBars() {
  const { spotPriceInRsd } = await getSpotPriceInfo();

  const distributersInstances = [TavexDistributer, GVSDistributer].map((distributor) => new distributor({
    spotPriceInRsd: spotPriceInRsd,
    productTypes: ['BARS'],
  }));

  return (
    <main className="bg-black">
      <div className="mt-1">
        <div className="absolute h-screen">
          <Image
            className="h-screen object-cover"
            src={imageCover}
            alt="Gold bars"
            priority={true}
            sizes="(min-width: 2700px) 2560px, calc(94.96vw + 15px)"
          />
        </div>

        <div className="flex relative z-10 h-screen justify-center items-center">
          <div className="bg-black bg-opacity-60 rounded-sm text-white border border-white p-5 w-4/5 lg:w-4/6 xl:w-1/2 2xl:w-1/2">
            <h3 className="text-4xl text-center mb-10">Zlatne poluge</h3>

            <h4 className="text-2xl tracking-widest">
              Dolaze u zastitnim pakovanjima, pa su lake za cuvanje.
              <br />
              <br />
              Jeftinije od kovanica, sa manjom izmedju kupovne i prodajne cene.
              <br />
              <br />
              Razne vrste proizvodjaca.
            </h4>
          </div>
        </div>
      </div>

      <DistributersListing distributers={distributersInstances} />
    </main>
  )
}