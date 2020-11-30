<template>
  <v-container
    class="container"
    fill-height
    fluid
    :style="{
      backgroundImage: 'url(' + require('../assets/bg-1_white.png') + ')'
    }"
  >
    <div v-if="!loading">
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
          v-if="tableData"
          :headers="getHeaders(showAll)"
          :search="search"
          :items="getData(showAll)"
          :footer-props="{
            'items-per-page-text': 'Wierszy na stronę',
            'items-per-page-all-text': 'Wszystkie',
            'items-per-page-options': [10, 25, 50, -1]
          }"
          class="elevation-1"
          multi-sort
        >
          <template v-slot:item.day="{ item }">
            <span>{{ days[item.day] }}</span>
          </template>
          <template v-slot:top>
            <v-switch
              v-model="showAll"
              label="Widok szczegółowy"
              inset
              class="pa-3"
            ></v-switch>
          </template>
        </v-data-table>
        <div
          v-else
          style="margin: auto; padding-top: 50px; width: 100%; text-align: center"
        >
          brak zamówień
        </div>
      </v-card>
    </div>
    <v-progress-circular
      style="margin: auto;"
      v-else
      indeterminate
      color="green"
    ></v-progress-circular>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// @vuese
// Widok strony statystyk
export default {
  data() {
    return {
      loading: true,
      showAll: false,
      search: "",
      tableData: [],
      days: [
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
        "Niedziela"
      ],
      tab: null,
      headers: [
        {
          text: "Dzień",
          align: "start",
          value: "day"
        },
        {
          text: "Posiłek",
          align: "start",
          value: "offerName"
        },
        {
          text: "Instytucja",
          align: "start",
          value: "institution"
        },
        {
          text: "Ilość",
          align: "start",
          value: "ammount"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("offers", ["offersList"]),
    ...mapGetters("institutions", ["institutionsList"]),
    ...mapGetters("orders", ["summaryInstitution", "summary", "ordersList"])
  },
  methods: {
    ...mapActions("offers", ["getOffers"]),
    ...mapActions("orders", [
      "getOrder",
      "getSummaryInstitution",
      "getSummary"
    ]),
    ...mapActions("institutions", ["getInstitutions"]),
    // @vuese
    // Funkcja zwraca odpowiednie nagłówki w zależności od stanu przełącznika
    // @arg argumentem jest stan przełącznika
    getHeaders(val) {
      if (!val) {
        return [
          {
            text: "Posiłek",
            align: "start",
            value: "offerName"
          },
          {
            text: "Ilość",
            align: "start",
            value: "ammount"
          }
        ];
      } else {
        return [
          {
            text: "Dzień",
            align: "start",
            value: "day"
          },
          {
            text: "Posiłek",
            align: "start",
            value: "offerName"
          },
          {
            text: "Instytucja",
            align: "start",
            value: "institution"
          },
          {
            text: "Ilość",
            align: "start",
            value: "ammount"
          }
        ];
      }
    },
    // @vuese
    // Funkcja zwraca odpowiednie dane w zależności od stanu przełącznika
    // @arg argumentem jest stan przełącznika
    getData(val) {
      if (!val) {
        return this.summary;
      } else {
        return this.tableData;
      }
    }
  },
  async beforeMount() {
    this.getSummary();
    this.getInstitutions();
    this.getOffers();
    let module = this;
    let ids = [];
    let index = 0;
    let i;
    let instName;
    let day;
    const myArray = await Promise.all(
      this.institutionsList.map(function(item) {
        ids.push(item.publicId);
        return module.getSummaryInstitution(item.publicId);
      })
    );
    myArray.forEach(fill1);
    function fill1(item) {
      for (i = 0; i < item.length; i++) {
        instName = module.institutionsList.find(obj => {
          return obj.publicId === ids[index];
        }).name;
        day = module.offersList.find(obj => {
          return obj.publicId === item[i].offerId;
        }).dayOfWeek;
        module.tableData.push({
          day: day,
          offerName: item[i].offerName,
          institution: instName,
          ammount: item[i].ammount
        });
      }
      index++;
    }
    this.loading = false;
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
