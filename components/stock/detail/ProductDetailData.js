import { useSelector } from "react-redux";
import stylesGeneral from "@/styles/General.module.css";
import { MdImage } from "react-icons/md";

const ProductDetailData = () => {
  const productDetail = useSelector((state) => state?.products);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col sm:flex-row h-full gap-4 items-stretch">
        <div className="flex flex-col w-full sm:w-1/2 gap-4 flex-1 ">
          <div
            className={`${stylesGeneral.panel_card} flex flex-col h-full justify-items-stretch items-strech`}
          >
            <div>
              {productDetail.category[0]?.nombre}{" "}
              {productDetail.gender[0]?.nombre}
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
        </div>
        <div className="flex flex-col w-full sm:w-1/2 gap-4 flex-1">
          <div className={stylesGeneral.panel_card}>
            <div className={stylesGeneral.form_image_container}>
              <MdImage
                className={stylesGeneral.form_icon_image_placeholder_detail}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={stylesGeneral.panel_card}>stock</div>
    </div>
  );
};

export default ProductDetailData;
