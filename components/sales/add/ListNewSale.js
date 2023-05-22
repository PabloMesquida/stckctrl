import { useEffect } from "react";
import { useSelector } from "react-redux";

const ListNewSale = () => {
  const newSale = useSelector((state) => state?.sales);

  useEffect(() => {
    console.log("Sales state updated:", newSale);
  }, [newSale]);

  return (
    <div>
      {newSale ? (
        <div className="flex justify-center items-center m-8 text-th-primary-medium text-sm">
          No se encontraron productos.
        </div>
      ) : (
        newSale.map((sale) => x)
      )}
    </div>
  );
};

export default ListNewSale;
