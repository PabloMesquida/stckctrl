import stylesGeneral from "@/styles/General.module.css";
import { MdImage } from "react-icons/md";

const ProductDetailDataImage = () => {
  return (
    <div className={stylesGeneral.panel_card}>
      <div className={stylesGeneral.form_image_container}>
        <MdImage className={stylesGeneral.form_icon_image_placeholder_detail} />
      </div>
    </div>
  );
};

export default ProductDetailDataImage;
