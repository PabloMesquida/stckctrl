import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductsData, deleteProduct } from "@/actions/productsActions";
import axios from "axios";
import FilterProducts from "./FilterProducts.js";
import Modal from "@/components/modal/Modal.js";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemProducts from "./ItemProducts.js";
import stylesGeneral from "@/styles/General.module.css";

const ListProducts = () => {
  const products = useSelector((state) => state?.products.productsData);
  const router = useRouter();
  const [limit, setLimit] = useState(0);
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

  const fetchData = () => {
    console.log("limit", limit);
    axios.get(`./api/stock/limit/${limit}`).then((res) => {
      dispatch(getProductsData(res.data));
    });
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

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
      <div className="min-w-full">
        <InfiniteScroll
          dataLength={products.length}
          next={() => setLimit((prev) => prev + 7)}
          hasMore={products.length >= limit}
          loader={
            <div className={stylesGeneral.text_loader}>Cargando productos.</div>
          }
          endMessage={
            <div className="flex justify-center items-center m-8 text-th-primary-medium text-sm">
              Lo has visto todo.
            </div>
          }
        >
          <div>
            {products.map((product) => (
              <ItemProducts
                product={product}
                key={product.id}
                warningMessage={() =>
                  warningMessage(product.nombre, product.id)
                }
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ListProducts;
