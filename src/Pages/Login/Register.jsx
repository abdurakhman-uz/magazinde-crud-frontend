import { Button, Input, Form, Select } from "antd";
import {motion} from "framer-motion"
// import { useNavigate } from "react-router-dom";
import { Message } from "../../Components"
import "../../global.css"

const { Option } = Select;
const token = localStorage.getItem("token")

function Register() {
  // const navigate = useNavigate
  const Finish = (values) => {

    fetch(process.env.REACT_APP_BECKEND + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.code === 1){
          return Message("error", data.msg);
        } else {
          // navigate("/auth/login")
          return Message("success", data.msg);
        }
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
      opacity: 0
    },
    visible: {
      x: 0,
      y: 1,
      opacity: 1
    }
  }

  return (
    <>

      <motion.div 
        className="addUser"
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
            label="Username"
            name="username"
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input />
          </Form.Item>

            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                <Select
                    placeholder="Select gender"
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>

          <Form.Item
            label="Password"
            name="password"
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

export default Register;