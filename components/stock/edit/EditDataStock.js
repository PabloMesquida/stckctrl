import { useState } from "react";
import { useFormik } from "formik";
import { useWidthNavigator } from "@/helpers/useWidthNavigator.js";
import { createStockMatrix } from "@/helpers/stockMatrix.js";
import IconColor from "@/components/icons/IconColor.js";
import stylesGeneral from "@/styles/General.module.css";

const EditDataStock = ({ product }) => {
  const widthNavigator = useWidthNavigator();
  const [stockMatrix, setStockMatrix] = useState([]);
  const formik = useFormik({
    initialValues: {
      stock: [],
    },
    validate: (values) => stock_validate(values),
    onSubmit,
  });

  const stock = product.productData.stock;
  const colorsData = product.productData.colors;

  const talles = Array.from(new Set(stock.map((item) => item.talle)));
  const colores = Array.from(new Set(stock.map((item) => item.color)));

  if (!stockMatrix.length) {
    setStockMatrix(createStockMatrix(stock, colores, talles));
  }

  async function onSubmit(values) {
    // openModal();
    // values.file = imageSrc;
    // const options = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: values,
    // };
    // if (product && id) {
    //   options.body.id = id;
    //   await axios.post(`../../api/stock/${id}`, options).then((res) => {
    //     if (res.data.status) {
    //       setMessage({
    //         status: res.data.status,
    //         type: res.data.type,
    //         text: res.data.message,
    //       });
    //     }
    //   });
    // } else {
    //   await axios.post("../../api/stock", options).then((res) => {
    //     if (res.data.status) {
    //       setMessage({
    //         status: res.data.status,
    //         type: res.data.type,
    //         text: res.data.message,
    //       });
    //     }
    //   });
    // }
  }

  return (
    <div className={stylesGeneral.panel_card}>
      <table className="bg-th-background min-w-full rounded-md overflow-hidden sm:text-base text-xs ">
        <thead>
          <tr className="mb-4 border-b border-th-background-secondary bg-th-background-tertiary">
            <td className="flex md:m-4 m-2 w-12">STOCK</td>
            {talles.map((talle) => (
              <td className="text-center" key={talle}>
                {talle}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {colorsData.map(({ color, etiqueta, id_color, hex }, rowIndex) => (
            <tr
              className="border-b border-th-background-secondary  "
              key={color}
            >
              <td className="flex md:my-4 my-2 items-center gap-2">
                <IconColor id={id_color} color={hex} size={16} />
                {widthNavigator > 640 ? color : etiqueta}
              </td>
              {talles.map((talle, colIndex) => (
                <td className=" text-center w-12" key={`${color}-${talle}`}>
                  <input
                    className={stylesGeneral.input_text_stock}
                    type="text"
                    name={`${colIndex}-${rowIndex}`}
                    placeholder="0"
                    maxLength="2"
                    // {...formik.getFieldProps({ colIndex })}
                  />

                  {/* {stockMatrix &&
                    stockMatrix[rowIndex] &&
                    stockMatrix[rowIndex][colIndex]} */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditDataStock;
