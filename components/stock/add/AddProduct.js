import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav";
import Footer from "@/components/navbar/Footer";
import FormProducts from "./FormProducts";
import HeadAddProduct from "./HeadAddProduct";

const AddProduct = () => {
  return (
    <div className="pb-20">
      <BreadcrumbNav />
      <HeadAddProduct />
      <FormProducts />
    </div>
  );
};

export default AddProduct;
