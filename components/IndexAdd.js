import Head from "@/components/head/Head.js";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";
import { lazy, Suspense } from "react";

const FormProducts = lazy(() =>
  import("@/components/stock/add/FormProducts.js")
);
const FormSuppliers = lazy(() =>
  import("@/components/suppliers/add/FormSuppliers.js")
);
const FormSales = lazy(() => import("@/components/sales/add/FormSales.js"));

const IndexAdd = ({ section }) => {
  let FormComponent;
  switch (section) {
    case "stock":
      FormComponent = FormProducts;
      break;
    case "suppliers":
      FormComponent = FormSuppliers;
      break;
    case "sales":
      FormComponent = FormSales;
      break;
    default:
      FormComponent = FormProducts;
      break;
  }
  return (
    <div className="pb-12">
      <BreadcrumbNav />
      <Head section={section} />
      <Suspense fallback={<div>Loading...</div>}>
        <FormComponent />
      </Suspense>
    </div>
  );
};

export default IndexAdd;
