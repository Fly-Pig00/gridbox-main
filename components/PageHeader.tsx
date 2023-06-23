import React from "react";
import Image from "next/image";

export type Header = {
  title: string;
  description?: string;
  image: {
    asset: {
      url: string;
    };
  };
};

const PageHeader = ({ data }: { data: Header }) => {
  const {
    title,
    description,
    image: {
      asset: { url },
    },
  } = data;
  const layout = !description
    ? " justify-center items-center"
    : "justify-start items-center sm:items-end";
  const textAlignment = !description ? "text-center" : "max-w-lg";
  return (
    <div className={`pageHeader ${layout}`}>
      <div className="absolute top-0 left-0 right-0 h-full w-full">
        <Image
          fill
          src={url}
          alt={`${title}-image`}
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="page">
        <div className={`relative ${textAlignment}`}>
          <h1 className="text-white capitaliz text-md sm:text-4xl capitalize">
            {title}
          </h1>
          {description && (
            <p className="text-secondary text-sm sm:text-lg">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
