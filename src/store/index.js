import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import user from "./modules/user";
import toastMessage from "./modules/toastMessage";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "pracownia",
  strictMode: true
});

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    toastMessage
  },
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  strict: true,
  plugins: [vuexLocal.plugin]
});
