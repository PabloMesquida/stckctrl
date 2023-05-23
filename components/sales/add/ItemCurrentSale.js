import stylesGeneral from "@/styles/General.module.css";

const ItemCurrentSale = ({ product }) => {
  console.log(product);
  return (
    <div className="border-b pb-2">
      <div>{product.data.codigo}</div>
      <div>{product.data.nombre_cat}</div>
      <div>{product.data.nombre}</div>
      <div>{product.data.nombre_prov}</div>
      <div>{product.data.nombre_gen}</div>
    </div>
  );
};

export default ItemCurrentSale;
