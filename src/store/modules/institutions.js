import * as types from "../mutation-types";
import router from "@/router";
const querystring = require("query-string");
import api from "@/api";

/**
 * @module store/modules/institutions
 * @desc Magazyn do przechowywania informacji dotyczących instytucji
 */

/** obiekt przechowujący aktualne stany danych zmiennych pobranych z API
 *  @name institutions/state
 * @type {object}
 * @property {Array} institutionsList- tablica przechowująca listę obiektów instytucji pobranych z API
 */
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
    });
  },
  addInstitutions({ dispatch }, data) {
    api.addInstitutions(response => {
      this.dispatch("toastMessage/alert", {
        message: "Placówka została dodana",
        type: "success"
      });
      dispatch("getInstitutions");
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
