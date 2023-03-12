import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar/NavBar.js";
import TableProducts from "@/components/stock/TableProducts.js";
import FormProducts from "@/components/stock/FormProducts.js";
import stylesGeneral from "@/styles/General.module.css";

export default function Stock() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>stckctrl - stock</title>
      </Head>
      <Navbar />
      <section className={stylesGeneral.section_container}>
        <div>Stock - {session.user.name}</div>
        <div>
          <button>Agregar Producto</button>
        </div>
        <FormProducts />
        <TableProducts />
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
