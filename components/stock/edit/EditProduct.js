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
import ProductDetailSkeleton from "@/components/stock/detail/ProductDetailSkeleton.js";
import HeadDetiailProduct from "@/components/stock/detail/HeadDetailProduct.js";
import FormProducts from "@/components/stock/add/FormProducts.js";

const EditProduct = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const product = useSelector((state) => state.products.productData);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const productRes = await axios.get(`./../../api/stock/${id}`);
      const productData = productRes.data;

      const [
        { data: categoryData },
        { data: genderData },
        { data: supplierData },
      ] = await axios.all([
        axios.get(`./../../api/attributes/categoria/${productData[0].id_cat}`),
        axios.get(`./../../api/attributes/genero/${productData[0].id_gen}`),
        axios.get(
          `./../../api/attributes/proveedores/${productData[0].id_prov}`
        ),
      ]);
      dispatch(getProductData(productData));
      dispatch(getCategory(categoryData));
      dispatch(getGender(genderData));
      dispatch(getSupplier(supplierData));

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
      {isLoading && <ProductDetailSkeleton />}
      {!isLoading && product && (
        <>
          <HeadDetiailProduct name={product[0].nombre} />
          <FormProducts product={product} id={id} />
        </>
      )}
    </div>
  );
};

export default EditProduct;
