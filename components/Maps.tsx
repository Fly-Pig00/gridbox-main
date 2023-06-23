import React, { useState, useEffect } from "react";
import DistributorsMap, { DistributorsType } from "./DistributorsMap";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";
import Link from "next/link";

export type ManufacturersMaps = {
  name: string;
  interactiveMapLink: string;
  mapImage: {
    asset: {
      url: string;
    };
  };
  manufacturerReps: {
    name: string;
    infoRaw: PortableTextBlock[];
    regionColor: string;
  }[];
};

const Maps = ({
  manufacturersMaps,
  distributors,
}: {
  manufacturersMaps: ManufacturersMaps[];
  distributors: DistributorsType;
}) => {
  const [mapType, setMapType] = useState("manufacturers");
  const [salesRegion, setSalesRegion] = useState("United States");

  return (
    <div className="contact__map">
      <div className="contact__map--tabs">
        {manufacturersMaps.length > 0 && (
          <button
            className={`contact__map--buttons ${
              mapType === "manufacturers"
                ? "bg-accent text-white"
                : "bg-primary opacity-70"
            } `}
            onClick={() => setMapType("manufacturers")}
          >
            Manufacturers
          </button>
        )}
        {distributors.length > 0 && (
          <button
            className={`contact__map--buttons ${
              mapType === "distributors"
                ? "bg-accent text-white"
                : "bg-primary opacity-70"
            }`}
            onClick={() => setMapType("distributors")}
          >
            Distributors
          </button>
        )}
      </div>
      {manufacturersMaps.length > 0 && (
        <div
          className={`contact__mapSales ${
            mapType === "manufacturers" ? "block" : "hidden"
          }`}
          id="manufacturers"
        >
          <div className="contact__mapSales--tabs">
            {manufacturersMaps?.map(({ name }, idx) => {
              return (
                <SalesMapTab
                  key={idx}
                  region={name}
                  currentTab={salesRegion}
                  onClick={setSalesRegion}
                />
              );
            })}
          </div>
          <SalesMap
            mapData={
              manufacturersMaps?.filter((map) => map.name === salesRegion)[0]
            }
          />
        </div>
      )}
      <div className={mapType === "distributors" ? "block" : "hidden"}>
        <DistributorsMap distributors={distributors} />
      </div>
    </div>
  );
};

const SalesMap = ({ mapData }: { mapData: ManufacturersMaps }) => {
  const { interactiveMapLink } = mapData;

  // CreateAClickableMap Scripts
  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener(
        "message",
        function (event) {
          if (event.data.length >= 22) {
            if (event.data.substr(0, 22) == "__MM-LOCATION.REDIRECT")
              location = event.data.substr(22);
          }
        },
        false
      );
    } else if ((window as any).attachEvent) {
      (window as any).attachEvent(
        "message",
        function (event: any) {
          if (event.data.length >= 22) {
            if (event.data.substr(0, 22) == "__MM-LOCATION.REDIRECT")
              location = event.data.substr(22);
          }
        },
        false
      );
    }
  }, []);

  return (
    <div className="contact__mapSales--mapContainer">
      {mapData && (
        <>
          <iframe
            src={interactiveMapLink}
            width="900"
            height="525"
            className="border-none w-full h-[800px] hidden sm:block"
          />
          {/* JPG MAPS FOR MOBILE */}
          <JPGMap {...mapData} />
        </>
      )}
    </div>
  );
};

const SalesMapTab = ({
  region,
  currentTab,
  onClick,
}: {
  region: string;
  currentTab: string;
  onClick: Function;
}) => {
  return (
    <button
      className={`hidden contact__mapSales--buttons ${
        currentTab === region ? "bg-accent text-white" : "bg-primary"
      }`}
      onClick={() => onClick(region)}
    >
      {region}
    </button>
  );
};

const JPGMap = ({
  mapImage,
  manufacturerReps,
  name,
}: {
  mapImage: ManufacturersMaps["mapImage"];
  manufacturerReps: ManufacturersMaps["manufacturerReps"];
  name: ManufacturersMaps["name"];
}) => {
  return (
    <div className="block sm:hidden py-5 ">
      <div className="relative h-[250px] sm:h-[600px] w-full mb-5">
        <Image
          src={mapImage?.asset?.url}
          alt={`${name} Sales Map`}
          fill
          priority
          className="w-full h-full object-contain"
        />
      </div>
      <div className=" flex flex-wrap justify-between sm:w-3/5 mx-auto">
        {manufacturerReps?.map(({ name, infoRaw, regionColor }, idx) => {
          return (
            <div key={idx} className="mb-5 w-[150px] sm:w-[200px]">
              <p style={{ color: regionColor }} className="font-bold">
                {name}
              </p>
              <PortableText
                value={infoRaw}
                components={{
                  marks: {
                    link: ({ value }) => (
                      <Link
                        href={value?.href ?? "#"}
                        target="_blank"
                        className="font-medium underline active:text-accent"
                      >
                        website
                      </Link>
                    ),
                  },
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Maps;
