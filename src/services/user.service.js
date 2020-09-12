import axios from "axios";

import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api";

const changePassword = (old_password, new_password) => {
  const user = AuthService.getCurrentUser();
  return axios.post(
    API_URL + "/users/" + user.user.data.id,
    {
      old_password,
      new_password,
    },
    { headers: authHeader() }
  );
};

export default {
  changePassword,
};
