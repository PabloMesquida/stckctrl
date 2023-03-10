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
            <MdAttachMoney size={24} className="text-th-accent-dark ml-1" />
            <span className="ml-4">Ventas</span>
          </a>
        </li>
        <li>
          <a href="#" className={navStyles.nav_aside_link}>
            <MdCached size={24} className="text-th-accent-dark ml-1" />
            <span className="ml-4">Cambios</span>
          </a>
        </li>
        <li>
          <a href="#" className={navStyles.nav_aside_link}>
            <MdPriceCheck size={24} className="text-th-accent-dark ml-1" />
            <span className="ml-4">Señas</span>
          </a>
        </li>
        <li>
          <a href="#" className={navStyles.nav_aside_link}>
            <MdCardGiftcard size={24} className="text-th-accent-dark ml-1" />
            <span className="ml-4">Vouchers</span>
          </a>
        </li>
        <li>
          <a href="#" className={navStyles.nav_aside_link_featured}>
            <MdLayers size={24} className="text-th-accent-dark ml-1" />
            <span className="ml-4">Stock</span>
          </a>
        </li>
        <li>
          <a href="#" className={navStyles.nav_aside_link}>
            <MdGroup size={24} className="text-th-accent-dark ml-1" />
            <span className="ml-4">Proveedores</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
