import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  SUCCESS,
} from "@/status";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getProductByCode(req, res);
  } else {
    res.status(HTTP_METHOD_NOT_ALLOWED).send("HTTP Method not allowed");
  }
}

const getProductByCode = async (req, res) => {
  const { code } = req.query;

  try {
    const result_id_prod = await executeQuery({
      query: "SELECT id FROM productos WHERE codigo = ? AND activo = 1",
      values: [code],
    });

    const id = result_id_prod[0].id;

    try {
      const [
        result_info_prod,
        result_info_prod_colors,
        result_info_prod_sizes,
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
            "SELECT p.id_talle, t.talle FROM p_talles AS p JOIN talles AS t ON p.id_talle = t.id WHERE p.id_prod = ? ORDER BY t.orden ASC",
          values: [id],
        }),
      ]);

      // const uniqueSizes = [
      //   ...new Set(result_info_prod_sizes.map(({ id_talle }) => id_talle)),
      // ];

      return res.status(SUCCESS).json({
        data: result_info_prod[0],
        colors: result_info_prod_colors,
        sizes: result_info_prod_sizes,
      });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: "Se produjo un error al obtener el producto.",
        error: {
          type: error.constructor.name,
          message: error.message,
        },
      });
    }
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: "Lo siento, no hay productos disponibles con ese código.",
      error: {
        type: error.constructor.name,
        message: error.message,
      },
    });
  }
};
