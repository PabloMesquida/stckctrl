import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  SUCCESS,
} from "@/status";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await updateStock(req, res);
  } else {
    return res.status(HTTP_METHOD_NOT_ALLOWED).send("HTTP Method not allowed");
  }
}

const updateStock = async (req, res) => {
  const { id } = req.query;
  const stock = req.body.body;
  console.log(id, stock);
  try {
    const keys = Object.keys(stock);
    const colorTalles = keys.map((key) => {
      const [id_color, talle] = key.split("-");
      return { id_color, talle };
    });

    const results = await Promise.all(
      colorTalles.map(async ({ id_color, talle }) => {
        const [result_id_color_prod, result_id_talle] = await Promise.all([
          executeQuery({
            query:
              "SELECT id FROM p_colores WHERE id_prod = ? AND id_color = ?",
            values: [id, id_color],
          }),
          executeQuery({
            query: "SELECT id FROM talles WHERE talle = ?",
            values: [talle],
          }),
        ]);
        return {
          id_color_prod: result_id_color_prod[0].id,
          id_talle: result_id_talle[0].id,
        };
      })
    );

    await Promise.all(
      results.map(({ id_color_prod, id_talle }, i) => {
        const value = Object.values(stock)[i];
        return executeQuery({
          query:
            "UPDATE p_talles SET stock = COALESCE(stock, 0) + ? WHERE id_prod_color = ? AND id_talle = ?",
          values: [value, id_color_prod, id_talle],
        });
      })
    );

    const result_info_prod_stock = await executeQuery({
      query:
        "SELECT pt.id, pt.id_prod_color, pt.id_talle, pt.stock, c.color, c.etiqueta, t.talle, t.orden, c.id, c.hex AS id_color FROM p_talles AS pt JOIN talles AS t ON t.id = pt.id_talle JOIN p_colores AS pc ON pc.id = pt.id_prod_color JOIN colores AS c ON c.id = pc.id_color WHERE pt.id_prod = ?",
      values: [id],
    });

    console.log("Stock actualizado con éxito");
    return res.status(SUCCESS).json({
      stock: result_info_prod_stock,
      status: true,
      type: "success",
      message: "¡Perfecto! El stock ha sido actualizado con éxito.",
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};
