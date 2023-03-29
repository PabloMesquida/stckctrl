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

export function add_product_validate(values) {
  const errors = {};

  if (!values.prod_name) {
    errors.prod_name = "Falta el nombre del producto.";
  }

  if (!values.id_categories) {
    errors.id_categories = "Falta elegir categoría.";
  }

  return errors;
}
