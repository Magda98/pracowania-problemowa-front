<template>
  <v-container
    class="container-custom"
    fill-height
    fluid
    :style="{
      backgroundImage: 'url(' + require('@/assets/bg-1_white.png') + ')'
    }"
  >
    <v-row justify="center" align="center">
      <v-col>
        <h1>
          Fit Kid Catering
          <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#b1cc33"
              stroke="#b1cc33"
              stroke-miterlimit="10"
              stroke-width="2"
              d="M57.4 40.6l5-.8-.3-1a2.948 2.948 0 002.1-3.7 3.087 3.087 0 00-1.7-2 5.075 5.075 0 001.264-3.134A4.906 4.906 0 0063.1 27.3a5.097 5.097 0 00-5.7-2.3 2.961 2.961 0 00-3.3-3.7 4.978 4.978 0 00-8.5-4.4 3.102 3.102 0 00-2.1-2.2 3.44 3.44 0 00-2.6.5 4.956 4.956 0 00-4.7-3.4 4.846 4.846 0 00-4.8 3.8 2.803 2.803 0 00-2.9-.8 3.087 3.087 0 00-2 1.7 4.974 4.974 0 00-5.8-.6 5.097 5.097 0 00-2.3 5.7 2.961 2.961 0 00-3.7 3.3 4.978 4.978 0 00-4.4 8.5 2.99 2.99 0 00-.1 5.8v1l3.1.7"
            />
            <circle cx="21.697" cy="34.3" r="6" fill="#ea5a47" />
            <circle cx="36.697" cy="33.3" r="6" fill="#ea5a47" />
            <circle cx="51.697" cy="33.3" r="6" fill="#ea5a47" />
            <path fill="#fff" d="M65 35a29 29 0 01-58 0z" />
            <path
              fill="#d0cfce"
              d="M49 35c0 16-4 29-13 29a29.02 29.02 0 0029-29z"
            />
            <g
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path
                d="M50.27 28.202a5.162 5.162 0 012.98.04 5.83 5.83 0 012.56 1.689M33.277 29.229a5.829 5.829 0 012.828-1.187 5.16 5.16 0 012.937.512M17.584 30.93a5.83 5.83 0 012.56-1.689 5.161 5.161 0 012.98-.039"
              />
              <path
                d="M63.65 30.936a4.905 4.905 0 00-.55-3.536 5.097 5.097 0 00-5.7-2.3 2.961 2.961 0 00-3.3-3.7 4.978 4.978 0 00-8.5-4.4 3.102 3.102 0 00-2.1-2.2 3.44 3.44 0 00-2.6.5 4.956 4.956 0 00-4.7-3.4 4.846 4.846 0 00-4.8 3.8 2.803 2.803 0 00-2.9-.8 3.087 3.087 0 00-2 1.7 4.974 4.974 0 00-5.8-.6 5.097 5.097 0 00-2.3 5.7 2.961 2.961 0 00-3.7 3.3 5.036 5.036 0 00-5.3 2.4 4.755 4.755 0 00-.644 2.886M65 35a29 29 0 01-58 0z"
              />
            </g>
          </svg>
        </h1>
        <validation-observer ref="observer">
          <form>
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:256"
            >
              <v-text-field
                v-model="name"
                color="primary"
                :error-messages="errors"
                label="Nazwa użytkownika"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="password"
              rules="required|max:256"
            >
              <v-text-field
                :error-messages="errors"
                color="primary"
                label="Hasło"
                required
                name="password"
                v-model="myPass"
                :append-icon="pass ? 'visibility' : 'visibility_off'"
                @click:append="() => (pass = !pass)"
                :type="pass ? 'password' : 'text'"
              ></v-text-field>
            </validation-provider>
            <v-btn
              color="accent"
              outlined
              class="mr-4 login-btn"
              @click="submit"
              :loading="loading"
              :disabled="loading"
            >
              zaloguj
            </v-btn>
            <v-btn class="login-btn" color="primary" outlined @click="clear">
              wyczyść
            </v-btn>
            <v-card flat
              ><v-card-title class="card-title"
                >nie masz konta? &nbsp;
                <v-btn
                  text
                  small
                  class="register-btn"
                  color="teal"
                  to="/register"
                  >Zarejestruj się</v-btn
                ></v-card-title
              >
            </v-card>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, max, min } from "vee-validate/dist/rules";
import { mapGetters, mapActions } from "vuex";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "to pole nie może być puste"
});

extend("max", {
  ...max,
  message: "pole nie może być dłuższe niż 256 znaków"
});
extend("min", {
  ...max,
  message: "pole nie może być krótsze niż 4 znaki"
});

// @vuese
// Widok stroy logowania
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    loader: null,
    loading: false,
    name: "",
    email: "",
    select: null,
    errors: null,
    pass: String,
    myPass: "",
    dialog: false
  }),
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  methods: {
    // @vuese
    // funkcja, która pobiera akcje z magazynu Vuex
    ...mapActions("user", ["login"]),

    // @vuese
    // metoda uruchamiana po kliknięciu przycisku zaloguj, wywołuje funkcję logowania z magazynu Vuex
    submit() {
      if (this.$refs.observer.validate()) {
        this.loader = "loading";
        this.login({ username: this.name, password: this.myPass });
      }
    },

    // @vuese
    // metoda uruchamiana po kliknięciu przycisku wyczyść, usuwa dane z pól tekstowych formularza
    clear() {
      this.myPass = "";
      this.name = "";
      this.$refs.observer.reset();
    }
  },

  computed: {
    // @vuese
    // funkcja, która pobiera gettery z magazynu Vuex
    ...mapGetters("user", ["userInfo", "loggedIn"])
  },

  // @vuese
  // funkcja, która wywołuje się przed zamonotowaniem komponentu, w przypadku kiedy użytkownik ma aktywny token, zostaje przekeierowany do strony z ofertą
  beforeMount() {
    if (this.loggedIn) {
      this.$router.push("/menu");
    }
  }
};
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 40px;
  color: #272727;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  svg {
    width: 50px;
    margin-left: 20px;
  }
}
form {
  max-width: 400px;
  margin: 50px auto;
}
.login-btn {
  margin-top: 20px;
}
.container-custom {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  display: flex;
}
.card-title {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  color: #607d8b;
  .register-btn {
    margin-left: 20px;
  }
}
</style>
