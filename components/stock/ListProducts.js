import { useSelector, useDispatch } from "react-redux";

import ItemProducts from "./ItemProducts.js";
import FilterProducts from "./FilterProducts.js";

const ListProducts = () => {
  const products = useSelector((state) => state?.products.productsData);

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
