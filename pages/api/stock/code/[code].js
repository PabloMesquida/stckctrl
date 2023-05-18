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
  console.log("SELECT id FROM productos WHERE codigo = ?: ", code);
  try {
    const result_id_prod = await executeQuery({
      query: "SELECT id FROM productos WHERE codigo = ?",
      values: [code],
    });
    return res.status(SUCCESS).json({
      id: result_id_prod[0].id,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: "Se produjo un error al obtener el producto",
      error: {
        type: error.constructor.name,
        message: error.message,
      },
    });
  }
};
