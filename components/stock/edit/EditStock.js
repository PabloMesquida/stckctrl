import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getProductData,
  getCategory,
  getGender,
  getSupplier,
} from "@/actions/productsActions";
import axios from "axios";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";
import HeadDetiailProduct from "@/components/stock/detail/HeadDetailProduct.js";
import ProductDetailDataStock from "@/components/stock/detail/ProductDetailDataStock.js";
import StockSkeleton from "./StockSkeleton.js";

const EditStock = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const product = useSelector((state) => state?.products);
  // const product = useSelector((state) => state.products.productData);
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
          <ProductDetailDataStock product={product} />
        </>
      )}
    </div>
  );
};

export default EditStock;
