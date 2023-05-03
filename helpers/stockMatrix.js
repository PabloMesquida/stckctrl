export function createStockMatrix(stock, colores, talles) {
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

  return newStockMatrix;
}
