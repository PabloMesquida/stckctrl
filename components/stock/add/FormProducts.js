import { useFormik } from "formik";
import { useRouter } from "next/router";
import { add_product_validate } from "@/helpers/validate.js";
import SelectOptions from "@/components/forms/SelectOptions.js";
import stylesGeneral from "@/styles/General.module.css";
import CheckSizes from "@/components/forms/CheckSizes.js";
import CheckColors from "@/components/forms/CheckColors.js";
import { useDispatch } from "react-redux";
import { createProduct } from "@/actions/productsActions";

const FormProducts = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
      sizes: [],
      colors: [],
      photo: "",
      code: "00000000",
    },
    validate: add_product_validate,
    onSubmit,
  });

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);

  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(event.target.files[0]);
  //   fileReader.onloadend = () => {
  //     setPreview(fileReader.result);
  //   };
  // };

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    console.log(values);

    await fetch("../../api/stock", options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(createProduct(data));
        if (data) router.push("/stock");
      });
  }

  return (
    <div>
      <form
        className="flex flex-col gap-5"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
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
          <CheckSizes formik={formik} />
        </div>
        <div>
          <CheckColors formik={formik} />
        </div>
        <div>
          <label> Upload File</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) =>
              formik.setFieldValue("photo", e.currentTarget.files[0])
            }
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
