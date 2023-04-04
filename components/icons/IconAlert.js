import { MdWarning, MdError, MdThumbUp } from "react-icons/md";

const IconAlert = ({ message, size }) => {
  const textClass =
    message.type === "error"
      ? "text-th-error"
      : message.type === "success"
      ? "text-th-success"
      : "text-th-warning";
  return (
    <>
      {message.type === "error" ? (
        <MdError size={size} className={textClass} />
      ) : message.type === "success" ? (
        <MdThumbUp size={size} className={textClass} />
      ) : (
        <MdWarning size={size} className={textClass} />
      )}
    </>
  );
};

export default IconAlert;
