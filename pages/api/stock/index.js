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
    case "POST":
      return await saveProduct(req, res);
    default:
      return res
        .status(HTTP_METHOD_NOT_ALLOWED)
        .send("HTTP Method not allowed");
  }
}

const getProducts = async (req, res) => {
  try {
    const results = await executeQuery({query: "SELECT * FROM productos",   values: []});
    return res.status(SUCCESS).json(results);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};

const saveProduct = async (req, res) => {
  try {
    const {
      codigo,
      nombre,
      id_prov,
      descripcion,
      foto,
      costo,
      id_cat,
      id_gen,
      activo,
      precio,
      precio_liq,
      fecha,
    } = req.body;

    const result = await executeQuery({
      query:
        "INSERT INTO productos(codigo, nombre, id_prov, descripcion, foto, costo, id_cat, id_gen, activo, precio, precio_liq, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        codigo,
        nombre,
        id_prov,
        descripcion,
        foto,
        costo,
        id_cat,
        id_gen,
        activo,
        precio,
        precio_liq,
        fecha,
      ],
    });

    return res.status(SUCCESS).json({ ...req.body, id: result.insertId });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
