export default {
    name: 'caseStudies',
    title: 'Case Studies',
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
        of: [{ type: 'block' }, { type: 'image' }],
      },
    ],
  }
  