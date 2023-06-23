import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import sanityApiClient from "@/utils/sanityClient";
import React, { forwardRef, ForwardedRef } from "react";
import { SanityImageAsset } from "@/sanity/types";

const SanityImage = forwardRef<HTMLImageElement, SanityImageAsset>(
  (
    { asset, fill, onClick, priority }: SanityImageAsset,
    ref?: ForwardedRef<HTMLImageElement>
  ) => {
    const imageProps = useNextSanityImage(sanityApiClient, asset ?? {});

    if (!imageProps) return null;

    const { src, width, height } = imageProps;

    return (
      <Image
        {...imageProps}
        ref={ref}
        onClick={onClick}
        src={asset?.url ?? src}
        alt={`${asset?._ref}`}
        className={`w-full h-full ${fill ? `object-cover` : "object-contain"}`}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={`(max-width: ${width}px)`}
        priority={priority}
      />
    );
  }
);

SanityImage.displayName = "SanityImage";

export default SanityImage;
