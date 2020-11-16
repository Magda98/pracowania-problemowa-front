import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import user from "./modules/user";
import admin from "./modules/admin";
import institutions from "./modules/institutions";
import toastMessage from "./modules/toastMessage";
import offers from "./modules/menu"
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "pracownia",
  strictMode: true
});
/**
 * Moduł magazynu przechowujący dane w local storage
 */
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    admin,
    toastMessage,
    institutions,
    offers

  },
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  strict: true,
  plugins: [vuexLocal.plugin]
});
