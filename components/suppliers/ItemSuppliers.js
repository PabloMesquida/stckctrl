import stylesGeneral from "@/styles/General.module.css";
import Link from "next/link";
import {
  MdImage,
  MdAppRegistration,
  MdModeEdit,
  MdDeleteForever,
  MdOutlineFindInPage,
} from "react-icons/md";

const ItemSuppliers = ({ supplier, warningMessage }) => {
  console.log("SUPPLIER: ", supplier);
  return (
    <div className={stylesGeneral.item_container_sm}>
      <div className="flex grow">
        <div className="flex flex-col w-full p-2">
          <div>
            <span className={stylesGeneral.item_name}>{supplier.nombre}</span>
          </div>
          <div className="flex flex-row w-full">
            <span className={stylesGeneral.item_sub}>{supplier.telefono}</span>
          </div>
        </div>
      </div>

      <div className={stylesGeneral.item_icon_container_sm}>
        <Link href={`suppliers/${supplier.id}`} shallow>
          <MdOutlineFindInPage className={stylesGeneral.item_icon} />
        </Link>
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
