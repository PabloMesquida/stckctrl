import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";
import ProductDetailSkeleton from "@/components/stock/detail/ProductDetailSkeleton.js";
import HeadDetail from "@/components/head/HeadDetail.js";
import FormProducts from "@/components/stock/add/FormProducts.js";
import useFetchProduct from "@/helpers/useFetchProduct";

const EditProduct = ({ id }) => {
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
          <HeadDetail name={product[0].nombre} id={id} />
          <FormProducts product={product} id={id} />
        </>
      )}
    </div>
  );
};

export default EditProduct;
