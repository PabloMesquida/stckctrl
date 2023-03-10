import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import Navbar from "@/components/navbar/NavBar.js";
import Hero from "@/components/hero/Hero.js";
import CtrlPanel from "@/components/dashboard/CtrlPanel.js";
import stylesGeneral from "@/styles/General.module.css";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>stckcrl - home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {session ? <AuthUser session={session} /> : <Guest />}
    </>
  );
}

function Guest() {
  return (
    <main className={stylesGeneral.main_container}>
      <Hero />
    </main>
  );
}

function AuthUser() {
  return (
    <main className={stylesGeneral.main_container}>
      <CtrlPanel />
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  // if (!session) {
  //   return { redirect: { destination: "/", permanent: false } };
  // }
  return { props: { session } };
}
