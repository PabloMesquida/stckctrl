import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsData } from "@/actions/productsActions";
import axios from "axios";
import ItemProducts from "./ItemProducts.js";
import FilterProducts from "./FilterProducts.js";

const ListProducts = () => {
  const products = useSelector((state) => state?.products.productsData);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    await axios.get("./api/stock").then((res) => {
      dispatch(getProductsData(res.data));
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <FilterProducts />
      <div className="min-w-full table-auto">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ItemProducts product={product} key={product.id} />
          ))
        ) : (
          <div>No Data</div>
        )}
      </div>
    </>
  );
};

export default ListProducts;
