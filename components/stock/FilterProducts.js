import stylesGeneral from "@/styles/General.module.css";
import { useFormik } from "formik";
import SelectOptions from "../forms/SelectOptions.js";

const FilterProducts = ({ filter, setFilter }) => {
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    //   validate: (values) => add_product_validate(values, imageSrc, uploadData),
    onSubmit,
  });

  async function onSubmit(values) {
    values.file = imageSrc;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: values,
    };

    await axios.get(`../api/stock/${values.code}`, options).then((res) => {
      if (res.data.status) {
        setMessage({
          status: res.data.status,
          type: res.data.type,
          text: res.data.message,
        });
      }
    });
  }

  function handleChange(e) {
    setFilter((filter) => ({
      ...filter,
      [e.target.name]:
        e.target.options[e.target.selectedIndex].getAttribute("name"),
    }));
  }

  return (
    <div className={stylesGeneral.filter_container}>
      <form
        className={stylesGeneral.form}
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex">
          <div className="flex w-full">
            <SelectOptions
              formik={formik}
              name="categories"
              text="Categoría"
              handlechange={handleChange}
            />
            {formik.errors.id_categories && formik.touched.id_categories && (
              <span className=" flex items-center px-4 pb-4 ">
                <MdWarning size={25} className="text-th-warning" />
              </span>
            )}
          </div>
          <div className="flex w-full">
            <SelectOptions
              formik={formik}
              name="genders"
              text="Género"
              handlechange={handleChange}
            />
            {formik.errors.id_genders && formik.touched.id_genders && (
              <span className=" flex items-center px-4 pb-4 ">
                <MdWarning size={25} className="text-th-warning" />
              </span>
            )}
          </div>
          <div className="flex w-full">
            <SelectOptions
              formik={formik}
              name="suppliers"
              text="Proveerdor"
              handlechange={handleChange}
            />
            {formik.errors.id_suppliers && formik.touched.id_suppliers && (
              <span className=" flex items-center px-4 pb-4 ">
                <MdWarning size={25} className="text-th-warning" />
              </span>
            )}
          </div>
          <div className={`${stylesGeneral.input_group}`}>
            <input
              className={stylesGeneral.input_text}
              type="text"
              name="prod_name"
              placeholder="Nombre"
              {...formik.getFieldProps("prod_name")}
            />
            {formik.errors.prod_name && formik.touched.prod_name && (
              <span className="flex items-center px-4">
                <MdWarning size={25} className="text-th-warning" />
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterProducts;
