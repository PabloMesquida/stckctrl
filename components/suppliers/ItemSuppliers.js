import stylesGeneral from "@/styles/General.module.css";
import Link from "next/link";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

const ItemSuppliers = ({ supplier, warningMessage }) => {
  return (
    <div className={stylesGeneral.item_container_sm}>
      <div className="flex grow w-3/4 sm:w-5/6 border-r border-th-primary-light pr-4">
        <div className="flex flex-col w-full p-2 gap-2">
          <div className="flex flex-col w-full">
            <span className={stylesGeneral.item_name}>{supplier.nombre}</span>
            <span className={stylesGeneral.item_sub}>{supplier.direccion}</span>
          </div>

          <div className="flex flex-col w-full">
            <span className={`${stylesGeneral.item_sub_accent} `}>
              {supplier.telefono}
            </span>
            <span className={stylesGeneral.item_sub}>{supplier.mail}</span>
            <span className={stylesGeneral.item_sub}>{supplier.web}</span>
          </div>

          <div className="flex flex-row w-full">
            <span className={stylesGeneral.item_sub}>
              {supplier.comentarios}
            </span>
          </div>
        </div>
      </div>
      <div className={stylesGeneral.item_icon_container_sm}>
        <Link href={`suppliers/edit/${supplier.id}`} shallow>
          <MdModeEdit className={stylesGeneral.item_icon} />
        </Link>
        <button onClick={warningMessage}>
          <MdDeleteForever className={stylesGeneral.item_icon_del} />
        </button>
      </div>
    </div>
  );
};

export default ItemSuppliers;
