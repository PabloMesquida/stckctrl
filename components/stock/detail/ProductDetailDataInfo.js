import stylesGeneral from "@/styles/General.module.css";

const ProductDetailDataInfo = ({ productDetail }) => {
  return (
    <div
      className={`${stylesGeneral.panel_card} flex flex-col h-full justify-items-stretch items-strech`}
    >
      <div>
        {productDetail.category[0]?.nombre} {productDetail.gender[0]?.nombre}
      </div>
      <div>
        <span className={stylesGeneral.item_sub}>
          {productDetail.supplier[0]?.nombre}
        </span>
      </div>
      <div className="my-2">
        <span className={stylesGeneral.item_code}>
          [ {productDetail.productData.result_info_prod[0].codigo} ]
        </span>
      </div>
      <div>
        <span className={stylesGeneral.item_sub}>
          {productDetail.productData.result_info_prod[0]?.descripcion ||
            "Sin Descripción"}
        </span>
      </div>
    </div>
  );
};

export default ProductDetailDataInfo;
