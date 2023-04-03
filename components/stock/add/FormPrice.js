import stylesGeneral from "@/styles/General.module.css";

const FormPrice = ({ formik }) => {
  return (
    <>
      <div className="mb-4">Precios:</div>
      <div className="flex flex-row sm:flex-row gap-4">
        <div className={`${stylesGeneral.input_group} `}>
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="cost_price"
            placeholder="Costo"
            {...formik.getFieldProps("cost_price")}
            onChange={(e) => {
              e.preventDefault();
              const { value } = e.target;
              const regex =
                /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
              if (regex.test(value.toString())) {
                formik.setFieldValue("cost_price", value);
              }
            }}
          />
        </div>

        <div className={`${stylesGeneral.input_group}`}>
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="price"
            placeholder="Venta"
            {...formik.getFieldProps("price")}
            onChange={(e) => {
              e.preventDefault();
              const { value } = e.target;
              const regex =
                /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
              if (regex.test(value.toString())) {
                formik.setFieldValue("price", value);
              }
            }}
          />
          {formik.errors.price && formik.touched.price && (
            <span className="flex items-center px-4 w-full">
              <MdWarning size={25} className="text-th-warning" />
            </span>
          )}
        </div>
        <div className={`${stylesGeneral.input_group}`}>
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="clearance_price"
            placeholder="Liquidación"
            {...formik.getFieldProps("clearance_price")}
            onChange={(e) => {
              e.preventDefault();
              const { value } = e.target;
              const regex =
                /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
              if (regex.test(value.toString())) {
                formik.setFieldValue("clearance_price", value);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default FormPrice;
