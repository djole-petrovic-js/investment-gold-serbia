/**
 * Next.js core
 */
import type { Metadata } from 'next'
/**
 * App core
 */
import DistributerCore from '@/lib/classes/abstract/Distributer'
import TavexDistributer from '@/lib/classes/distributers/TavexDistributer'
import GVSDistributer from '@/lib/classes/distributers/GVSDistributer'
/**
 * Components
 */
import DistributerUIComponent from '@/lib/components/HomePage/Distributer'
/**
 * Providers
 */
import { getSpotPriceInfo } from '@/lib/providers/http'
/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: 'Investiciono Zlato Srbija',
  description: 'Investiciono Zlato Srbija',
}
/**
 * Home page. Display all recommended distributers. 
 */
export default async function Home() {
  const { spotPriceInRsd } = await getSpotPriceInfo();
  const distributers = [TavexDistributer, GVSDistributer];
  /**
   * Initialize all distributers instances. 
   */
  const distributersData = await Promise.all(distributers.map(async (distributer) => {
    const instance: DistributerCore = new distributer({ spotPriceInRsd: spotPriceInRsd, });

    await instance.fetchProductsData();

    return instance.formatDistributerData();
  }));

  return (
    <main className="bg-black">
      {distributersData.map((distributerData) => 
        <DistributerUIComponent
          key={distributerData.name}
          distributerData={distributerData}
        />
      )}
    </main>
  )
}

/**
 * DEBUGGG
 * 
 * 000 - Nije izgleda povuko nove informacije... proveriti sto je to tako...
 * - Ove informacije sto ima trenutno su od juce
 * --- Prodajna cena : 119.730,00 RSD - GVS, nije ispravno ovo.
 * - Ovo je jer se nalazi u .cache build-u... kapiram ovo ako obrisem da ce da radi
 * -- Ok probati da odradim npm run build, pa npm run start, i da vidim dal ce posle 15 minuta da resetuje cache.
 * ---- Bilo bi super da jetako... msm mora da radi tako, inace nema smisla ovo sto sam radio.
 * 
 * 000 - DOdati informaciju koja spot cena u evrima, dolarima i evrima.
 * -- Ok razdvojiti proizvode, kovanice i poluge i kako god, da je sve to malo razdvojeno.
 * -- Pa napraviti Ne-preporuceni deo, gde su skupe cene i to (Znaci da se odvoje distributeri u posebnu komponentu.)
 * --- I to je to ono, mogu posle da probam push na git, i deploy na vercel.
 * -- Posle videti tipa kako bi baze neke povezao i sta vec ne... to je dobro da se zna fazon.
 * 
 * 
 * 
 * 
 * 1. Mora responsive da se uradi, kapiram da je uzas
 * --- Ovo je kao uradjeno fazon.
 * 
 * 2. Odraditi header.
 * 
 * 3. Videti sta jos tu moze da se uradi.
 * 
 * 4. Seo videti hmmm?
 * 
 * 5. Mozda odvojiti po kovanicama i polugama fazon???
 * 
 * 6. Overpriced stranica?
 * 
 * 7. Videti es lint kako radi... i npm run lint, kako vec radi to.
 */