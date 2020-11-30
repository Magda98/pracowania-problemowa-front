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
      <v-dialog v-model="dialogDetails" max-width="50%">
        <v-card>
          <div>
            <v-card-title>
              <span class="headline">Uwagi do zamówienia</span>
            </v-card-title>
            <v-card-text v-if="comment">
              {{ comment }}
            </v-card-text>
            <v-card-text v-else>
              brak uwag do zamówienia
            </v-card-text>
          </div>
          <div v-if="ordersList.length">
            <v-card-title>
              <span class="headline">Łączna kwota do zapłaty tygodniowo</span>
            </v-card-title>
            <v-card-text style="font-size: 20px;">
              {{ pricing }} zł
            </v-card-text>
          </div>
          <v-card-title>
            <span class="headline">Zamówienia dziecka</span>
          </v-card-title>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab v-for="day in days" :key="day">
              {{ day }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="day in days" :key="day">
              <v-card>
                <v-card-text v-if="kidDishList[day].length">
                  <v-row v-for="dish in kidDishList[day]" :key="dish.publicId">
                    <v-col cols="6">
                      {{ dish.name }}
                    </v-col>
                    <v-col cols="6"> {{ dish.price }} zł </v-col>
                  </v-row>
                </v-card-text>
                <v-card-text v-else>
                  brak zamówień na dany dzień
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialogDetails = false">
              Zamknij
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card :style="{ top: '70px', position: 'absolute', width: '98%' }">
        <v-card-title>
          Zamówienia
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
          v-if="allKidsOrdersList.length"
          :headers="headers"
          :items="tableData()"
          :search="search"
          :footer-props="{
            'items-per-page-text': 'Wierszy na stronę',
            'items-per-page-all-text': 'Wszystkie',
            'items-per-page-options': [10, 25, 50, -1]
          }"
          class="elevation-1"
          multi-sort
        >
          <template v-slot:item.details="{ item }">
            <v-btn small class="mr-2" color="secondary" @click="see(item)">
              Szczegóły
            </v-btn>
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
// Widok strony zamówień
export default {
  data() {
    return {
      loading: true,
      comment: "",
      allKidsOrdersList: [],
      search: "",
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
      ordersList: [],
      dialogDetails: false,
      headers: [
        {
          text: "Dziecko",
          align: "start",
          value: "name"
        },
        {
          text: "Instytucja",
          align: "start",
          value: "institution"
        },
        {
          text: "Wartość zamówienia",
          align: "start",
          value: "value"
        },
        {
          text: "Szczegóły",
          align: "start",
          value: "details",
          sortable: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("offers", ["offersList"]),
    ...mapGetters("kids", ["kidsList"]),
    pricing() {
      let x = this.offersList.filter(offer => {
        const valid = this.ordersList.includes(offer.publicId);
        return valid;
      });
      let price = 0;
      x.forEach(element => {
        price += element.price;
      });
      return price;
    },
    kidDishList() {
      return this.offersList
        .filter(offer => this.ordersList.includes(offer.publicId))
        .reduce(
          (offers, currOffer) => ({
            ...offers,
            [this.days[currOffer.dayOfWeek]]: [
              ...offers[this.days[currOffer.dayOfWeek]],
              currOffer
            ]
          }),
          {
            Poniedziałek: [],
            Wtorek: [],
            Środa: [],
            Czwartek: [],
            Piątek: [],
            Sobota: [],
            Niedziela: []
          }
        );
    }
  },
  methods: {
    ...mapActions("kids", ["getKids"]),
    ...mapActions("offers", ["getOffers"]),
    ...mapActions("orders", ["getOrder", "getOrderKids"]),
    // @vuese
    // funkcja tworzy tabelę z danymi do wyświetlenia
    tableData() {
      var myArray = [];
      var offers = this.offersList;
      var kids = this.kidsList;
      var xname, xinst, xprice;
      this.allKidsOrdersList.forEach(fill);
      function fill(item) {
        var kid = kids.find(obj => {
          return obj.publicId === item.childPublicId;
        });
        xname = kid.name;
        xinst = kid.institutionName;
        xprice = 0;
        item.offers.forEach(addPrice);
        function addPrice(item) {
          xprice += offers.find(obj => {
            return obj.publicId === item;
          }).price;
        }
        xprice = xprice.toFixed(2);
        myArray.push({
          publicId: item.childPublicId,
          name: xname,
          institution: xinst,
          value: xprice
        });
      }
      return myArray;
    },
    // @vuese
    // funkcja wyświetla okno dialogowe ze szczegółami zamówienia
    //@arg Jako argument podaje się wyświetlane zamówienie
    see(item) {
      this.getOrder(item.publicId).then(response => {
        this.ordersList = response.offers;
        this.comment = response.comment;
        this.dialogDetails = true;
      });
    }
  },
  async beforeMount() {
    this.getOffers();
    this.getKids();
    let module = this;
    const myArray = await Promise.all(
      this.kidsList.map(function(item) {
        return module.getOrderKids(item.publicId);
      })
    );
    let kidsWithOrders = myArray.filter(obj => {
      if (obj.offers.length) return obj;
    });
    this.loading = false;
    this.allKidsOrdersList = kidsWithOrders;
  }
};
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 40px;
  color: #272727;
}
.container {
  width: 100%;
  max-width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
