import Link from "next/link";
import Image from "next/image";

export type SubMenuLinks = {
  name: string;
  slug: string;
  _id: string;
};

const DesktopNav = ({ productLinks }: { productLinks: SubMenuLinks[] }) => {
  return (
    <nav className="desktopNav">
      {/* <BrandNav/> */}
      <Link className="headerLogo" href="/">
        <Image
          fill
          priority
          src="/gridbox-logo.png"
          alt="Gridbox Logo"
          className="object-contain"
          sizes="(max-width: 500px)"
        />
      </Link>
      <ul className="">
        <li>
          <Link href="/about">About</Link>
        </li>
        <SubMenu title="products" links={productLinks} />
        <li>
          <Link href="/press">Press</Link>
        </li>
        <li>
          <Link href="/faq">FAQs</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

const SubMenu = ({
  title,
  links,
}: {
  title: string;
  links: SubMenuLinks[];
}) => {
  return (
    <li tabIndex={0} className="subMenu">
      <span>{title}</span>
      <ul>
        {links?.map(({ name, slug }) => {
          return (
            <li key={name}>
              <Link href={{ pathname: `/${slug}` }}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default DesktopNav;
