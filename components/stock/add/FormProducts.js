import { useFormik } from "formik";
import { useRouter } from "next/router";
import { add_product_validate } from "@/helpers/validate.js";
import SelectOptions from "@/components/forms/SelectOptions.js";
import stylesGeneral from "@/styles/General.module.css";
import CheckSizes from "@/components/forms/CheckSizes.js";
import CheckColors from "@/components/forms/CheckColors.js";
import { useDispatch } from "react-redux";
import { createProduct } from "@/actions/productsActions";
import { useState } from "react";

const FormProducts = () => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      //  id_categories: "",
      // id_genders: "",
      //   id_suppliers: "",
      prod_name: "",
      //  description: "",
      //   cost_price: "",
      //   price: "",
      //   clearance_price: "",
      //   sizes: [],
      //   colors: [],
      file: "",
      //   code: "00000000",
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

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "stckctrl-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dq2hljnad/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  return (
    <div>
      <form
        className="flex flex-col gap-5"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        {/* <div>
          <SelectOptions formik={formik} name="categories" text="Categoría" />
        </div>
        <div>
          <SelectOptions formik={formik} name="genders" text="Género" />
        </div>
        <div>
          <SelectOptions formik={formik} name="suppliers" text="Proveerdor" />
        </div> */}
        <div
          className={`${stylesGeneral.input_group} ${
            formik.errors.name && formik.touched.name ? "border-red-600" : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="prod_name"
            placeholder="Nombre"
            {...formik.getFieldProps("prod_name")}
          />
        </div>
        {/* <div>
          <textarea
            className={stylesGeneral.input_text}
            placeholder="Descripción"
            name="description"
            rows="5"
            cols="20"
            {...formik.getFieldProps("description")}
          ></textarea>
        </div> */}
        {/* <div
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
        </div> */}
        {/* <div
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
        </div> */}
        {/* <div
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
        </div> */}
        <div>{/* <CheckSizes formik={formik} /> */}</div>
        <div>{/* <CheckColors formik={formik} /> */}</div>

        <div>
          <button type="submit" className={stylesGeneral.button}>
            Agregar
          </button>
        </div>
      </form>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <input type="file" name="file" />
        </p>

        <img src={imageSrc} />

        {imageSrc && !uploadData && (
          <p>
            <button>Upload Files</button>
          </p>
        )}

        {uploadData && (
          <code>
            <pre>{JSON.stringify(uploadData, null, 2)}</pre>
          </code>
        )}
      </form>
    </div>
  );
};

export default FormProducts;
