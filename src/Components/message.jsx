import { message } from "antd";



function Message(params, mess) {

    console.log(params, mess);

    const [messageApi, contextHolder] = message.useMessage();

    if (params === "success") {
        const success = (message) => {
            messageApi.open({
              type: "success",
              content: message,
            });
        };

        success(mess)
    }
    
    if (params === "error") {
        const error = (message) => {
            messageApi.open({
              type: 'error',
              content: message,
            });
        };

        error(message)
    }

    return (
        <>
            {contextHolder}
        </>
    )
}

export default Message