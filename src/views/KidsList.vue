<template>
  <v-container fill-height>
    <OrderList :kidList="listaDzieci" />
  </v-container>
</template>

<script>
import OrderList from "@/components/OrderList.vue";
export default {
  components: {
    OrderList,
  },
  data: () => ({
    listaDzieci: [
      {
        id: 1,
        name: "Jan Kowalski",
        institution: "Szkoła podstawowa Łańcut",
        institutuionID: "SP10",
        parent: "Adam nowak",
      },
      {
        id: 2,
        name: "Alicja Adams",
        institution: "Szkoła podstawowa Łańcut",
        institutuionID: "SP10",
        parent: "Adam Nowal",
      },
    ],
  }),
};
</script>
