import { groq } from "next-sanity";

export const homePageQuery = groq`*[_type == "home"][0]`;
export const aboutPageQuery = groq`*[_type == "about"][0]`;
export const pressPageQuery = groq`*[_type == "press"][0]`;
export const productsLinksQuery = groq`*[_type == "products"]{slug}`;

export const productPageQuery = (
  slug: string
) => groq` *[_type == 'products' && slug == "${slug}"][0]{
  ...,
  mainImage{
    ...,
    "width":asset->.metadata.dimensions.width,
    "height": asset->.metadata.dimensions.height,
    "url": asset->.url,
    "id": asset->.assetId,
  },
  features[]{
    ...,
    featureImage{
      ...,
      "width":asset->.metadata.dimensions.width,
      "height": asset->.metadata.dimensions.height,
      "url": asset->.url,
      "id": asset->.assetId,
    }
  },
  gallery[]{
    ...,
    "width":asset->.metadata.dimensions.width,
    "height": asset->.metadata.dimensions.height,
    "url": asset->.url,
    "id": asset->.assetId,
  }
}`;

export const partnersPageQuery = groq`*[_type == "partners"][0]`;

export const _hero = groq`*[_type == "_hero"]`;

export const _partners = groq`*[_type == "_partners"]`;

export const faqPageQuery = groq`*[_type == "faq"][0]`;

export const brands = groq`*[_type == "brands"]`;
