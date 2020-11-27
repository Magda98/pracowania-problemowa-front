import * as types from "../mutation-types";
import router from "@/router";
import axios from "axios";
const querystring = require("query-string");
import api from "@/api";

/**
 * @module store/modules/menu
 * @desc Magazyn do przechowywania informacji o aktualnym menu
 */

/** obiekt przechowujący aktualne stany danych zmiennych pobranych z API
 *  @name menu/state
 * @type {Object}
 * @property {Array} offersList - tablica zawierająca obiekty aktualnych pozycji w menu
 */
const state = {
    offersList: []
};

/** obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state
 *  @name menu/getters
 * @type {object}
 * @getter offersList - funkcja zwracająca listę menu
 */
const getters = {
    offersList: state => state.offersList
};

/** obiekt posiadający funkcje, które wywołują funkcje pobierające dane z API, a anstępnie zapisują te dane poprzez mutacje do obiektów w state
 *  @name menu/actions
 * @desc
 *  getOffers - funkcja zwracająca listę ofert <br/>
 *  addOffer - funkcja dodająca ofertę do menu <br/>
 *  deleteOffer - funkcja usuwająca wybraną ofertę <br/>
 *  updateOffer - funkcja aktualizująca wybraną ofertę
 */
const actions = {
    getOffers({ commit }) {
        api.getOffers(response => {
            commit("offers", response);
        });
    },
    addOffer({ commit, dispatch, state }, data) {
        api.addOffer(response => {
            dispatch("getOffers");
            this.dispatch("toastMessage/alert", {
                message: "Rekord dodany!",
                type: "success"
              });
        }, data);
    },
    deleteOffer({ commit, dispatch, state }, data) {
        api.deleteOffer(response => {
            dispatch("getOffers");
            this.dispatch("toastMessage/alert", {
                message: "Rekord usunięty!",
                type: "success"
              });
        }, data);
    },
    updateOffer({ commit, dispatch, state }, data) {
        api.updateOffer(response => {
            dispatch("getOffers");
            this.dispatch("toastMessage/alert", {
                message: "Rekord zaktualizowany!",
                type: "success"
              });
        }, data);
    }
};
/** obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state
 * @name menu/mutations
 * @type {object}
 * @mutator offers - funkcja zapisujaca listę ofert menu w obiekcie state
 */
const mutations = {
    offers(state, data) {
        state.offersList = data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
