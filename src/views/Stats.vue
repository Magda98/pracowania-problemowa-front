<template>
  <v-container
    class="container"
    fill-height
    fluid
    :style="{
      backgroundImage: 'url(' + require('../assets/bg-1_white.png') + ')',
    }"
  >
    <v-card :style="{ top: '70px', position: 'absolute', width: '98%' }">
      <v-card-title>
        Statystyki
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Wyszukaj"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-if="true"
        :headers="headers"
        :search="search"
        :items="summary"
        :footer-props="{
          'items-per-page-text': 'Wierszy na stronę',
          'items-per-page-all-text': 'Wszystkie',
          'items-per-page-options': [10, 25, 50, -1],
        }"
        class="elevation-1"
        multi-sort
      >
      </v-data-table>
      <div
        v-else
        style="margin: auto; padding-top: 50px; width: 100%; text-align: center"
      >
        brak zamówień
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// @vuese
// Widok strony statystyk
export default {
  data() {
    return {
      search: "",
      days: [
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
        "Niedziela",
      ],
      tab: null,
      headers: [
        {
          text: "Posiłek",
          align: "start",
          value: "offerName",
        },
        {
          text: "Instytucja",
          align: "start",
          value: "institution",
        },
        {
          text: "Ilość",
          align: "start",
          value: "ammount",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("offers", ["offersList"]),
    ...mapGetters("institutions", ["institutionsList"]),
    ...mapGetters("orders", ["summaryInstitution", "summary", "ordersList"]),
  },
  methods: {
    ...mapActions("offers", ["getOffers"]),
    ...mapActions("orders", [
      "getOrder",
      "getSummaryInstitution",
      "getSummary",
    ]),
    ...mapActions("institutions", ["getInstitutions"]),
  },
  async beforeMount() {
    this.getSummary();
    this.getInstitutions();
    const myArray = await Promise.all(
        this.institutionsList.map(function (item) {
          console.log(item.publicId);
          return getSummaryInstitution(item.publicId);
        })
      );
    console.log(myArray);
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>