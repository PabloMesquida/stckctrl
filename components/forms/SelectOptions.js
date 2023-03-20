import { useEffect } from "react";
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

  const fetchOptions = async () => {
    await axios
      .get(`../../api/${name}`)
      .then((res) => {
        switch (name) {
          case "categories":
            dispatch(getCategories(res.data));
            break;
          case "genders":
            dispatch(getGenders(res.data));
            break;
          case "suppliers":
            dispatch(getSuppliers(res.data));
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log("ERROR");
        } else {
          // Manejar otros errores aquí
        }
      });
  };

  useEffect(() => {
    fetchOptions();
  }, [dispatch]);

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
        <span>No Data</span>
      )}
    </select>
  );
};

export default SelectOptions;
