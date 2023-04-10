import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProductData, getCategory } from "@/actions/productsActions";
import axios from "axios";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";

const ProductDetail = ({ id }) => {
  const product = useSelector((state) => state.products.productData);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const productRes = await axios.get(`./../api/stock/${id}`);
      const productData = productRes.data;
      // console.log("prod", productData.result_info_prod[0].id_cat);
      dispatch(getProductData(productData));

      const categoryRes = await axios.get(
        `./../api/attributes/categoria/${productData.result_info_prod[0].id_cat}`
      );
      const categoryData = categoryRes.data;
      console.log("cat", categoryData);
      dispatch(getCategory(categoryData));
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchCategory = async () => {};

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);
  return (
    <div className="pb-12">
      <BreadcrumbNav />
      <div>{product && <span>ID:{product.id}</span>} - </div>
    </div>
  );
};

export default ProductDetail;
