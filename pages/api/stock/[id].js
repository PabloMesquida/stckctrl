import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from "@/status";
import axios from "axios";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getProduct(req, res);
    case "POST":
      return await updateProduct(req, res);
    default:
      return res
        .status(HTTP_METHOD_NOT_ALLOWED)
        .send("HTTP Method not allowed");
  }
}

const getProduct = async (req, res) => {
  const { id } = req.query;

  try {
    const result_info_prod = await executeQuery({
      query: "SELECT * FROM productos WHERE id = ?",
      values: [id],
    });

    return res.status(SUCCESS).json({ result_info_prod });
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
