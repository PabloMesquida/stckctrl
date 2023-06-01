import { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductCurrentSale } from "@/actions/salesAction.js";
import SummaryCurrentSale from "./SummaryCurrentSale.js";
import ItemCurrentSale from "./ItemCurrentSale.js";
import stylesGeneral from "@/styles/General.module.css";
import ItemCurrentSaleSkeleton from "./ItemCurrentSaleSkeleton.js";

const ListCurrentSale = ({ isLoading }) => {
  const newSale = useSelector((state) => state?.sales.currentSale);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      products: [],
      summary: [],
    },
    //validate: (values) => add_product_sale_validate(values),
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    console.log(values);
  }

  const delItem = (id) => {
    dispatch(deleteProductCurrentSale(id));
  };

  return (
    <>
      {newSale.products.length === 0 ? (
        isLoading ? (
          <div className={`${stylesGeneral.panel_card} flex flex-col gap-4`}>
            <ItemCurrentSaleSkeleton />
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            Ingrese el código de producto.
          </div>
        )
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <div className={`${stylesGeneral.panel_card} flex flex-col gap-4`}>
              {newSale.products.map((product, index) => (
                <ItemCurrentSale
                  product={product}
                  delItem={delItem}
                  key={index}
                />
              ))}
              {isLoading && <ItemCurrentSaleSkeleton />}
              <SummaryCurrentSale />
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ListCurrentSale;
