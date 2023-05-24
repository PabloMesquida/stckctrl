import { useState } from "react";
import SelectProdOptions from "@/components/forms/SelectProdOptions.js";
import stylesGeneral from "@/styles/General.module.css";

const ItemCurrentSale = ({ product }) => {
  const [showLiquidPrice, setShowLiquidPrice] = useState(false);
  console.log(product);

  const handleCheckboxChange = () => {
    setShowLiquidPrice(!showLiquidPrice);
  };

  const priceToShow = showLiquidPrice
    ? product.data.precio_liq
    : product.data.precio;

  return (
    <div className="border-b pb-2">
      <div>{product.data.codigo}</div>
      <div>{product.data.nombre_cat}</div>
      <div>{product.data.nombre}</div>
      <div>{product.data.nombre_prov}</div>
      <div>{product.data.nombre_gen}</div>
      <div>
        <SelectProdOptions options={product.colors} />
      </div>
      <div>
        <SelectProdOptions options={product.sizes} />
      </div>
      <div>
        <label>
          LI:
          <input
            type="checkbox"
            checked={showLiquidPrice}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <div>{priceToShow}</div>
    </div>
  );
};

export default ItemCurrentSale;
