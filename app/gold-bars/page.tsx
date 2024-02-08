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
      <h1 className="text-white">Poluge</h1>
      <DistributersListing distributers={distributersInstances} />
    </main>
  )
}