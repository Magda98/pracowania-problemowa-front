<template>
  <v-navigation-drawer permanent color="primary" dark fill-height>
    <v-list v-if="loggedIn">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">
            Sandra Adams
          </v-list-item-title>
          <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item v-if="loggedIn" link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Ustwienia konta</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="loggedIn" link>
        <v-list-item-icon>
          <v-icon>mdi-book-open-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Lista zamówień</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="loggedIn" link to="/offer">
        <v-list-item-icon>
          <v-icon>mdi-book-open-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Oferta</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="loggedIn" link to="/list">
        <v-list-item-icon>
          <v-icon>mdi-book-open-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Lista podopiecznych</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!loggedIn" link to="/login">
        <v-list-item-icon>
          <v-icon>mdi-account-arrow-left-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logowanie</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/about">
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>O nas</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["userInfo", "loggedIn"]),
  },
};
</script>
