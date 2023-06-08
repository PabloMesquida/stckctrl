export function splitCode(code) {
  if (code.length < 8 || code.length > 12) {
    return [null, null, null];
  }

  let productCode = code.slice(0, 8);
  let colorCode = code.length > 8 ? code.slice(8, 10) : null;
  let sizeCode = code.length > 10 ? code.slice(10, code.length) : null;

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

export function generateUniqueId() {
  const timestamp = Date.now().toString(16); // Obtener la marca de tiempo actual en formato hexadecimal
  const random = Math.random().toString(16).slice(2); // Obtener un número aleatorio en formato hexadecimal

  return `${timestamp}-${random}`;
}

export function calculatePercentage(num, percentage) {
  var calculatedPercentage = Math.round((percentage / 100) * num);
  var subtraction = num - calculatedPercentage;
  return {
    percentage: calculatedPercentage,
    subtraction: subtraction,
  };
}
