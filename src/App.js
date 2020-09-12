import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Settings from "./components/Settings";
import Notifs from "./components/Notifs";
import Courses from "./components/Courses";
import Subjects from "./components/Subjects";
import Recoms from "./components/Recoms";

import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  BookOutlined,
  ExperimentOutlined,
  NotificationOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { render } from "@testing-library/react";
import { Typography } from "antd";

const { Title } = Typography;

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [showStudentBoard, setShowStudentBoard] = useState(true);

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log(user);
    if (user) {
      setCurrentUser(user);
      console.log(user.user.data.authority === "student");
      setShowStudentBoard(user.user.data.authority === "student");
    } else {
      setShowStudentBoard(false);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" />
          <Title
            style={{ color: "white", textAlign: "center", marginTop: "0.2em" }}
            level={2}
          >
            Student Service
          </Title>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {showStudentBoard ? (
              <Menu.Item key="1" icon={<NotificationOutlined />}>
                <Link to={"/notifs"} className="nav-link">
                  Notifications
                </Link>
              </Menu.Item>
            ) : null}
            {showStudentBoard ? (
              <Menu.Item key="2" icon={<BookOutlined />}>
                <Link to={"/courses"} className="nav-link">
                  My Courses
                </Link>
              </Menu.Item>
            ) : null}
            {showStudentBoard ? (
              <Menu.Item key="3" icon={<ExperimentOutlined />}>
                <Link to={"/subjects"} className="nav-link">
                  My Subjects
                </Link>
              </Menu.Item>
            ) : null}
            {showStudentBoard ? (
              <Menu.Item key="4" icon={<PaperClipOutlined />}>
                <Link to={"/recoms"} className="nav-link">
                  My Recomendations
                </Link>
              </Menu.Item>
            ) : null}
            {showStudentBoard ? (
              <Menu.Item key="5" icon={<UserOutlined />}>
                <Link to={"/settings"} className="nav-link">
                  Account Settings
                </Link>
              </Menu.Item>
            ) : null}
            {!showStudentBoard ? (
              <Menu.Item key="6" icon={<UserOutlined />}>
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </Menu.Item>
            ) : null}
            {!showStudentBoard ? (
              <Menu.Item key="7" icon={<UserOutlined />}>
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </Menu.Item>
            ) : null}
            {showStudentBoard ? (
              <Menu.Item key="8" icon={<UserOutlined />}>
                <Button type="link" onClick={logOut}>
                  Log Out
                </Button>
              </Menu.Item>
            ) : null}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div>
              <Switch>
                <Route exact path={["/", "/notifs"]} component={Notifs} />
                <Route exact path="/courses" component={Courses} />
                <Route exact path="/subjects" component={Subjects} />
                <Route exact path="/recoms" component={Recoms} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
