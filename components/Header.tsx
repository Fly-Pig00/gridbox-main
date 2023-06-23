import React, { useState, useEffect } from "react";
import graphRequest from "@/utils/graphql";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header = () => {
  const [productLinks, setProductLinks] = useState([]);

  useEffect(() => {
    if (productLinks.length === 0) {
      const getProductLinks = async () => {
        const productsQuery = `{
          allProducts (sort: {orderRank: ASC}){
            name,
            slug,
          }
        }`;
        const getProducts = await graphRequest(productsQuery);
        const {
          data: { allProducts },
        } = await getProducts;
        setProductLinks(allProducts);
      };
      getProductLinks();
    }
  }, [productLinks]);

  return (
    <header>
      <DesktopNav productLinks={productLinks} />
      <MobileNav productLinks={productLinks} />
    </header>
  );
};

export default Header;
