import HeadProducts from "./HeadProducts.js";
import ListProducts from "@/components/stock/ListProducts.js";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";

const Products = () => {
  return (
    <div>
      <BreadcrumbNav />
      <HeadProducts />
      <ListProducts />
    </div>
  );
};

export default Products;
