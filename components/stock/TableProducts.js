import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsData } from "@/actions/productsActions";
import axios from "axios";

const TableProducts = () => {
  const productsData = useSelector((state) => state?.products?.productsData);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    await axios.get("./api/stock").then((res) => {
      dispatch(getProductsData(res.data));
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th>
            <span>Foto</span>
          </th>
          <th>
            <span>ID</span>
          </th>
          <th>
            <span>Código</span>
          </th>
          <th>
            <span>Name</span>
          </th>
          <th>
            <span>Descripción</span>
          </th>
          <th>
            <span>Proveedor</span>
          </th>
          <th>
            <span>Categoría</span>
          </th>
          <th>
            <span>Género</span>
          </th>
          <th>
            <span>Precio de costo</span>
          </th>
          <th>
            <span>Precio</span>
          </th>
          <th>
            <span>Liquidación</span>
          </th>
          <th>
            <span>Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img src="" alt="" />
          </td>
          <td>
            <span>1</span>
          </td>
          <td>
            <span>10311001</span>
          </td>
          <td>
            <span>Jean clásico</span>
          </td>

          <td>
            <span>
              confeccionado en un tejido resistente de mezclilla azul, cuenta
              con cinco bolsillos, cierre de cremallera, botón y un corte recto
            </span>
          </td>
          <td>
            <span>Popys</span>
          </td>
          <td>
            <span>Pantalón</span>
          </td>
          <td>
            <span>Bebé</span>
          </td>
          <td>
            <span>$ 150.-</span>
          </td>
          <td>
            <span>$ 300.-</span>
          </td>
          <td>
            <span>$ 200.-</span>
          </td>
          <td>
            <button>Editar</button>
            <button>Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableProducts;
