import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import api from "./axios/api.js";
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
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    console.log(error);
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          //do something
          break;

        case 401:
          store.dispatch("user/refreshToken");
          break;
        case 403:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
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
