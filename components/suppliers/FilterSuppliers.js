import { useFormik } from "formik";
import stylesGeneral from "@/styles/General.module.css";
import { MdSearch } from "react-icons/md";

const FilterSuppliers = ({ setFilter }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    setFilter((filter) => ({
      ...filter,
      [name]: value,
    }));
  }

  return (
    <div className={stylesGeneral.filter_container}>
      <form
        className={stylesGeneral.form}
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className={`${stylesGeneral.input_group}`}>
          <input
            className={stylesGeneral.input_text}
            type="text"
            name="name"
            placeholder="Buscar"
            {...formik.getFieldProps("name")}
            onChange={handleChange}
          />
          <span className="icon flex items-center px-4">
            <MdSearch size={32} />
          </span>
        </div>
      </form>
    </div>
  );
};

export default FilterSuppliers;
