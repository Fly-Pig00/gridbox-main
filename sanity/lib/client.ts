import { createClient } from "next-sanity";

import {
  apiVersion,
  dataset,
  projectId,
  readToken,
  lithionToken,
  lithionProjectId,
  useCdn,
} from "../env";
import { homePageQuery, productPageQuery, productsLinksQuery } from "./queries";
import { HomePagePayload, ProductLinks, ProductsPayload } from "../types";

export const client = (brand: string) =>
  createClient({
    projectId: brand === "lithion" ? lithionProjectId : projectId,
    dataset,
    apiVersion,
    useCdn,
    token: brand === "lithion" ? lithionToken : readToken,
  });

export async function getHomePage(): Promise<HomePagePayload | undefined> {
  return await client("gridbox")?.fetch(homePageQuery);
}

export async function getProductLinks(): Promise<ProductLinks[] | []> {
  return await client("gridbox")?.fetch(productsLinksQuery);
}

export async function getProductPage(
  slug: string
): Promise<ProductsPayload | undefined> {
  return await client("gridbox")?.fetch(productPageQuery(slug));
}
