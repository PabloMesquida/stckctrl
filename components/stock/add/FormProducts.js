import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { add_product_validate } from "@/helpers/validate.js";
import SelectOptions from "@/components/forms/SelectOptions.js";
import CheckSizes from "@/components/forms/CheckSizes.js";
import CheckColors from "@/components/forms/CheckColors.js";
import UploadImage from "@/components/forms/UploadImage.js";
import Message from "@/components/messages/Message.js";
import stylesGeneral from "@/styles/General.module.css";
import { MdWarning } from "react-icons/md";
import axios from "axios";
import FormPrice from "./FormPrice.js";
import Modal from "@/components/modal/Modal.js";

const FormProducts = () => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    type: null,
    text: null,
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      id_categories: 0,
      id_genders: "",
      id_suppliers: "",
      prod_name: "",
      description: "",
      cost_price: "",
      price: "",
      clearance_price: "",
      sizes: [],
      colors: [],
    },
    validate: (values) => add_product_validate(values, imageSrc, uploadData),
    onSubmit,
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    router.push("/stock");
  };

  async function onSubmit(values) {
    openModal();
    values.file = imageSrc;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: values,
    };

    await axios.post("../../api/stock", options).then((res) => {
      if (res.data.status) {
        setMessage({
          status: res.data.status,
          type: res.data.type,
          text: res.data.message,
        });
      }
    });
  }

  return (
    <div>
      {showModal && <Modal message={message} firstBtn={closeModal} />}

      <form
        className={stylesGeneral.form}
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
              <span className="flex items-center px-4">
                <MdWarning size={25} className="text-th-warning" />
              </span>
            )}
          </div>
        </div>
        <div className={` flex flex-col sm:flex-row gap-4`}>
          <div className="flex flex-col w-full sm:w-1/2 gap-4">
            <div className={`${stylesGeneral.panel_card} flex flex-col w-full`}>
              <div className="flex w-full">
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
              <div className="flex w-full">
                <SelectOptions formik={formik} name="genders" text="Género" />
                {formik.errors.id_genders && formik.touched.id_genders && (
                  <span className=" flex items-center px-4 pb-4 ">
                    <MdWarning size={25} className="text-th-warning" />
                  </span>
                )}
              </div>
              <div className="flex w-full">
                <SelectOptions
                  formik={formik}
                  name="suppliers"
                  text="Proveerdor"
                />
                {formik.errors.id_suppliers && formik.touched.id_suppliers && (
                  <span className=" flex items-center px-4 pb-4 ">
                    <MdWarning size={25} className="text-th-warning" />
                  </span>
                )}
              </div>
            </div>
            <div className={`${stylesGeneral.panel_card} flex flex-col`}>
              <FormPrice formik={formik} />
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
            <div className="flex flex-col gap-4 h-full">
              <div className="flex justify-between">
                <div>Imagen:</div>
                {formik.errors.file && imageSrc && !uploadData && (
                  <span className="icon flex items-center px-4">
                    <MdWarning size={25} className="text-th-warning" />
                  </span>
                )}
              </div>
              <UploadImage
                formik={formik}
                imageSrc={imageSrc}
                setImageSrc={setImageSrc}
                uploadData={uploadData}
                setUploadData={setUploadData}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className={`${stylesGeneral.panel_card} w-full sm:w-1/2`}>
            <div className="flex justify-between">
              <div className="mb-4">Talles:</div>
              {formik.errors.sizes && formik.touched.sizes && (
                <span className=" flex items-center pb-4">
                  <MdWarning size={25} className="text-th-warning" />
                </span>
              )}
            </div>
            <CheckSizes formik={formik} />
          </div>
          <div className={`${stylesGeneral.panel_card} w-full sm:w-1/2`}>
            <div className="flex justify-between">
              <div className="mb-4">Colores:</div>
              {formik.errors.colors && formik.touched.colors && (
                <span className=" flex items-center pb-4">
                  <MdWarning size={25} className="text-th-warning" />
                </span>
              )}
            </div>
            <CheckColors formik={formik} />
          </div>
        </div>
        <div>
          {[
            "prod_name",
            "id_categories",
            "id_genders",
            "id_suppliers",
            "price",
            "sizes",
            "colors",
            "file",
          ].map((field) =>
            (formik.errors[field] && formik.touched[field]) ||
            (field === "file" &&
              formik.errors.file &&
              imageSrc &&
              !uploadData) ? (
              <Message
                key={field}
                message={{ type: "warning", text: formik.errors[field] }}
              />
            ) : null
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
