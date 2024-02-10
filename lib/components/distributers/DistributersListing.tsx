/**
 * App core
 */
import Distributer from "@/lib/classes/abstract/Distributer";
/**
 * Components
*/
import SingleDistributer from "@/lib/components/distributers/SingleDistributer";
/**
 * Props
 */
type DistributersListingProps = {
  distributers: Distributer[],
}
/**
 * Display information about a distributer, and all related products.
 */
export default async function DistributersListing({ distributers } : DistributersListingProps) {
  /**
   * Initialize all distributers data.
   */
  const distributersData = await Promise.all(distributers.map(async (distributer) => {
    await distributer.fetchProductsData();

    return distributer.formatDistributerData();
  }));

  return (
    <>
      {distributersData.map((distributerData) =>
        <SingleDistributer
          key={distributerData.name}
          distributerData={distributerData}
        />
      )}
    </>
  )
}