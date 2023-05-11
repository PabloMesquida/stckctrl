import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSuppliers } from "@/actions/productsActions.js";
import FilterSuppliers from "./FilterSuppliers.js";
import ItemSuppliers from "./ItemSuppliers.js";

const ListSuppliers = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state?.products.suppliers);
  const [filter, setFilter] = useState();
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

  const filterSup = (filter) => {
    let filteredSuppliers = suppliers || [];
    if (!filter) {
      filteredSuppliers = suppliers;
    } else {
      filteredSuppliers = suppliers;
    }
    return filteredSuppliers;
  };

  return (
    <div>
      <FilterSuppliers />
      <div>
        <div>
          {filterSup(filter).length === 0 ? (
            <div className="flex justify-center items-center m-8 text-th-primary-medium text-sm">
              No se encontraron productos.
            </div>
          ) : (
            filterSup(filter).map((supplier) => (
              <ItemSuppliers
                supplier={supplier}
                key={supplier.id}
                warningMessage={() =>
                  warningMessage(supplier.nombre, supplier.id)
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListSuppliers;
