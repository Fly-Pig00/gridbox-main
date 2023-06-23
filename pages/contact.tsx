import React from "react";
// import type { NextPage } from 'next';
import Maps, { ManufacturersMaps } from "@/components/Maps";
import ContactForm from "@/components/ContactForm";
import { DistributorsType } from "@/components/DistributorsMap";
import graphRequest from "@/utils/graphql";
import PageHeader, { Header } from "@/components/PageHeader";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const Contact = ({
  distributors,
  manufacturersMaps,
  header,
}: {
  distributors: DistributorsType;
  manufacturersMaps: ManufacturersMaps[];
  header: Header;
}) => {
  return (
    <>
      <PageHeader data={header} />
      <div className="contact page">
        <div className="contact__techSupport" id="technical">
          <h3 className="text-center mb-3">Technical Support</h3>
          <div className="sm:grid grid-cols-3 grid-rows-1">
            <p>support@lithionbattery.com</p>
            <p>1.855.753.3505</p>
            <p>Mon-Fri 8AM-4PM PST</p>
          </div>
        </div>
        <Maps
          distributors={distributors}
          manufacturersMaps={manufacturersMaps}
        />
        <h1 id="general" className="text-center">
          General Inquiries
        </h1>
        <MailchimpSubscribe
          url={process.env.NEXT_PUBLIC_MAILCHIMP_URL || ""}
          render={({ subscribe, status, message }) => (
            <ContactForm mailchimpProps={{ subscribe, status, message }} />
          )}
        />
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const distributorsQuery = `{
    allDistributors{
      name,
      address,
      lat,
      lng,
      link,
    }
  }`;
  const manufacturersQuery = `{
    allManufacturersMaps( sort:{ orderRank: ASC} ){
      name,
      interactiveMapLink,
      mapImage{
        asset{
          url
        }
      },
      manufacturerReps{
        name,
        infoRaw,
        regionColor
      }
    }
  }`;
  const headerQuery = `{
    allPageHeaders (where: {title: {eq: "contact"}}) {
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
    data: { allManufacturersMaps },
  } = await graphRequest(manufacturersQuery);
  const {
    data: { allDistributors },
  } = await graphRequest(distributorsQuery);
  const {
    data: { allPageHeaders },
  } = await graphRequest(headerQuery);
  return {
    props: {
      distributors: allDistributors,
      manufacturersMaps: allManufacturersMaps,
      header: allPageHeaders[0],
    },
  };
};

export default Contact;
