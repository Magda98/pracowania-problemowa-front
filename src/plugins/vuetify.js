import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md"
  },
  theme: {
    themes: {
      light: {
        primary: "#607D8B",
        secondary: "#CFD8DC",
        accent: "#009688",
        error: "#b71c1c"
      }
    }
  }
});
