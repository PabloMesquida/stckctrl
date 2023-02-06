import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { Inter } from "@next/font/google";
import Head from "next/head";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
      {session ? <AuthUser /> : <Guest />}
    </>
  );
}

function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center">
        <Link
          href={"/login"}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
        >
          Sing In
        </Link>
      </div>
    </main>
  );
}

function AuthUser() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize Homepage</h3>
      <div className="details">
        <h5>Unknow</h5>
        <h5>Unknow</h5>
      </div>
      <div className="flex justify-center">
        <button className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
          LogOut
        </button>
      </div>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: { session } };
}
