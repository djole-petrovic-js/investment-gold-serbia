/**
 * Next.js Core.
 */
import { getPlaiceholder } from "plaiceholder"
/**
 * When using Next.js Image component, use this to create the blur temp image.
 *
 * @param {String} imageFullUrl
 *
 * @returns {Promise<string>}
 */
export default async function getImagePlaiceholder(
  imageFullUrl: string
): Promise<string> {
  try {
    const buffer = await fetch(imageFullUrl).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    )

    const { base64 } = await getPlaiceholder(buffer)

    return base64
  } catch (e) {
    return ""
  }
}
