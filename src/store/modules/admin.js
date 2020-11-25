import * as types from "../mutation-types";
import router from "@/router";
import axios from "axios";
const querystring = require("query-string");
import api from "@/api";

/**
 * @module store/modules/admin
 * @desc Magazyn do przechowywania informacji do których dostęp ma administartor
 */

/** obiekt przechowujący aktualne stany danych zmiennych pobranych z API
 *  @name admin/state
 * @type {Object}
 * @property {Array} userList - tablica przechowująca listę obiektów użytkowników pobranych z API
 * @property {Object} permissions - obiekt zawierający informacje o dostępnych uprawnieniach
 * @property {Object} currentUserPermissions - obiekt zawierający informacje o uprawnieniach danego użytkownika
 */
const state = {
  userList: [],
  permissions: {},
  currentUserPermissions: {}
};

/** obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state
 *  @name admin/getters
 * @type {object}
 * @getter userList - funkcja zwracająca listę użytkowników
 * @getter currentUserPermissions - funkcja zwracająca aktualne uprawnienia danego użytkownika
 * @getter permissions - funkcja zwracająca dostępne uprawnienia użytkowników
 * @getter setUserPermissions - funkcja wywołuje funkcję która wysyla zapytanie do API o zmianę uprwnień użytkownika
 */
const getters = {
  userList: state => state.userList,
  currentUserPermissions: state => state.currentUserPermissions,
  permissions: state => state.permissions
};

/** obiekt posiadający funkcje, które wywołują funkcje pobierające dane z API, a anstępnie zapisują te dane poprzez mutacje do obiektów w state
 *  @name admin/actions
 * @desc
 *  getPermissions - funkcja pobiera dostępne uprawnienia z API nstępnie wywołuje mutacje "permissions" <br/>
 *  getUsers - funkcja pobiera wszystkich użytkowników z API, następnie wywołuje mutację "users" <br/>
 *  getUserPermissions - funkcja pobierająca z API uprawnienia danego uzytkownika <br/>
 */
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
/** obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state
 * @name admin/mutations
 * @type {object}
 * @mutator users - funkcja zapisujaca listę użytkowników w obiekcie state.userList
 * @mutator userPermissions - funkcja zapisjąca aktualne uprawnienia danego użytkownika w obiekcie state.currentUserPermissions
 * @mutator permissions - funkcja zapisująca uprawnienia użytkownika w obiekcie state.permissions
 */
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
