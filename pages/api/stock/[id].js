import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  SUCCESS,
} from "@/status";
import {
  updateColors,
  updateProductCode,
  updateProductData,
  updateSizes,
} from "@/helpers/updateProducts.js";

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
  const {
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
    await updateProductCode(id, id_genders, id_categories, id_suppliers);

    await updateProductData(
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
    );

    console.log("sizes: ", sizes);
    await updateSizes(id, sizes);
    console.log("colors: ", colors);
    await updateColors(id, colors);

    return res.status(SUCCESS).json({
      status: true,
      type: "success",
      message: "¡Listo! El producto ha sido editado correctamente.",
    });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: false,
      type: "error",
      message: "Lo siento, algo salió mal y el producto no ha sido editado.",
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
    const [
      result_info_prod,
      result_info_prod_colors,
      result_info_prod_sizes,
      result_info_prod_stock,
    ] = await Promise.all([
      executeQuery({
        query: "SELECT * FROM productos WHERE id = ?",
        values: [id],
      }),
      executeQuery({
        query:
          "SELECT p.id_color, c.color, c.etiqueta, c.hex FROM p_colores AS p JOIN colores AS c ON p.id_color = c.id WHERE id_prod = ? ",
        values: [id],
      }),
      executeQuery({
        query:
          "SELECT id_talle FROM p_talles WHERE id_prod = ? ORDER BY id ASC",
        values: [id],
      }),
      executeQuery({
        query:
          "SELECT pt.id, pt.id_prod_color, pt.id_talle, pt.stock, c.color, c.etiqueta, t.talle, t.orden, c.id, c.hex AS id_color FROM p_talles AS pt JOIN talles AS t ON t.id = pt.id_talle JOIN p_colores AS pc ON pc.id = pt.id_prod_color JOIN colores AS c ON c.id = pc.id_color WHERE pt.id_prod = ?",
        values: [id],
      }),
    ]);

    const uniqueSizes = [
      ...new Set(result_info_prod_sizes.map(({ id_talle }) => id_talle)),
    ];

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
