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

  return {
    props: {
      id,
    },
  };
}

export default Home;
