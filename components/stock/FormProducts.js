import { useFormik } from "formik";
import { add_product_validate } from "@/helpers/validate.js";
import stylesGeneral from "@/styles/General.module.css";

const FormProducts = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      idprov: "",
      description: "",
      idcat: "",
      idgen: "",
      costprice: "",
      price: "",
      liqprice: "",
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

    const URL = window.location.protocol + "//" + window.location.host;

    // await fetch(`${URL}/api/auth/signup`, options)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data) router.push(URL);
    //   });
  }

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div
          className={`${stylesGeneral.input_group} ${
            formik.errors.idcat && formik.touched.idcat ? "border-red-600" : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="idcat"
            placeholder="Tipo"
            {...formik.getFieldProps("idcat")}
          />
        </div>
        <div
          className={`${stylesGeneral.input_group} ${
            formik.errors.idgen && formik.touched.idgen ? "border-red-600" : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="idgen"
            placeholder="Género"
            {...formik.getFieldProps("idgen")}
          />
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
        <div
          className={`${stylesGeneral.input_group} ${
            formik.errors.costprice && formik.touched.costprice
              ? "border-red-600"
              : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="costprice"
            placeholder="Costo"
            {...formik.getFieldProps("costprice")}
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
            placeholder="Precio de lista"
            {...formik.getFieldProps("price")}
          />
        </div>
        <div
          className={`${stylesGeneral.input_group} ${
            formik.errors.liqprice && formik.touched.liqprice
              ? "border-red-600"
              : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="liqprice"
            placeholder="Precio de liquidación"
            {...formik.getFieldProps("liqprice")}
          />
        </div>
        <div className={`${stylesGeneral.input_group}`}>
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="description"
            placeholder="Descripción"
            {...formik.getFieldProps("description")}
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
