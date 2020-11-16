import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import api from "./axios/settings.js";
import vueDebounce from "vue-debounce";

Vue.use(vueDebounce, {
  defaultTime: "700ms"
});
Vue.prototype.$http = api;
api.defaults.timeout = 10000;
Vue.config.productionTip = false;

api.interceptors.request.use(
  config => {
    const token = store.state.user.token;
    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201 || response.status === 202) {

      if (!response.data.refresh) store.dispatch("user/refreshToken");
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    console.log(error.response);
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          console.log(error.response);
          if (error.response.data.message)
            store.dispatch("toastMessage/alert", {
              message: `Błąd: ${error.response.data.message}`,
              type: "error"
            });
          else {
            store.dispatch("toastMessage/alert", {
              message: `Błąd: ${JSON.stringify(error.response.data.errors)}`,
              type: "error"
            });
          }
          break;
        case 401:
          store.dispatch("user/logout");
          break;
        case 403:
          router.replace({
            path: "/menu",
            query: { redirect: router.currentRoute.fullPath }
          });
          store.dispatch("toastMessage/alert", {
            message: `Brak dostępu`,
            type: "error"
          });
          break;
        case 404:
          alert("page not exist");
          break;
        case 502:
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);
new Vue({
  router,
  store,
  vuetify,
  api,
  // created() {
  //   this.$store.subscribe((mutation, state) => {
  //     if (mutation.type === "user/SAVE_TOKEN") {
  //       axios.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${state.user.token}`;
  //     }
  //   });
  //   if (this.$store.state.user.token) {
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${this.$store.state.user.token}`;
  //   }
  // },
  render: h => h(App)
}).$mount("#app");
