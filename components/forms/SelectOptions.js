import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  getGenders,
  getSuppliers,
} from "@/actions/productsActions.js";
import axios from "axios";
import stylesGeneral from "@/styles/General.module.css";

const SelectOptions = ({ formik, name, text }) => {
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
        suppliers: getSuppliers,
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
    <select
      name={`id_${name}`}
      {...formik.getFieldProps(`id_${name}`)}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      style={{ display: "block" }}
    >
      <option value="" label={`${text}`}>
        {text}
      </option>
      {options && options.length > 0 ? (
        options.map((el) => (
          <option vale={el.id} key={el.id}>
            {el.nombre}
          </option>
        ))
      ) : (
        <option>No Data</option>
      )}
    </select>
  );
};

export default SelectOptions;
