import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar.js";
import stylesGeneral from "@/styles/General.module.css";
import ProductDetail from "@/components/stock/ProductDetail.js";

function Product({ id }) {
  return (
    <>
      <Head>
        <title>stckctrl - stock</title>
      </Head>
      <Navbar />
      <section className={stylesGeneral.section_container}>
        <ProductDetail id={id} />
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

export default Product;
