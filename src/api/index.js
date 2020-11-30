import _ from "lodash";
import router from "@/router";
import api from "@/axios/settings.js";

/**
 * @module Api
 * @desc moduł posiadający funkcje wysyłające zapytania do API, dane funkcje wywoływane są w poszczególnych modułach w magazynie Vuex
 */

export default {
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące logowania
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane użytkownika przekazane podczas logowania
   */
  login(cb, data) {
    api
      .post(`/api/user/authenticate`, {
        Username: data.username,
        Password: data.password
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące uprawnień
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   */
  getPermission(cb) {
    api
      .post(`/api/admin/permissions`, {
        permissions: [
          "FitKidCateringApp.Helpers.StandardPermissions@AdminAccess",
          "FitKidCateringApp.Helpers.StandardPermissions@CateringEmployee"
        ]
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące pobrania danych użytkownia
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   */
  getUserData(cb) {
    api
      .get(`/api/user`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące rejestracji użytkownika
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane użytkownika przekazane podczas rejestracji
   */
  register(cb, data) {
    api
      .post(`/api/user`, {
        UserName: data.username,
        Password: data.password,
        Email: data.email,
        FirstName: data.firstname,
        LastName: data.lastname
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące wygenerowania na nowo tokenu
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   */
  refreshToken(cb, data) {
    api
      .get(`/api/user/authenticate/refresh`)
      .then(response => {
        cb(response.data);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące pobrania uprawnień danego użytkownia
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane użytkownika
   */
  getUserPermissions(cb, data) {
    api
      .get(`/api/admin/permissions/inspect/${data.id}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące ustawienia uprawnień danego użytkownika
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane użytkownika
   */
  setUserPermissions(cb, data) {
    console.log(data);
    api
      .post(`/api/admin/permissions/inspect/${data[0].id}`, [
        {
          key: data[0].key,
          value: {
            AdminAccess: data[0].AdminAccess === true ? "Allow" : "Deny",
            CateringEmployee:
              data[0].CateringEmployee === true ? "Allow" : "Deny"
          }
        },
        {
          key: data[1].key,
          value: {
            Edit: data[1].Edit === true ? "Allow" : "Deny",
            Manage: data[1].Manage === true ? "Allow" : "Deny",
            View: data[1].View === true ? "Allow" : "Deny"
          }
        }
      ])
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące pobrania listy użytkowników serwisu
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane użytkownika przekazane podczas rejestracji
   */
  getUsers(cb, data) {
    api
      .get(`api/admin/users`, {
        params: {
          limit: 0,
          UserName: data.UserName,
          Email: data.Email,
          Name: data.LastName
        }
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące pobrania oferty
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   */
  getOffers(cb) {
    api
      .get(`api/offers`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące dodania oferty
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas dodawnia oferty
   */
  addOffer(cb, data) {
    api
      .post(`/api/offers`, {
        Name: data.name,
        Price: data.price,
        Type: data.type,
        DayOfWeek: data.day
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące usunięcia danej oferty
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas usuwania oferty
   */
  deleteOffer(cb, data) {
    api
      .delete(`/api/offers/${data.id}`, {
        publicId: data.id
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące dodania zamówienia
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas tworzenia zamówienia
   */
  addOrder(cb, data) {
    api
      .post(`/api/orders/${data.id}`, {
        Offers: data.offers,
        Comment: data.comments
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące pobrania zamówienia dla danego dziecka
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas tworzenia zamówienia
   */
  getOrder(cb, data) {
    api
      .get(`/api/orders/${data}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące podsumowania dla zamówień
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   */
  getSummary(cb) {
    api
      .get(`/api/orders/summary`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące podsumowania zamówień danych instytucji
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas tworzenia zamówienia
   */
  getSummaryInstitution(cb, data) {
    api
      .get(`/api/orders/summary/${data}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące edycji danej oferty
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas edycji oferty
   */
  updateOffer(cb, data) {
    api
      .put(`/api/offers/${data.id}`, {
        publicId: data.id,
        Name: data.name,
        Price: data.price,
        Type: data.type,
        DayOfWeek: data.day
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące pobrania uprawnien użytkownika
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   */
  getPermissions(cb) {
    api
      .get(`/api/admin/permissions`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące pobrania listy instytucji
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   */
  getInstitutions(cb) {
    api
      .get(`/api/institutions`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące dodania nowej instytucji
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas dodawania instytucji
   */
  addInstitutions(cb, data) {
    api
      .post(`/api/institutions`, data)
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące usunięcia danej instytucji
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas usuwania instytucji
   */
  deleteInstitutions(cb, data) {
    api
      .delete(`/api/institutions/${data}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące edycji instytucji
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas edycji instytucji
   */
  editInstitutions(cb, data) {
    api
      .put(`/api/institutions/${data.publicId}`, {
        Name: data.name,
        Street: data.street,
        ZipCode: data.zipCode,
        City: data.city,
        OwnerPublicId: data.ownerPublicId
      })
      .then(response => {
        cb(response.data);
      })
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące pobrania listy dzieci
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   */
  getAllKids(cb) {
    api
      .get(`/api/children`)
      .then(response => cb(response.data))
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące dodania dziecka
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas dodawnia dziecka
   */
  addKid(cb, data) {
    api
      .post(`/api/children`, data)
      .then(response => cb(response.data))
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące edytowania danych dziecka
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas edycji danych dziecka
   */
  editKid(cb, data) {
    api
      .put(`/api/children/${data.publicId}`, {
        FirstName: data.firstName,
        LastName: data.lastName,
        ParentPublicId: data.parentPublicId,
        InstitutionPublicId: data.institutionPublicId
      })
      .then(response => cb(response.data))
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące usunięcia dziecka
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   * @param {Object} data - odpowiednie dane przekazane podczas usuwania danych dziecka
   */
  deleteKid(cb, data) {
    api
      .delete(`/api/children/${data}`)
      .then(response => cb(response.data))
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące pobrania listy dzieci danego rodzica
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   */
  getMyKids(cb) {
    api
      .get(`/api/children/mychildren`)
      .then(response => cb(response.data))
      .catch(e => console.log(e));
  },
  /**
   * @desc Funkcja wysyłająca zapytanie do API dotyczące pobrania listy dzieci należacych do danej instytucji
   *
   * @param {Function} cb - funkcja wywoływana po pobraniu danych z API
   */
  getInstitutionKids(cb, data) {
    api
      .get(`/api/children/institution/${data}`)
      .then(response => cb(response.data))
      .catch(e => console.log(e));
  }
};
