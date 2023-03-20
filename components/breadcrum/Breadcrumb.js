import { Children, Fragment } from "react";
import stylesGeneral from "@/styles/General.module.css";
import { MdKeyboardArrowRight } from "react-icons/md";

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);

  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <span>
            <MdKeyboardArrowRight size={18} className="text-th-accent-dark" />
          </span>
        </Fragment>
      );
    }
    return child;
  });

  return (
    <nav className={stylesGeneral.breadcrumb_container}>
      <ol className={stylesGeneral.breadcrumb_list}>{childrenWtihSeperator}</ol>
    </nav>
  );
};

export default Breadcrumb;
