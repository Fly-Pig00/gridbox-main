import React from "react";
import PageHeader, { Header } from "@/components/PageHeader";
import Image from "next/image";
import graphRequest from "@/utils/graphql";

type AboutType = {
  descriptionSet: {
    title: string;
    description: string;
    image?: {
      asset: {
        url: string;
      };
    };
  }[];
};

const About = ({
  about: { descriptionSet },
  header,
}: {
  about: AboutType;
  header: Header;
}) => {
  return (
    <>
      <PageHeader data={header} />
      <div className="about page">
        {descriptionSet?.map((set, idx) => {
          return set.image?.asset.url ? (
            <div className="about__container" key={idx}>
              <div className="about__image">
                <Image
                  fill
                  src={set.image.asset.url}
                  alt={`${set.title}-image`}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="flex-1">
                <h2>{set.title}</h2>
                <p>{set.description}</p>
              </div>
            </div>
          ) : (
            <div key={idx}>
              <h1 className="text-center capitalize">{set.title}</h1>
              <p>{set.description}</p>
            </div>
          );
        })}
        <div className="h-60 md:h-96 lg:h-[600px] w-full relative">
          <Image
            src="/lithion-global.png"
            alt="lithion global map"
            className="object-cover w-full h-full"
            fill
          />
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const aboutQuery = `
  {
    allAbout{
      descriptionSet{
        title,
        description,
        image{
          asset{
            url
          }
        }
      }
    }
  }
  `;
  const headerQuery = `{
    allPageHeaders (where: {title: {eq: "about"}}) {
      title,
      description,
      image{
        asset{
          url
        }
      }
    }
  }`;
  const {
    data: { allAbout },
  } = await graphRequest(aboutQuery);
  const {
    data: { allPageHeaders },
  } = await graphRequest(headerQuery);
  return {
    props: {
      about: allAbout[0],
      header: allPageHeaders[0],
    },
  };
};

export default About;
