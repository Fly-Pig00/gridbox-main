import React from 'react';
import Link from 'next/link';

type links = {
    name: String,
    slug: String,
    _id?: String
}[];
  
type subMenu = {
    forPage: String,
    links: links,
    close: Function
};
  
const SubMenu = ({forPage, links, close} : subMenu) => {
    return (
      <div id={`${forPage}`} className="subMenu" onMouseLeave={() => close()}>
        <ul >
          {links?.map(({name, slug, _id}, idx: number)=> {
            return(
              <li key={idx}>
                <Link
                  href={{ pathname: `/${slug}` }}
                >{name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  };

export default SubMenu;