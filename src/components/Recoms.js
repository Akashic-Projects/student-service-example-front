import React, { useState, useEffect } from "react";

import { Table, Spin, Row, Col, Button } from "antd";
import { store } from "react-notifications-component";

import notif from "./Notif";
import UserRecomService from "./../services/userRecom.service";
import UserCourseService from "./../services/userCourse.service";

const Recoms = () => {
  const [userRecoms, setUserRecoms] = useState([]);

  const [userRecomsLoading, setUserRecomsLoading] = useState(false);

  const loadUserRecoms = () => {
    setUserRecomsLoading(true);
    UserRecomService.findAll().then(
      (response) => {
        setUserRecoms(
          response.data.data.map((e) => {
            return { ...e, key: e["id"] };
          })
        );
        setUserRecomsLoading(false);
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

  const handleCreateUserCourse = (course_id) => {
    UserCourseService.create(course_id, 0, 0, false, false).then(
      () => {
        store.addNotification(
          notif("Success", "New course is added successfully.", "success")
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

  const handleRecomAction = (userRecom_id, ignored, accepted) => {
    UserRecomService.update(userRecom_id, ignored, accepted).then(
      () => {
        store.addNotification(
          notif(
            "Success",
            "Recommendation entry is updated successfully.",
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
      title: "Priority index [0-20]",
      dataIndex: "priority",
      width: 600,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.priority - b.priority,
      render: (value, row) => value.toFixed(2),
    },
    {
      title: "Recommended Course Name",
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
        <Row>
          <Col width="50%">
            <Button
              type="primary"
              onClick={() => {
                handleRecomAction(row.id, false, true);
                console.log("This is it:");
                console.log(row);
                handleCreateUserCourse(row.course.data.id);
              }}
            >
              Accept
            </Button>
          </Col>
          <Col width="50%">
            <Button
              type="danger"
              style={{ marginRight: "0.2em" }}
              onClick={() => handleRecomAction(row.id, true, false)}
            >
              Ignore
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col span={18}>
          <Spin spinning={userRecomsLoading}>
            <Table
              columns={userRecomsColumns}
              dataSource={userRecoms}
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

export default Recoms;
