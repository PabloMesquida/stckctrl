import React from "react";

function Product({ id }) {
  if (!resto.resto_name) {
    return <h1>No existe resto</h1>;
  } else {
    return (
      <div>
        <h1>{resto.resto_name}</h1>
        <h4>Tel: {resto.mobile}</h4>
        <h4>Direccion: {resto.address}</h4>

        {resto.menu.map((itemMenu, indexMenu) => {
          return (
            <div key={`${indexMenu}`}>
              <h3>{resto.menu[indexMenu].title}</h3>
              <h5>{resto.menu[indexMenu].info}</h5>
              {itemMenu.items.map((item, indexItem) => {
                return (
                  <div key={`menu${indexMenu}${indexItem}`}>
                    <h5>{resto.menu[indexMenu].items[indexItem].title}</h5>
                    <h6>{resto.menu[indexMenu].items[indexItem].info}</h6>
                    <h6>$ {resto.menu[indexMenu].items[indexItem].price}</h6>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }

  let { id } = context.query;

  let res = await fetch(process.env.BASE_URL + "api/restos/" + resto);
  let data = await res.json();

  //Se elimina user en respuesta
  data.resto?.user
    ? delete data.resto.user
    : (data = { resto: { _id: "URL INVALIDA" } });

  const session = await getSession({ req });

  return {
    props: {
      resto: data.resto,
      session,
    },
  };
}

export default Product;
