import sanityClient from "@sanity/client";

import { projectId, dataset, apiVersion, readToken, useCdn } from "@/sanity/env";

const sanityApiClient = sanityClient(
  {
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token: readToken,
  }
  );

export default sanityApiClient;