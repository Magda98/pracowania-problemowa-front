<template>
  <v-app>
    <v-layout fluid fill-height>
      <Sidebar />
      <v-main>
        <transition name="slide-fade">
          <router-view />
        </transition>
      </v-main>
    </v-layout>
    <v-snackbar
      class="sp-snackbar"
      @input="hideAlert"
      :value="showAlert"
      :multi-line="true"
      :timeout="timeout"
      style="margin-left: 8%;"
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
        style="
    position: absolute;
    right: 16px;
    top: 8px;, font-size: 12px;"
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
    Sidebar
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
      "showAlert"
    ])
  },
  methods: {
    ...mapActions("toastMessage", ["hideAlert"])
  }
};
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  // transform: translateX(10px);
  opacity: 0;
}
</style>
