import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from "@/status";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getAttribute(req, res);
  } else {
    return res.status(HTTP_METHOD_NOT_ALLOWED).send("HTTP Method not allowed");
  }
}

const getAttribute = async (req, res) => {
  const { id } = req.query;
  const { attribute } = req.query;
  try {
    const orderBy =
      attribute === "talles" ? "orden" : attribute === "colores" ? "color" : "";
    const query = `SELECT * FROM ${attribute} WHERE activo = ?${
      orderBy ? ` ORDER BY ${orderBy} ASC` : ""
    }`;
    const results = await executeQuery({
      query,
      values: [id],
    });
    return res.status(SUCCESS).json(results);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};
