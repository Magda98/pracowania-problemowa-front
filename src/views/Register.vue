<template>
  <v-container
    class="container-custom"
    fill-height
    fluid
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
              rules="required|min:6|max:256"
            >
              <v-text-field
                v-model="nick"
                color="primary"
                :error-messages="errors"
                label="Nazwa"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:256"
            >
              <v-text-field
                v-model="surname"
                color="primary"
                :error-messages="errors"
                label="Imię"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:256"
            >
              <v-text-field
                v-model="name"
                color="primary"
                :error-messages="errors"
                label="Nazwisko"
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
            <ValidationObserver>
              <validation-provider
                v-slot="{ errors }"
                name="password"
                rules="required|max:256|password:@confirm|min:6"
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
                name="confirm"
                rules="required|max:256|min:6"
              >
                <v-text-field
                  :error-messages="errors"
                  color="primary"
                  label="Powtórz hasło"
                  required
                  name="password1"
                  v-model="confirmation"
                  :append-icon="pass1 ? 'visibility' : 'visibility_off'"
                  @click:append="() => (pass1 = !pass1)"
                  :type="pass1 ? 'password' : 'text'"
                ></v-text-field>
              </validation-provider>
            </ValidationObserver>
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
  ...min,
  message: "pole nie może być krótsze niż 6 znaków"
});
extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Hasła muszą być identyczne!"
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    surname: "",
    nick: "",
    name: "",
    email: "",
    select: null,
    errors: null,
    pass: String,
    myPass: "",
    pass1: String,
    confirmation: ""
  }),

  methods: {
    ...mapActions("user", ["register"]),
    submit() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          this.register({
            username: this.nick,
            password: this.myPass,
            email: this.email,
            firstname: this.surname,
            lastname: this.name
          });
        }
      });
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
.container-custom {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
