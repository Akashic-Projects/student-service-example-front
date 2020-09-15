import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Settings from "./components/Settings";
import Courses from "./components/Courses";
import Subjects from "./components/Subjects";
import Recoms from "./components/Recoms";
import Notifications from "./components/Notifications";

import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  BookOutlined,
  ExperimentOutlined,
  PaperClipOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

import { useHistory } from "react-router-dom";

const { Title } = Typography;

const { Content, Sider } = Layout;

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  console.log("From PrivateRoute");
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

const App = () => {
  const [showStudentBoard, setShowStudentBoard] = useState(true);

  const [currentUser, setCurrentUser] = useState(undefined);

  const history = useHistory();

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
    history.push("/login");
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            {showStudentBoard ? (
              <Menu.Item key="0" icon={<NotificationOutlined />}>
                <Link to={"/notifs"} className="nav-link">
                  Enrollment Notifs
                </Link>
              </Menu.Item>
            ) : null}
            {showStudentBoard ? (
              <Menu.Item key="1" icon={<BookOutlined />}>
                <Link to={"/courses"} className="nav-link">
                  My Courses
                </Link>
              </Menu.Item>
            ) : null}
            {showStudentBoard ? (
              <Menu.Item key="2" icon={<ExperimentOutlined />}>
                <Link to={"/subjects"} className="nav-link">
                  My Subjects
                </Link>
              </Menu.Item>
            ) : null}
            {showStudentBoard ? (
              <Menu.Item key="3" icon={<PaperClipOutlined />}>
                <Link to={"/recoms"} className="nav-link">
                  My Recomendations
                </Link>
              </Menu.Item>
            ) : null}
            {showStudentBoard ? (
              <Menu.Item key="4" icon={<UserOutlined />}>
                <Link to={"/settings"} className="nav-link">
                  Account Settings
                </Link>
              </Menu.Item>
            ) : null}
            {!showStudentBoard ? (
              <Menu.Item key="5" icon={<UserOutlined />}>
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </Menu.Item>
            ) : null}
            {!showStudentBoard ? (
              <Menu.Item key="6" icon={<UserOutlined />}>
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </Menu.Item>
            ) : null}
            {showStudentBoard ? (
              <Menu.Item key="7" icon={<UserOutlined />}>
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
                <PrivateRoute
                  component={Notifications}
                  isAuthenticated={AuthService.getCurrentUser()}
                  exact
                  path={["/", "/notifs"]}
                />
                <PrivateRoute
                  component={Courses}
                  isAuthenticated={AuthService.getCurrentUser()}
                  exact
                  path={["/courses"]}
                />
                <PrivateRoute
                  component={Subjects}
                  isAuthenticated={AuthService.getCurrentUser()}
                  exact
                  path="/subjects"
                />
                <PrivateRoute
                  component={Recoms}
                  isAuthenticated={AuthService.getCurrentUser()}
                  exact
                  path="/recoms"
                />
                <PrivateRoute
                  component={Settings}
                  isAuthenticated={AuthService.getCurrentUser()}
                  exact
                  path="/settings"
                />
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
