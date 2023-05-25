export function splitCode(code) {
  if (code.length < 8 || code.length > 12) {
    return null; // El código no cumple con los requisitos de longitud
  }

  let productCode = code.slice(0, 8);
  let colorCode = code.length > 8 ? code.slice(8, code.length - 2) : "";
  let sizeCode = code.slice(-2);

  return [productCode, colorCode, sizeCode];
}

export function filterById(arr) {
  const uniqueSet = new Set();

  return arr.filter((item) => {
    if (!uniqueSet.has(item.id)) {
      uniqueSet.add(item.id);
      return true;
    }
    return false;
  });
}
