import { useState } from "react";
import { useSelector } from "react-redux";
import stylesGeneral from "@/styles/General.module.css";
import ProductDetailDataInfo from "./ProductDetailDataInfo.js";
import ProductDetailDataPrices from "./ProductDetailDataPrices.js";
import ProductDetailDataImage from "./ProductDetailDataImage.js";

const ProductDetailData = () => {
  const [stockMatrix, setStockMatrix] = useState([]);
  const product = useSelector((state) => state?.products);

  const stock = product.productData.stock;

  const talles = Array.from(new Set(stock.map((item) => item.talle)));
  const colores = Array.from(new Set(stock.map((item) => item.color)));

  // Crear la matriz de stock
  const matrixRows = talles.length;
  const matrixCols = colores.length;
  const newStockMatrix = Array.from(Array(matrixRows), () =>
    Array(matrixCols).fill(0)
  );
  stock.forEach((item) => {
    const rowIndex = talles.indexOf(item.talle);
    const colIndex = colores.indexOf(item.color);
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
        {/* <div>stock</div>
        <div className="w-full flex">
          <div className="max-w-xs min-w-fit w-16 flex justify-center"></div>
          {product.productData.sizes.map((size) => (
            <div
              className="max-w-xs min-w-fit w-16 flex justify-center"
              key={size}
            >
              {size}
            </div>
          ))}
        </div> */}
        <table>
          <thead>
            <tr>
              <th>Talle</th>
              {colores.map((color) => (
                <th key={color}>{color}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {talles.map((talle, rowIndex) => (
              <tr key={talle}>
                <td>{talle}</td>
                {colores.map((color, colIndex) => (
                  <td key={`${talle}-${color}`}>
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
