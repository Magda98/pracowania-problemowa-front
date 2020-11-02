import _ from "lodash";
import router from "@/router";
import api from "@/axios/api.js";

// axios.defaults.baseURL = "https://fitkidcateringapp.azurewebsites.net";
// axios.defaults.headers.post["Content-Type"] = "application/json-patch+json";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default {
  login(cb, data) {
    api
      .post(`/api/user/authenticate`, {
        Username: data.username,
        Password: data.password
      })
      .then(response => {
        console.log(response.data.status);
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  getUserData(cb) {
    api
      .get(`/api/user`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  register(cb, data) {
    api
      .post(`/api/user`, {
        UserName: data.username,
        Password: data.password,
        Email: data.email,
        FirstName: data.firstname,
        LastName: data.lastname
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  refreshToken(cb, data) {
    api
      .get(`/api/user/authenticate/refresh`)
      .then(response => {
        cb(response.data);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      })
      .catch(e => console.log(e));
  },
  getUserPermissions(cb, data) {
    api
      .get(`/api/admin/permissions/inspect/${data.id}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  setUserPermissions(cb, data) {
    console.log(data);
    api
      .post(`/api/admin/permissions/inspect/${data.id}`, [
        {
          key: data.key,
          value: {
            AdminAccess: data.AdminAccess === true ? "Allow" : "Deny",
            UserAccess: data.UserAccess === true ? "Allow" : "Deny"
          }
        }
      ])
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  getUsers(cb, data) {
    api
      .get(`api/admin/users`, {
        params: {
          limit: 0,
          UserName: data.UserName,
          Email: data.Email,
          Name: data.LastName
        }
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  },
  getPermissions(cb) {
    api
      .get(`/api/admin/permissions`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
