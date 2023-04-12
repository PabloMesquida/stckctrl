import stylesGeneral from "@/styles/General.module.css";

const ProductDetailDataInfo = ({ product }) => {
  return (
    <div
      className={`${stylesGeneral.panel_card} flex flex-col h-full justify-items-stretch items-strech`}
    >
      <div>
        {product.category[0].nombre} {product.gender[0].nombre}
      </div>
      <div>
        <span className={stylesGeneral.item_sub}>
          {product.supplier[0].nombre}
        </span>
      </div>
      <div className="my-2">
        <span className={stylesGeneral.item_code}>
          [ {product.productData[0].codigo} ]
        </span>
      </div>
      <div>
        <span className={stylesGeneral.item_sub}>
          {product.productData[0]?.descripcion || "Sin Descripción"}
        </span>
      </div>
    </div>
  );
};

export default ProductDetailDataInfo;
