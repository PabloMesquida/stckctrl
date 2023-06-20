import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateProductColorCurrentSale,
  updateProductSizeCurrentSale,
  updateProductClearanceCurrentSale,
} from "@/actions/salesAction.js";
import SelectProdOptions from "@/components/forms/SelectProdOptions.js";
import stylesGeneral from "@/styles/General.module.css";
import { MdDeleteForever } from "react-icons/md";
import { getName } from "@/helpers/utils";

const ItemCurrentSale = ({ product, delItem, formik }) => {
  const [showLiquidPrice, setShowLiquidPrice] = useState(false);
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    console.log("CHANGE-CHCK");
    setShowLiquidPrice(!showLiquidPrice);
    dispatch(updateProductClearanceCurrentSale(product.id));
  };

  const handleSelectChange = (e) => {
    console.log("CHANGE", e.target.name);

    const [id, name] = e.target.value.split("-");
    if (getName(e.target.name) === "Colores") {
      console.log("COLORES");
      dispatch(updateProductColorCurrentSale(product.id, parseInt(id), name));
    } else if (getName(e.target.name) === "Talles") {
      console.log("TALLES");
      dispatch(updateProductSizeCurrentSale(product.id, parseInt(id), name));
    }
  };

  const priceToShow = showLiquidPrice ? product.data.precio_liq : product.data.precio;

  let selectedColor,
    selectedSize = null;

  if (product.color) {
    selectedColor = product.colors.find((color) => color.id === product.color.id);
  }

  if (product.size) {
    selectedSize = product.sizes.find((size) => size.id === product.size.id);
  }

  return (
    <div className="border-b border-dashed flex flex-col border-th-primary-light pb-4">
      <div className="flex">
        <div className={`${stylesGeneral.item_code} grow`}>{`[ ${product.data.codigo} ]`}</div>
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
        <div className="flex gap-2 md:gap-8">
          <div className="flex gap-2 md:gap-4 md:grow">
            <SelectProdOptions
              name={`${product.id}-Colores`}
              options={product.colors}
              size="base"
              optionSelected={selectedColor}
              handleSelectChange={handleSelectChange}
              formik={formik}
            />
            <SelectProdOptions
              name={`${product.id}-Talles`}
              options={product.sizes}
              size="sm"
              optionSelected={selectedSize}
              handleSelectChange={handleSelectChange}
              formik={formik}
            />
          </div>
          <div className="flex gap-2 sm:gap-4 w-full md:w-32 items-center justify-between">
            <div className="flex flex-row gap-2 sm:gap-4">
              <label>
                <span className={`${stylesGeneral.item_name} mr-2 sm:mr-4`}>Liq:</span>
                <input type="checkbox" checked={showLiquidPrice} onChange={handleCheckboxChange} />
              </label>
            </div>
            <div>
              <span className="text-xs md:text-sm pr-1">$</span>
              <span className="text-sm md:text-md pr-2">{priceToShow}.-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCurrentSale;
