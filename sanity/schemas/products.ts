import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
// import customBlock from "./customBlock";

export const _featureSet = {
  name: "_featureSet",
  title: "Set",
  type: "object",
  fields: [
    {
      name: "featureImage",
      title: "Image",
      type: "image",
    },
    {
      name: "featureText",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
          lists: [{ title: "Bullet", value: "bullet" }],
        },
      ],
    },
  ],
};

export default {
  name: "products",
  type: "document",
  title: "Products",
  orderings: [orderRankOrdering],
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "slug",
      type: "string",
      title: "Slug",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "details",
      title: "Details",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "mainImage",
      type: "image",
      title: "Main Image",
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      name: "dataSheet",
      type: "file",
      title: "Data Sheet",
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "_featureSet",
        },
      ],
    },
    {
      name: "videoLinks",
      title: "Video Links",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
    },
    // {
    //   name: "content",
    //   title: "Content",
    //   type: "array",
    //   of: customBlock,
    // },
    orderRankField({ type: "products" }),
  ],
};
