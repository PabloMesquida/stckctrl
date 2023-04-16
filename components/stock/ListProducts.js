import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductsData, deleteProduct } from "@/actions/productsActions";
import axios from "axios";
import ItemProducts from "./ItemProducts.js";
import FilterProducts from "./FilterProducts.js";
import Modal from "@/components/modal/Modal.js";

const ListProducts = () => {
  const products = useSelector((state) => state?.products.productsData);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [message, setMessage] = useState({
    status: "",
    type: null,
    text: null,
  });
  const dispatch = useDispatch();

  const warningMessage = (name, id) => {
    setProductId(id);
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

  const deleteProd = async (id) => {
    await axios.delete(`./api/stock/${id}`).then((res) => {
      dispatch(deleteProduct(id));
    });
    closeModal();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setProductId(null);
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
        <Modal
          message={message}
          firstBtn={() => deleteProd(productId)}
          secondBtn={closeModal}
        />
      )}
      <FilterProducts />
      <div className="min-w-full table-auto">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ItemProducts
              product={product}
              key={product.id}
              warningMessage={() => warningMessage(product.nombre, product.id)}
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
