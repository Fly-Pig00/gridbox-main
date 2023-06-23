export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-01-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const readToken = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

export const lithionProjectId = process.env.NEXT_PUBLIC_LITHION_PROJECT_ID;

export const lithionToken = process.env.LITHION_TOKEN;

export const previewSecretDocumentId: `${string}.${string}` = "preview.secret";

export const useCdn = false;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
