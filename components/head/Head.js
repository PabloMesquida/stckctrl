import { useRouter } from "next/router";
import Link from "next/link";
import { useWidthNavigator } from "@/helpers/useWidthNavigator.js";
import { MdBarChart, MdLibraryAdd, MdNavigateBefore } from "react-icons/md";
import stylesGeneral from "@/styles/General.module.css";

const Head = ({ section }) => {
  const router = useRouter();
  const isNew = router.pathname.includes("/new");
  const widthNavigator = useWidthNavigator();
  let title, titleNew, link;

  switch (section) {
    case "stock":
      title = "STOCK";
      titleNew = "NUEVO PRODUCTO";
      link = "/stock";
      break;
    case "suppliers":
      title = "PROVEEDORES";
      titleNew = "NUEVO PROVEEDOR";
      link = "/suppliers";
      break;
    case "sales":
      title = "VENTAS";
      titleNew = "NUEVA VENTA";
      link = "/sales";
      break;
    default:
      title = "STOCK";
      link = "/stock";
  }
  return (
    <div className={stylesGeneral.head_container}>
      <div className={stylesGeneral.section_title}>
        {isNew ? titleNew : title}
      </div>
      <div className={stylesGeneral.icon_stats_container}>
        <MdBarChart size={30} className="text-th-accent-dark" />
      </div>
      <div>
        {isNew ? (
          <Link href={`${link}`}>
            <button className={stylesGeneral.button_sm_nofill}>
              <MdNavigateBefore
                size={24}
                className={widthNavigator > 640 && "mr-4"}
              />
              {widthNavigator > 640 && "Volver"}
            </button>
          </Link>
        ) : (
          <Link href={`${link}/new`}>
            <button className={stylesGeneral.button_sm}>
              <MdLibraryAdd size={24} className="mr-4" /> Nuevo
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Head;
