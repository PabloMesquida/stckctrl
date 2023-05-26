import axios from "axios";
import { useEffect, useState } from "react";
import SelectProdOptions from "@/components/forms/SelectProdOptions";

const SummaryCurrentSale = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const methodsRes = await axios.get(`./../../api/payment-methods`);
        setPaymentMethods(methodsRes.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div>
          {!isLoading && (
            <SelectProdOptions
              name="Forma de pago"
              options={paymentMethods}
              size="base"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryCurrentSale;
