import stylesGeneral from "@/styles/General.module.css";

const ProductDetailDataPrices = ({ product }) => {
  return (
    <div className={`${stylesGeneral.panel_card}`}>
      <div>Precios</div>
      <div className="flex">
        <div className="w-full">Costo: ${product.productData[0].costo}</div>
        <div className="w-full">Venta: ${product.productData[0].precio}</div>
        <div className="w-full">Liq: ${product.productData[0].precio_liq}</div>
      </div>
    </div>
  );
};

export default ProductDetailDataPrices;
