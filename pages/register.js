import { useState } from "react";
import Head from "next/head";
import AuthLayout from "@/layout/AuthLayout.js";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useFormik } from "formik";
import { register_validate } from "@/lib/validate.js";

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "", cpassword: "" },
    validate: register_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <AuthLayout>
      <Head>
        <title>stckctrl - register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                {...formik.getFieldProps("username")}
              />
              <span className="icon flex items-center px-4">
                <HiOutlineUser size={25} />
              </span>
              {formik.errors.username && formik.touched.username ? (
                <span className="text-red-600">{formik.errors.username}</span>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type="email"
                name="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
              {formik.errors.email && formik.touched.email ? (
                <span className="text-red-600">{formik.errors.email}</span>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type={`${show.password ? "text" : "password"}`}
                name="password"
                placeholder="Clave"
                {...formik.getFieldProps("password")}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                <HiFingerPrint size={25} />
              </span>
              {formik.errors.password && formik.touched.password ? (
                <span className="text-red-600">{formik.errors.password}</span>
              ) : (
                <></>
              )}
            </div>

            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type={`${show.cpassword ? "text" : "password"}`}
                name="cpassword"
                placeholder="Confirmar contraseña"
                {...formik.getFieldProps("cpassword")}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
              >
                <HiFingerPrint size={25} />
              </span>
              {formik.errors.cpassword && formik.touched.cpassword ? (
                <span className="text-red-600">{formik.errors.cpassword}</span>
              ) : (
                <></>
              )}
            </div>

            <div>
              <button type="submit" className={styles.button}>
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </section>
    </AuthLayout>
  );
}
