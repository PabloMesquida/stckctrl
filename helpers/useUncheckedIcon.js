import { useCallback } from "react";
import { MdCircle } from "react-icons/md";
import { CgBoy, CgGirl } from "react-icons/cg";
import { RiBearSmileLine } from "react-icons/ri";

const useUncheckedIcon = (id, hex) => {
  const getIconUnChecked = useCallback(() => {
    switch (id) {
      case 22:
        return (
          <MdCircle style={{ fill: "url(#multicolor-gradient)" }} size={28} />
        );
      case 26:
        return <CgBoy className="text-th-primary-medium" size={28} />;
      case 27:
        return <CgGirl className="text-th-primary-medium" size={28} />;
      case 28:
        return <RiBearSmileLine className="text-th-primary-medium" size={28} />;
      default:
        return <MdCircle style={{ color: hex }} size={28} />;
    }
  }, [id, hex]);

  return getIconUnChecked;
};

export default useUncheckedIcon;
