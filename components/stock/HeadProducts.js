import stylesGeneral from "@/styles/General.module.css";
import Link from "next/link";
import { MdBarChart, MdLibraryAdd } from "react-icons/md";

const HeadProducts = () => {
  return (
    <div className={stylesGeneral.head_container}>
      <div className={stylesGeneral.section_title}>STOCK</div>
      <div className={stylesGeneral.icon_stats_container}>
        <MdBarChart size={30} className="text-th-accent-dark" />
      </div>
      <div>
        <Link href="./stock/nuevo">
          <button className={stylesGeneral.button_sm}>
            <MdLibraryAdd size={24} className="mr-4" /> Nuevo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeadProducts;
