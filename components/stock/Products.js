import ListProducts from "@/components/stock/ListProducts.js";
import FilterProducts from "./FilterProducts.js";
import HeadProducts from "./HeadProducts.js";

const Products = () => {
  return (
    <div>
      <HeadProducts />
      <ListProducts />
    </div>
  );
};

export default Products;
