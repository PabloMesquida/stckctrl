import stylesGeneral from "@/styles/General.module.css";
import { MdWarning, MdError } from "react-icons/md";

const Message = ({ message }) => {
  const isError = message.type === "error";
  const borderClass = isError ? "border-th-error" : "border-th-warning";
  const textClass = isError ? "text-th-error" : "text-th-warning";

  return (
    <div className={`${stylesGeneral.msg_container} ${borderClass}`}>
      <div className="pr-4">
        {isError ? (
          <MdError size={25} className={textClass} />
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
