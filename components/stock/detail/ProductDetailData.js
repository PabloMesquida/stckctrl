import { useSelector } from "react-redux";
import ProductDetailDataInfo from "./ProductDetailDataInfo.js";
import ProductDetailDataPrices from "./ProductDetailDataPrices.js";
import ProductDetailDataImage from "./ProductDetailDataImage.js";
import ProductDetailDataStock from "./ProductDetailDataStock.js";

const ProductDetailData = () => {
  const product = useSelector((state) => state?.products);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col sm:flex-row h-full gap-4 items-stretch">
        <div className="flex flex-col w-full sm:w-1/2 gap-4 flex-1 ">
          <ProductDetailDataInfo product={product} />
          <ProductDetailDataPrices product={product} />
        </div>
        <div
          className={`flex flex-col w-full sm:w-1/2 gap-4 flex-1 ${
            product.productData[0].foto === "No Image"
              ? "hidden"
              : "inline-flex"
          }`}
        >
          <ProductDetailDataImage image={product.productData[0].foto} />
        </div>
      </div>
      <ProductDetailDataStock product={product} />
    </div>
  );
};

export default ProductDetailData;
