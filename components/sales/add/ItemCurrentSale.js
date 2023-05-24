import { useState } from "react";
import SelectProdOptions from "@/components/forms/SelectProdOptions.js";
import stylesGeneral from "@/styles/General.module.css";
import { MdDeleteForever } from "react-icons/md";

const ItemCurrentSale = ({ product, delItem }) => {
  const [showLiquidPrice, setShowLiquidPrice] = useState(false);
  console.log(product);

  const handleCheckboxChange = () => {
    setShowLiquidPrice(!showLiquidPrice);
  };

  const priceToShow = showLiquidPrice
    ? product.data.precio_liq
    : product.data.precio;

  return (
    <div className="border-b border-dashed flex flex-col border-th-primary-light">
      <div className="flex">
        <div className={`${stylesGeneral.item_code} grow`}>
          {`[ ${product.data.codigo} ]`}
        </div>
        <div>
          <button
            onClick={() => {
              delItem(product.data.id);
            }}
          >
            <MdDeleteForever className={stylesGeneral.item_icon_del} />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-2 items-start md:items-center">
        <div className={stylesGeneral.item_name}>
          {product.data.nombre_cat} {product.data.nombre}
        </div>
        <div className={stylesGeneral.item_sub}>
          {product.data.nombre_prov} - {product.data.nombre_gen}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-4 grow">
          <SelectProdOptions options={product.colors} />
          <SelectProdOptions options={product.sizes} />
        </div>
        <div className="flex gap-4 min-w-32 items-center justify-between">
          <div className="flex flex-row gap-4">
            <label>
              <span className={`${stylesGeneral.item_name} mr-4`}>LI:</span>
              <input
                type="checkbox"
                checked={showLiquidPrice}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <div>${priceToShow}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemCurrentSale;
