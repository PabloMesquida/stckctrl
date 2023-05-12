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

const getSupplier = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await executeQuery({
      query:
        "SELECT nombre, direccion, telefono, comentarios, mail, web FROM proveedores WHERE id = ?",
      values: [id],
    });
    return res.status(SUCCESS).json({ ...result });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};

const updateSupplier = async (req, res) => {
  const {
    sup_name,
    sup_address,
    sup_phone,
    sup_email,
    sup_web,
    sup_description,
  } = req.body.body;

  const { id } = req.query;

  try {
    const result_update_sup_data = await executeQuery({
      query:
        "UPDATE proveedores SET nombre = ? , direccion = ?, telefono = ?, comentarios = ?, mail = ? , web = ? WHERE id = ?",
      values: [
        sup_name,
        sup_address,
        sup_phone,
        sup_description,
        sup_email,
        sup_web,
        id,
      ],
    });

    return res.status(SUCCESS).json({
      status: true,
      type: "success",
      message: "¡Listo! El proveedor ha sido editado correctamente.",
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: false,
      type: "error",
      message: "Lo siento, algo salió mal y el proveedor no ha sido editado.",
    });
  }
};

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
