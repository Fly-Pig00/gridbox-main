export const _descriptionSet = {
    name: "descriptionSet",
    title: 'Description Set',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'image',
            title: 'image',
            type: 'file',
        },
    ]
}

export default {
    name: "about",
    title: 'About',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'descriptionSet',
            title: 'Description Sets',
            type: 'array',
            of: [{type: "descriptionSet"}]
        },
    ]
}