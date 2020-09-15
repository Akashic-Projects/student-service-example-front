import axios from "axios";

import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api";

const findAll = () => {
  const user = AuthService.getCurrentUser();
  return axios.get(
    API_URL +
      "/users/" +
      user.user.data.id +
      "/user-notifs?sortField=id&sortOrder=ASC",
    {
      headers: authHeader(),
    }
  );
};

const update = (userNotif_id, ignored) => {
  const user = AuthService.getCurrentUser();
  return axios.put(
    API_URL + "/users/" + user.user.data.id + "/user-notifs/" + userNotif_id,
    {
      ignored,
    },
    {
      headers: authHeader(),
    }
  );
};

export default {
  findAll,
  update,
};
