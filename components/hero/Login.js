import { useState } from "react";
import { useRouter } from "next/router";
import stylesGeneral from "@/styles/General.module.css";
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
    <div className="w-full flex flex-col bg-th-background-secondary p-8 items-center rounded-xl shadow">
      <span className="text-th-accent-medium text-3xl font-bold mb-8">
        Inicia sesión
        <br />
        para comenzar.
      </span>
      <form
        className="flex flex-col gap-5 text-black"
        onSubmit={formik.handleSubmit}
      >
        <div
          className={`${stylesGeneral.input_group} ${
            formik.errors.user && formik.touched.user ? "border-red-600" : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
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
          className={`${stylesGeneral.input_group} ${
            formik.errors.password && formik.touched.password
              ? "border-red-600"
              : ""
          }`}
        >
          <input
            className={stylesGeneral.input_text}
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
          <button type="submit" className={stylesGeneral.button_xl}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}