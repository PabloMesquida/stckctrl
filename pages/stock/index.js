import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar.js";
import Products from "@/components/stock/Products.js";
import stylesGeneral from "@/styles/General.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsData } from "@/actions/productsActions";

export default function Stock({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsData(data));
  }, [dispatch]);

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

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  };

  //console.log(process.env.BASE_URL + "api/stock/");

  let res = await fetch("https://stckctrl.vercel.app/api/stock/", { headers });
  let data = await res.json();

  return {
    props: {
      data,
      session,
    },
  };
}
