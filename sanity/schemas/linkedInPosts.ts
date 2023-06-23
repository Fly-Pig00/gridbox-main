import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
    name: "linkedInPosts",
    title: 'LinkedIn Posts',
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'url',
          title: 'Url',
          description: "Posts embed url for iframe src",
          type: 'string',
        },
        {
          name: 'width',
          title: 'Width',
          type: 'string',
          description: "Width of original post"
        },
        {
          name: 'height',
          title: 'Height',
          type: 'string',
          description: "Height of original post"
        },
      orderRankField({ type: "linkedInPosts" }),
    ]
}