import { useState } from "react";
import IconColor from "@/components/icons/IconColor.js";
import { useWidthNavigator } from "@/helpers/useWidthNavigator.js";
import {
  createStockMatrix,
  sortColorsData,
  getOrderSizes,
  getOrderColors,
} from "@/helpers/stockMatrix.js";
import stylesGeneral from "@/styles/General.module.css";

const ProductDetailDataStock = ({ product }) => {
  const widthNavigator = useWidthNavigator();
  const [stockMatrix, setStockMatrix] = useState([]);

  const stock = product.productData.stock;
  const colorsData = sortColorsData(product.productData.colors);
  const talles = getOrderSizes(stock);
  const colores = getOrderColors(stock);

  if (!stockMatrix.length) {
    setStockMatrix(createStockMatrix(stock, colores, talles));
  }

  return (
    <div className={stylesGeneral.panel_card}>
      <table className="bg-th-background min-w-full rounded-md overflow-hidden sm:text-base text-xs ">
        <thead>
          <tr className=" mb-4 border-b border-th-background-secondary bg-th-background-tertiary">
            <td className="flex md:m-4 m-2  w-12">STOCK</td>
            {talles.map((talle) => (
              <td className="md:m-2 m-2 text-center w-12" key={talle}>
                {talle}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {colorsData.map(({ color, etiqueta, id_color, hex }, rowIndex) => (
            <tr className="border-b border-th-background-secondary" key={color}>
              <td className="flex md:my-4 my-2 gap-2 items-center max-w-min ">
                <IconColor id={id_color} color={hex} size={16} />
                {widthNavigator > 640 ? color : etiqueta}
              </td>
              {talles.map((talle, colIndex) => (
                <td
                  className=" text-center justify-center items-center"
                  key={`${color}-${talle}`}
                >
                  {stockMatrix &&
                    stockMatrix[rowIndex] &&
                    stockMatrix[rowIndex][colIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailDataStock;
