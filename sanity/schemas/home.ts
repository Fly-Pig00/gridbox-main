export const _hero = {
    name: '_hero',
    title: 'Hero',
    type: 'object',
    fields: [
        {
            name: 'slogan',
            title: 'Slogan',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
        },
        {
            name: 'link',
            title: 'Link',
            type: 'string',
        },
    ]
};

export const _featureProduct = {
    name: '_featureProduct',
    title: 'Feature Product',
    type: 'object',
    fields: [
        {
            name:'slug',
            title:'Slug',
            type:'string',
        },
        {
            name:'copy',
            title:'Copy',
            type:'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
        },
    ]
};

export const _partners = {
    name: '_partners',
    title: 'Partners',
    type: 'object',
    fields: [
        {
            name: 'name',
            title: 'name',
            type: 'string',
        },
        {
            name: 'link',
            title: 'Link',
            description:'Link to partner\'s website',
            type: 'string',
        },
        {
            name: 'logo',
            title: 'Logo',
            description: 'Image of partern\'s logo',
            type: 'image',
        }
    ]
};

export default {
    name: 'home',
    title: 'Home',
    type: 'document',
    fields: [
        {
            name: 'version',
            title: 'Version',
            description: 'Name of this version of home page data',
            type: 'string',
        },
        {
            name: 'hero',
            title: 'Hero',
            type: '_hero',
        },
        {
            name: 'featureProduct',
            title: 'Feature Product',
            type: '_featureProduct'
        },
        {
            name: 'partners',
            title: 'Partners',
            type: 'array',
            of: [{type: '_partners'}]
        }
    ]
}