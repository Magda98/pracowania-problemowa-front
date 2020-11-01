<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-row>
        <v-col>
          <v-text-field
            class="field"
            v-model="name"
            clearable
            label=" Imie i Nazwisko"
            single-line
            hide-details
            v-debounce:500ms="search"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            class="field"
            v-model="email"
            clearable
            label="E-mail"
            single-line
            hide-details
            v-debounce:500ms="search"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            class="field"
            v-model="nick"
            clearable
            label="Nazwa"
            single-line
            hide-details
            v-debounce:500ms="search"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table :headers="headers" :items="userList"></v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    surname: "",
    nick: "",
    name: "",
    email: "",
    headers: [
      {
        text: "Imię",
        value: "firstName"
      },
      { text: "Nazwisko", value: "lastName" },
      { text: "E-mail", value: "email" },
      { text: "Nazwa", value: "userName" }
    ]
  }),
  computed: {
    ...mapGetters("admin", ["userList"])
  },
  methods: {
    ...mapActions("admin", ["getPermissions", "getUsers"]),
    search() {
      this.getUsers({
        UserName: this.nick,
        Email: this.email,
        FirstName: this.surname,
        LastName: this.name
      });
    }
  },
  beforeMount() {
    this.getPermissions();
    this.getUsers({
      UserName: this.nick,
      Email: this.email,
      FirstName: this.surname,
      LastName: this.name
    });
  }
};
</script>
<style lang="scss" scoped>
.filed {
  margin-right: 10px !important;
}
</style>
