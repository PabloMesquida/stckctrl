import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthLayout from "@/layout/AuthLayout.js";
import styles from "../styles/Form.module.css";
import { HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useFormik } from "formik";
import login_validate from "@/lib/validate.js";
import { signIn } from "next-auth/react";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: { user: "", password: "" },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.user,
      password: values.password,
      callbackUrl: "/",
    });
    if (status.ok) router.push(status.url);
  }

  return (
    <AuthLayout>
      <Head>
        <title>stckctrl - login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">stckctrl</h1>

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
