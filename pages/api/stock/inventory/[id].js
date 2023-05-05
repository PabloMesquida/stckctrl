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

    console.log("Stock actualizado con éxito");
    return res.sendStatus(200);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};
