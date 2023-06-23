import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list';

export const _fileSet = {
    name: '_fileSet',
    title: 'File Set',
    type: 'object',
    fields: [
        {
            name: 'linkName',
            title: 'Link Name',
            type: 'string',
        },
        {
            name: 'link',
            title: 'Link',
            type: 'string',
        },
        {
            name: 'file',
            title: 'File',
            type: 'file',
        }
    ]
}

export default {
    name: "downloads",
    title: 'Downloads',
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        {
            name: 'category',
            title: 'Category',
            type: 'string'
        },
        {
            name: 'files',
            title: 'Files',
            type: 'array',
            of: [{type: '_fileSet'}]
        },
        orderRankField({ type: "downloads" }),
    ]
}