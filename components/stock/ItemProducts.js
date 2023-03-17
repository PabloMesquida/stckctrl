import stylesGeneral from "@/styles/General.module.css";
import { MdImage } from "react-icons/md";

const ItemProducts = ({ product }) => {
  return (
    <div className={stylesGeneral.item_container}>
      <div className="bg-th-background rounded-md mr-2">
        <MdImage size={64} />
      </div>
      <div className="grow">
        <div className="flex flex-row w-full">
          <div>
            <span>{product.codigo}</span>
          </div>
          <div>
            <span>{product.id_cat}</span>
          </div>
          <div>
            <span>{product.nombre}</span>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div>
            <span>{product.id_prov}</span>
          </div>
          <div>
            <span>{product.id_gen}</span>
          </div>
        </div>
      </div>

      <div>
        <button>Editar</button>
        <button>Eliminar</button>
      </div>
    </div>
  );
};

export default ItemProducts;
