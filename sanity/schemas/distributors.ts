export default  {
    name: "distributors",
    type: 'document',
    title: 'Distributors',
    fields: [
        {
            name: "name",
            title: 'Name',
            type: "string"
        },
        {
            name: 'address',
            title: 'Address',
            type: 'string'
        },
        {
            name: 'lat',
            title: 'Latitude',
            type: 'number',
        },
        {
            name: 'lng',
            title: 'Longitude',
            type: 'number',
        },
        {
            name: 'link',
            title: 'Link',
            type: 'string',
        },
    ]
}