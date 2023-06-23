import type { PortableTextBlock } from "sanity";
import type { Image } from "sanity";
import { SanityFileSource } from "@sanity/asset-utils";
import { ImageProps } from "next/image";

export interface ProductLinks {
  name: string;
  slug: string;
  _id?: string;
}

export interface AboutPagePayload {
  descriptionSet: {
    title: string;
    description: string;
    image?: Image;
  }[];
}

export interface HomePagePayload {
  hero: {
    slogan: string;
    image: Image;
    link: string;
  };
  featureProduct: {
    slug: string;
    copy: string;
    image: Image;
  };
  partners: {
    name: string;
    link: string;
    logo: Image;
  }[];
}

export interface ProductsPayload {
  name: String;
  description: PortableTextBlock[];
  details: PortableTextBlock[];
  mainImage: SanityImageAsset;
  dataSheet?: {
    asset: {
      url: string;
    };
  };
  features?: {
    featureText: PortableTextBlock[];
    featureImage: SanityImageAsset;
  }[];
  videoLinks: string[];
  gallery: SanityImageAsset[];
  content: PortableTextBlock[];
}

export interface CaseStudiesPayload {
  title: string;
  slug: string;
  published: boolean;
  body: PortableTextBlock[];
}

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _key: string;
}

export interface SanityImageAsset {
  _type?: string;
  url?: string | undefined;
  id?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  asset?: {
    _ref?: string | undefined;
    _type?: string;
    url?: string | undefined;
    width?: number | `${number}`;
    height?: number | `${number}`;
    _id?: string;
  };
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  caption?: string;
  fill?: boolean;
  priority?: boolean;
}

export interface BrandsPayload {
  name: string;
  link: string;
  regularLogo: {
    asset: {
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  whiteLogo: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
}
