import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'


export const _manufacturerReps = {
    name: "manufacturerReps",
    title: 'Manufacturer Reps',
    type: 'object',
    // orderings: [orderRankOrdering],
    fields: [
        {
            name: "name",
            title: 'Name',
            type: "string",
        },
        {
            name: 'info',
            title: 'Information',
            type: 'array',
            of: [
                {type: 'block'}
            ]
        },
        {
            name: 'regionColor',
            title: 'Region Color (Hex Code)',
            type: 'string',
        },
        // orderRankField({ type: "salesReps" }),
    ]
}

export default  {
  name: "manufacturersMaps",
  title: 'Manufacturers Maps',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
      {
          name: "name",
          title: 'Name',
          type: "string",
      },
      {
          name: "interactiveMapLink",
          title: 'interactive Map Link',
          type: "string",
      },
      {
          name: 'mapImage',
          title: 'Map Image',
          type: 'image',
        //   validation: 'required'
      },
      {
          name: 'manufacturerReps',
          title: 'manufacturer Reps',
          type: 'array',
          of: [{
            type: 'manufacturerReps'
          }]
      },
      orderRankField({ type: "manufacturersMaps" }),
  ]
}