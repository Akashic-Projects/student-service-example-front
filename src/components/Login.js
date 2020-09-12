import React from "react";

import { Form, Input, Button, Typography } from "antd";
import { store } from "react-notifications-component";

import notif from "./Notif";
import AuthService from "./../services/auth.service";

const { Title } = Typography;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

const handleFinish = (props, values) => {
  AuthService.login(values.email, values.password).then(
    () => {
      props.history.push("/");
      window.location.reload();
      store.addNotification(
        notif("Success", "User is successfully logged in.", "success")
      );
    },
    (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      store.addNotification(notif("Error", resMessage, "danger"));
    }
  );
};

const Login = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Title level={5} style={{ textAlign: "left" }}>
        Login form
      </Title>
      <Form
        style={{ width: "30em" }}
        {...layout}
        name="basic"
        onFinish={(v) => {
          handleFinish(props, v);
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email" },
            { min: 5, message: "Email must be at least 5 characters long." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password" },
            { min: 6, message: "Password must be at least 6 characters long." },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
