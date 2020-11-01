import * as types from "../mutation-types";
import router from "@/router";
import axios from "axios";
const querystring = require("query-string");
import api from "@/api";

// initial state
const state = {
  userList: [],
  Permissions: {}
};

// getters
const getters = {
  userList: state => state.userList
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
  }
};
// mutations
const mutations = {
  permissions(state, data) {
    state.Permissions = data;
  },
  users(state, data) {
    console.log(data);
    state.userList = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
