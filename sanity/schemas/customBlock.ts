const customBlock = [
  {
    type: "block",
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Number", value: "number" },
    ],
  },
  {
    type: "image",
    fields: [
      {
        name: "caption",
        type: "string",
        title: "Caption",
        options: {
          isHighlighted: true,
        },
      },
      {
        name: "fill",
        type: "boolean",
        title: "Fill",
        description: "Fill the width of the image container",
      },
    ],
  },
  {
    type: "columns",
  },
  {
    type: "button",
  },
  {
    type: "carousel",
  },
];

export default customBlock;

// Custom Content Blocks
// Must be wrapped in an object type

export const columns = {
  name: "columns",
  title: "Columns",
  type: "object",
  fields: [
    {
      name: "columns",
      title: "Columns",
      type: "array",
      of: [
        {
          title: "column",
          type: "columnBlock",
        },
      ],
    },
  ],
};

export const columnBlock = {
  name: "columnBlock",
  title: "column Block",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          lists: [{ title: "Bullet", value: "bullet" }],
        },
        {
          type: "image",
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
              options: {
                isHighlighted: true,
              },
            },
            {
              name: "fill",
              type: "boolean",
              title: "Fill",
              description: "Fill the width of the image container",
            },
          ],
        },
        {
          type: "columns",
        },
        {
          type: "button",
        },
      ],
    },
  ],
};

export const youtube = {
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "YouTube video URL",
    },
  ],
};

export const button = {
  name: "button",
  title: "Button",
  type: "object",
  fields: [
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
    },
    {
      name: "newTab",
      title: "Open in new tab",
      type: "boolean",
    },
    {
      name: "buttonLink",
      title: "Button Link",
      type: "string",
    },
  ],
};

export const carousel = {
  name: "carousel",
  title: "Carousel",
  type: "object",
  fields: [
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    },
  ],
};
