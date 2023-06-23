import { projectId, dataset, readToken } from "@/sanity/env";
const graphRequest = async (query: string, brand?: string) => {
  const sanity = {
    projectId: brand === 'lithion' ? process.env.NEXT_PUBLIC_LITHION_SANITY_PROJECT_ID : projectId,
    token: brand === 'lithion' ? process.env.NEXT_PUBLIC_LITHION_SANITY_API_TOKEN : readToken,
  }
  try {
    const res = await fetch(`https://${sanity.projectId}.api.sanity.io/v1/graphql/${dataset}/default`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sanity.token}`,
      },
      body: JSON.stringify({ query }),
    })
    const data = await res.json();
    if(data) return data;
    throw new Error(`Failed to fetch graph data!: ${query}`);
  } catch (error) {
    console.log('Home getStaticProps ERROR: ', error)
  }
}

export default graphRequest
