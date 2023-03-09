import navStyles from "@/styles/Navbar.module.css";
import {
  MdAttachMoney,
  MdCached,
  MdPriceCheck,
  MdCardGiftcard,
  MdLayers,
  MdGroup,
} from "react-icons/md";

const NavMenu = () => {
  return (
    <div className={navStyles.nav_ul_container}>
      <ul className="space-y-4 my-4">
        <li>
          <a href="#" className={navStyles.nav_aside_link_featured}>
            <MdAttachMoney size={24} className="text-th-accent-dark" />
            <span className="ml-3">Ventas</span>
          </a>
        </li>
        <li>
          <a href="#" className={navStyles.nav_aside_link}>
            <MdCached size={24} className="text-th-accent-dark" />
            <span className="ml-3">Cambios</span>
          </a>
        </li>
        <li>
          <a href="#" className={navStyles.nav_aside_link}>
            <MdPriceCheck size={24} className="text-th-accent-dark" />
            <span className="flex-1 ml-3 whitespace-nowrap">Señas</span>
          </a>
        </li>
        <li>
          <a href="#" className={navStyles.nav_aside_link}>
            <MdCardGiftcard size={24} className="text-th-accent-dark" />
            <span className="flex-1 ml-3 whitespace-nowrap">Vouchers</span>
          </a>
        </li>
        <li>
          <a href="#" className={navStyles.nav_aside_link_featured}>
            <MdLayers size={24} className="text-th-accent-dark" />
            <span className="flex-1 ml-3 whitespace-nowrap">Stock</span>
          </a>
        </li>
        <li>
          <a href="#" className={navStyles.nav_aside_link}>
            <MdGroup size={24} className="text-th-accent-dark" />
            <span className="flex-1 ml-3 whitespace-nowrap">Proveedores</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
