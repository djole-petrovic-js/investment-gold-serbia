/**
 * Next.js Core.
 */
import { getPlaiceholder } from "plaiceholder"
import probe from "probe-image-size"
/**
 * When using Next.js Image component, use this to create the blur temp image.
 *
 * @param {String} imageFullUrl
 *
 * @returns {Promise<string>}
 */
export default async function getImageMetadata(imageFullUrl: string) {
  const buffer = await fetch(imageFullUrl).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  )

  const [imageMetadata, { base64 }] = await Promise.all([
    probe(imageFullUrl),
    getPlaiceholder(buffer)
  ])

  return {
    imageFullUrl,
    dimensions: {
      width: imageMetadata.width,
      height: imageMetadata.height
    },
    blurDataURL: base64
  }
}
