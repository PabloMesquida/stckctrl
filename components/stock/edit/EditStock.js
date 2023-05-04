import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProductData } from "@/actions/productsActions";
import axios from "axios";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";
import HeadDetiailProduct from "@/components/stock/detail/HeadDetailProduct.js";
import ProductDetailDataStock from "@/components/stock/detail/ProductDetailDataStock.js";
import EditDataStock from "./EditDataStock.js";
import StockSkeleton from "./StockSkeleton.js";

const EditStock = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const product = useSelector((state) => state?.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const productRes = await axios.get(`./../../../api/stock/${id}`);
      const productData = productRes.data;

      dispatch(getProductData(productData));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pb-20">
      <BreadcrumbNav />
      {isLoading && <StockSkeleton />}
      {!isLoading && product && (
        <>
          <HeadDetiailProduct
            name={product.productData[0].nombre}
            id={product.productData[0].id}
          />
          <div className="my-4 text-sm sm:text-base">Stock actual:</div>
          <ProductDetailDataStock product={product} />
          <div className="mb-4 mt-8 text-sm sm:text-base">
            Agregar al stock:
          </div>
          <EditDataStock product={product} id={id} />
        </>
      )}
    </div>
  );
};

export default EditStock;
