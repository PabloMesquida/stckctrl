import InputCode from "./InputCode";
import stylesGeneral from "@/styles/General.module.css";
import ListCurrentSale from "./ListCurrentSale.js";

const FormSales = () => {
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <InputCode />
      <ListCurrentSale />
    </div>
  );
};

export default FormSales;
