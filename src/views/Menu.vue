<template>
  <v-container
    class="container"
    fill-height
    fluid
    :style="{
      backgroundImage: 'url(' + require('../assets/bg-1_white.png') + ')'
    }"
  >
      <v-row justify="center">
        <h1>Oferta:</h1>
        <br />
      </v-row>
    <v-container>
      <v-row justify="center">
        <v-tabs v-model="tab" centered>
          <v-tabs-slider color="black" />
          <v-tab v-for="day in days" :key="day">
            {{ day }}
          </v-tab>
        </v-tabs>
        <br />
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="day in days" :key="day">
            <v-card flat>
              <v-card-title>
                Jadłospis
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
                :headers="headers"
                :items="_dishes(day)"
                :search="search"
                multi-sort
                hide-default-footer
              />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "Menu",
  components: {},
  methods: {
    _dishes(value) {
      return this.dishes.filter(dishes => dishes.day == value);
    }
  },
  data() {
    return {
      tab: null,
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
      headers: [
        {
          text: "Posiłek",
          align: "start",
          sortable: true,
          value: "name"
        },
        { text: "Rodzaj", value: "type" },
        { text: "Cena (PLN)", value: "price" }
      ],
      dishes: [
        {
          id: 1,
          name: "Pierogi Ruskie",
          price: "21.37",
          type: "Obiad jednodaniowy",
          day: "Poniedziałek"
        },
        {
          id: 2,
          name: "Jajecznica",
          price: "12.34",
          type: "Śniadanie",
          day: "Poniedziałek"
        },
        {
          id: 3,
          name: "Barszcz biały z jajkiem i kiełbasą",
          price: "21.37",
          type: "Obiad jednodaniowy",
          day: "Poniedziałek"
        },
        {
          id: 4,
          name: "Rosół + kotlet schabowy z ziemniakami i surówką",
          price: "21.37",
          type: "Obiad dwudaniowy",
          day: "Poniedziałek"
        },
        {
          id: 5,
          name: "Gofery z dżemorem",
          price: "21.37",
          type: "Podwieczorek",
          day: "Poniedziałek"
        },
        {
          id: 6,
          name: "Pierogi Ruskie",
          price: "21.37",
          type: "Obiad jednodaniowy",
          day: "Wtorek"
        },
        {
          id: 7,
          name: "Jajecznica",
          price: "12.34",
          type: "Śniadanie",
          day: "Wtorek"
        },
        {
          id: 8,
          name: "Cebulon",
          price: "21.37",
          type: "Obiad jednodaniowy",
          day: "Wtorek"
        },
        {
          id: 9,
          name: "Rosół + kotlet schabowy z ziemniakami i surówką",
          price: "21.37",
          type: "Obiad dwudaniowy",
          day: "Wtorek"
        },
        {
          id: 10,
          name: "Gofery z dżemorem",
          price: "21.37",
          type: "Podwieczorek",
          day: "Wtorek"
        }
      ]
    };
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
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>