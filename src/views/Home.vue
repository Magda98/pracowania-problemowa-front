<template>
  <v-container fill-height>
    <OrderList :orderList="listaDzieci" />
  </v-container>
</template>

<script>
import OrderList from "@/components/OrderList.vue";
export default {
  components: {
    OrderList
  },

  data: () => ({
    listaDzieci: [
      {
        name: "Jan Kowalski",
        institution: "Szkoła podstawowa Łańcut",
        meals: [
          {
            day: "monday",
            mealName: "Pierogi",
            comments: "Ser bez laktozy"
          },
          {
            day: "teusday",
            mealName: "Schabowy",
            comments: "Mięso Sojowe"
          },
          {
            day: "wednesday",
            mealName: "Spagetthi",
            comments: "Sos bez pomidorów"
          },

          {
            day: "thrustday",
            mealName: "Pierogi",
            comments: "Ser bez laktozy"
          },
          {
            day: "friday",
            mealName: "Naleśniki z serem",
            comments: "Ser bez laktozy"
          }
        ]
      },
      {
        name: "Alicja Adams",
        institution: "Szkoła podstawowa Łańcut",
        meals: {
          mondays: {
            mealName: "Pierogi",
            comments: "Ser bez laktozy"
          },
          teusdays: {
            mealName: "Schabowy",
            comments: "Mięso Sojowe"
          },
          wensdays: {
            mealName: "Spagetthi",
            comments: "Sos bez pomidorów"
          },
          thrustdays: {
            mealName: "Pierogi",
            comments: "Ser bez laktozy"
          },
          fridays: {
            mealName: "Naleśniki z serem",
            comments: "Ser bez laktozy"
          }
        }
      }
    ]
  })
};
</script>
