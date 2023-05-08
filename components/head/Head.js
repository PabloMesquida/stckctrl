import stylesGeneral from "@/styles/General.module.css";
import Link from "next/link";
import { MdBarChart, MdLibraryAdd } from "react-icons/md";

const Head = ({ section }) => {
  let title, link;
  switch (section) {
    case "stock":
      title = "STOCK";
      link = "/stock";
      break;
    case "suppliers":
      title = "PROVEEDORES";
      link = "/suppliers";
      break;
    case "sales":
      title = "VENTAS";
      link = "/sales";
      break;
    default:
      title = "STOCK";
      link = "/stock";
  }
  return (
    <div className={stylesGeneral.head_container}>
      <div className={stylesGeneral.section_title}>{title}</div>
      <div className={stylesGeneral.icon_stats_container}>
        <MdBarChart size={30} className="text-th-accent-dark" />
      </div>
      <div>
        <Link href={`${link}/nuevo`}>
          <button className={stylesGeneral.button_sm}>
            <MdLibraryAdd size={24} className="mr-4" /> Nuevo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Head;
