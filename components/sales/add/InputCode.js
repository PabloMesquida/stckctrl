import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { updateSaleData } from "@/actions/salesAction.js";
import { add_product_sale_validate } from "@/helpers/validate.js";
import Message from "@/components/messages/Message.js";
import stylesGeneral from "@/styles/General.module.css";

const InputCode = () => {
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
        console.log("RES_DATA: ", res.data);
        if (res.data.status) {
          console.log("RES", res.data);
          setMessage({
            status: res.data.status,
            type: res.data.type,
            text: res.data.message,
          });
        }
      });
    } catch (error) {
      console.log("ERRO-FRON", error.response.status);
      setMessage({
        status: error.response.status,
        type: "error",
        text: error.response.data.message,
      });
    }
  }

  return (
    <div>
      <form
        className={stylesGeneral.form}
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div
          className={`${stylesGeneral.panel_card} flex gap-4 items-start flex-col lg:flex-row`}
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
