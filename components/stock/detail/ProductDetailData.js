import { useState } from "react";
import { useSelector } from "react-redux";
import stylesGeneral from "@/styles/General.module.css";
import ProductDetailDataInfo from "./ProductDetailDataInfo.js";
import ProductDetailDataPrices from "./ProductDetailDataPrices.js";
import ProductDetailDataImage from "./ProductDetailDataImage.js";
import IconColor from "@/components/icons/IconColor.js";

const ProductDetailData = () => {
  const [stockMatrix, setStockMatrix] = useState([]);
  const product = useSelector((state) => state?.products);

  const stock = product.productData.stock;
  const colorsData = product.productData.colors;

  const talles = Array.from(new Set(stock.map((item) => item.talle)));
  const colores = Array.from(new Set(stock.map((item) => item.color)));

  console.log("colores", product.productData.colors);

  // Crear la matriz de stock
  const matrixRows = colores.length;
  const matrixCols = talles.length;
  const newStockMatrix = Array.from(Array(matrixRows), () =>
    Array(matrixCols).fill(0)
  );
  stock.forEach((item) => {
    const rowIndex = colores.indexOf(item.color);
    const colIndex = talles.indexOf(item.talle);
    newStockMatrix[rowIndex][colIndex] = item.stock;
  });

  // Actualizar la matriz de stock
  if (!stockMatrix.length) {
    setStockMatrix(newStockMatrix);
  }

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col sm:flex-row h-full gap-4 items-stretch">
        <div className="flex flex-col w-full sm:w-1/2 gap-4 flex-1 ">
          <ProductDetailDataInfo product={product} />
          <ProductDetailDataPrices product={product} />
        </div>
        <div className="flex flex-col w-full sm:w-1/2 gap-4 flex-1">
          <ProductDetailDataImage />
        </div>
      </div>
      <div className={stylesGeneral.panel_card}>
        <table>
          <thead>
            <tr>
              <th className="flex justify-start">STOCK</th>
              {talles.map((talle) => (
                <th key={talle}>{talle}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {colorsData.map(({ color, id_color, hex }, rowIndex) => (
              <tr key={color}>
                <td className="flex gap-2 items-center">
                  <IconColor id={id_color} color={hex} size={16} />
                  {color}
                </td>
                {talles.map((talle, colIndex) => (
                  <td key={`${color}-${talle}`}>
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
    </div>
  );
};

export default ProductDetailData;
