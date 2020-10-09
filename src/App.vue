<template>
  <v-app>
    <v-layout fill-height>
      <Sidebar v-if="loggedIn" />
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-layout>
    <v-snackbar
      class="sp-snackbar"
      @input="hideAlert"
      :value="showAlert"
      :multi-line="true"
      :timeout="timeout"
    >
      <div
        style="display: flex;align-items:center;margin:auto;"
        v-bind:class="[alertType + '--text']"
      >
        <v-icon
          style="margin-right:20px;"
          color="white"
          v-bind:class="[alertType + '--text']"
          >{{ alertIcon }}</v-icon
        >
        {{ message }}
      </div>
      <v-btn
        style="margin-top: -25px;, font-size: 12px;"
        icon
        text
        @click="hideAlert"
        ><v-icon color="white">mdi-close</v-icon></v-btn
      >
    </v-snackbar>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Sidebar,
  },
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters("user", ["userInfo", "loggedIn"]),
    ...mapGetters("toastMessage", [
      "timeout",
      "alertType",
      "alertIcon",
      "message",
      "showAlert",
    ]),
  },
  methods: {
    ...mapActions("toastMessage", ["hideAlert"]),
  },
  beforeMount() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }
  },
};
</script>
<style lang="scss" scoped>
#app {
  min-height: 100vh;
}
</style>
