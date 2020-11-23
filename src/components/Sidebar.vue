<template>
  <v-navigation-drawer permanent color="primary" dark fill-height>
    <v-list v-if="loggedIn && userInfo">
      <v-list-item class="px-2"> </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ userInfo.firstName + " " + userInfo.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ userInfo.email }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ userInfo.userName }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item v-if="loggedIn" link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Ustawienia konta</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="loggedIn" link>
        <v-list-item-icon>
          <v-icon>mdi-clipboard-list-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Lista zamówień</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="loggedIn" link to="/menu">
        <v-list-item-icon>
          <v-icon>mdi-book-open-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Oferta</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="
          loggedIn &&
            myPermissions[
              'FitKidCateringApp.Helpers.StandardPermissions@AdminAccess'
            ]
        "
        link
        to="/list"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-child-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Lista podopiecznych</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="
          loggedIn &&
            !myPermissions[
              'FitKidCateringApp.Helpers.StandardPermissions@AdminAccess'
            ]
        "
        link
        to="/kidlist"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-child-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Lista podopiecznych</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!loggedIn" link to="/login">
        <v-list-item-icon>
          <v-icon>mdi-account-arrow-left-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logowanie</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="
          loggedIn &&
            myPermissions[
              'FitKidCateringApp.Helpers.StandardPermissions@AdminAccess'
            ]
        "
        link
        to="/permissions"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-box-multiple-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Prawa użytkowników</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="
          loggedIn &&
            myPermissions[
              'FitKidCateringApp.Helpers.StandardPermissions@AdminAccess'
            ]
        "
        link
        to="/institutions"
      >
        <v-list-item-icon>
          <v-icon>mdi-office-building</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Placówki</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/about">
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>O nas</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="loggedIn" @click="logout">
        <v-list-item-icon
          ><v-icon>mdi-account-arrow-right-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Wyloguj</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["userInfo", "loggedIn", "userInfo", "myPermissions"])
  },
  methods: {
    ...mapActions("user", ["logout"])
  },
  mounted() {}
};
</script>
