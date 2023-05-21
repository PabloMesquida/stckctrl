import stylesGeneral from "@/styles/General.module.css";
import IconAlert from "@/components/icons/IconAlert.js";

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
        <IconAlert message={message} size={25} />
      </div>
      <div className={`${stylesGeneral.msg_text_container} ${borderClass}`}>
        {message.text}
      </div>
    </div>
  );
};

export default Message;
