import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSuppliers, deleteSupplier } from "@/actions/productsActions.js";
import Modal from "@/components/modal/Modal.js";
import FilterSuppliers from "./FilterSuppliers.js";
import ItemSuppliers from "./ItemSuppliers.js";

const ListSuppliers = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state?.products.suppliers);
  const router = useRouter();
  const [supplierId, setSupplierId] = useState(null);
  const [filter, setFilter] = useState();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({
    status: "",
    type: null,
    text: null,
  });

  const fetchData = () => {
    axios.get(`./api/suppliers`).then((res) => {
      dispatch(getSuppliers(res.data));
    });
  };

  const warningMessage = (name, id) => {
    setSupplierId(id);
    setMessage({
      status: "delete",
      type: "warning",
      text: (
        <>
          ¿Desea continuar y eliminar este proveedor?
          <br />
          {name}
        </>
      ),
    });
    openModal();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setSupplierId(null);
    setShowModal(false);

    router.push("/suppliers");
  };

  const deleteSup = async (id) => {
    await axios.delete(`./api/suppliers/${id}`).then((res) => {
      dispatch(deleteSupplier(id));
    });
    closeModal();
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
        supplier.nombre.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    return filteredSuppliers;
  };

  return (
    <>
      {showModal && (
        <Modal
          message={message}
          firstBtn={() => deleteSup(supplierId)}
          secondBtn={closeModal}
        />
      )}
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
    </>
  );
};

export default ListSuppliers;
