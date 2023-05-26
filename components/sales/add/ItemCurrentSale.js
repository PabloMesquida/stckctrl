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
    <div className="border-b border-dashed flex flex-col border-th-primary-light pb-4">
      <div className="flex">
        <div className={`${stylesGeneral.item_code} grow`}>
          {`[ ${product.data.codigo} ]`}
        </div>
        <div>
          <button
            onClick={() => {
              delItem(product.id);
            }}
          >
            <MdDeleteForever className={stylesGeneral.item_icon_del} />
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="flex flex-col md:flex-row md:gap-2 items-start md:items-center grow">
          <div className={stylesGeneral.item_name}>
            {product.data.nombre_cat} {product.data.nombre}
          </div>
          <div className={stylesGeneral.item_sub}>
            {product.data.nombre_prov} - {product.data.nombre_gen}
          </div>
        </div>
        <div className="flex gap-4 md:gap-8">
          <div className="flex gap-2 md:gap-4 md:grow">
            <SelectProdOptions options={product.colors} size="base" />
            <SelectProdOptions options={product.sizes} size="sm" />
          </div>
          <div className="flex gap-4 w-full md:w-32 items-center justify-between">
            <div className="flex flex-row gap-4">
              <label>
                <span className={`${stylesGeneral.item_name} mr-4`}>Liq:</span>
                <input
                  type="checkbox"
                  checked={showLiquidPrice}
                  onChange={handleCheckboxChange}
                />
              </label>
            </div>
            <div>
              $<span className="text-xl">{priceToShow}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCurrentSale;
