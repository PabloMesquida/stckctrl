import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar";
import IndexAdd from "@/components/IndexAdd.js";
import stylesGeneral from "@/styles/General.module.css";

export default function Agregar() {
  return (
    <>
      <Head>
        <title>stckctrl - ventas - agregar</title>
      </Head>
      <Navbar />
      <section className={stylesGeneral.section_container}>
        <IndexAdd section="sales" />
      </section>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: { session } };
}
