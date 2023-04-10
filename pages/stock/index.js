import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar.js";
import Products from "@/components/stock/Products.js";
import stylesGeneral from "@/styles/General.module.css";

export default function Stock({ data }) {
  return (
    <>
      <Head>
        <title>stckctrl - stock</title>
      </Head>
      <Navbar />
      <section className={stylesGeneral.section_container}>
        <Products />
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
