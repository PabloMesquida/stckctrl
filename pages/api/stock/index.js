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
    const results = await executeQuery({
      query:
        "SELECT p.id, p.codigo, p.nombre, p.foto, c.nombre AS categoria, pr.nombre AS proveedor, g.nombre AS genero FROM productos p JOIN categoria c ON p.id_cat = c.id JOIN proveedores pr ON p.id_prov = pr.id JOIN genero AS g ON p.id_gen = g.id WHERE p.activo = 1",
    });

    return res.status(SUCCESS).json(results);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error });
  }
};

const saveProduct = async (req, res) => {
  try {
    const {
      prod_name,
      id_suppliers,
      description,
      file,
      cost_price,
      id_categories,
      id_genders,
      price,
      clearance_price,
    } = req.body.body;

    console.log(req.body.body.prod_name);

    const active = 1;
    const code = 10010010;

    const result_product = await executeQuery({
      query: `INSERT INTO productos(codigo, nombre, id_prov, descripcion, foto, costo, id_cat, id_gen, activo, precio, precio_liq) VALUES ("${code}", "${prod_name}", "${id_suppliers}", "${description}", "${file}", "${cost_price}","${id_categories}", "${id_genders}", "${active}", "${price}", "${clearance_price}")`,
    });

    console.log(result_product);

    if (result_product) {
      return res.status(SUCCESS).json({
        status: true,
        type: "success",
        message: "¡Listo! El producto ha sido cargado correctamente.",
      });
    } else {
      return res.status(BAD_REQUEST).json({
        status: false,
        type: "error",
        message: "Lo siento, algo salió mal y el producto no ha sido cargado.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ status: false, type: "error", message: "Internal Server Error" });
  }
};
