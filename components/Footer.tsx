import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import graphRequest from "@/utils/graphql";

const Footer = () => {
  const date = new Date();
  const [socials, setSocials] = useState([]);
  useEffect(() => {
    const getSocials = async () => {
      const query = `{
        allSocials{
          name,
          url,
        }
      }`;
      const {
        data: { allSocials },
      } = await graphRequest(query);
      setSocials(allSocials);
    };
    getSocials();
  }, []);
  return (
    <footer>
      <div className="footer__container">
        <div className="flex-1 mb-5 flex flex-col sm:items-center">
          <Link className="footer__logo" href="/">
            <Image
              fill
              src="/gridbox-logo.png"
              alt="Gridbox Logo"
              className="object-contain"
              sizes="(max-width: 500px)"
            />
          </Link>
          <div className="footer__socials">
            {socials?.map(({ name, url }, idx) => {
              return (
                <SocialIcon
                  key={idx}
                  network={name}
                  bgColor="black"
                  className="w-2 h-5"
                  style={{ width: 30, height: 30 }}
                  url={url}
                  target="_blank"
                />
              );
            })}
          </div>
        </div>
        <div className="footer__links">
          <div className="space-y-2 mb-2 sm:mb-0">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="space-y-2">
            {/* <Link href="/contact/#distributors">Distributors</Link> */}
            <Link href="/faq">FAQs</Link>
            <Link href="/press">Press</Link>
          </div>
        </div>
      </div>
      <p className="w-10/12 text-left sm:text-center">
        {" "}
        © {date.getFullYear()} Gridbox. all rights reserved
      </p>
    </footer>
  );
};

export default Footer;
