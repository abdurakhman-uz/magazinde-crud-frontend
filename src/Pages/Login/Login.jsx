import { Button, Form, Input } from "antd";
import {motion} from "framer-motion"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "../../Components";
import { AuthContext } from "../../Context/authContext";
import "../../global.css";

const { REACT_APP_BECKEND } = process.env

const Login = () => {
  const navigate = useNavigate()
  const {setToken} = useContext(AuthContext)
  const Finish = (values) => {
    console.log(values);
    fetch(REACT_APP_BECKEND + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token)
          Message("success", data.msg)
          navigate("/")
          return
        }
        Message("error", data.msg)
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const animation = {
    hidden: {
      x: 0,
      y: 100,
      opacity: 0
    },
    visible: {
      x: 0,
      y: -1,
      opacity: 1
    }
  }

  return (
    <>
      <motion.div
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className="modalButton" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </>
  );
};
export default Login;
