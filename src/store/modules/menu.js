import * as types from "../mutation-types";
import router from "@/router";
import axios from "axios";
const querystring = require("query-string");
import api from "@/api";

// initial state
const state = {
    offersList: []
};

// getters
const getters = {
    offersList: state => state.offersList
};

// actions
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

// mutations
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
