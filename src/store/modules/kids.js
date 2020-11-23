import * as types from "../mutation-types";
import router from "@/router";
const querystring = require("query-string");
import api from "@/api";

// initial state
const state = {
  kidsList: []
};

// getters
const getters = {
  kidsList: state => state.kidsList
};

// actions
const actions = {
  getKids({ commit }) {
    api.getAllKids(response => {
      commit("getKids", response);
    });
  },
  getMyKids({ commit }) {
    api.getMyKids(response => {
      commit("getKids", response);
      console.log(response);
    });
  },
  addKid({ commit, dispatch }, data) {
    api.addKid(response => {
      this.dispatch("toastMessage/alert", {
        message: "Osoba została dodana",
        type: "success"
      });
      dispatch("getKids");
    }, data);
  },
  addMyKid({ commit, dispatch }, data) {
    api.addKid(response => {
      this.dispatch("toastMessage/alert", {
        message: "Osoba została dodana",
        type: "success"
      });
      dispatch("getMyKids");
    }, data);
  },
  editKid({ commit, dispatch }, data) {
    api.editKid(response => {
      this.dispatch("toastMessage/alert", {
        message: "Dane zostały zmienione",
        type: "success"
      });
      dispatch("getKids");
    }, data);
  },
  deleteKid({ commit, dispatch }, data) {
    api.deleteKid(response => {
      this.dispatch("toastMessage/alert", {
        message: "Osoba została usunięta",
        type: "info"
      });
      dispatch("getKids");
    }, data);
  },
  editMyKid({ commit, dispatch }, data) {
    api.editKid(response => {
      this.dispatch("toastMessage/alert", {
        message: "Dane zostały zmienione",
        type: "success"
      });
      dispatch("getMyKids");
    }, data);
  },
  deleteMyKid({ commit, dispatch }, data) {
    api.deleteKid(response => {
      this.dispatch("toastMessage/alert", {
        message: "Osoba została usunięta",
        type: "info"
      });
      dispatch("getMyKids");
    }, data);
  }
};
// mutations
const mutations = {
  getKids(state, data) {
    state.kidsList = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
