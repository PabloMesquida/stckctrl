import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import stylesGeneral from "@/styles/General.module.css";

const FormSales = () => {
  const [message, setMessage] = useState({
    status: false,
    type: null,
    text: null,
  });
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit,
  });

  async function onSubmit(values) {
    await axios.get(`../../api/stock/code/${values.code}`).then((res) => {
      console.log(res.data.id);
    });
  }

  return (
    <div>
      <form
        className={stylesGeneral.form}
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className={`${stylesGeneral.panel_card} flex gap-4`}>
          <div className={`${stylesGeneral.input_group} w-60  my-2`}>
            <input
              className={stylesGeneral.input_text}
              type="text"
              name="code"
              placeholder="Código"
              maxLength={10}
              {...formik.getFieldProps("code")}
              onKeyUp={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
            />
          </div>
          <div className="w-60">
            <button type="submit" className={stylesGeneral.button_xl}>
              OK
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormSales;
