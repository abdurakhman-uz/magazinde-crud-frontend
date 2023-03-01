import { message } from "antd";

const Message = (type, messages) => {
  message.open({
    type: type,
    content: messages,
  });
};

export default Message;
