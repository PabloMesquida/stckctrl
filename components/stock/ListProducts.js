import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getProductsData,
  getAllProductsData,
  deleteProduct,
} from "@/actions/productsActions.js";
import FilterProducts from "./FilterProducts.js";
import Modal from "@/components/modal/Modal.js";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemProducts from "./ItemProducts.js";
import stylesGeneral from "@/styles/General.module.css";

const ListProducts = () => {
  const products = useSelector((state) => state?.products.productsData);
  const allProducts = useSelector((state) => state?.products.allProductsData);
  const router = useRouter();
  const [limit, setLimit] = useState(0);
  const [filter, setFilter] = useState({
    id_categories: null,
    id_genders: null,
    id_suppliers: null,
    code: null,
  });
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [message, setMessage] = useState({
    status: "",
    type: null,
    text: null,
  });
  const dispatch = useDispatch();
  const [previousData, setPreviousData] = useState(products);

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
    console.log("fetchData");
    axios
      .get(`./api/stock/limit/${limit}`)
      .then((res) => {
        dispatch(getProductsData(res.data));
        setHasMore(res.data.length <= limit);
      })
      .catch((err) => {
        setHasMore(false);
      });
  };

  const fetchAllData = () => {
    axios.get(`./api/stock`).then((res) => {
      dispatch(getAllProductsData(res.data));
    });
  };

  const filterProd = (filter) => {
    let filteredProducts = allProducts || [];

    if (!filter) {
      filteredProducts = products;
    } else {
      if (filter.id_categories) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoria === filter.id_categories
        );
      }

      if (filter.id_genders) {
        filteredProducts = filteredProducts.filter(
          (product) => product.genero === filter.id_genders
        );
      }

      if (filter.id_suppliers) {
        filteredProducts = filteredProducts.filter(
          (product) => product.proveedor === filter.id_suppliers
        );
      }
      if (filter.code) {
        filteredProducts = filteredProducts.filter(
          (product) => product.codigo === filter.code
        );
      }
    }
    return filteredProducts;
  };

  useEffect(() => {
    const isAnyNotNull = Object.values(filter).some((value) => value !== null);
    if (isAnyNotNull) {
      console.log("ALL");
      fetchAllData();
    } else {
      if (products.length === 0 && limit === 0) {
        fetchData();
      } else {
        setHasMore(false);
      }
    }
  }, [filter, limit]);

  useEffect(() => {
    if (products !== previousData) {
      console.log("La parte específica del estado ha cambiado recientemente.");
      setPreviousData(products);
    }
  }, [products, previousData]);

  return (
    <>
      {showModal && (
        <Modal
          message={message}
          firstBtn={() => deleteProd(productId)}
          secondBtn={closeModal}
        />
      )}
      <FilterProducts setFilter={setFilter} />

      <div className="min-w-full">
        {Object.values(filter).every((value) => value === null) ? (
          <InfiniteScroll
            dataLength={products.length}
            next={() => setLimit((prev) => prev + 7)}
            hasMore={hasMore}
            loader={
              <div className={stylesGeneral.text_loader}>
                Cargando productos.
              </div>
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
        ) : (
          <div>
            {filterProd(filter).length === 0 ? (
              <div className="flex justify-center items-center m-8 text-th-primary-medium text-sm">
                No se encontraron productos.
              </div>
            ) : (
              filterProd(filter).map((product) => (
                <ItemProducts
                  product={product}
                  key={product.id}
                  warningMessage={() =>
                    warningMessage(product.nombre, product.id)
                  }
                />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ListProducts;
