import stylesGeneral from "@/styles/General.module.css";

const ProductDetailDataPrices = ({ productDetail }) => {
  return (
    <div className={`${stylesGeneral.panel_card}`}>
      <div>Precios</div>
      <div className="flex">
        <div className="w-full">
          Costo: ${productDetail.productData.result_info_prod[0].costo}
        </div>
        <div className="w-full">
          Venta: ${productDetail.productData.result_info_prod[0].precio}
        </div>
        <div className="w-full">
          Liq: ${productDetail.productData.result_info_prod[0].precio_liq}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDataPrices;
