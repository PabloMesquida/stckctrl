import { useState } from "react";
import InputCode from "./InputCode";
import ListCurrentSale from "./ListCurrentSale.js";

const FormSales = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <InputCode setIsLoading={setIsLoading} />
      <ListCurrentSale isLoading={isLoading} />
    </div>
  );
};

export default FormSales;
