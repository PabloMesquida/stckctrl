import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar.js";
import stylesGeneral from "@/styles/General.module.css";
import EditProduct from "@/components/stock/edit/EditProduct.js";

function ProductEdit({ id }) {
  return (
    <>
      <Head>
        <title>stckctrl - stock - editar</title>
      </Head>
      <Navbar />
      <section className={stylesGeneral.section_container}>
        <EditProduct id={id} />
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let { id } = context.query;

  return {
    props: {
      id,
      session,
    },
  };
}

export default ProductEdit;
