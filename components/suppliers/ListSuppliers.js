import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSuppliers } from "@/actions/productsActions.js";
import FilterSuppliers from "./FilterSuppliers.js";

const ListSuppliers = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state?.products.suppliers);
  console.log(suppliers);

  const fetchData = () => {
    axios.get(`./api/attributes/proveedores`).then((res) => {
      dispatch(getSuppliers(res.data));
    });
  };

  useEffect(() => {
    console.log("fetch");
    fetchData();
  }, []);

  return (
    <div>
      <FilterSuppliers />
      <div>ListSuppliers</div>
    </div>
  );
};

export default ListSuppliers;
