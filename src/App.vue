<template>
  <v-app>
    <Sidebar v-if="loggedIn" />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Sidebar
  },
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters("user", ["userInfo", "loggedIn"])
  }
};
</script>
<style lang="scss" scoped>
#app {
  min-height: 100vh;
}
</style>
