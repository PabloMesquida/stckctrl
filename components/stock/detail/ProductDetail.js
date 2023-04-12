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
import ProductDetailData from "@/components/stock/detail/ProductDetailData.js";
import HeadDetiailProduct from "@/components/stock/detail/HeadDetailProduct.js";

const ProductDetail = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const product = useSelector((state) => state.products.productData);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const productRes = await axios.get(`./../../api/stock/${id}`);
      const productData = productRes.data;
      dispatch(getProductData(productData));

      const categoryRes = await axios.get(
        `./../../api/attributes/categoria/${productData.result_info_prod[0].id_cat}`
      );
      const categoryData = categoryRes.data;
      dispatch(getCategory(categoryData));

      const genderRes = await axios.get(
        `./../../api/attributes/genero/${productData.result_info_prod[0].id_gen}`
      );
      const genderData = genderRes.data;
      dispatch(getGender(genderData));

      const supplierRes = await axios.get(
        `./../../api/attributes/proveedores/${productData.result_info_prod[0].id_prov}`
      );
      const supplierData = supplierRes.data;
      dispatch(getSupplier(supplierData));

      // const colorsRes = await axios.get(
      //   `./../../api/attributes/proveedores/${productData.result_info_prod[0].id_prov}`
      // );
      // const supplierData = supplierRes.data;
      // dispatch(getSupplier(supplierData));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);
  return (
    <div className="pb-20">
      <BreadcrumbNav />
      {!isLoading && product && (
        <>
          <HeadDetiailProduct name={product.result_info_prod[0].nombre} />
          <ProductDetailData />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
