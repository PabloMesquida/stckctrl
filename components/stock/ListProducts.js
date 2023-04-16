import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductsData } from "@/actions/productsActions";
import axios from "axios";
import ItemProducts from "./ItemProducts.js";
import FilterProducts from "./FilterProducts.js";
import Modal from "@/components/modal/Modal.js";

const ListProducts = () => {
  const products = useSelector((state) => state?.products.productsData);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({
    status: "",
    type: null,
    text: null,
  });
  const dispatch = useDispatch();

  const warningMessage = (name) => {
    setMessage({
      status: "delete",
      type: "warning",
      text: (
        <>
          ¿Desea continuar y eliminar este producto?
          <br />
          {name}
        </>
      ),
    });
    openModal();
  };

  const deleteProd = (id) => {
    console.log("delete", id);
    closeModal();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/stock");
  };

  const fetchProducts = async () => {
    await axios.get("./api/stock").then((res) => {
      dispatch(getProductsData(res.data));
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  return (
    <>
      {showModal && (
        <Modal message={message} firstBtn={deleteProd} secondBtn={closeModal} />
      )}
      <FilterProducts />
      <div className="min-w-full table-auto">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ItemProducts
              product={product}
              key={product.id}
              warningMessage={() => warningMessage(product.nombre)}
            />
          ))
        ) : (
          <div>No Data</div>
        )}
      </div>
    </>
  );
};

export default ListProducts;
