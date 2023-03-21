import { useFormik } from "formik";
import { add_product_validate } from "@/helpers/validate.js";
import SelectOptions from "@/components/forms/SelectOptions.js";
import stylesGeneral from "@/styles/General.module.css";

const FormProducts = () => {
  const formik = useFormik({
    initialValues: {
      id_categories: "",
      id_genders: "",
      id_suppliers: "",
      name: "",
      description: "",
      cost_price: "",
      price: "",
      clearance_price: "",
    },
    validate: add_product_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    console.log(values);

    // const URL = window.location.protocol + "//" + window.location.host;

    // // await fetch(`${URL}/api/auth/signup`, options)
    // //   .then((res) => res.json())
    // //   .then((data) => {
    // //     if (data) router.push(URL);
    // //   });
  }

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div>
          <SelectOptions formik={formik} name="categories" text="Categoría" />
        </div>
        <div>
          <SelectOptions formik={formik} name="genders" text="Género" />
        </div>
        <div>
          <SelectOptions formik={formik} name="suppliers" text="Proveerdor" />
        </div>
        <div
          className={`${stylesGeneral.input_group} ${
            formik.errors.name && formik.touched.name ? "border-red-600" : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="name"
            placeholder="Nombre"
            {...formik.getFieldProps("name")}
          />
        </div>
        <div>
          <textarea
            className={stylesGeneral.input_text}
            placeholder="Descripción"
            name="description"
            rows="5"
            cols="20"
            {...formik.getFieldProps("description")}
          ></textarea>
        </div>
        <div
          className={`${stylesGeneral.input_group} ${
            formik.errors.cost_price && formik.touched.cost_price
              ? "border-red-600"
              : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="cost_price"
            placeholder="Precio de costo"
            {...formik.getFieldProps("cost_price")}
          />
        </div>
        <div
          className={`${stylesGeneral.input_group} ${
            formik.errors.price && formik.touched.price ? "border-red-600" : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="price"
            placeholder="Precio"
            {...formik.getFieldProps("price")}
          />
        </div>
        <div
          className={`${stylesGeneral.input_group} ${
            formik.errors.clearance_price && formik.touched.clearance_price
              ? "border-red-600"
              : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="clearance_price"
            placeholder="Precio de liquidación"
            {...formik.getFieldProps("clearance_price")}
          />
        </div>
        <div>
          <button type="submit" className={stylesGeneral.button}>
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProducts;
