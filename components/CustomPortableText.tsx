import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";
import SanityImage from "@/components/SanityImage";
import type { Image } from "sanity";
import Button from "@/components/Button";
import Link from "next/link";
// import Flickity from "react-flickity-component";
import { useRef } from "react";

const ColumnsComponent = ({ value }: { value: any }) => {
  const columns = [
    "md:grid-cols-1",
    "md:grid-cols-2",
    "md:grid-cols-3",
    "md:grid-cols-4",
    "md:grid-cols-5",
    "md:grid-cols-6",
    "md:grid-cols-7",
    "md:grid-cols-8",
    "md:grid-cols-9",
    "md:grid-cols-10",
    "md:grid-cols-11",
    "md:grid-cols-12",
  ];

  return (
    <div className={`columns ${columns[value.columns.length - 1]} `}>
      {value.columns.map((column: any, idx: number) => {
        return (
          <div key={idx} className="mx-auto w-full h-full relative">
            <PortableText
              value={column.content}
              components={{
                block: {
                  normal: ({ children }) => {
                    return <p>{children}</p>;
                  },
                },
                marks: {
                  link: ({ children, value }) => {
                    return (
                      <Link
                        className="underline transition hover:opacity-50"
                        href={value?.href}
                        rel="noreferrer noopener"
                      >
                        {children}
                      </Link>
                    );
                  },
                  strong: ({ children }) => <strong>{children}</strong>,
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc pl-5 mt-3 flex flex-col space-y-2">
                      {children}
                    </ul>
                  ),
                },
                types: {
                  image: ImageComponent,
                  button: ButtonComponent,
                },
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const ButtonComponent = ({ value }: { value: any }) => {
  return (
    <Button btnStyle="bg-accent w-max px-5 py-2 rounded font-bold hover:opacity-80 mx-auto transition ">
      <Link
        href={value.buttonLink}
        className="text-white text-xl"
        target={value?.newTab ? "_blank" : "_self"}
        rel="noreferrer noopener"
      >
        {value.buttonText}
      </Link>
    </Button>
  );
};

// const CarouselComponent = ({ value }: { value: any }) => {
//   const flickityRefs = useRef({ title: null, image: null });
//   const options = {
//     draggable: true,
//     prevNextButtons: true,
//     autoPlay: true,
//     wrapAround: true,
//     pageDots: true,
//   };
//   return (
//     <Flickity
//       flickityRef={(v: any) => (flickityRefs.current.title = v)}
//       options={options}
//       reloadOnUpdate
//       className="flickity-carousel"
//     >
//       {value?.images?.map((image: Image, idx: number) => {
//         return (
//           <div key={idx} className="relative w-full h-max">
//             <SanityImage asset={image?.asset} />
//           </div>
//         );
//       })}
//     </Flickity>
//   );
// };

const ImageComponent = ({
  value,
}: {
  value: Image & { alt?: string; caption?: string; fill?: boolean };
}) => {
  return (
    <>
      <SanityImage asset={value.asset} />
      {value?.caption && <p className="text-sm italic">{value.caption}</p>}
    </>
  );
};

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <Link
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </Link>
        );
      },
      strong: ({ children }) => <strong>{children}</strong>,
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-5 mt-3 flex flex-col space-y-2">
          {children}
        </ul>
      ),
    },
    types: {
      image: ImageComponent,
      columns: ColumnsComponent,
      button: ButtonComponent,
      // carousel: CarouselComponent,
    },
  };

  return <PortableText components={components} value={value} />;
}
