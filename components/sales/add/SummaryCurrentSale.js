import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePaymentCurrentSale } from "@/actions/salesAction.js";
import SelectProdOptions from "@/components/forms/SelectProdOptions.js";

const SummaryCurrentSale = ({ sale }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const paymentId = sale.summary.payment.id;
  const paymentSelected = paymentMethods.find(
    (method) => method.id === paymentId
  );

  const handleSelectChange = (e) => {
    const [id, name] = e.target.value.split("-");
    dispatch(updatePaymentCurrentSale({ id: parseInt(id), nombre: name }));
  };

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
              handleSelectChange={handleSelectChange}
            />
            <div>Total:</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCurrentSale;
