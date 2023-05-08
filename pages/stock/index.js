import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar.js";
import stylesGeneral from "@/styles/General.module.css";
import IndexSection from "@/components/IndexSection.js";

export default function StockSec() {
  return (
    <>
      <Head>
        <title>stckctrl - stock</title>
      </Head>
      <Navbar />
      <section className={stylesGeneral.section_container}>
        <IndexSection section="stock" />
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
