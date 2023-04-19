import { useState } from "react";
import IconColor from "@/components/icons/IconColor.js";
import { useWidthNavigator } from "@/helpers/useWidthNavigator.js";

const ProductDetailDataStock = ({ product }) => {
  const widthNavigator = useWidthNavigator();
  const [stockMatrix, setStockMatrix] = useState([]);

  const stock = product.productData.stock;
  const colorsData = product.productData.colors;

  const talles = Array.from(new Set(stock.map((item) => item.talle)));
  const colores = Array.from(new Set(stock.map((item) => item.color)));

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
    <table className="bg-th-background min-w-full rounded-md overflow-hidden sm:text-base text-xs ">
      <thead>
        <tr className="mb-4 border-b border-th-background-secondary bg-th-background-tertiary">
          <th className="flex md:m-4 m-2">STOCK</th>
          {talles.map((talle) => (
            <th key={talle}>{talle}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {colorsData.map(({ color, etiqueta, id_color, hex }, rowIndex) => (
          <tr className="border-b border-th-background-secondary" key={color}>
            <td className="flex  md:m-4 m-2 gap-2 items-center">
              <IconColor id={id_color} color={hex} size={16} />
              {widthNavigator > 640 ? color : etiqueta}
            </td>
            {talles.map((talle, colIndex) => (
              <td className="text-center" key={`${color}-${talle}`}>
                {stockMatrix &&
                  stockMatrix[rowIndex] &&
                  stockMatrix[rowIndex][colIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductDetailDataStock;