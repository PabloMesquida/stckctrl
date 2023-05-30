import stylesGeneral from "@/styles/General.module.css";

const SelectProdOptions = ({
  name,
  options,
  size,
  optionSelected = null,
  handleSelectChange,
}) => {
  const isSmallSize = size === "sm";
  const isBaseSize = size === "base";
  const minWClass = isSmallSize
    ? "w-20 md:min-w-24 md:w-1/4"
    : isBaseSize
    ? "w-32 md:min-w-32 md:w-full"
    : "w-full";

  return (
    <div className={`${stylesGeneral.input_group_sm} ${minWClass}`}>
      <select
        name={name}
        // {...formik.getFieldProps(`id_${name}`)}
        onChange={handleSelectChange}
        // onBlur={formik.handleBlur}
        // style={{ display: "block" }}
        className={`${stylesGeneral.input_text_sm}`}
      >
        {options && options.length > 0 ? (
          <>
            {optionSelected ? (
              <option value={optionSelected.id} key="0">
                {optionSelected.nombre}
              </option>
            ) : (
              <option value="" key="0">
                {name}
              </option>
            )}

            {options.map((el) => (
              <option
                value={`${el.id}-${el.nombre}`}
                key={`${el.id}-${el.nombre}`}
              >
                {el.nombre}
              </option>
            ))}
          </>
        ) : (
          <option>No Data</option>
        )}
      </select>
    </div>
  );
};

export default SelectProdOptions;
