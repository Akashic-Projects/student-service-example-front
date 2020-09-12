import React from "react";

import { Form, Input, Button, Typography } from "antd";
import { store } from "react-notifications-component";

import notif from "./Notif";
import UserService from "./../services/user.service";

const { Title } = Typography;

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 7, span: 16 },
};

const handleFinish = (props, values) => {
  UserService.changePassword(values.old_password, values.new_password).then(
    () => {
      store.addNotification(
        notif("Success", "User password is updated..", "success")
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

const Settings = (props) => {
  return (
    <div>
      <Title level={5} style={{ textAlign: "left" }}>
        Reset password
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
          label="Old password"
          name="old_password"
          rules={[
            { required: true, message: "Please input your email" },
            { min: 6, message: "Password must be at least 6 characters long." },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New password"
          name="new_password"
          rules={[
            { required: true, message: "Please input your password" },
            { min: 6, message: "Password must be at least 6 characters long." },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Change password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;
