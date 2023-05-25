import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from "@/status";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getPaymentMethods(req, res);
  } else {
    return res.status(HTTP_METHOD_NOT_ALLOWED).send("HTTP Method not allowed");
  }
}

const getPaymentMethods = async (req, res) => {
  try {
    const query = "SELECT * FROM formas_pago ORDER BY id ASC";
    const results = await executeQuery({
      query,
    });
    return res.status(SUCCESS).json(results);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};
