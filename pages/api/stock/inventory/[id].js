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
    for (const [key, value] of Object.entries(stock)) {
      const [id_color, talle] = key.split("-");
      console.log(id_color, talle, value);

      const result_id_color_prod = await executeQuery({
        query: "SELECT id FROM p_colores WHERE id_prod = ? AND id_color = ?",
        values: [id, id_color],
      });

      const id_color_prod = result_id_color_prod[0].id;
      console.log("id_color_prod: ", id_color_prod);

      const result_id_talle = await executeQuery({
        query: "SELECT id FROM talles WHERE talle = ?",
        values: [talle],
      });
      const id_talle = result_id_talle[0].id;
      console.log("id_talle: ", id_talle);

      const result_stock = await executeQuery({
        query:
          "UPDATE p_talles SET stock = ? WHERE id_prod_color = ? AND id_talle = ?",
        values: [value, id_color_prod, id_talle],
      });

      console.log(result_stock);
    }
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};
