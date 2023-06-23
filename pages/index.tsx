import { Inter } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";
import graphRequest from "../utils/graphql";

const inter = Inter({ subsets: ["latin"] });

type HomeType = {
  hero: HeroType;
  featureProduct: FeatureProductType;
  partners: PartnerType;
};

type HeroType = {
  slogan?: string;
  image?: {
    asset: {
      url: string;
    };
  };
  link?: string;
};
type FeatureProductType = {
  slug: string;
  copy: string;
  image: {
    asset: {
      url: string;
    };
  };
};

type PartnerType = {
  name: string;
  link: string;
  logo: {
    asset: {
      url: string;
    };
  };
}[];

type Section = {
  title: string;
  copy?: string;
  link?: string;
  image?: {
    asset: {
      url: string;
    };
  };
};

const Home = ({ data, sections }: { data: HomeType; sections: Section[] }) => {
  return (
    <div className="home">
      <Hero data={data?.hero} />
      {/* <FeatureProduct data={data?.featureProduct}/> */}
      {sections?.map((section, idx) => {
        return <Sections key={idx} data={section} index={idx} />;
      })}
      <Partners data={data?.partners} />
    </div>
  );
};

const Hero = ({ data: { slogan, image, link } }: { data: HeroType }) => {
  return (
    <div className="home__hero">
      <div className="home__hero--image">
        <Image
          priority
          fill
          src={`${image?.asset.url}`}
          alt="homegrid hero image"
          className="object-cover object-slight-right md:object-center"
          sizes="(max-width: 1920px)"
        />
      </div>
      <h1 className="home__hero--slogan">{slogan}</h1>
      {/* <Link className='hero__image' href={link}>link</Link> */}
    </div>
  );
};
const FeatureProduct = ({
  data: { slug, copy, image },
}: {
  data: FeatureProductType;
}) => {
  return (
    <div className={`home__feature ${inter.className}`}>
      <Link className="home__feature--image" href={`/${slug}`}>
        <Image
          priority
          fill
          src={`${image.asset.url}`}
          alt="homegrid feature product image"
          className="object-contain"
          sizes="100vw"
        />
      </Link>
      <h3 className="home__feature--copy">{copy}</h3>
      <div className="home__feature--grayBlock">
        <div>
          <div />
        </div>
      </div>
    </div>
  );
};
const Partners = ({ data }: { data: PartnerType }) => {
  return (
    <div className="partners">
      <h1 className="partners__title">our partners</h1>
      <div className="partners__logosContainer">
        {data?.map(({ name, link, logo }, idx) => {
          return (
            <Link className="partners__logo" href={link ?? ""} key={idx}>
              <Image
                priority
                fill
                src={`${logo?.asset.url}`}
                alt={`${name} logo`}
                className="object-contain"
                sizes="(max-width: 500px)"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Sections = ({ data, index }: { data: Section; index: number }) => {
  const background =
    data?.image && index % 2 === 0
      ? "bg-accent"
      : data?.image && index % 2 !== 0
      ? "bg-secondary"
      : "bg-primary";
  const textColor = index === 0 ? "text-accent" : "text-black";

  return (
    <div className={`sections ${background} ${textColor}`}>
      {data?.image ? (
        <div className={`sections--image`}>
          <Image
            priority
            fill
            src={`${data?.image.asset.url}`}
            alt="lithion hero image"
            className="object-contain w-full h-full"
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="sections--copy">
          <h3 className={data?.image ? "text-left" : "text-center max-w-5xl"}>
            {data?.title}
          </h3>
          <p>{data?.copy}</p>
          {data?.link && (
            <div className="w-full">
              <Link href={`${data?.link}`}>Learn More</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  const homeQuery = `{
    allHome{
      hero{
        slogan,
        image{
          asset{
            url
          }
        },
        link
      },
      featureProduct{
        slug,
        copy,
        image{
          asset{
            url
          }
        }
      },
      partners{
        name,
        link,
        logo{
          asset{
            url
          }
        }
      }
    }
  }`;
  const sectionsQuery = `{
    allSections(
      where:{ live: { eq: true } },
      sort:{ orderRank: ASC}
    ){
      title,
      copy,
      link,
      image{
        asset{
          url
        }
      }
    }
  }`;

  const getHome = await graphRequest(homeQuery);
  const {
    data: { allHome },
  } = await getHome;
  const {
    data: { allSections },
  } = await graphRequest(sectionsQuery);
  return {
    props: {
      data: allHome[0],
      sections: allSections,
    },
  };
};

export default Home;
