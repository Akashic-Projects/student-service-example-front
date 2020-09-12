import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const register = (email, password, name, age) => {
  return axios.post(API_URL + "users", {
    email,
    password,
    name,
    age,
  });
};

const login = (email, password) => {
  console.log({
    email,
    password,
  });
  return axios
    .post(API_URL + "auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (
        response.data &&
        response.data.data &&
        response.data.data.access_token
      ) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authenticate = () => {
  const user = getCurrentUser();
  if (!user || !user.user || !user.user.data) {
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
