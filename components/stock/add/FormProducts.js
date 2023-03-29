import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { add_product_validate } from "@/helpers/validate.js";
import { createProduct } from "@/actions/productsActions";
import SelectOptions from "@/components/forms/SelectOptions.js";
import CheckSizes from "@/components/forms/CheckSizes.js";
import CheckColors from "@/components/forms/CheckColors.js";
import UploadImage from "@/components/forms/UploadImage.js";
import Message from "@/components/messages/Message.js";
import stylesGeneral from "@/styles/General.module.css";
import { MdWarning } from "react-icons/md";

const FormProducts = () => {
  const [imageSrc, setImageSrc] = useState();
  const [message, setMessage] = useState({
    status: false,
    type: null,
    text: null,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      id_categories: "",
      id_genders: "",
      id_suppliers: "",
      prod_name: "",
      description: "",
      cost_price: "",
      price: "",
      clearance_price: "",
      sizes: [],
      colors: [],
      file: imageSrc,
      code: "00000000",
    },
    validate: add_product_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    values.file = imageSrc;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    console.log(values);

    if (response.ok) {
      console.log("File and text uploaded successfully");
    } else {
      console.error("Error uploading file and text");
    }

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
        className="flex flex-col gap-4"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className={stylesGeneral.panel_card}>
          <div className={`${stylesGeneral.input_group}`}>
            <input
              className={stylesGeneral.input_text}
              type="text"
              name="prod_name"
              placeholder="Nombre"
              {...formik.getFieldProps("prod_name")}
            />
            {formik.errors.prod_name && formik.touched.prod_name && (
              <span className="icon flex items-center px-4">
                <MdWarning size={25} className="text-th-warning" />
              </span>
            )}
          </div>
        </div>
        <div className={` flex flex-col sm:flex-row gap-4`}>
          <div className="flex flex-col w-full sm:w-1/2 gap-4">
            <div className={`${stylesGeneral.panel_card} flex flex-col w-full`}>
              <div className="flex w-full justify-between">
                <SelectOptions
                  formik={formik}
                  name="categories"
                  text="Categoría"
                />
                {formik.errors.id_categories &&
                  formik.touched.id_categories && (
                    <span className=" flex items-center px-4 pb-4 ">
                      <MdWarning size={25} className="text-th-warning" />
                    </span>
                  )}
              </div>
              <div>
                <SelectOptions formik={formik} name="genders" text="Género" />
              </div>
              <div>
                <SelectOptions
                  formik={formik}
                  name="suppliers"
                  text="Proveerdor"
                />
              </div>
            </div>
            <div className={`${stylesGeneral.panel_card} flex flex-col`}>
              <div className="mb-4">Precios:</div>
              <div className="flex flex-row sm:flex-row gap-4">
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
                    placeholder="Costo"
                    {...formik.getFieldProps("cost_price")}
                  />
                </div>
                <div
                  className={`${stylesGeneral.input_group} ${
                    formik.errors.price && formik.touched.price
                      ? "border-red-600"
                      : ""
                  }`}
                >
                  <input
                    className={stylesGeneral.input_text}
                    type="text"
                    name="price"
                    placeholder="Venta"
                    {...formik.getFieldProps("price")}
                  />
                </div>
                <div
                  className={`${stylesGeneral.input_group} ${
                    formik.errors.clearance_price &&
                    formik.touched.clearance_price
                      ? "border-red-600"
                      : ""
                  }`}
                >
                  <input
                    className={stylesGeneral.input_text}
                    type="text"
                    name="clearance_price"
                    placeholder="Liquidación"
                    {...formik.getFieldProps("clearance_price")}
                  />
                </div>
              </div>
            </div>
            <div className={`${stylesGeneral.panel_card}`}>
              <textarea
                className={stylesGeneral.input_text}
                placeholder="Descripción"
                name="description"
                rows="3"
                cols="20"
                {...formik.getFieldProps("description")}
              ></textarea>
            </div>
          </div>
          <div
            className={`${stylesGeneral.panel_card}  flex flex-col w-full sm:w-1/2`}
          >
            <UploadImage setImageSrc={setImageSrc} imageSrc={imageSrc} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className={`${stylesGeneral.panel_card} w-full sm:w-1/2`}>
            <div className="mb-4">Talles:</div>
            <CheckSizes formik={formik} />
          </div>
          <div className={`${stylesGeneral.panel_card} w-full sm:w-1/2`}>
            <div className="mb-4">Colores:</div>
            <CheckColors formik={formik} />
          </div>
        </div>
        <div>
          {["prod_name", "id_categories"].map(
            (field) =>
              formik.errors[field] &&
              formik.touched[field] && (
                <Message
                  key={field}
                  message={{ type: "warning", text: formik.errors[field] }}
                />
              )
          )}
          {message.status && <Message message={message} />}
        </div>
        <div>
          <button type="submit" className={stylesGeneral.button_2xl}>
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProducts;
