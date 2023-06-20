import { getName } from "@/helpers/utils";
import stylesGeneral from "@/styles/General.module.css";

const SelectProdOptions = ({
  name,
  options,
  size,
  optionSelected = null,
  handleSelectChange,
  formik,
}) => {
  const isSmallSize = size === "sm";
  const isBaseSize = size === "base";
  const minWClass = isSmallSize
    ? "w-20 md:min-w-24 md:w-1/4"
    : isBaseSize
    ? "w-32 md:min-w-32 md:w-full"
    : "w-full";

  const filteredOptions = options.filter((el) => !optionSelected || el.id !== optionSelected.id);

  return (
    <div className={`${stylesGeneral.input_group_sm} ${minWClass}`}>
      <select
        name={name}
        onChange={handleSelectChange}
        className={`${stylesGeneral.input_text_sm}`}
        // {...formik.getFieldProps(name)}
      >
        {options && options.length > 0 ? (
          <>
            {optionSelected ? (
              <option value={optionSelected.id} key="0">
                {optionSelected.nombre}
              </option>
            ) : (
              <option value="" key="0">
                {getName(name)}
              </option>
            )}

            {filteredOptions.map((el) => (
              <option value={`${el.id}-${el.nombre}`} key={`${el.id}-${el.nombre}`}>
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
