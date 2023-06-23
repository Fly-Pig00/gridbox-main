export default {
  name: 'press',
  title: 'Press',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
      description: "For internal articles"
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: "link to external articles"
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{ title: 'Bullet', value: 'bullet' }],
        },
        {
          type: 'image',
        },
        {
          type: 'youtube'
        }
      ],
    },
  ],
}
