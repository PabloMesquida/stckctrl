import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";
import ProductDetailData from "@/components/stock/detail/ProductDetailData.js";
import ProductDetailSkeleton from "@/components/stock/detail/ProductDetailSkeleton.js";
import HeadDetail from "@/components/head/HeadDetail.js";
import useFetchProduct from "../../../helpers/useFetchProduct";

const ProductDetail = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const product = useSelector((state) => state.products.productData);
  const isProduct = useFetchProduct(id, true);

  useEffect(() => {
    setIsLoading(isProduct);
  }, [isProduct]);

  return (
    <div className="pb-20">
      <BreadcrumbNav />
      {isLoading && <ProductDetailSkeleton />}
      {!isLoading && product && (
        <>
          <HeadDetail name={product[0].nombre} id={product[0].id} />
          <ProductDetailData />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
