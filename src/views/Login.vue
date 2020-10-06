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
        <h1>Fit Kid Catering 🥗</h1>
        <validation-observer ref="observer">
          <form>
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:10"
            >
              <v-text-field
                v-model="name"
                color="primary"
                :counter="10"
                :error-messages="errors"
                label="Nazwa użytkownika"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                :error-messages="errors"
                color="primary"
                label="Hasło"
                required
                name="password"
                :value="myPass"
                :append-icon="pass ? 'visibility' : 'visibility_off'"
                @click:append="() => (value = !value)"
                :type="pass ? 'password' : 'text'"
              ></v-text-field>
            </validation-provider>
            <v-btn
              color="accent"
              outlined
              class="mr-4 login-btn"
              @click="submit"
            >
              zaloguj
            </v-btn>
            <v-btn class="login-btn" color="primary" outlined @click="clear">
              wyczyść
            </v-btn>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, max } from "vee-validate/dist/rules";
import { mapGetters } from "vuex";
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
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    name: "",
    email: "",
    select: null,
    errors: null,
    pass: String,
    myPass: ""
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$refs.observer.reset();
    }
  },
  computed: {
    ...mapGetters("user", ["userInfo", "loggedIn"])
  },
  beforeMount() {
    if (this.loggedIn) {
      this.$router.push("/");
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
}
</style>
