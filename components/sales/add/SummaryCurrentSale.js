import axios from "axios";
import { useEffect, useState } from "react";
import SelectProdOptions from "@/components/forms/SelectProdOptions";

const SummaryCurrentSale = ({ sale }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const paymentId = sale.summary.payment;
  const paymentSelected = paymentMethods.find(
    (method) => method.id === paymentId
  );

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
        {!isLoading && (
          <div>
            <SelectProdOptions
              name="Forma de pago"
              options={paymentMethods}
              optionSelected={paymentSelected}
              size="base"
            />
            <div>Total:</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCurrentSale;
