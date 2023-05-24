import stylesGeneral from "@/styles/General.module.css";

const SelectProdOptions = ({ options }) => {
  return (
    <div className={`${stylesGeneral.input_group_sm} `}>
      <select
        name={options.nombre}
        // {...formik.getFieldProps(`id_${name}`)}
        // onChange={handlechange ? handlechange : formik.handleChange}
        // onBlur={formik.handleBlur}
        // style={{ display: "block" }}
        className={stylesGeneral.input_text_sm}
      >
        {options && options.length > 0 ? (
          options.map((el) => (
            <option value={el.id} key={el.id} name={el.nombre}>
              {el.nombre}
            </option>
          ))
        ) : (
          <option>No Data</option>
        )}
      </select>
    </div>
  );
};

export default SelectProdOptions;
