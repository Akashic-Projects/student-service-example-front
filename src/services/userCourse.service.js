import axios from "axios";

import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api";

const create = (course_id, grade, rating, enrolled) => {
  const user = AuthService.getCurrentUser();
  console.log(authHeader());
  return axios.post(
    API_URL + "/users/" + user.user.data.id + "/user-courses",
    {
      course_id,
      grade,
      rating,
      enrolled,
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
      "/user-courses?sortField=id&sortOrder=ASC",
    {
      headers: authHeader(),
    }
  );
};

const update = (usercCourse_id, grade, rating, enrolled) => {
  const user = AuthService.getCurrentUser();
  return axios.put(
    API_URL + "/users/" + user.user.data.id + "/user-courses/" + usercCourse_id,
    {
      grade,
      rating,
      enrolled,
    },
    {
      headers: authHeader(),
    }
  );
};

const deletee = (usercCourse_id) => {
  const user = AuthService.getCurrentUser();
  return axios.delete(
    API_URL + "/users/" + user.user.data.id + "/user-courses/" + usercCourse_id,
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
