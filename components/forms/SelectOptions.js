import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  getGenders,
  getAllSuppliersData,
} from "@/actions/productsActions.js";
import axios from "axios";
import stylesGeneral from "@/styles/General.module.css";

const SelectOptions = ({ formik, name, text, handlechange = null }) => {
  const options = useSelector((state) => state?.products[name]);
  const dispatch = useDispatch();

  const fetchOptions = useCallback(async () => {
    try {
      const tableName = {
        categories: "categoria",
        genders: "genero",
        suppliers: "proveedores",
      };
      const res = await axios.get(`../../api/attributes/${tableName[name]}`);

      const actions = {
        categories: getCategories,
        genders: getGenders,
        suppliers: getAllSuppliersData,
      };
      dispatch(actions[name](res.data));
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("ERROR");
      } else {
        // Manejar otros errores aquí
      }
    }
  }, [dispatch, name]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return (
    <div className={`${stylesGeneral.input_group} mb-4 w-full`}>
      <select
        name={`id_${name}`}
        {...formik.getFieldProps(`id_${name}`)}
        onChange={handlechange ? handlechange : formik.handleChange}
        onBlur={formik.handleBlur}
        style={{ display: "block" }}
        className={stylesGeneral.input_text}
      >
        <option value="" label={`${text}`}>
          {text}
        </option>
        {options && options.length > 0 ? (
          options.map((el) => (
            <option value={el.id} key={el.id} name={el.nombre}>
              {el.nombre}
            </option>
          ))
        ) : (
          <option>No Data</option>
        )}
      </select>
    </div>
  );
};

export default SelectOptions;
