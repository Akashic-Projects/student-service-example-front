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
import UserSubjectService from "./../services/userSubject.service";
import SubjectService from "./../services/subject.service";

const { Title } = Typography;

const Subjects = () => {
  const [
    userSubjectsSelectedRowKeys,
    setUserSubjectsSelectedRowKeys,
  ] = useState([]);
  const [subjectsSelectedRowKeys, setSubjectsSelectedRowKeys] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [userSubjects, setUserSubjects] = useState([]);

  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [userSubjectsLoading, setUserSubjectsLoading] = useState(false);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const loadSubjects = () => {
    setSubjectsLoading(true);
    SubjectService.findAll().then(
      (response) => {
        setSubjects(
          response.data.data.map((e) => {
            return { ...e, key: e["id"] };
          })
        );
        setSubjectsLoading(false);
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

  const loadUserSubjects = () => {
    setUserSubjectsLoading(true);
    UserSubjectService.findAll().then(
      (response) => {
        setUserSubjects(
          response.data.data.map((e) => {
            return { ...e, key: e["id"] };
          })
        );
        setUserSubjectsLoading(false);
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
    loadUserSubjects();
    createForm.setFieldsValue({
      rating: 1,
    });
  }, []);

  const handleEditUserSubject = (userSubject) => {
    setShowEditModal(true);
    editForm.setFieldsValue({
      rating: userSubject.rating,
    });
  };

  const handleDeleteUserSubject = (userSubject) => {
    UserSubjectService.deletee(userSubject.id).then(
      (response) => {
        loadUserSubjects();
        store.addNotification(
          notif(
            "Success",
            "Subject successfully removed from your list.",
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

  const userSubjectsColumns = [
    {
      title: "Subject Name",
      dataIndex: "name",
      width: 600,
      render: (value, row) => row.subject.data.name,
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
    {
      title: "Actions",
      dataIndex: "rating",
      width: 600,
      render: (value, row) => (
        <Row>
          <Col width="50%">
            <Button
              type="primary"
              icon={<EditOutlined />}
              style={{ marginRight: "0.2em" }}
              onClick={() => handleEditUserSubject(row)}
            />
          </Col>
          <Col width="50%">
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUserSubject(row)}
            />
          </Col>
        </Row>
      ),
    },
  ];

  const subjectsColumns = [
    {
      title: "Subject Name",
      dataIndex: "name",
      width: 600,
    },
  ];

  const userSubjectsRowSelection = {
    userSubjectsSelectedRowKeys,
    columnWidth: 27,
    type: "radio",
    onSelect: (record) => {
      setUserSubjectsSelectedRowKeys([record.key]);
    },
  };

  const subjectsRowSelection = {
    subjectsSelectedRowKeys,
    columnWidth: 27,
    type: "radio",
    onSelect: (record) => {
      setSubjectsSelectedRowKeys([record.key]);
    },
  };

  const handleFinishCreate = (values) => {
    if (subjectsSelectedRowKeys.length === 0) {
      store.addNotification(
        notif("Error", "Subject is not selected.", "danger")
      );
      return;
    }
    UserSubjectService.create(subjectsSelectedRowKeys[0], values.rating).then(
      () => {
        store.addNotification(
          notif("Success", "New subject is added successfully.", "success")
        );
        loadUserSubjects();
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
    if (userSubjectsSelectedRowKeys.length === 0) {
      store.addNotification(
        notif("Error", "Subject is not selected.", "danger")
      );
      return;
    }
    UserSubjectService.update(
      userSubjectsSelectedRowKeys[0],
      values.rating
    ).then(
      () => {
        store.addNotification(
          notif("Success", "Subject entry is updated successfully.", "success")
        );
        loadUserSubjects();
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
        <Col span={14}>
          <Spin spinning={userSubjectsLoading}>
            <Table
              columns={userSubjectsColumns}
              dataSource={userSubjects}
              pagination={{
                position: ["bottomCenter"],
                defaultPageSize: 6,
              }}
              showHeader={true}
              onRow={(record) => ({
                onClick: () => {
                  setUserSubjectsSelectedRowKeys([record.key]);
                },
              })}
              rowSelection={userSubjectsRowSelection}
            />
          </Spin>
          <Button
            type="primary"
            onClick={() => {
              setShowCreateModal(true);
              loadSubjects();
            }}
          >
            Create new entry
          </Button>
        </Col>
      </Row>
      <Modal
        title="Add new subject you like"
        visible={showCreateModal}
        width={"160vh"}
        centered
        footer={null}
        onCancel={() => setShowCreateModal(false)}
      >
        <Row>
          <Col span={15}>
            <Card bordered={true} style={{ width: "100%" }}>
              <Title level={4}>Select subject</Title>
              <Spin spinning={subjectsLoading}>
                <Table
                  columns={subjectsColumns}
                  dataSource={subjects}
                  pagination={{
                    position: ["bottomCenter"],
                    defaultPageSize: 6,
                  }}
                  showHeader={true}
                  onRow={(record) => ({
                    onClick: () => {},
                  })}
                  rowSelection={subjectsRowSelection}
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
                  label="Rating [1-10]"
                  name="rating"
                  rules={[
                    { required: true, message: "Please input your rating." },
                  ]}
                >
                  <InputNumber min={1} max={10} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add subject
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Modal>
      <Modal
        title="Edit selected subject entry"
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
            <Form.Item
              label="Rating [1-10]"
              name="rating"
              rules={[{ required: true, message: "Please input your rating." }]}
            >
              <InputNumber min={1} max={10} />
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

export default Subjects;
