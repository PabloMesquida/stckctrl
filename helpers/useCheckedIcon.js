import { useCallback } from "react";
import { MdCheckCircle } from "react-icons/md";
import { CgBoy, CgGirl } from "react-icons/cg";
import { RiBearSmileLine } from "react-icons/ri";
import stylesGeneral from "@/styles/General.module.css";

const useCheckedIcon = (id, hex) => {
  const getIconChecked = useCallback(() => {
    console.log("TEST");
    switch (id) {
      case 22:
        return (
          <MdCheckCircle
            style={{ fill: "url(#multicolor-gradient)" }}
            size={28}
            className={stylesGeneral.checked_icon}
          />
        );
      case 26:
        return <CgBoy className={stylesGeneral.checked_icon} size={28} />;
      case 27:
        return <CgGirl className={stylesGeneral.checked_icon} size={28} />;
      case 28:
        return (
          <RiBearSmileLine className={stylesGeneral.checked_icon} size={28} />
        );
      default:
        return (
          <MdCheckCircle
            style={{ color: hex }}
            size={28}
            className={stylesGeneral.checked_icon}
          />
        );
    }
  }, [id, hex]);

  return getIconChecked;
};

export default useCheckedIcon;
