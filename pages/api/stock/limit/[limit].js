import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from "@/status";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getProducts(req, res);
    default:
      return res
        .status(HTTP_METHOD_NOT_ALLOWED)
        .send("HTTP Method not allowed");
  }
}

const getProducts = async (req, res) => {
  const { limit } = req.query;

  try {
    const results = await executeQuery({
      query:
        "SELECT p.id, p.codigo, p.nombre, p.foto, c.nombre AS categoria, pr.nombre AS proveedor, g.nombre AS genero FROM productos p JOIN categoria c ON p.id_cat = c.id JOIN proveedores pr ON p.id_prov = pr.id JOIN genero AS g ON p.id_gen = g.id WHERE p.activo = 1 ORDER BY p.id DESC LIMIT ?,7",
      values: [limit],
    });

    return res.status(SUCCESS).json(results);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};
