import axios from "axios";

import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api";

const create = (subject_id, rating) => {
  const user = AuthService.getCurrentUser();
  console.log(authHeader());
  return axios.post(
    API_URL + "/users/" + user.user.data.id + "/user-subjects",
    {
      subject_id,
      rating,
    },
    {
      headers: authHeader(),
    }
  );
};

const findAll = () => {
  const user = AuthService.getCurrentUser();
  return axios.get(
    API_URL +
      "/users/" +
      user.user.data.id +
      "/user-subjects?sortField=id&sortOrder=ASC",
    {
      headers: authHeader(),
    }
  );
};

const update = (usercSubject_id, rating) => {
  const user = AuthService.getCurrentUser();
  return axios.put(
    API_URL +
      "/users/" +
      user.user.data.id +
      "/user-subjects/" +
      usercSubject_id,
    {
      rating,
    },
    {
      headers: authHeader(),
    }
  );
};

const deletee = (usercSubject_id) => {
  const user = AuthService.getCurrentUser();
  return axios.delete(
    API_URL +
      "/users/" +
      user.user.data.id +
      "/user-subjects/" +
      usercSubject_id,
    {
      headers: authHeader(),
    }
  );
};

export default {
  create,
  findAll,
  update,
  deletee,
};
