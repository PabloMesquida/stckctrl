import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar.js";
import stylesGeneral from "@/styles/General.module.css";
import SupplierDetail from "@/components/suppliers/detail/SupplierDetail.js";

function Supplier({ id }) {
  return (
    <>
      <Head>
        <title>stckctrl - proveedores</title>
      </Head>
      <Navbar />
      <section className={stylesGeneral.section_container}>
        <SupplierDetail id={id} />
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

export default Supplier;
