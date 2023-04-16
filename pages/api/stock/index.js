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
    let {
      prod_name,
      id_suppliers,
      description,
      file,
      cost_price,
      id_categories,
      id_genders,
      price,
      clearance_price,
      colors,
      sizes,
    } = req.body.body;

    const active = 1;

    file = file || "No Image";

    let code = "00000000";

    let a = id_genders.toString();

    let b = parseInt(id_categories) + 100;
    b = b.toString();

    let c = parseInt(id_suppliers) + 100;
    c = c.toString();

    const result_code = await executeQuery({
      query: `SELECT * from productos WHERE id_prov = "${id_suppliers}" and id_gen = "${id_genders}" and id_cat = "${id_categories}"`,
    });

    const count = result_code.length;

    let d = count + 1;
    d = d + 1000;
    d = d.toString();

    code = code.substring(0, 0) + a + code.substring(1);
    code = code.substring(0, 1) + b.substring(1) + code.substring(2);
    code = code.substring(0, 2) + b.substring(2) + code.substring(3);
    code = code.substring(0, 3) + c.substring(1) + code.substring(4);
    code = code.substring(0, 4) + c.substring(2) + code.substring(5);
    code = code.substring(0, 5) + d.substring(1) + code.substring(6);
    code = code.substring(0, 6) + d.substring(2) + code.substring(7);
    code = code.substring(0, 7) + d.substring(3);

    try {
      // Iniciar la transacción
      await executeQuery({ query: "START TRANSACTION" });

      const result_product = await executeQuery({
        query:
          "INSERT INTO productos (codigo, nombre, id_prov, descripcion, foto, costo, id_cat, id_gen, activo, precio, precio_liq) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [
          code,
          prod_name,
          id_suppliers,
          description,
          file,
          cost_price,
          id_categories,
          id_genders,
          active,
          price,
          clearance_price,
        ],
      });

      // Insertar los colores y tamaños del producto
      for (let i = 0; i < colors.length; i++) {
        const result_color = await executeQuery({
          query: `INSERT INTO p_colores(id_prod, id_color , activo ) VALUES ("${result_product.insertId}", "${colors[i]}", "1")`,
        });

        for (let k = 0; k < sizes.length; k++) {
          const result_size = await executeQuery({
            query: `INSERT INTO p_talles(id_prod_color, id_talle , stock, activo, id_prod ) VALUES ("${result_color.insertId}", "${sizes[k]}", "0", "1","${result_product.insertId}" )`,
          });
        }
      }
      // Confirmar la transacción
      await executeQuery({ query: "COMMIT" });
      res.status(SUCCESS).json({
        status: true,
        type: "success",
        message: "¡Listo! El producto ha sido cargado correctamente.",
      });
    } catch (error) {
      // Revertir la transacción en caso de error
      await executeQuery({ query: "ROLLBACK" });
      res.status(BAD_REQUEST).json({
        status: false,
        type: "error",
        message: "Lo siento, algo salió mal y el producto no ha sido cargado.",
      });
      throw error;
    }

    return res;
  } catch (error) {
    console.log(error);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ status: false, type: "error", message: "Internal Server Error" });
  }
};
