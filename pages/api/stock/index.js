import { executeQuery } from "@/config/db";
import {
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from "@/status";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

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
    const results = await executeQuery({
      query:
        "SELECT p.id, p.codigo, p.nombre, p.foto, c.nombre AS categoria, pr.nombre AS proveedor, g.nombre AS genero FROM productos p JOIN categoria c ON p.id_cat = c.id JOIN proveedores pr ON p.id_prov = pr.id JOIN genero AS g ON p.id_gen = g.id WHERE p.activo = ?",
      values: [1],
    });

    return res.status(SUCCESS).json(results);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};

const saveProduct = async (req, res) => {
  try {
    const {
      code,
      name,
      id_suppliers,
      description,
      photo,
      cost_price,
      id_categories,
      id_genders,
      price,
      clearance_price,
    } = req.body;

    const active = 1;

    console.log(req.body);

    const result_product = await executeQuery({
      query:
        "INSERT INTO productos(codigo, nombre, id_prov, descripcion, foto, costo, id_cat, id_gen, activo, precio, precio_liq) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        code,
        name,
        id_suppliers,
        description,
        photo,
        cost_price,
        id_categories,
        id_genders,
        active,
        price,
        clearance_price,
      ],
    });

    // const [row] = await executeQuery({
    //   query: "SELECT MAX(id) AS max_id FROM productos",
    // });

    // const maxId = row.max_id || 0;

    // const result_sizes = await executeQuery();

    return res.status(SUCCESS).json({ data: result_product });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
