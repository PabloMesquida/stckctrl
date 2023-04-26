import stylesGeneral from "@/styles/General.module.css";
import { MdImage } from "react-icons/md";

const ProductDetailDataImage = ({ image }) => {
  return (
    <div className={stylesGeneral.panel_card}>
      {image === "No Image" ? (
        <div className={stylesGeneral.form_image_container}>
          <MdImage
            className={stylesGeneral.form_icon_image_placeholder_detail}
          />
        </div>
      ) : (
        <div className={`${stylesGeneral.form_image_container} p-2 sm:p-4 `}>
          <img className="rounded-md max-h-96" src={image} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailDataImage;
