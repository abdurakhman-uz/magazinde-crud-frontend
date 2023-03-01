import {
  EditOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Modal } from "antd";
import { useContext } from "react";
import { MyContext } from "../../App";
import { Message, ModalForm } from "../";
import { AuthContext } from "../../Context/authContext";


const { REACT_APP_BECKEND } = process.env
const { Meta } = Card;
const { confirm } = Modal;

const BasicCard = (item) => {
  const { setEdited, show, setShow } = useContext(MyContext);
  const { token } = useContext(AuthContext)


  const showDeleteConfirm = (e) => {
    const dataId = e.target.dataset.id;
    console.log(e.target.dataset.id);

    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        fetch(process.env.REACT_APP_BECKEND + `/products/${dataId}`, {
          method: "DELETE",
          headers: {
            token: token
          }
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setEdited(true);
            Message("success", data.msg);
          })
          .catch((err) => {
            console.log(err);
            Message("error", err.msg);
          });

        console.log(`Deleted: ${dataId}`);
      },
      onCancel() {
        console.log(`ID: ${dataId}`);
      },
    });
  };

  const Finish = (values) => {
    fetch(REACT_APP_BECKEND + `/products/${show[1]}`, {
      method: "PUT",
      headers: {
        token: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEdited(true);
        Message("success", data.msg);
        setShow(false)
      })
      .catch((err) => {
        console.log(err);
        Message("error", err.msg);
      });
    console.log(values, show[1]);
  };

  const FinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Card
        style={{
          width: 300,
        }}
        cover={<img alt="productImage" src={REACT_APP_BECKEND + item.img}  height="200"/>}
        actions={[
          token ? (
            <EditOutlined key="edit" onClick={() => setShow([true, item.id])} />
          ) : (
            ""
          ),
          <ShareAltOutlined key="share" />,
          token ? (
            <DeleteOutlined
              key="delete"
              data-id={item.id}
              onClick={(e) => showDeleteConfirm(e)}
            />
          ) : (
            ""
          ),
        ]}
      >
        <Meta title={item.name} description={item.author} price={item.price} />
        <hr />
        {/* <br /> */}
        <Meta description={item.price} />
      </Card>

      <ModalForm
        title="Edit Product"
        onClose={() => setShow(false)}
        show={show[0]}
      >
        <Form
          className="modalForms"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={Finish}
          onFinishFailed={FinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                message: "Input required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="desc"
            rules={[
              {
                message: "Input required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                message: "Input required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className="modalButton" type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};
export default BasicCard;
