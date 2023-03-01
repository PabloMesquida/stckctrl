import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthLayout from "@/layout/AuthLayout.js";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useFormik } from "formik";
import { register_validate } from "@/lib/validate.js";

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "", cpassword: "" },
    validate: register_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const URL = window.location.protocol + "//" + window.location.host;

    await fetch(`${URL}/api/auth/signup`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push(URL);
      });
  }

  return (
    <AuthLayout>
      <Head>
        <title>stckctrl - register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>

          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div
              className={`${styles.input_group} ${
                formik.errors.username && formik.touched.username
                  ? "border-red-600"
                  : ""
              }`}
            >
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
            </div>
            <div
              className={`${styles.input_group} ${
                formik.errors.email && formik.touched.email
                  ? "border-red-600"
                  : ""
              }`}
            >
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
            </div>

            <div
              className={`${styles.input_group} ${
                formik.errors.password && formik.touched.password
                  ? "border-red-600"
                  : ""
              }`}
            >
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
            </div>
            <div
              className={`${styles.input_group} ${
                formik.errors.cpassword && formik.touched.cpassword
                  ? "border-red-600"
                  : ""
              }`}
            >
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
