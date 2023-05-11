import { useFormik } from "formik";
import SelectOptions from "../forms/SelectOptions.js";
import stylesGeneral from "@/styles/General.module.css";

const FilterProducts = ({ setFilter }) => {
  const formik = useFormik({
    initialValues: {
      code: "",
    },
  });

  function handleChange(e) {
    setFilter((filter) => ({
      ...filter,
      [e.target.name]:
        e.target.options[e.target.selectedIndex].getAttribute("name"),
    }));
  }

  function handleCode(e) {
    setFilter((filter) => ({
      ...filter,
      code: e.target.value,
    }));
  }

  return (
    <div className={stylesGeneral.filter_container}>
      <form
        className={stylesGeneral.form}
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <div className="w-full">
              <SelectOptions
                formik={formik}
                name="categories"
                text="Categoría"
                handlechange={handleChange}
              />
            </div>
            <div className="flex w-full">
              <SelectOptions
                formik={formik}
                name="genders"
                text="Género"
                handlechange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex w-full">
              <SelectOptions
                formik={formik}
                name="suppliers"
                text="Proveerdor"
                handlechange={handleChange}
              />
            </div>

            <div className={`${stylesGeneral.input_group}`}>
              <input
                className={stylesGeneral.input_text}
                type="text"
                name="code"
                maxLength={8}
                placeholder="Código"
                {...formik.getFieldProps("code")}
                onChange={(e) => {
                  e.preventDefault();
                  const { value } = e.target;
                  const regex =
                    /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                  if (regex.test(value.toString())) {
                    formik.setFieldValue("code", value);
                  }
                }}
                onKeyUp={(e) => {
                  const { value } = e.target;
                  if (value.length === 8) {
                    handleCode(e);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterProducts;
