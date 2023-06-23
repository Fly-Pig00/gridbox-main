/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schema";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";

// USE IF RUNNING SANITY DEPLOY, SANITY BUILD, or
// ACCESSING STUDIO VIA localhost:3333
// const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID
// const dataset = import.meta.env.SANITY_STUDIO_DATASET

export default defineConfig({
  basePath: "/studio",
  name: "Gridbox_Studio",
  title: "Gridbox Content Manager",

  projectId,
  dataset,

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title("Content")
          .items([
            // Minimum required configuration
            orderableDocumentListDeskItem({ type: "faq", S, context }),
            orderableDocumentListDeskItem({
              type: "manufacturersMaps",
              S,
              context,
            }),
            orderableDocumentListDeskItem({ type: "products", S, context }),
            orderableDocumentListDeskItem({ type: "downloads", S, context }),
            orderableDocumentListDeskItem({ type: "videos", S, context }),
            orderableDocumentListDeskItem({ type: "sections", S, context }),
            orderableDocumentListDeskItem({
              type: "linkedInPosts",
              S,
              context,
            }),
            ...S.documentTypeListItems(),

            // // Optional configuration
            // orderableDocumentListDeskItem({
            //     type: 'project',
            //     title: 'Projects',
            //     icon: Paint,
            //     // Required if using multiple lists of the same 'type'
            //     id: 'orderable-en-projects',
            //     // See notes on adding a `filter` below
            //     filter: `__i18n_lang == $lang`,
            //     params: {
            //         lang: 'en_US'
            //     },
            //     // pass from the structure callback params above
            //     S,
            //     context
            // }),
          ]);
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
});
