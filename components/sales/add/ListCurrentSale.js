import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductCurrentSale } from "@/actions/salesAction.js";
import { add_sale_validate } from "@/helpers/validate.js";
import SummaryCurrentSale from "./SummaryCurrentSale.js";
import ItemCurrentSale from "./ItemCurrentSale.js";
import stylesGeneral from "@/styles/General.module.css";
import ItemCurrentSaleSkeleton from "./ItemCurrentSaleSkeleton.js";
import { useEffect } from "react";

const ListCurrentSale = ({ isLoading }) => {
  const newSale = useSelector((state) => state?.sales.currentSale);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      products: [],
      summary: {
        amount: 0,
      },
    },
    validate: (values) => add_sale_validate(values),
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    console.log("VALUES: ", values);
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
          <div className="flex justify-center mt-4">Ingrese el código de producto.</div>
        )
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <div className={`${stylesGeneral.panel_card} flex flex-col gap-4`}>
              {newSale.products.map((product, index) => (
                <ItemCurrentSale product={product} delItem={delItem} key={index} formik={formik} />
              ))}
              {isLoading && <ItemCurrentSaleSkeleton />}
              <SummaryCurrentSale sale={newSale} formik={formik} />
              <button type="submit" className={stylesGeneral.button_2xl}>
                Guardar
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ListCurrentSale;
