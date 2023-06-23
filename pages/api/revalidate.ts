import {isValidSignature, SIGNATURE_HEADER_NAME} from '@sanity/webhook'
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  const signature = req.headers[SIGNATURE_HEADER_NAME]!.toString();
  const body = await readBody(req);

  try {
    //authenticating the webhook
    if (!isValidSignature(body, signature, secret ?? '')) return res.status(401).json({ msg: 'Invalid request!' });

    //getting payload
    let _type: string;
    let title: string;
    let slug: string;
    try {
      const json = JSON.parse(body);
      _type = json._type;
      slug = json.slug;
      title = json.title;
    } catch (error) {
      console.log("ERROR: Invalid JSON payload");
      return res.status(400).json({ msg: "Invalid request!" });
    }

    const path: { [key: string]: string[] } = {
      home: ["/"],
      about: ["/about"],
      products: [`/${slug}`],
      faq: ["/faq"],
      downloads: ["/downloads"],
      press: ["/press", `/press/${slug}`],
      manufacturersMaps: ["/contact"],
      distributors: ["/contact"],
      pageHeaders: [`/${title}`],
      default: ["/"],
    };

    const urls = path[_type] ?? path.default;
    await Promise.all(
      urls.map(async (string) => {
        await res.revalidate(string);
        console.log("PAYLOAD TYPE: ", _type, ", PATH: ", string);
      })
    );

    res.status(200).json({ msg: "pages revalidated." });
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(500).json({ err: "Something went Wrong!" });
  }
};

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
}

async function readBody(readable:NextApiRequest) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

export default handler;