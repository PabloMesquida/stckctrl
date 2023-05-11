import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  SUCCESS,
} from "@/status";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getSupplier(req, res);
    case "POST":
      return await updateSupplier(req, res);
    case "DELETE":
      return await deleteSupplier(req, res);
    default:
      return res
        .status(HTTP_METHOD_NOT_ALLOWED)
        .send("HTTP Method not allowed");
  }
}

const getSupplier = async (req, res) => {};

const updateSupplier = async (req, res) => {};

const deleteSupplier = async (req, res) => {
  const { id } = req.query;
  try {
    const result_del_sup = await executeQuery({
      query: "UPDATE proveedores SET activo = 0 WHERE id = ?",
      values: [id],
    });

    return res.status(SUCCESS).json({ result_del_sup });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};
