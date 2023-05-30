import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductCurrentSale } from "@/actions/salesAction.js";
import SummaryCurrentSale from "./SummaryCurrentSale.js";
import ItemCurrentSale from "./ItemCurrentSale.js";
import stylesGeneral from "@/styles/General.module.css";

const ListCurrentSale = () => {
  const newSale = useSelector((state) => state?.sales.currentSale);
  const dispatch = useDispatch();

  const delItem = (id) => {
    dispatch(deleteProductCurrentSale(id));
  };

  useEffect(() => {
    console.log("Sales state updated:", newSale);
  }, [newSale]);

  return (
    <>
      {newSale.products.length === 0 ? (
        <div className="flex justify-center items-center m-8 text-th-primary-medium text-sm">
          No se encontraron productos.
        </div>
      ) : (
        <div className={`${stylesGeneral.panel_card} flex flex-col gap-4`}>
          {newSale.products.map((product, index) => (
            <ItemCurrentSale product={product} delItem={delItem} key={index} />
          ))}
          <SummaryCurrentSale />
        </div>
      )}
    </>
  );
};

export default ListCurrentSale;
