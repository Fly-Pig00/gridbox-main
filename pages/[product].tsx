import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { getProductLinks, getProductPage } from "@/sanity/lib/client";
import { CustomPortableText } from "@/components/CustomPortableText";
import { Gallery, Item } from "react-photoswipe-gallery";
import { ProductsPayload } from "@/sanity/types";
import SanityImage from "@/components/SanityImage";
import "photoswipe/dist/photoswipe.css";

const Product = ({
  product: {
    name,
    description,
    details,
    mainImage,
    features,
    videoLinks,
    gallery,
    // content,
  },
}: {
  product: ProductsPayload;
}) => {
  return (
    <div className="product page">
      <div className="product__main">
        <div className="h-max">
          <SanityImage asset={mainImage} priority />
          {mainImage?.caption && (
            <p className="text-sm italic">{mainImage?.caption}</p>
          )}
        </div>
        <div className="product__mainDescription">
          <h1>{name}</h1>
          <div className="flex flex-col">
            <CustomPortableText value={description} />
          </div>
          <div className="product__mainDescription--details">
            <CustomPortableText value={details} />
          </div>
          <Link href="/request">
            Specifications
            <svg viewBox="0 0 448 512" width={14}>
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="product__features">
        <h2>features</h2>
        {features?.map((feat, idx) => {
          return (
            <div className="product__featuresDescription" key={idx}>
              <div className="relative">
                <SanityImage asset={feat?.featureImage} />
              </div>
              <div className="product__featuresText">
                <CustomPortableText value={feat.featureText} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={`mb-10 max-w-[800px] mx-auto`}>
        {videoLinks?.map((url) => {
          return (
            <div key={url} className="h-48 sm:h-96 lg:h-[400px] mb-5">
              <iframe
                src={url}
                title="GB Video"
                allowFullScreen
                className="flex-1 w-full h-full"
              />
            </div>
          );
        })}
      </div>
      <Gallery>
        <div className="grid sm:grid-cols-3 gap-2 max-w-6xl mx-auto">
          {gallery?.map(({url, width, height, asset }, idx) => {
            return (
              <Item
                original={url}
                thumbnail={url}
                width={width}
                height={height}
                alt={`${name}-gallery-photo-${idx}`}
                key={idx}
              >
                {({ ref, open }) => (
                  <div className="relative h-60 bg-secondary opacity-90 hover:opacity-100 rounded overflow-hidden">
                    <SanityImage
                      asset={asset}
                      onClick={open}
                      ref={ref as React.MutableRefObject<HTMLImageElement>}
                      fill
                    />
                  </div>
                )}
              </Item>
            );
          })}
        </div>
      </Gallery>
      {/* <div className="product__content">
        <CustomPortableText value={content} />
      </div> */}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const productsLinks = await getProductLinks();
  const paths = productsLinks?.map(({ slug }) => {
    return {
      params: { product: slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await getProductPage(params?.product as string);
  return {
    props: {
      product,
    },
  };
};

export default Product;
