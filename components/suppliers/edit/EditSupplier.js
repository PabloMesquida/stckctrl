import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSupplier } from "@/actions/productsActions.js";
import BreadcrumbNav from "@/components/breadcrum/BreadcrumbNav.js";
import SupplierDetailSkeleton from "@/components/suppliers/edit/SupplierDetailSkeleton.js";
import HeadDetail from "@/components/head/HeadDetail.js";
import FormSuppliers from "@/components/suppliers/add/FormSuppliers.js";

const EditSupplier = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const supplier = useSelector((state) => state.products.supplier);
  const dispatch = useDispatch();

  const fetchSupplier = async () => {
    try {
      const supplierRes = await axios.get(`./../../api/suppliers/${id}`);
      const supplierData = supplierRes.data;

      dispatch(getSupplier(supplierData));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  return (
    <div className="pb-20">
      <BreadcrumbNav />
      {isLoading && <SupplierDetailSkeleton />}
      {!isLoading && supplier && (
        <>
          <HeadDetail name={supplier[0].nombre} id={id} />
          <FormSuppliers supplier={supplier} id={id} />
        </>
      )}
    </div>
  );
};

export default EditSupplier;
