import { useCallback } from "react";
import { MdCheckCircle } from "react-icons/md";
import { CgBoy, CgGirl } from "react-icons/cg";
import { RiBearSmileLine } from "react-icons/ri";

const useCheckedIcon = (id, hex) => {
  const getIconChecked = useCallback(() => {
    console.log("TEST");
    switch (id) {
      case 22:
        return (
          <MdCheckCircle
            style={{ fill: "url(#multicolor-gradient)" }}
            size={28}
            className="text-th-primary-medium border-2 border-th-primary-medium rounded-full"
          />
        );
      case 26:
        return (
          <CgBoy
            className="text-th-primary-medium border-2 border-th-primary-medium rounded-full"
            size={28}
          />
        );
      case 27:
        return (
          <CgGirl
            className="text-th-primary-medium border-2 border-th-primary-medium rounded-full"
            size={28}
          />
        );
      case 28:
        return (
          <RiBearSmileLine
            className="text-th-primary-medium border-2 border-th-primary-medium rounded-full"
            size={28}
          />
        );
      default:
        return (
          <MdCheckCircle
            style={{ color: hex }}
            size={28}
            className="text-th-primary-medium border-2 border-th-primary-medium rounded-full"
          />
        );
    }
  }, [id, hex]);

  return getIconChecked;
};

export default useCheckedIcon;
