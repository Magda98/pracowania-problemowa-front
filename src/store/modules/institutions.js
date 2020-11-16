import * as types from "../mutation-types";
import router from "@/router";
const querystring = require("query-string");
import api from "@/api";

// initial state
const state = {
  institutionsList: []
};

// getters
const getters = {
  institutionsList: state => state.institutionsList
};

// actions
const actions = {
  getInstitutions({ commit, state }, data) {
    api.getInstitutions(response => {
      commit("getInstitutions", response);
      console.log(response);
    });
  },
  addInstitutions({ dispatch }, data) {
    api.addInstitutions(response => {
      this.dispatch("toastMessage/alert", {
        message: "Placówka została dodana",
        type: "success"
      });
      dispatch("getInstitutions");
      console.log(response);
    }, data);
  },
  deleteInstitution({ dispatch }, data) {
    api.deleteInstitutions(response => {
      this.dispatch("toastMessage/alert", {
        message: "Placówka została usunięta",
        type: "alert"
      });
      dispatch("getInstitutions");
      console.log(response);
    }, data);
  }
};
// mutations
const mutations = {
  getInstitutions(state, data) {
    state.institutionsList = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
