import HeadProducts from "./HeadProducts.js";
import ListProducts from "@/components/stock/ListProducts.js";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";

const Products = () => {
  return (
    <div className="pb-4">
      <BreadcrumbNav />
      <HeadProducts />
      <ListProducts />
    </div>
  );
};

export default Products;
