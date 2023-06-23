import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'

export default {
  name: 'sections',
  title: 'Sections',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    {
      name: 'live',
      title: 'Live',
      type: 'boolean',
      // validation: (rule) => rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'copy',
      title: 'Copy',
      type: 'text',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Links to external or internal pages',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    orderRankField({ type: 'sections' }),
  ],
}
