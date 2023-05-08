import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar";
import stylesGeneral from "@/styles/General.module.css";
import AddProduct from "@/components/stock/add/AddProduct";

export default function Agregar() {
  return (
    <>
      <Head>
        <title>stckctrl - stock - agregar</title>
      </Head>
      <Navbar />
      <section className={stylesGeneral.section_container}>
        <AddProduct />
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
