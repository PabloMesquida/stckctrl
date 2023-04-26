import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  SUCCESS,
} from "@/status";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getProduct(req, res);
    case "POST":
      return await updateProduct(req, res);
    case "DELETE":
      return await deleteProduct(req, res);
    default:
      return res
        .status(HTTP_METHOD_NOT_ALLOWED)
        .send("HTTP Method not allowed");
  }
}

const updateProduct = async (req, res) => {
  let {
    prod_name,
    id_suppliers,
    description,
    file,
    cost_price,
    id_categories,
    id_genders,
    price,
    clearance_price,
    colors,
    sizes,
  } = req.body.body;

  const { id } = req.query;

  try {
    const result_info_prod = await executeQuery({
      query: "SELECT * FROM productos WHERE id = ?",
      values: [id],
    });

    if (!result_info_prod) {
      return res.status(NO_CONTENT).json({
        message: "No se encontró el producto",
        error: {
          type: error.constructor.name,
          message: error.message,
        },
      });
    }
    const result = result_info_prod[0];
    let code = result.codigo;
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

      console.log(code);

      const result_update_code = await executeQuery({
        query: "UPDATE productos SET codigo = ? WHERE id = ?",
        values: [code, id],
      });
    }

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

    return res.status(SUCCESS).json({
      ...result_info_prod,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: "Se produjo un error al obtener el producto",
      error: {
        type: error.constructor.name,
        message: error.message,
      },
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.query;
  try {
    const result_del_prod = await executeQuery({
      query: "UPDATE productos SET activo = 0 WHERE id = ?",
      values: [id],
    });
    return res.status(SUCCESS).json({ result_del_prod });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.query;

  try {
    const result_info_prod = await executeQuery({
      query: "SELECT * FROM productos WHERE id = ?",
      values: [id],
    });

    const result_info_prod_colors = await executeQuery({
      query:
        "SELECT p.id_color, c.color, c.etiqueta, c.hex FROM p_colores AS p JOIN colores AS c ON p.id_color = c.id WHERE id_prod = ? ",
      values: [id],
    });

    const result_info_prod_sizes = await executeQuery({
      query: "SELECT id_talle FROM p_talles WHERE id_prod = ? ",
      values: [id],
    });

    const uniqueSizes = [];
    const sizes = result_info_prod_sizes.map(({ id_talle }) => id_talle);

    sizes.forEach((size) => {
      if (uniqueSizes.indexOf(size) === -1) {
        uniqueSizes.push(size);
      }
    });

    const result_info_prod_stock = await executeQuery({
      query:
        "SELECT pt.id, pt.id_prod_color, pt.id_talle, pt.stock, c.color, c.etiqueta, t.talle, c.id, c.hex AS id_color FROM p_talles AS pt JOIN talles AS t ON t.id = pt.id_talle JOIN p_colores AS pc ON pc.id = pt.id_prod_color JOIN colores AS c ON c.id = pc.id_color WHERE pt.id_prod = ?",
      values: [id],
    });

    return res.status(SUCCESS).json({
      ...result_info_prod,
      colors: result_info_prod_colors,
      sizes: uniqueSizes,
      stock: result_info_prod_stock,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: "Se produjo un error al obtener el producto",
      error: {
        type: error.constructor.name,
        message: error.message,
      },
    });
  }
};
