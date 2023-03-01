import { Button, Input, Form } from "antd";
import { motion } from "framer-motion";
import "../../global.css";
import { useState } from "react";
import { Message } from "../../Components";

const { REACT_APP_BECKEND } = process.env;
const token = localStorage.getItem("token");

function AddProduct() {
  const [img, setImg] = useState("");

  const Finish = (values) => {
    const { name, author, price } = values;

    const data = {
      name,
      author,
      price,
      img,
    };

    fetch(REACT_APP_BECKEND + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        Message("success", data.msg);
        console.log(data);
      })
      .catch((err) => {
        Message("error", err.msg);
        console.log(err);
      });
  };
  const FinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const animation = {
    hidden: {
      x: 0,
      y: 50,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 1,
      opacity: 1,
    },
  };

  const uploadFile = async (e) => {
    const files = e.target.files[0];
    if (files) {
      const data = new FormData();
      data.append("file", files);

      let res = await fetch(REACT_APP_BECKEND + "/upload", {
        method: "POST",
        headers: { token: token },
        body: data,
      });
      const data2 = await res.json();
      setImg(data2.img);
      console.log(await data2);
    }
  };

  return (
    <>
      <motion.div
        className="addProduct"
        initial="hidden"
        whileInView="visible"
        variants={animation}
      >
        <Form
          className="loginForm"
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
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Author"
            name="author"
            rules={[
              {
                required: true,
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
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <input
              type="file"
              className="upload"
              name="file"
              onChange={(e) => uploadFile(e)}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className="Btn" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </>
  );
}

export default AddProduct;
