import stylesGeneral from "@/styles/General.module.css";

const SelectProdOptions = ({ options, size }) => {
  const isSmallSize = size === "sm";
  const isBaseSize = size === "base";
  const minWClass = isSmallSize
    ? "w-20 md:min-w-24 md:w-1/4"
    : isBaseSize
    ? "w-32 md:min-w-32 md:w-full"
    : "w-full";

  console.log(options);
  return (
    <div className={`${stylesGeneral.input_group_sm} ${minWClass}`}>
      <select
        name={options.nombre}
        // {...formik.getFieldProps(`id_${name}`)}
        // onChange={handlechange ? handlechange : formik.handleChange}
        // onBlur={formik.handleBlur}
        // style={{ display: "block" }}
        className={`${stylesGeneral.input_text_sm}`}
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
