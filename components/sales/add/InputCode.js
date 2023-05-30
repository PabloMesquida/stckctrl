import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { addProductSaleData } from "@/actions/salesAction.js";
import { add_product_sale_validate } from "@/helpers/validate.js";
import { useDispatch } from "react-redux";
import Message from "@/components/messages/Message.js";
import stylesGeneral from "@/styles/General.module.css";
import { generateUniqueId } from "@/helpers/utils";

const InputCode = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({
    status: false,
    type: null,
    text: null,
  });
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validate: (values) => add_product_sale_validate(values),
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    setMessage({});
    try {
      await axios.get(`../../api/stock/code/${values.code}`).then((res) => {
        const AddProductSaleData = {
          ...res.data,
          id: generateUniqueId(),
        };
        dispatch(addProductSaleData(AddProductSaleData));
      });
    } catch (error) {
      if (error.response) {
        setMessage({
          status: error.response.status,
          type: "error",
          text: error.response.data.message,
        });
      } else {
        setMessage({
          status: null,
          type: "error",
          text: "Error de conexión al servidor",
        });
      }
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value.trim(); // Eliminar espacios en blanco
    formik.setFieldValue("code", value);
  };

  return (
    <div>
      <form
        className={stylesGeneral.form}
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div
          className={`${stylesGeneral.filter_container} flex gap-4 items-start flex-col lg:flex-row`}
        >
          <div
            className={`${stylesGeneral.input_group} min-w-full lg:min-w-48 h-16`}
          >
            <input
              className={stylesGeneral.input_text}
              type="text"
              name="code"
              placeholder="Código"
              maxLength={12}
              {...formik.getFieldProps("code")}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
            />
          </div>
          <div className="flex flex-col-reverse lg:flex-row lg:items-start w-full gap-4">
            <div className="w-full lg:w-40">
              <button type="submit" className={stylesGeneral.button_xl}>
                OK
              </button>
            </div>

            {formik.errors.code && formik.touched.code ? (
              <div className="flex items-center w-full">
                <Message
                  message={{ type: "warning", text: formik.errors.code }}
                />
              </div>
            ) : null}
            {message.status && <Message message={message} />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputCode;
