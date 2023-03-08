const Message = ({ message }) => {
  return (
    <div>
      {message.type} - {message.text}
    </div>
  );
};

export default Message;
