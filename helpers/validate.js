export default function login_validate(values) {
  const errors = {};

  if (!values.user) {
    errors.user = "Parece que falta el nombre de usuario.";
  } else if (values.user.length > 15) {
    errors.user = "El nombre de usuario debe tener 15 caracteres o menos.";
  }

  if (!values.password) {
    errors.password = "Parece que falta la contraseña.";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "La contraseña debe tener entre 6 y 20 caracteres.";
  } else if (values.password.includes(" ")) {
    errors.password =
      "Parece que la contraseña no es válida. Por favor, revisa y vuelve a intentar.";
  }

  return errors;
}

export function register_validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid username";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Must be greater than 6 and less than 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  }

  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password not match";
  }

  return errors;
}

export function add_product_validate(values, imageSrc, uploadData, isChange) {
  const errors = {};
  const errorMessages = {
    prod_name: "Falta el nombre del producto.",
    id_categories: "Falta elegir categoría.",
    id_genders: "Falta elegir género.",
    id_suppliers: "Falta elegir proveedor.",
    price: "Falta el precio de venta.",
    sizes: "Elije al menos un talle.",
    colors: "Elije al menos un color.",
  };

  if (imageSrc && !uploadData && isChange) {
    errors.file = "Falta subir la imagen seleccionada.";
  }

  for (const [key, value] of Object.entries(values)) {
    if (!value && key !== "description" && key !== "clearance_price" && key !== "cost_price") {
      errors[key] = errorMessages[key];
    } else if (Array.isArray(value) && value.length === 0) {
      errors[key] = errorMessages[key];
    }
  }

  return errors;
}

export function add_supplier_validate(values) {
  const errors = {};
  const errorMessages = {
    sup_name: "Falta el nombre.",
    sup_email: "La dirección de correo no es válida.",
  };

  if (!values.sup_name) {
    errors.sup_name = errorMessages.sup_name;
  }

  // Validar dirección de correo electrónico
  if (values.sup_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.sup_email)) {
    errors.sup_email = errorMessages.sup_email;
  }

  return errors;
}

export function add_product_sale_validate(values) {
  const { code } = values;
  const errors = {};
  const errorMessage = "Formato de código incorrecto";

  if (
    !code ||
    code.length < 8 ||
    code.length > 12 ||
    !/^\d{8}/.test(code) ||
    !/^[a-zA-Z0-9]+$/.test(code)
  ) {
    errors.code = errorMessage;
  }

  return errors;
}

export function add_sale_validate(values) {
  const errors = {};
  const errorMessages = {
    data_prod: "Faltan datos.",
    payment: "Falta seleccionar forma de pago.",
  };

  console.log("VALIDATE");
  // Validar si values.products es un arreglo y contener elementos
  if (Array.isArray(values.products) && values.products.length > 0) {
    console.log("VALIDATE PRODUCTS");
    // Iterar sobre cada producto
    values.products.forEach((product, index) => {
      // Validar si el color.id es nulo
      console.log("INDEX", index, product.color.id);
      if (!product.color.id) {
        console.log("El color es requerido.", product.color);
        errors.color_prod = "El color es requerido.";
      }
    });
  }

  // Validar forma de pago
  if (!values.payment) {
    errors.payment = errorMessages.payment;
  }

  return errors;
}
