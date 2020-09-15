import React, { useState, useEffect } from "react";

import {
  Table,
  Spin,
  Typography,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputNumber,
  Modal,
  Radio,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { store } from "react-notifications-component";

import notif from "./Notif";
import UserCourseService from "./../services/userCourse.service";
import CourseService from "./../services/course.service";

const { Title } = Typography;

const Courses = () => {
  const [userCoursesSelectedRowKeys, setUserCoursesSelectedRowKeys] = useState(
    []
  );
  const [coursesSelectedRowKeys, setCoursesSelectedRowKeys] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

  const [coursesLoading, setCoursesLoading] = useState(false);
  const [userCoursesLoading, setUserCoursesLoading] = useState(false);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const loadCourses = () => {
    setCoursesLoading(true);
    CourseService.findAll().then(
      (response) => {
        setCourses(
          response.data.data.map((e) => {
            return { ...e, key: e["id"] };
          })
        );
        setCoursesLoading(false);
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

  const loadUserCourses = () => {
    setUserCoursesLoading(true);
    UserCourseService.findAll().then(
      (response) => {
        setUserCourses(
          response.data.data.map((e) => {
            return { ...e, key: e["id"] };
          })
        );
        setUserCoursesLoading(false);
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
    loadUserCourses();
    createForm.setFieldsValue({
      grade: 5,
      rating: 1,
      enrolled: false,
    });
  }, []);

  const handleEditUserCourse = (userCourse) => {
    setShowEditModal(true);
    const grade = userCourse.grade === 0 ? null : userCourse.grade;
    const rating = userCourse.rating === 0 ? null : userCourse.rating;
    editForm.setFieldsValue({
      grade: grade,
      rating: rating,
      enrolled: userCourse.enrolled,
    });
  };

  const handleDeleteUserCourse = (userCourse) => {
    UserCourseService.deletee(userCourse.id).then(
      (response) => {
        loadUserCourses();
        store.addNotification(
          notif(
            "Success",
            "Course successfully removed from your list.",
            "success"
          )
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

  const userCoursesColumns = [
    {
      title: "Course Name",
      dataIndex: "name",
      width: 600,
      render: (value, row) => row.course.data.name,
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      width: 200,
      render: (value, row) => row.course.data.start_date,
    },
    {
      title: "End date",
      dataIndex: "end_date",
      width: 200,
      render: (value, row) => row.course.data.end_date,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      width: 200,
      sorter: {
        compare: (a, b) => a.grade - b.grade,
        multiple: 1,
      },
      render: (value, row) => (value === 0 ? "" : value),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      width: 200,
      sorter: {
        compare: (a, b) => a.rating - b.rating,
        multiple: 1,
      },
      render: (value, row) => (value === 0 ? "" : value),
    },
    {
      title: "Enrolled?",
      dataIndex: "enrolled",
      width: 200,
      render: (value, row) => (row.enrolled ? "YES" : "NO"),
    },
    {
      title: "Actions",
      dataIndex: "enrolled",
      width: 600,
      render: (value, row) => (
        <Row>
          <Col width="50%">
            <Button
              type="primary"
              icon={<EditOutlined />}
              style={{ marginRight: "0.2em" }}
              onClick={() => handleEditUserCourse(row)}
            />
          </Col>
          <Col width="50%">
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUserCourse(row)}
            />
          </Col>
        </Row>
      ),
    },
  ];

  const coursesColumns = [
    {
      title: "Course Name",
      dataIndex: "name",
      width: 600,
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      width: 200,
    },
    {
      title: "End date",
      dataIndex: "end_date",
      width: 200,
    },
  ];

  const userCoursesRowSelection = {
    userCoursesSelectedRowKeys,
    columnWidth: 27,
    type: "radio",
    onSelect: (record) => {
      setUserCoursesSelectedRowKeys([record.key]);
    },
  };

  const coursesRowSelection = {
    coursesSelectedRowKeys,
    columnWidth: 27,
    type: "radio",
    onSelect: (record) => {
      setCoursesSelectedRowKeys([record.key]);
    },
  };

  const handleFinishCreate = (values) => {
    if (coursesSelectedRowKeys.length === 0) {
      store.addNotification(
        notif("Error", "Course is not selected.", "danger")
      );
      return;
    }
    UserCourseService.create(
      coursesSelectedRowKeys[0],
      values.grade,
      values.rating,
      values.enrolled
    ).then(
      () => {
        store.addNotification(
          notif("Success", "New course is added successfully.", "success")
        );
        loadUserCourses();
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

  const handleFinishEdit = (values) => {
    if (userCoursesSelectedRowKeys.length === 0) {
      store.addNotification(
        notif("Error", "Course is not selected.", "danger")
      );
      return;
    }
    const grade = values.grade === null ? 0 : values.grade;
    const rating = values.rating === null ? 0 : values.rating;
    UserCourseService.update(
      userCoursesSelectedRowKeys[0],
      grade,
      rating,
      values.enrolled
    ).then(
      () => {
        store.addNotification(
          notif("Success", "Course entry is updated successfully.", "success")
        );
        loadUserCourses();
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

  return (
    <>
      <Row>
        <Col span={24}>
          <Spin spinning={userCoursesLoading}>
            <Table
              columns={userCoursesColumns}
              dataSource={userCourses}
              pagination={{
                position: ["bottomCenter"],
                defaultPageSize: 6,
              }}
              showHeader={true}
              onRow={(record) => ({
                onClick: () => {
                  setUserCoursesSelectedRowKeys([record.key]);
                },
              })}
              rowSelection={userCoursesRowSelection}
            />
          </Spin>
          <Button
            type="primary"
            onClick={() => {
              setShowCreateModal(true);
              loadCourses();
            }}
          >
            Create new entry
          </Button>
        </Col>
      </Row>
      <Modal
        title="Add new course you attend"
        visible={showCreateModal}
        width={"160vh"}
        centered
        footer={null}
        onCancel={() => setShowCreateModal(false)}
      >
        <Row>
          <Col span={15}>
            <Card bordered={true} style={{ width: "100%" }}>
              <Title level={4}>Select course</Title>
              <Spin spinning={coursesLoading}>
                <Table
                  columns={coursesColumns}
                  dataSource={courses}
                  pagination={{
                    position: ["bottomCenter"],
                    defaultPageSize: 6,
                  }}
                  showHeader={true}
                  onRow={(record) => ({
                    onClick: () => {},
                  })}
                  rowSelection={coursesRowSelection}
                  bordered
                />
              </Spin>
            </Card>
          </Col>
          <Col span={8} style={{ marginLeft: "1em" }}>
            <Card bordered={true} style={{ width: "100%" }}>
              <Form
                form={createForm}
                layout="vertical"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 24 }}
                name="basic"
                onFinish={(v) => {
                  handleFinishCreate(v);
                }}
                width={"100%"}
              >
                <Form.Item
                  label="Grade [6-10]"
                  name="grade"
                  rules={[
                    { required: true, message: "Please input your grade." },
                  ]}
                >
                  <InputNumber min={6} max={10} />
                </Form.Item>
                <Form.Item
                  label="Rating [1-10]"
                  name="rating"
                  rules={[
                    { required: true, message: "Please input your rating." },
                  ]}
                >
                  <InputNumber min={1} max={10} />
                </Form.Item>

                <Form.Item label="Enrolled?" name="enrolled">
                  <Radio.Group>
                    <Radio value={true}>YES</Radio>
                    <Radio value={false}>NO</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add course
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Modal>
      <Modal
        title="Edit selected course entry"
        visible={showEditModal}
        width={"70vh"}
        centered
        footer={null}
        onCancel={() => setShowEditModal(false)}
      >
        <Card bordered={true} style={{ width: "100%" }}>
          <Form
            form={editForm}
            layout="vertical"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            name="basic"
            onFinish={(v) => {
              handleFinishEdit(v);
            }}
            width={"100%"}
          >
            <Form.Item label="Grade [6-10]" name="grade">
              <InputNumber min={6} max={10} />
            </Form.Item>
            <Form.Item label="Rating [1-10]" name="rating">
              <InputNumber min={1} max={10} />
            </Form.Item>

            <Form.Item label="Enrolled?" name="enrolled">
              <Radio.Group>
                <Radio value={true}>YES</Radio>
                <Radio value={false}>NO</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default Courses;
