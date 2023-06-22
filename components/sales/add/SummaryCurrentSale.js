import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePaymentCurrentSale, updateDiscountCurrentSale } from "@/actions/salesAction.js";
import { calculatePercentage, sumarAmount } from "@/helpers/utils.js";
import { useWidthNavigator } from "@/helpers/useWidthNavigator.js";
import SelectProdOptions from "@/components/forms/SelectProdOptions.js";
import stylesGeneral from "@/styles/General.module.css";

const SummaryCurrentSale = ({ sale, formik }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isCashDiscuount, setIsCashDiscuount] = useState(false);
  const [discount, setDiscount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [saleAmount, setSaleAmount] = useState(sale.summary.amount);
  const widthNavigator = useWidthNavigator();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    let dis = 0;

    if (!isCashDiscuount) {
      const result = calculatePercentage(saleAmount, inputValue);
      dis = result.percentage;
    }

    setDiscount(dis);
    dispatch(updateDiscountCurrentSale(dis));
  };

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

  useEffect(() => {
    const sumAmount = sumarAmount(sale.products);
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
          <div className="flex justify-between ">
            <div className="grow-0 sm:grow">
              <SelectProdOptions
                name="Forma de pago"
                options={paymentMethods}
                optionSelected={paymentSelected}
                size="sm"
                handleSelectChange={handleSelectChange}
                formik={formik}
              />
            </div>
            <div className="px-2 lg:px-8">
              <div>
                <label>
                  <span className={`${stylesGeneral.item_name} mr-4 `}>
                    {widthNavigator > 720 ? "Descuento 15%:" : "Desc 15%:"}
                  </span>
                  <input
                    type="checkbox"
                    checked={isCashDiscuount}
                    onChange={handleCheckboxChange}
                    className="text-th-accent-dark"
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
                      onChange={handleInputChange}
                    />
                    <span className={`${stylesGeneral.item_name} ml-2`}>%</span>
                  </>
                )}
              </div>
            </div>
            <div>
              {discount > 0 ? (
                <div className="flex-row">
                  <div className="flex flex-col pl-2 pb-2 items-end">
                    <div> $ {saleAmount}.-</div>
                    <div className="text-th-accent-dark font-bold"> - $ {discount}.-</div>
                  </div>
                  <div className={stylesGeneral.border_result}>
                    Total: $ <span className="text-xl">{saleAmount - discount}.-</span>
                  </div>
                </div>
              ) : (
                <div className={stylesGeneral.border_result}>
                  Total: $<span className="text-xl">{saleAmount}.-</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCurrentSale;
