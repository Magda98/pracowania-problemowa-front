import * as types from "../mutation-types";
import router from "@/router";
const querystring = require("query-string");
import api from "@/api";

// initial state
const state = {
  id: "",
  logged_in: false,
  getToken: false,
  token: String,
  refToken: String,
  expires: String,
  userInfo: {}
};

// getters
const getters = {
  userId: state => state.id,
  noTokenProvided: state => state.noTokenProvided,
  getToken: state => {
    //data
    state.getToken;
  },
  userInfo: state => state.userInfo,
  userProfile: state => state.userInfo,
  loggedIn: state => state.logged_in,
  isExpired: state => new Date(state.expires) < new Date()
};

// actions
const actions = {
  login({ commit, state }, data) {
    api.login(response => {
      commit("saveToken", response);
      commit(types.GET_TOKEN, {});
      router.push({ path: "menu" });
      this.dispatch("user/getUserData");
      this.dispatch("toastMessage/alert", {
        message: "Zostałeś poprawnie zalogowany",
        type: "success"
      });
    }, data);
  },
  getUserData({ commit }) {
    api.getUserData(response => {
      commit("saveUserInfo", response);
    });
  },
  refreshToken({ state, commit }) {
    api.refreshToken(
      response => {
        commit("saveToken", response);
        commit(types.GET_TOKEN, {});
      },
      {
        token: state.token,
        ref: state.refToken,
        exp: state.expires
      }
    );
  },
  logout({ commit }) {
    commit(types.LOGOUT_USER);
    router.push({ path: "login" });
  },
  register({ commit, state }, data) {
    api.register(response => {
      router.push({ path: "login" });
      this.dispatch("toastMessage/alert", {
        message: "Zostałeś poprawnie zarejestrowany",
        type: "success"
      });
    }, data);
  }
};
// mutations
const mutations = {
  noToken(state) {
    state.noTokenProvided = true;
  },
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  saveToken(state, data) {
    state.logged_in = true;
    state.token = data.token;
    state.refToken = data.refresh;
    state.expires = data.expires;
  },
  [types.LOGIN_USER](state) {
    state.logged_in = true;
  },

  [types.LOGOUT_USER](state) {
    state.logged_in = false;
    state.token = "";
    state.refToken = "";
    state.expires = "";
  },
  [types.GET_TOKEN](state) {
    state.getToken = true;
  },
  [types.GET_TOKEN_AF](state) {
    state.getToken = false;
  },
  [types.SAVE_TOKEN](state, { token }) {
    state.token = token;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
