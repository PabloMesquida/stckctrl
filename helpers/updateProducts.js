import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  SUCCESS,
} from "@/status";

export async function updateProductCode(
  id,
  id_genders,
  id_categories,
  id_suppliers
) {
  try {
    const result = await getInfoProducto(id);
    let code = result.data.codigo;
    code = code.split("");
    let control = false;

    if (result.id_genders != id_genders) {
      control = true;
      code[0] = id_genders;
    }

    if (result.id_cat != id_categories) {
      control = true;
      let b = +id_categories + 100;

      code[1] = b.toString().slice(-2, -1);
      code[2] = b.toString().slice(-1);
    }

    if (result.id_prov != id_suppliers) {
      control = true;

      let c = +id_suppliers + 100;
      code[3] = c.toString().slice(-2, -1);
      code[4] = c.toString().slice(-1);
    }

    code = code.join("");

    if (control) {
      const result_code = await executeQuery({
        query:
          "SELECT * from productos WHERE id_prov = ? and id_gen = ? and id_cat = ?",
        values: [id_suppliers, id_genders, id_categories],
      });

      let d = result_code.length + 1001;

      code = code.split("");
      code[5] = d.toString().slice(-3, -2);
      code[6] = d.toString().slice(-2, -1);
      code[7] = d.toString().slice(-1);
      code = code.join("");

      console.log("code: ", code);

      const result_update_code = await executeQuery({
        query: "UPDATE productos SET codigo = ? WHERE id = ?",
        values: [code, id],
      });
    }
  } catch (error) {
    return {
      status: INTERNAL_SERVER_ERROR,
      response: {
        message: "Error al actualizar el código del producto",
        error: {
          type: error.constructor.name,
          message: error.message,
        },
      },
    };
  }
}

export async function updateProductData(
  id_categories,
  id_genders,
  id_suppliers,
  prod_name,
  cost_price,
  price,
  description,
  clearance_price,
  file,
  id
) {
  try {
    const result_update_prod_data = await executeQuery({
      query:
        "UPDATE productos SET id_cat= ? , id_gen = ?, id_prov = ?, nombre= ?, costo= ? , precio= ? , descripcion = ?, precio_liq = ?, foto = ? WHERE id= ?",
      values: [
        id_categories,
        id_genders,
        id_suppliers,
        prod_name,
        cost_price,
        price,
        description,
        clearance_price,
        file,
        id,
      ],
    });
    return {
      status: OK,
      response: {
        message: "Producto actualizado con éxito",
        data: result_update_prod_data,
      },
    };
  } catch (error) {
    return {
      status: INTERNAL_SERVER_ERROR,
      response: {
        message: "Error al actualizar el producto",
        error: {
          type: error.constructor.name,
          message: error.message,
        },
      },
    };
  }
}

export async function updateColors(id, colors) {
  const result_info_prod_colors = await executeQuery({
    query: "SELECT id_color FROM p_colores WHERE id_prod = ? ",
    values: [id],
  });

  const uniqueColors = [];
  const prevColors = result_info_prod_colors.map(({ id_color }) => id_color);

  prevColors.forEach((color) => {
    if (uniqueColors.indexOf(color) === -1) {
      uniqueColors.push(color);
    }
  });

  let colorsToDel = uniqueColors.filter(
    (elemento) => !colors.includes(elemento)
  );
  let colorsToAdd = colors.filter(
    (elemento) => !uniqueColors.includes(elemento)
  );

  if (colorsToAdd.length > 0) {
    console.log("Los colores " + colorsToAdd + " se van a agregar");
    await addColors(id, colorsToAdd);
  }

  if (colorsToDel.length > 0) {
    console.log("Los colores " + colorsToDel + " se van a eliminar");
    await delColors(id, colorsToDel);
  }
}

async function addColors(id, colors) {
  const placeholders_add_colors = colors.map(() => "(?, ?, 1)").join(",");

  let query_add_colors =
    "INSERT INTO p_colores(id_prod, id_color, activo) VALUES";
  query_add_colors += placeholders_add_colors;

  const values_add_colors = colors.flatMap((size) => [id, size]);

  const result_colors_to_add = await executeQuery({
    query: query_add_colors,
    values: values_add_colors,
  });

  const autoincrementIds = getAutoincrementIds(result_colors_to_add);

  const result_prod_sizes = await executeQuery({
    query: "SELECT id_talle FROM p_talles WHERE id_prod = ?",
    values: [id],
  });

  const uniqueSizes = [];
  const sizes = result_prod_sizes.map(({ id_talle }) => id_talle);
  sizes.forEach((id_talle) => {
    if (uniqueSizes.indexOf(id_talle) === -1) {
      uniqueSizes.push(id_talle);
    }
  });

  const combinaciones = uniqueSizes.flatMap((size) =>
    autoincrementIds.map((color) => ({ size, color }))
  );

  const promises = combinaciones.map(({ size, color }) => {
    return executeQuery({
      query:
        "INSERT INTO p_talles (id_prod_color, id_talle, stock, activo, id_prod) VALUES (?, ?, 0, 1, ?)",
      values: [color, size, id],
    });
  });

  const results = await Promise.all(promises);

  results.forEach((result) => {
    if (result.warningStatus === 0) {
      console.log("No se encontraron advertencias");
    } else {
      console.log(`Advertencias: ${result.warningStatus}`);
      console.log(result.info);
    }
  });
}

async function delColors(id, colors) {
  console.log("COLORES: ", colors);
  const placeholders_del_colors = colors.map(() => "?").join(",");

  let query_del_colors_id =
    "SELECT id FROM p_colores WHERE id_prod = ? AND id_color IN (";
  query_del_colors_id += placeholders_del_colors + ")";

  const result_colors_id_to_del = await executeQuery({
    query: query_del_colors_id,
    values: [id, ...colors],
  });

  const uniqueIdColors = [];
  const idColors = result_colors_id_to_del.map(({ id }) => id);

  idColors.forEach((color) => {
    if (uniqueIdColors.indexOf(color) === -1) {
      uniqueIdColors.push(color);
    }
  });

  let query_del_colors_sizes = "DELETE FROM p_talles WHERE id_prod_color IN (";
  query_del_colors_sizes += placeholders_del_colors + ")";

  console.log(query_del_colors_sizes, [...uniqueIdColors]);
  const result_colors_sizes_to_del = await executeQuery({
    query: query_del_colors_sizes,
    values: [...uniqueIdColors],
  });

  if (result_colors_sizes_to_del.warningStatus === 0) {
    console.log("No se encontraron advertencias");
  } else {
    console.log(`Advertencias: ${result_colors_sizes_to_del.warningStatus}`);
    console.log(result_colors_sizes_to_del.info);
  }

  let query_del_colors =
    "DELETE FROM p_colores WHERE id_prod = ? AND id_color IN (";
  query_del_colors += placeholders_del_colors + ")";

  console.log(query_del_colors, [id, ...colors]);

  const result_colors_to_del = await executeQuery({
    query: query_del_colors,
    values: [id, ...colors],
  });

  if (result_colors_to_del.warningStatus === 0) {
    console.log("No se encontraron advertencias");
  } else {
    console.log(`Advertencias: ${result_colors_to_del.warningStatus}`);
    console.log(result_colors_to_del.info);
  }
}

export async function updateSizes(id, sizes) {
  const result_info_prod_sizes = await executeQuery({
    query: "SELECT id_talle FROM p_talles WHERE id_prod = ? ",
    values: [id],
  });

  const uniqueSizes = [];
  const prevSizes = result_info_prod_sizes.map(({ id_talle }) => id_talle);

  prevSizes.forEach((size) => {
    if (uniqueSizes.indexOf(size) === -1) {
      uniqueSizes.push(size);
    }
  });

  let sizesToDel = uniqueSizes.filter((elemento) => !sizes.includes(elemento));
  let sizesToAdd = sizes.filter((elemento) => !uniqueSizes.includes(elemento));

  if (sizesToAdd.length > 0) {
    console.log("Los elementos " + sizesToAdd + " se van a agregar");
    await addSizes(id, sizesToAdd);
  }

  if (sizesToDel.length > 0) {
    console.log("Los elementos " + sizesToDel + " se van a eliminar");
    await delSizes(id, sizesToDel);
  }
}

async function addSizes(id, sizes) {
  const result_id_prod_colors = await executeQuery({
    query: "SELECT id FROM p_colores WHERE id_prod = ? ",
    values: [id],
  });

  const uniqueIdColor = [];
  const colors = result_id_prod_colors.map(({ id }) => id);
  colors.forEach((id) => {
    if (uniqueIdColor.indexOf(id) === -1) {
      uniqueIdColor.push(id);
    }
  });

  const promises = uniqueIdColor.map((color) => {
    const placeholders_add_sizes = sizes.map(() => "(?, ?, 0, 1, ?)").join(",");

    const values_add_sizes = sizes.flatMap((size) => [
      color,
      size,
      parseInt(id),
    ]);

    let query_add_sizes =
      "INSERT INTO p_talles(id_prod_color, id_talle, stock, activo, id_prod) VALUES";
    query_add_sizes += placeholders_add_sizes;

    return executeQuery({
      query: query_add_sizes,
      values: values_add_sizes,
    });
  });

  const results = await Promise.all(promises);

  results.forEach((result) => {
    if (result.warningStatus === 0) {
      console.log("No se encontraron advertencias");
    } else {
      console.log(`Advertencias: ${result.warningStatus}`);
      console.log(result.info);
    }
  });
}

async function delSizes(id, sizes) {
  const placeholders_del_sizes = sizes.map(() => "?").join(",");
  let query_del_sizes =
    "DELETE FROM p_talles WHERE id_prod = ? AND id_talle IN (";
  query_del_sizes += placeholders_del_sizes + ")";
  console.log(query_del_sizes);
  const result_size_to_del = await executeQuery({
    query: query_del_sizes,
    values: [id, ...sizes],
  });
  if (result_size_to_del.warningStatus === 0) {
    console.log("No se encontraron advertencias");
  } else {
    console.log(`Advertencias: ${result_size_to_del.warningStatus}`);
    console.log(result_size_to_del.info);
  }
}

async function getInfoProducto(id) {
  try {
    const result_info_prod = await executeQuery({
      query: "SELECT * FROM productos WHERE id = ?",
      values: [id],
    });

    if (result_info_prod.length === 0) {
      throw new Error("No se encontró el producto");
    }

    const result = result_info_prod[0];
    return {
      message: "Información del producto",
      data: result,
    };
  } catch (error) {
    return {
      message: "Error al buscar información del producto",
      error: {
        type: error.constructor.name,
        message: error.message,
      },
    };
  }
}

function getAutoincrementIds(result) {
  const numRegistrosInsertados = result.affectedRows;
  let primeraIdInsertada = result.insertId;
  let autoincrementIds = [];

  autoincrementIds.push(primeraIdInsertada);

  if (numRegistrosInsertados > 1) {
    for (let i = 1; i < numRegistrosInsertados; i++) {
      autoincrementIds.push(primeraIdInsertada + i);
    }
  }

  return autoincrementIds;
}
