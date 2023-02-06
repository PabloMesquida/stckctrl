import { useState } from "react";
import Head from "next/head";
import AuthLayout from "@/layout/AuthLayout.js";
import styles from "../styles/Form.module.css";
import { HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useFormik } from "formik";
import login_validate from "@/lib/validate.js";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: { user: "", password: "" },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {}

  return (
    <AuthLayout>
      <Head>
        <title>stckctrl - login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <form
            className="flex flex-col gap-5 text-black"
            onSubmit={formik.handleSubmit}
          >
            <div
              className={`${styles.input_group} ${
                formik.errors.user && formik.touched.user
                  ? "border-red-600"
                  : ""
              }`}
            >
              <input
                className={styles.input_text}
                type="text"
                name="user"
                placeholder="Usuario"
                {...formik.getFieldProps("user")}
              />
              <span className="icon flex items-center px-4">
                <HiOutlineUser size={25} />
              </span>
            </div>
            {/* {formik.errors.user && formik.touched.user ? (
              <span className="text-red-600">{formik.errors.user}</span>
            ) : (
              <></>
            )} */}
            <div
              className={`${styles.input_group} ${
                formik.errors.password && formik.touched.password
                  ? "border-red-600"
                  : ""
              }`}
            >
              <input
                className={styles.input_text}
                type={`${show ? "text" : "password"}`}
                name="password"
                placeholder="Contraseña"
                {...formik.getFieldProps("password")}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            {/* {formik.errors.password && formik.touched.password ? (
              <span className="text-red-600">{formik.errors.password}</span>
            ) : (
              <></>
            )} */}
            <div>
              <button type="submit" className={styles.button}>
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </AuthLayout>
  );
}
