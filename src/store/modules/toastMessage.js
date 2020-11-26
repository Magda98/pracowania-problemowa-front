import _ from "lodash";
import * as types from "../mutation-types";

/**
 * @module store/modules/toastMessage
 * @desc Pokazuje snackbar z informacjami
 */

/**
 * The Vuex 'state' object.
 * @name toastMessage/state
 * @type {object}
 * @property {String} alertType="success" - typ wiadomości
 * @property {String} alertIcon="mdi-checkbox-marked-circle-outline" - ikona
 * @property {String} message - wiadomość
 * @property {Number} timeout=2000 - czas na jaki pojawia się snackbar
 * @property {Bolean} showAlert=false - jeżeli wartość = "true" to snackbar sie pokazuje
 */
const state = {
  alertType: "success",
  alertIcon: "mdi-checkbox-marked-circle-outline",
  message: "",
  timeout: 2000,
  showAlert: false
};

/**
 * The module 'getters' object.
 * @name toastMessage/getters
 * @type {object}
 * @getter {Number} timeout=timeout Returns a property that is a Number
 * @getter {String} alertType=alertType Returns a property that is a String
 * @getter {String} alertIcon=alertIcon Returns a property that is a String
 * @getter {String} message=message Returns a property that is a String
 * @getter {Bolean} showAlert=showAlert Returns a property that is a Bolean
 */
const getters = {
  timeout: state => state.timeout,
  alertType: state => state.alertType,
  alertIcon: state => state.alertIcon,
  message: state => state.message,
  showAlert: state => state.showAlert
};

/**
 * @name toastMessage/actions
 * @desc
 * alert - pokazuje snackbar z dana wiadomością <br/>
 * hideAlert - zamyka snackbar po klinknięciu przycisku zamykjącego <br/>
 */
const actions = {
  alert({ commit }, payload) {
    commit("showAlert", payload);
  },
  hideAlert({ commit }) {
    commit("hideAlert");
  }
};

/**
 * Ustawia odpowiednio zmienne w obiekcie state
 * @name toastMessage/mutations
 * @type {object}
 * @mutator {Bolean} hideAlert=showAlert ustawia  state.showAlert na odpowiednią wartość Boolowską
 * @mutator {Bolean|String|Number} showAlert=showAlert,alertType,message,timeout ustawia wartości poszczególnych zmiennych w obiekcie state
 */
const mutations = {
  hideAlert(state) {
    state.showAlert = false;
  },
  showAlert(state, payload) {
    state.alertType = payload.type;
    state.message = payload.message;
    state.showAlert = true;
    state.timeout = payload.timeout;

    switch (payload.type || "success") {
      case "success":
        state.alertIcon = "mdi-checkbox-marked-circle-outline";
        break;
      case "error":
      case "warning":
        state.alertIcon = "mdi-minus-circle-outline";
        break;
      case "info":
        state.alertIcon = "mdi-alert-circle-outline";
        break;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
