import React, { useState, useEffect } from "react";

import {
  Table,
  Spin,
  Typography,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
} from "antd";
import { store } from "react-notifications-component";

import notif from "./Notif";
import CourseService from "./../services/course.service";

const { Text } = Typography;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

const Courses = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCourses = () => {
    setLoading(true);
    CourseService.findAll().then(
      (response) => {
        setCourses(
          response.data.data.map((e) => {
            return { ...e, key: e["id"] };
          })
        );
        setLoading(false);
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

  useEffect(() => {
    loadCourses();
  }, []);

  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      width: 600,
      render: (value, row) => row.course.data.name,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      width: 200,
      sorter: {
        compare: (a, b) => a.rating - b.rating,
        multiple: 1,
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    columnWidth: 27,
    type: "radio",
  };

  const handleFinish = (props, values) => {
    // AuthService.register(
    //   values.email,
    //   values.password,
    //   values.name,
    //   values.age
    // ).then(
    //   () => {
    //     props.history.push("/login");
    //     window.location.reload();
    //     store.addNotification(
    //       notif("Success", "User is successfully registered.", "success")
    //     );
    //   },
    //   (error) => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //     store.addNotification(notif("Error", resMessage, "danger"));
    //   }
    // );
  };

  return (
    <Row>
      <Col span={10}>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={courses}
            pagination={{
              position: ["bottomCenter"],
              defaultPageSize: 6,
            }}
            showHeader={true}
            onRow={(record) => ({
              onClick: () => {
                setSelectedRowKeys([record.key]);
                console.log(record);
              },
            })}
            rowSelection={rowSelection}
          />
        </Spin>
      </Col>
      <Col span={14} style={{ paddingLeft: "0.5em" }}>
        <Card
          title="create / edit / delete course entry"
          bordered={false}
          style={{ width: "100%" }}
        >
          <Form
            style={{ width: "30em" }}
            {...layout}
            name="basic"
            onFinish={(v) => {
              handleFinish(v);
            }}
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Please input your ful name" },
                { min: 5, message: "Name must be at least 5 characters long." },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: "Please input your age" }]}
            >
              <InputNumber min={18} max={100} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
                {
                  min: 5,
                  message: "Email must be at least 5 characters long.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long.",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Execute actionn
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Courses;
