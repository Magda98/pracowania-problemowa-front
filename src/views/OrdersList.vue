<template>
  <v-container
    class="container"
    fill-height
    fluid
    :style="{
      backgroundImage: 'url(' + require('../assets/bg-1_white.png') + ')',
    }"
  >
    <v-dialog v-model="dialogDetails" max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">Zamówienia dziecka</span>
        </v-card-title>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
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
                  <v-col cols="6"> {{ dish.price.toFixed(2) }} zł </v-col>
                </v-row>
              </v-card-text>
              <v-card-text v-else> brak zamówień na dany dzień </v-card-text>
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
        v-if="exampleData"
        :headers="headers"
        :items="tableData()"
        :search="search"
        :footer-props="{'items-per-page-text': 'Wierszy na stronę',
        'items-per-page-all-text': 'Wszystkie',
        'items-per-page-options': [10, 25, 50, -1],}"
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
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// @vuese
// Widok strony zamówień
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
      ordersList: [],
      dialogDetails: false,
      headers: [
        {
          text: "Dziecko",
          align: "start",
          value: "name",
        },
        {
          text: "Instytucja",
          align: "start",
          value: "institution",
        },
        {
          text: "Wartość zamówienia",
          align: "start",
          value: "value",
        },
        {
          text: "Szczegóły",
          align: "start",
          value: "details",
          sortable: false,
        },
      ],
      exampleData: [
        {
          childPublicId: "c0d814d6-13ba-4672-a397-f347879b5415",
          offers: [
            "69be89d6-43bc-4490-967b-99b3f1ccaa36",
            "823ac138-9cc0-4fa3-ab6d-e20060093dd4",
            "f3041591-bd19-419a-b8c9-36d546bbea2c",
            "178a4bb5-6085-43c4-99e6-8270f80d3dad",
          ],
        },
        {
          childPublicId: "78996d50-1240-4f87-9035-3ebdd3e41cd3",
          offers: [
            "69be89d6-43bc-4490-967b-99b3f1ccaa36",
            "f3041591-bd19-419a-b8c9-36d546bbea2c",
          ],
        },
        {
          childPublicId: "2ab621d3-c889-403b-975a-ef2754619b4c",
          offers: [
            "f3041591-bd19-419a-b8c9-36d546bbea2c",
            "178a4bb5-6085-43c4-99e6-8270f80d3dad",
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters("offers", ["offersList"]),
    ...mapGetters("kids", ["kidsList"]),
    kidDishList() {
      return this.offersList
        .filter((offer) => this.ordersList.includes(offer.publicId))
        .reduce(
          (offers, currOffer) => ({
            ...offers,
            [this.days[currOffer.dayOfWeek]]: [
              ...offers[this.days[currOffer.dayOfWeek]],
              currOffer,
            ],
          }),
          {
            Poniedziałek: [],
            Wtorek: [],
            Środa: [],
            Czwartek: [],
            Piątek: [],
            Sobota: [],
            Niedziela: [],
          }
        );
    },
  },
  methods: {
    ...mapActions("kids", ["getKids"]),
    ...mapActions("offers", ["getOffers"]),
    ...mapActions("orders", ["getOrder"]),
    // @vuese
    // funkcja tworzy tabelę z danymi do wyświetlenia
    tableData() {
      var myArray = [];
      var offers = this.offersList;
      var kids = this.kidsList;
      var xname, xinst, xprice;
      this.exampleData.forEach(fill);
      function fill(item) {
        var kid = kids.find((obj) => {
          return obj.publicId === item.childPublicId;
        });
        xname = kid.name;
        xinst = kid.institutionName;
        xprice = 0;
        item.offers.forEach(addPrice);
        function addPrice(item) {
          xprice += offers.find((obj) => {
            return obj.publicId === item;
          }).price;
        }
        xprice = xprice.toFixed(2);
        myArray.push({
          publicId: item.childPublicId,
          name: xname,
          institution: xinst,
          value: xprice,
        });
      }
      return myArray;
    },
    // @vuese
    // funkcja wyświetla okno dialogowe ze szczegółami zamówienia
    //@arg Jako argument podaje się wyświetlane zamówienie
    see(item) {
      this.getOrder(item.publicId).then((response) => {
        this.ordersList = response.offers;
        this.dialogDetails = true;
      });
    },
  },
  beforeMount() {
    this.getOffers();
    this.getKids();
  },
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
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>