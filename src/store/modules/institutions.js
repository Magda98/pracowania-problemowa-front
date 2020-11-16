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
  deleteInstitution({ commit }, data) {
    api.deleteInstitutions(response => {
      this.dispatch("toastMessage/alert", {
        message: "Placówka została usunięta",
        type: "info"
      });
      commit("deleteInstitution", data);
    }, data);
  },
  editInstitution({ dispatch }, data) {
    api.editInstitutions(response => {
      console.log(response);
      this.dispatch("toastMessage/alert", {
        message: "Dane placówki zostały zmienione",
        type: "success"
      });
      dispatch("getInstitutions");
    }, data);
  }
};
// mutations
const mutations = {
  getInstitutions(state, data) {
    state.institutionsList = data;
  },
  deleteInstitution(state, data) {
    let removeIndex = state.institutionsList
      .map(item => item.publicId)
      .indexOf(data);
    console.log(removeIndex);
    state.institutionsList.splice(removeIndex, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
