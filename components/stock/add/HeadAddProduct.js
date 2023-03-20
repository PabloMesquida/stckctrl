import stylesGeneral from "@/styles/General.module.css";
import Link from "next/link";

const HeadAddProduct = () => {
  return (
    <div className={stylesGeneral.head_container}>
      <div className={stylesGeneral.section_title}>AGREGAR PRODUCTO</div>
    </div>
  );
};

export default HeadAddProduct;
