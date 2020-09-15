import React, { useState, useEffect } from "react";

import { Table, Spin, Row, Col, Button, Typography } from "antd";
import { store } from "react-notifications-component";

import notif from "./Notif";
import UserNotifService from "./../services/userNotif.service";

const { Title } = Typography;

const Notifications = () => {
  const [userNotifs, setUserNotifs] = useState([]);

  const [userNotifsLoading, setUserNotifsLoading] = useState(false);

  const loadUserRecoms = () => {
    setUserNotifsLoading(true);
    UserNotifService.findAll().then(
      (response) => {
        setUserNotifs(
          response.data.data.map((e) => {
            return { ...e, key: e["id"] };
          })
        );
        setUserNotifsLoading(false);
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
    loadUserRecoms();
  }, []);

  const handleRecomAction = (userNotif_id, ignored) => {
    UserNotifService.update(userNotif_id, ignored).then(
      () => {
        store.addNotification(
          notif(
            "Success",
            "Notification entry is dismissed successfully.",
            "success"
          )
        );
        loadUserRecoms();
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

  const userRecomsColumns = [
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
      title: "Actions",
      dataIndex: "name",
      width: 600,
      render: (value, row) => (
        <Button
          type="danger"
          style={{ marginRight: "0.2em" }}
          onClick={() => handleRecomAction(row.id, true)}
        >
          X
        </Button>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col span={18}>
          <Spin spinning={userNotifsLoading}>
            <Title level={4}>
              You have less than 7 days to enroll into those courses
            </Title>
            <Table
              columns={userRecomsColumns}
              dataSource={userNotifs}
              pagination={{
                position: ["bottomCenter"],
                defaultPageSize: 6,
              }}
              showHeader={true}
            />
          </Spin>
        </Col>
      </Row>
    </>
  );
};

export default Notifications;
