import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Modal from "@/components/modal/Modal.js";
import Message from "@/components/messages/Message.js";
import { add_supplier_validate } from "@/helpers/validate.js";
import { MdWarning } from "react-icons/md";
import stylesGeneral from "@/styles/General.module.css";

const FormSuppliers = ({ supplier = null, id = null }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    type: null,
    text: null,
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      sup_name: "",
      sup_address: "",
      sup_phone: "",
      sup_email: "",
      sup_web: "",
      sup_description: "",
    },
    validate: (values) => add_supplier_validate(values),
    onSubmit,
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    router.push("/suppliers");
  };

  async function onSubmit(values) {
    openModal();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: values,
    };

    if (supplier && id) {
      // options.body.id = id;
      // await axios.post(`../../api/suppliers/${id}`, options).then((res) => {
      //   if (res.data.status) {
      //     setMessage({
      //       status: res.data.status,
      //       type: res.data.type,
      //       text: res.data.message,
      //     });
      //   }
      // });
    } else {
      await axios.post("../../api/suppliers", options).then((res) => {
        if (res.data.status) {
          setMessage({
            status: res.data.status,
            type: res.data.type,
            text: res.data.message,
          });
        }
      });
    }
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
              name="sup_name"
              placeholder={supplier ? "" : "Nombre"}
              {...formik.getFieldProps("sup_name")}
            />
            {formik.errors.sup_name && formik.touched.sup_name && (
              <span className="flex items-center px-4">
                <MdWarning size={25} className="text-th-warning" />
              </span>
            )}
          </div>
        </div>
        <div className={` flex flex-col sm:flex-row gap-4`}>
          <div className="flex flex-col w-full sm:w-1/2 gap-4">
            <div
              className={`${stylesGeneral.panel_card} flex flex-col w-full gap-4`}
            >
              <div className={`${stylesGeneral.input_group} flex w-full`}>
                <input
                  className={stylesGeneral.input_text}
                  type="text"
                  name="sup_address"
                  placeholder={supplier ? "" : "Dirección"}
                  {...formik.getFieldProps("sup_address")}
                />
              </div>
              <div className={`${stylesGeneral.input_group} flex w-full`}>
                <input
                  className={stylesGeneral.input_text}
                  type="text"
                  name="sup_phone"
                  placeholder={supplier ? "" : "Teléfono"}
                  {...formik.getFieldProps("sup_phone")}
                />
              </div>
              <div className={`${stylesGeneral.input_group} flex w-full`}>
                <input
                  className={stylesGeneral.input_text}
                  type="text"
                  name="sup_email"
                  placeholder={supplier ? "" : "Email"}
                  {...formik.getFieldProps("sup_email")}
                />
              </div>
              <div className={`${stylesGeneral.input_group} flex w-full`}>
                <input
                  className={stylesGeneral.input_text}
                  type="text"
                  name="sup_web"
                  placeholder={supplier ? "" : "Web"}
                  {...formik.getFieldProps("sup_web")}
                />
              </div>
            </div>
          </div>
          <div
            className={`${stylesGeneral.panel_card}  flex flex-col w-full sm:w-1/2`}
          >
            <textarea
              className={stylesGeneral.input_text}
              placeholder="Descripción"
              name="sup_description"
              rows="10"
              cols="20"
              {...formik.getFieldProps("sup_description")}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4"></div>
        <div>
          {["sup_name", "sup_email"].map((field) =>
            formik.errors[field] && formik.touched[field] ? (
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
            {id ? "Editar" : "Agregar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSuppliers;
