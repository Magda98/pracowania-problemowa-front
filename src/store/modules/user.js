import * as types from "../mutation-types";
import router from "@/router";
const querystring = require("query-string");
import api from "@/api";

/**
 * @module store/modules/user
 * @desc Magazyn do przechowywania informacji o zalogowanym użytkowniku
 */

/** obiekt przechowujący aktualne stany danych zmiennych pobranych z API
 *  @name user/state
 * @type {Object}
 * @property {String} id - id użytkownika
 * @property {Boolean} logged_in - true jeżeli użytkownik jest zalogowany
 * @property {Boolean} getToken - true jeżeli token został zapisany
 * @property {String} expires - czas wygaśnięcia tokenu
 * @property {String} token - token użytkownika zwracany po zalogowaniu
 * @property {String} refToken - refresh token - służy do odświeżania czasu tokena
 * @property {Object} userInfo - obiekt zawierający informacje o danym użytkowniku
 * @property {Array} myPermissions - tablica zawierająca informacje o uprawnieniach danego użytkownika
 */
const state = {
  id: "",
  logged_in: false,
  getToken: false,
  token: String,
  refToken: String,
  expires: String,
  userInfo: false,
  myPermissions: []
};

/** obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state
 *  @name user/getters
 * @type {object}
 * @getter userId - funkcja zwracająca id użytkownika
 * @getter getToken - funkcja zwracająca token
 * @getter myPermissions - funkcja zwracająca dostępne uprawnienia użytkownika
 * @getter userInfo - funkcja zwraca informację o użytkowniku
 * @getter loggedIn - funkcja zwraca czy użytkownik jest zalogowany
 * @getter isExpired - funkcja zwraca czy użytkownik token jest jeszcze aktywny
 */
const getters = {
  userId: state => state.id,
  getToken: state => {
    //data
    state.getToken;
  },
  myPermissions: state => state.myPermissions,
  userInfo: state => state.userInfo,
  loggedIn: state => state.logged_in,
  isExpired: state => new Date(state.expires) < new Date()
};

/** obiekt posiadający funkcje, które wywołują funkcje pobierające dane z API, a anstępnie zapisują te dane poprzez mutacje do obiektów w state
 *  @name user/actions
 * @desc
 *  login - funkcja zajmująca sielogowaniem użytkownica do systemu <br/>
 *  getUserData - funkcja pobiera dane dotyczące zalogowanego uzytkownika <br/>
 *  refreshToken - funkcja odświeżająca token <br/>
 * logout - funkcja służąca do wylgowania użytkownika <br/>
 * register - funkcja służąca do rejestracji nowego uzytkownika
 */
const actions = {
  login({ commit, state }, data) {
    api.login(response => {
      commit("saveToken", response);
      commit(types.GET_TOKEN, {});
      api.getPermission(response => {
        commit("myPermissions", response);
      });
      this.dispatch("user/getUserData");
    }, data);
  },
  getUserData({ commit }) {
    api.getUserData(response => {
      commit("saveUserInfo", response);
      router.push({ path: "menu" });

      this.dispatch("toastMessage/alert", {
        message: "Zostałeś poprawnie zalogowany",
        type: "success"
      });
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
/** obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state
 * @name user/mutations
 * @type {object}
 * @mutator myPermissions - funkcja zapisujaca listę uprawnien użytkownika w obiekcie state
 * @mutator saveUserInfo - funkcja zapisjąca aktualne informacje o zalogowanym uzytkowniku w obiekcie state
 * @mutator saveToken - funkcja zapisująca token w obiekcie state
 */
const mutations = {
  myPermissions(state, data) {
    state.myPermissions = data;
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

  [types.LOGOUT_USER](state) {
    state.logged_in = false;
    state.userInfo = false;
    state.myPermissions = [];
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
