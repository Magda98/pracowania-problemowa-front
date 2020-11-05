import * as types from "../mutation-types";
import router from "@/router";
import axios from "axios";
const querystring = require("query-string");
import api from "@/api";

// initial state
const state = {
  userList: [],
  permissions: {},
  currentUserPermissions: {}
};

// getters
const getters = {
  userList: state => state.userList,
  currentUserPermissions: state => state.currentUserPermissions,
  permissions: state => state.permissions
};

// actions
const actions = {
  getPermissions({ commit }) {
    api.getPermissions(response => {
      commit("permissions", response);
    });
  },
  getUsers({ commit }, data) {
    api.getUsers(response => {
      commit("users", response);
    }, data);
  },
  getUserPermissions({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.getUserPermissions(
        response => {
          commit("userPermissions", response);
          resolve(response);
        },
        { id: data }
      );
    });
  },
  setUserPermissions({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.setUserPermissions(response => {
        this.dispatch("toastMessage/alert", {
          message: "Uprawnienia zostały zmienione",
          type: "success"
        });
        resolve();
      }, data);
    });
  }
};
// mutations
const mutations = {
  permissions(state, data) {
    state.permissions = data;
  },
  users(state, data) {
    state.userList = data;
  },
  userPermissions(state, data) {
    state.currentUserPermissions = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
