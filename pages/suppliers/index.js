import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar.js";
import Suppliers from "@/components/suppliers/Suppliers.js";
import stylesGeneral from "@/styles/General.module.css";

export default function SuppliersSec() {
  return (
    <>
      <Head>
        <title>stckctrl - proveedores</title>
      </Head>
      <Navbar />
      <section className={stylesGeneral.section_container}>
        <Suppliers />
      </section>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return {
    props: {
      session,
    },
  };
}
