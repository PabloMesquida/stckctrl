import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updatePaymentCurrentSale,
  updateAmountCurrentSale,
  updateDiscountCurrentSale,
} from "@/actions/salesAction.js";
import { calculatePercentage } from "@/helpers/utils.js";
import SelectProdOptions from "@/components/forms/SelectProdOptions.js";
import stylesGeneral from "@/styles/General.module.css";

const SummaryCurrentSale = ({ sale, formik }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isCashDiscuount, setIsCashDiscuount] = useState(false);
  const [discount, setDiscount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [saleAmount, setSaleAmount] = useState(sale.summary.amount);
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    let dis = 0;

    if (!isCashDiscuount) {
      const result = calculatePercentage(saleAmount, 15);
      dis = result.percentage;
    }

    setDiscount(dis);
    setIsCashDiscuount(!isCashDiscuount);
    dispatch(updateDiscountCurrentSale(dis));
  };

  function sumarAmount(products) {
    let totalAmount = 0;
    for (let i = 0; i < products.length; i++) {
      totalAmount += products[i].amount;
    }
    return totalAmount;
  }

  useEffect(() => {
    const sumAmount = sumarAmount(sale.products);
    updateAmountCurrentSale(sumAmount);
    setSaleAmount(sumAmount);
    formik.setValues({
      products: sale.products,
      summary: { amount: sumAmount },
    });
    console.log("SALE: ", sumAmount);
  }, [sale]);

  const paymentId = sale.summary.payment.id;
  const paymentSelected = paymentMethods.find((method) => method.id === paymentId);

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
          <div className="flex justify-between">
            <div className="grow">
              <SelectProdOptions
                name="Forma de pago"
                options={paymentMethods}
                optionSelected={paymentSelected}
                size="sm"
                handleSelectChange={handleSelectChange}
                formik={formik}
              />
            </div>
            <div className=" px-4 lg:px-8">
              <div>
                <label>
                  <span className={`${stylesGeneral.item_name} mr-4`}>Descuento 15%:</span>
                  <input
                    type="checkbox"
                    checked={isCashDiscuount}
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
              <div className="flex w-28 items-center">
                {!isCashDiscuount && (
                  <>
                    <span className={`${stylesGeneral.item_name} mr-2`}>Otro:</span>
                    <input
                      className={stylesGeneral.input_text_sm}
                      type="text"
                      name="discount"
                      maxLength={3}
                    />
                    <span className={`${stylesGeneral.item_name} ml-2`}>%</span>
                  </>
                )}
              </div>
            </div>
            <div className="">
              {discount > 0 ? (
                <div className="flex-row">
                  <div className="flex justify-end">
                    $ {saleAmount}.-
                    <br /> - $ {discount}.-
                  </div>
                  <div>
                    Total: $ <span className="text-xl">{saleAmount - discount}.-</span>
                  </div>
                </div>
              ) : (
                <>
                  Total: $<span className="text-xl">{saleAmount}.-</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCurrentSale;
