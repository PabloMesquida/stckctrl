function Home({ id }) {
  if (!id) {
    return <h1>No existe resto</h1>;
  } else {
    return <div className="flex flex-col items-center">ID: {id}</div>;
  }
}

export async function getServerSideProps(context) {
  //const session = await getSession(context);
  let { id } = context.query;

  // let res = await fetch(process.env.BASE_URL + "api/restos/" + resto);
  // let data = await res.json();

  // //Se elimina user en respuesta
  // data.resto?.user
  //   ? delete data.resto.user
  //   : (data = { resto: { _id: "URL INVALIDA" } });

  return {
    props: {
      id,
    },
  };
}

export default Home;
