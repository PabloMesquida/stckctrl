import Link from "next/link";
import stylesGeneral from "@/styles/General.module.css";

const BreadcrumbItem = ({ children, href, ...props }) => {
  return (
    <li {...props}>
      <Link href={href} passHref className={stylesGeneral.breadcrumb_item}>
        {children}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
