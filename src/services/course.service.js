import axios from "axios";

import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api";

const findAll = () => {
  const user = AuthService.getCurrentUser();
  return axios.get(API_URL + "/users/" + user.user.data.id + "/user-courses", {
    headers: authHeader(),
  });
};

export default {
  findAll,
};
