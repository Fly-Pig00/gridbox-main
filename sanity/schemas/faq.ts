import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
    name: "faq",
    type: 'document',
    title: 'FAQs',
    orderings: [orderRankOrdering],
    fields: [
        {
            name: 'question',
            title: 'Question',
            type: 'string',
        },
        {
            name: 'section',
            title: 'Section',
            type: 'string',
        },
        {
            name: 'answer',
            title: 'Answer',
            type: 'array',
            of: [
                {
                    type: 'block',
                    lists: [{ title: 'Bullet', value: 'bullet' }],
                }
            ]
        },
        orderRankField({ type: "faq" }),

    ]
}