import useUncheckedIcon from "@/helpers/useUncheckedIcon.js";

const IconColor = ({ id, color, size }) => {
  const UncheckedIcon = useUncheckedIcon(id, color, size);
  return <>{UncheckedIcon()}</>;
};

export default IconColor;
