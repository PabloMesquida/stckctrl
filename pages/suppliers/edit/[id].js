import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar.js";
import stylesGeneral from "@/styles/General.module.css";
import EditSupplier from "@/components/suppliers/edit/EditSupplier.js";

function SupplierEdit({ id }) {
  return (
    <>
      <Head>
        <title>stckctrl - proveedor - editar</title>
      </Head>
      <Navbar />
      <section className={stylesGeneral.section_container}>
        <EditSupplier id={id} />
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

export default SupplierEdit;
