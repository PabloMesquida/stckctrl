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

  const fetchData = () => {
    axios.get(`./api/attributes/proveedores`).then((res) => {
      dispatch(getSuppliers(res.data));
    });
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const filterSup = (filter) => {
    let filteredSuppliers = suppliers || [];
    if (!filter) {
      filteredSuppliers = suppliers;
    } else {
      filteredSuppliers = filteredSuppliers.filter((supplier) =>
        supplier.nombre.includes(filter.name)
      );
    }
    return filteredSuppliers;
  };

  return (
    <div>
      <FilterSuppliers setFilter={setFilter} />
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
