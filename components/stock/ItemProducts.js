import stylesGeneral from "@/styles/General.module.css";
import Link from "next/link";
import {
  MdImage,
  MdAppRegistration,
  MdModeEdit,
  MdDeleteForever,
  MdOutlineFindInPage,
} from "react-icons/md";

const ItemProducts = ({ product, warningMessage }) => {
  return (
    <div className={stylesGeneral.item_container}>
      <div className="flex grow">
        <div>
          <div className="bg-th-background rounded-md mr-4">
            <MdImage className="w-16 h-16 sm:w-20 sm:h-20 text-th-background-tertiary" />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div>
            <span className={stylesGeneral.item_code}>
              {`[ ${product.codigo} ]`}
            </span>
          </div>
          <div>
            <span className={stylesGeneral.item_name}>
              {`${product.categoria} ${product.nombre}`}
            </span>
          </div>
          <div className="flex flex-row w-full">
            <span className={stylesGeneral.item_sub}>
              {`${product.proveedor} - ${product.genero}`}
            </span>
          </div>
        </div>
      </div>

      <div className={stylesGeneral.item_icon_container}>
        <Link href="#" shallow>
          <MdAppRegistration className={stylesGeneral.item_icon} />
        </Link>
        <Link href={`stock/${product.id}`} shallow>
          <MdOutlineFindInPage className={stylesGeneral.item_icon} />
        </Link>

        <button>
          <MdModeEdit className={stylesGeneral.item_icon} />
        </button>

        <button onClick={warningMessage}>
          <MdDeleteForever className={stylesGeneral.item_icon_del} />
        </button>
      </div>
    </div>
  );
};

export default ItemProducts;
