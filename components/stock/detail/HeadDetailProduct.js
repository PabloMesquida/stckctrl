import stylesGeneral from "@/styles/General.module.css";
import { MdBarChart } from "react-icons/md";

const HeadDetailProduct = ({ name }) => {
  return (
    <div className={stylesGeneral.head_container}>
      <div className={stylesGeneral.section_title}>{name}</div>
      <div className={stylesGeneral.icon_stats_container}>
        <MdBarChart size={30} className="text-th-accent-dark" />
      </div>
    </div>
  );
};

export default HeadDetailProduct;
