import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from "@/status";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getSuppliers(req, res);
  } else {
    return res.status(HTTP_METHOD_NOT_ALLOWED).send("HTTP Method not allowed");
  }
}

const getSuppliers = async (req, res) => {
  try {
    const results = await executeQuery({
      query: "SELECT * FROM proveedores WHERE activo = ?",
      values: [1],
    });
    return res.status(SUCCESS).json(results);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};
