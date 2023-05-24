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
    const [result_id_prod] = await executeQuery({
      query: "SELECT id FROM productos WHERE codigo = ? AND activo = 1 LIMIT 1",
      values: [code],
    });

    if (!result_id_prod) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: "Lo siento, no hay productos disponibles con ese código.",
      });
    }

    const id = result_id_prod.id;

    const [result_info_prod, result_info_prod_colors, result_info_prod_sizes] =
      await Promise.all([
        executeQuery({
          query:
            "SELECT p.*, c.nombre AS nombre_cat, prov.nombre AS nombre_prov, g.nombre AS nombre_gen FROM productos AS p JOIN categoria AS c ON p.id_cat = c.id JOIN proveedores AS prov ON prov.id = p.id_prov JOIN genero AS g ON g.id = p.id_gen WHERE p.id = ?",
          values: [id],
        }),
        executeQuery({
          query:
            "SELECT p.id_color AS id, c.color AS nombre, c.etiqueta, c.hex FROM p_colores AS p JOIN colores AS c ON p.id_color = c.id WHERE id_prod = ? ",
          values: [id],
        }),
        executeQuery({
          query:
            "SELECT p.id_talle AS id, t.talle AS nombre FROM p_talles AS p JOIN talles AS t ON p.id_talle = t.id WHERE p.id_prod = ? ORDER BY t.orden ASC",
          values: [id],
        }),
      ]);

    const uniqueSizes = result_info_prod_sizes.reduce(
      (accumulator, current) => {
        if (!accumulator[current.id]) {
          accumulator[current.id] = current;
        }
        return accumulator;
      },
      {}
    );

    return res.status(SUCCESS).json({
      data: result_info_prod[0],
      colors: result_info_prod_colors,
      sizes: Object.values(uniqueSizes),
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
};
