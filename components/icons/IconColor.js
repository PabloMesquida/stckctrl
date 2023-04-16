import useUncheckedIcon from "@/helpers/useUncheckedIcon.js";
import IconMulticolor from "./IconMulticolor.js";

const IconColor = ({ id, color, size }) => {
  const UncheckedIcon = useUncheckedIcon(id, color, size);
  return (
    <>
      <IconMulticolor />
      <>{UncheckedIcon()}</>
    </>
  );
};

export default IconColor;
