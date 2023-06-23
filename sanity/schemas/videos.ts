import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
    name: "videos",
    type: 'document',
    title: 'Videos',
    orderings: [orderRankOrdering],
    fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'url',
          title: 'Video URL',
          type: 'string',
        },
      orderRankField({ type: "videos" }),
    ]
}