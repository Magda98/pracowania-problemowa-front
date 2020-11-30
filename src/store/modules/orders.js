import * as types from "../mutation-types";
import router from "@/router";
import axios from "axios";
const querystring = require("query-string");
import api from "@/api";

/**
 * @module store/modules/orders
 * @desc Magazyn do przechowywania informacji o zamówieniach
 */

/** obiekt przechowujący aktualne stany danych zmiennych pobranych z API
 *  @name orders/state
 * @type {Object}
 * @property {Array} ordersList - tablica zawierająca zamówienia
 */
const state = {
  ordersList: [],
  summary: [],
  summaryInstitution: []
};

/** obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state
 *  @name orders/getters
 * @type {object}
 * @getter ordersList - funkcja zwracająca listę zamówień
 */
const getters = {
  ordersList: state => state.ordersList,
  summary: state => state.summary,
  summaryInstitution: state => state.summaryInstitution
};

/** obiekt posiadający funkcje, które wywołują funkcje pobierające dane z API, a anstępnie zapisują te dane poprzez mutacje do obiektów w state
 *  @name orders/actions
 * @desc
 *  addOrder - funkcja zapisująca zamówienie w bazie
 */
const actions = {
  addOrder({ commit, dispatch, state }, data) {
    api.addOrder(response => {
      this.dispatch("toastMessage/alert", {
        message: "Zamówienie złożone!",
        type: "success"
      });
    }, data);
  },
  deleteOrders({ commit, dispatch, state }, data) {
    return new Promise((resolve, reject) => {
      let date = new Date();
      let dzien = date.getDay();
      let days = [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota"
      ];
      if (days[dzien] !== data.day) {
        api.addOrder(response => {
          this.dispatch("toastMessage/alert", {
            message: "zamówienie zostało usunięte",
            type: "info"
          });
          resolve();
        }, data);
      } else {
        this.dispatch("toastMessage/alert", {
          message: "Nie można odwołać zamówienia w tym dniu",
          type: "error"
        });
      }
    });
  },
  getOrder({ commit, dispatch, state }, data) {
    return new Promise((resolve, reject) => {
      api.getOrder(response => {
        resolve(response);
      }, data);
    });
  },
  getOrderKids({ commit, dispatch, state }, data) {
    return new Promise((resolve, reject) => {
      api.getOrder(response => {
        resolve(response);
      }, data);
    });
  },
  getSummary({ commit }) {
    return new Promise((resolve, reject) => {
      api.getSummary(response => {
        commit("summary", response);
      });
    });
  },
  getSummaryInstitution({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.getSummaryInstitution(response => {
        commit("summaryInstitution", response);
        resolve(response);
      }, data);
    });
  }
};

/** obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state
 * @name orders/mutations
 * @type {object}
 * @mutator orders - funkcja zapisujaca listę zamówień w obiekcie state
 */
const mutations = {
  orders(state, data) {
    state.ordersList = data;
  },
  summaryInstitution(state, data) {
    state.summaryInstitution = data;
  },
  summary(state, data) {
    state.summary = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
