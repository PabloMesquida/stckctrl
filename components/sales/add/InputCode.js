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
    try {
      await axios.get(`../../api/stock/code/${values.code}`).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.error("Ocurrió un error: ", error);
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
          className={`${stylesGeneral.panel_card} flex gap-4 items-center flex-col md:flex-row`}
        >
          <div
            className={`${stylesGeneral.input_group} min-w-full md:min-w-48 h-16`}
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
          <div className="w-full md:w-40">
            <button type="submit" className={stylesGeneral.button_xl}>
              OK
            </button>
          </div>
          <div className="flex items-center w-full">
            {formik.errors.code && formik.touched.code ? (
              <Message
                message={{ type: "warning", text: formik.errors.code }}
              />
            ) : null}
            {message.status && <Message message={message} />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputCode;
