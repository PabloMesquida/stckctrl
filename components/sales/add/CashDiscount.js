import stylesGeneral from "@/styles/General.module.css";

const CashDiscount = ({ handleInputChange }) => {
  return (
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
  );
};

export default CashDiscount;
