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
 * @type {Object}
 * @property {Array} institutionsList- tablica przechowująca listę obiektów instytucji pobranych z API
 */
const state = {
  institutionsList: []
};

/** obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state
 *  @name institutions/getters
 * @type {Object}
 * @getter institutionsList - funkcja zwracająca listę instytucji
 */
const getters = {
  institutionsList: state => state.institutionsList
};

/** obiekt posiadający funkcje, które wywołują funkcje pobierające dane z API, a anstępnie zapisują te dane poprzez mutacje do obiektów w state
 *  @name institutions/actions
 * @desc
 * getInstitutions - funkcja pobiera listę instytucji z API <br/>
 * addInstitutions - wywołuje zapytanie aby dodać nową instytucję <br/>
 * deleteInstitution - wywołuje zapytanie w celu usunięcia instytucji <br/>
 * editInstitution - wywołuje zpytanie w celu edycji danych instytucji <br/>
 */
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
/** obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state
 * @name institutions/mutations
 * @type {object}
 * @mutator  getInstitutions - funkcja zapisujaca listę instytucji w obiekcie state.institutionsList
 * @mutator deleteInstitution - funkcja uaktualniająca listę instytucji w obiekcie state
 */
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
