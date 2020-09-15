import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

const findAll = () => {
  return axios.get(API_URL + "/courses?sortField=id&sortOrder=ASC", {
    headers: authHeader(),
  });
};

export default {
  findAll,
};
