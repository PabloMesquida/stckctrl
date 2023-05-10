import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from "@/status";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getSuppliers(req, res);
    case "POST":
      return await saveSupplier(req, res);
    default:
      return res
        .status(HTTP_METHOD_NOT_ALLOWED)
        .send("HTTP Method not allowed");
  }
}

const getSuppliers = async (req, res) => {
  try {
    const results = await executeQuery({
      query:
        "SELECT id, nombre, direccion, telefono, comentarios, mail, web FROM proveedores  WHERE activo = 1 ORDER BY id DESC ",
    });

    return res.status(SUCCESS).json(results);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};

const saveSupplier = async (req, res) => {};
