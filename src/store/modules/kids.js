import * as types from "../mutation-types";
import router from "@/router";
const querystring = require("query-string");
import api from "@/api";

/**
 * @module store/modules/kids
 * @desc Magazyn do przechowywania informacji o podopiecznych
 */

/** obiekt przechowujący aktualne stany danych zmiennych pobranych z API
 *  @name kids/state
 * @type {Object}
 * @property {Array} kidsList- tablica przechowująca listę obiektów o z informacjami o danych podopiecznych pobranych z API
 */
const state = {
  kidsList: [],
  kidsInstitution: []
};

/** obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state
 *  @name kids/getters
 * @type {Object}
 * @getter kidsList - funkcja zwracająca listę podopiecznych
 */
const getters = {
  kidsList: state => state.kidsList,
  kidsInstitution: state => state.kidsInstitution
};

/** obiekt posiadający funkcje, które wywołują funkcje pobierające dane z API, a anstępnie zapisują te dane poprzez mutacje do obiektów w state
 *  @name kids/actions
 * @desc
 *   getKids - funkcja pobiera listę podopiecznych z API - administartor <br/>
 *   getMyKids - funkcja pobiera listę podopiecznych z API - rodzic  <br/>
 *   addKid - funkcja dodaje podopiecznego - administartor  <br/>
 *   addMyKid - funkcja dodaje podopiecznego - rodzic  <br/>
 *   editKid - funkcja edytuje podopiecznego - administartor  <br/>
 *   editMyKid - funkcja edytuje podopiecznego - rodzic  <br/>
 *   deleteKid - funkcja usuwa podopiecznego - administartor  <br/>
 *   deleteMyKid - funkcja usuwa podopiecznego - rodzic  <br/>
 */
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
  getInstitutionKids({ commit }, data) {
    api.getInstitutionKids(response => {
      commit("getKidsInstitution", response);
      console.log(response);
    }, data);
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
/** obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state
 * @name kids/mutations
 * @type {object}
 * @mutator  getKids - funkcja zapisujaca listę podopiecznych w obiekcie state.kidsList
 */
const mutations = {
  getKids(state, data) {
    state.kidsList = data;
  },
  getKidsInstitution(state, data) {
    state.kidsInstitution = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
