import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from "@/status";
import axios from "axios";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getProduct(req, res);
    case "POST":
      return await updateProduct(req, res);
    default:
      return res
        .status(HTTP_METHOD_NOT_ALLOWED)
        .send("HTTP Method not allowed");
  }
}

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
