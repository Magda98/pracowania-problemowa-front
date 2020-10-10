<template>
  <v-container
    class="container"
    fill-height
    :style="{
      backgroundImage: 'url(' + require('../assets/bg-1_white.png') + ')'
    }"
  >
    <v-row justify="center" align="center">
      <v-col>
        <h1>Rejestracja</h1>
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
              name="Email"
              rules="required|max:256"
            >
              <v-text-field
                v-model="email"
                color="primary"
                :error-messages="errors"
                label="Adres E-mail"
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

            <validation-provider
              v-slot="{ errors }"
              name="passwordref"
              rules="required|max:256"
            >
              <v-text-field
                :error-messages="errors"
                color="primary"
                label="Powtórz hasło"
                required
                name="password1"
                v-model="myPass1"
                :append-icon="pass1 ? 'visibility' : 'visibility_off'"
                @click:append="() => (pass1 = !pass1)"
                :type="pass1 ? 'password' : 'text'"
              ></v-text-field>
            </validation-provider>
            <v-btn
              color="accent"
              outlined
              class="mr-4 login-btn"
              @click="submit"
            >
              zarejestruj
            </v-btn>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, max, min } from "vee-validate/dist/rules";
import { mapGetters } from "vuex";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "to pole nie może być puste",
});

extend("max", {
  ...max,
  message: "pole nie może być dłuższe niż 256 znaków",
});
extend("min", {
  ...max,
  message: "pole nie może być krótsze niż 4 znaki",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    email: "",
    select: null,
    errors: null,
    pass: String,
    myPass: "",
    pass1: String,
    myPass1: "",
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.myPass = "";
      this.name = "";
      this.$refs.observer.reset();
    },
  },
  computed: {
    ...mapGetters("user", ["userInfo", "loggedIn"]),
  },
  beforeMount() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
};
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 40px;
  color: #272727;
}
form {
  max-width: 400px;
  margin: 50px auto;
}
.login-btn {
  margin-top: 20px;
}
.container {
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
