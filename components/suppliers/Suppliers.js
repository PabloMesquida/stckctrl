import HeadSuppliers from "./HeadSuppliers.js";
import ListSuppliers from "@/components/suppliers/ListSuppliers.js";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";

const Suppliers = () => {
  return (
    <div className="pb-12">
      <BreadcrumbNav />
      <HeadSuppliers />
      <ListSuppliers />
    </div>
  );
};

export default Suppliers;
