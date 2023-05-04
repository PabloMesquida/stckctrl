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

export function sortColorsData(colorsData) {
  return colorsData.sort((a, b) => {
    const colorA = a.color.toUpperCase();
    const colorB = b.color.toUpperCase();

    if (colorA < colorB) {
      return -1;
    }

    if (colorA > colorB) {
      return 1;
    }

    return 0;
  });
}

export function getOrderSizes(stock) {
  const talles = Array.from(new Set(stock.map((item) => item.talle)))
    .map((talle) => {
      const items = stock.filter((item) => item.talle === talle);
      const orden = items.reduce(
        (acc, item) => (item.orden < acc ? item.orden : acc),
        items[0].orden
      );
      return { talle, orden };
    })
    .sort((a, b) => a.orden - b.orden)
    .map(({ talle }) => talle);

  return talles;
}

export function getOrderColors(stock) {
  return Array.from(new Set(stock.map((item) => item.color))).sort((a, b) =>
    a.localeCompare(b)
  );
}
