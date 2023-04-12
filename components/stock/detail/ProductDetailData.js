import { useSelector } from "react-redux";
import stylesGeneral from "@/styles/General.module.css";
import ProductDetailDataInfo from "./ProductDetailDataInfo.js";
import ProductDetailDataPrices from "./ProductDetailDataPrices.js";
import ProductDetailDataImage from "./ProductDetailDataImage.js";

const ProductDetailData = () => {
  const product = useSelector((state) => state?.products);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col sm:flex-row h-full gap-4 items-stretch">
        <div className="flex flex-col w-full sm:w-1/2 gap-4 flex-1 ">
          <ProductDetailDataInfo product={product} />
          <ProductDetailDataPrices product={product} />
        </div>
        <div className="flex flex-col w-full sm:w-1/2 gap-4 flex-1">
          <ProductDetailDataImage />
        </div>
      </div>
      <div className={stylesGeneral.panel_card}>stock</div>
      <div className="bg-red-500 w-full flex"></div>
    </div>
  );
};

export default ProductDetailData;
