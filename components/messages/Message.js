import stylesGeneral from "@/styles/General.module.css";
import { MdWarning, MdError, MdThumbUp } from "react-icons/md";

const Message = ({ message }) => {
  const borderClass =
    message.type === "error"
      ? "border-th-error"
      : message.type === "success"
      ? "border-th-success"
      : "border-th-warning";

  const textClass =
    message.type === "error"
      ? "text-th-error"
      : message.type === "success"
      ? "text-th-success"
      : "text-th-warning";

  return (
    <div className={`${stylesGeneral.msg_container} ${borderClass}`}>
      <div className="pr-4">
        {message.type === "error" ? (
          <MdError size={25} className={textClass} />
        ) : message.type === "success" ? (
          <MdThumbUp size={25} className={textClass} />
        ) : (
          <MdWarning size={25} className={textClass} />
        )}
      </div>
      <div className={`${stylesGeneral.msg_text_container} ${borderClass}`}>
        {message.text}
      </div>
    </div>
  );
};

export default Message;
