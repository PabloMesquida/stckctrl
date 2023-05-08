import Head from "@/components/head/Head.js";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";
import { lazy, Suspense } from "react";

const ListProducts = lazy(() => import("@/components/stock/ListProducts.js"));
const ListSuppliers = lazy(() =>
  import("@/components/suppliers/ListSuppliers.js")
);
//const ListSales = lazy(() => import("@/components/sales/ListSales.js"));

const IndexSection = ({ section }) => {
  let ListComponent;
  switch (section) {
    case "stock":
      ListComponent = ListProducts;
      break;
    case "suppliers":
      ListComponent = ListSuppliers;
      break;
    default:
      ListComponent = ListProducts;
      break;
  }
  return (
    <div className="pb-12">
      <BreadcrumbNav />
      <Head section={section} />
      <Suspense fallback={<div>Loading...</div>}>
        <ListComponent />
      </Suspense>
    </div>
  );
};

export default IndexSection;
