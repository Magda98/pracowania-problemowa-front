<template>
  <v-container
    class="container-custom"
    fluid
    :style="{
      backgroundImage: 'url(' + require('../assets/bg-1_white.png') + ')'
    }"
  >
    <v-container>
      <v-row justify="center" align-content="center">
        <v-col md="6">
          <h1>About</h1>
          <br />
          <h4>
            Jesteśmy firmą cateringową z Pcimia Dolnego, która od 35 lat
            zapewnia smaczne i zdrowe posiłki dla przedszkoli. Zapoznajcie się z
            naszą ofertą i znajdźcie coś dla siebie!
          </h4>
          <br />
          <h2>Autorzy:</h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <AboutCard v-for="person in people" :key="person.id" :person="person" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import AboutCard from "@/components/AboutCard.vue";
export default {
  name: "About",
  components: {
    AboutCard,
  },
  data() {
    return {
      people: [
        {
          id: "1",
          name: "Magdalena",
          surname: "Kochman",
          description: "Kierownik projektu, front-end Vue.js",
          link: "https://github.com/Magda98",
          logo: "logo.png",
        },
        {
          id: "2",
          name: "Piotr",
          surname: "Knapik",
          description: "Back-end C#",
          link: "https://github.com/WhiteRaidho",
          logo: "csharplogo.png",
        },
        {
          id: "3",
          name: "Jakub",
          surname: "Kida",
          description: "Back-end C#",
          link: "https://github.com/JKida10",
          logo: "csharplogo.png",
        },
        {
          id: "4",
          name: "Kamil",
          surname: "Król",
          description: "Front-end Vue.js",
          link: "https://github.com/krolik1337",
          logo: "logo.png",
        },
      ],
    };
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
h2 {
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 30px;
  color: #272727;
}
h4 {
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  color: #272727;
}
.container-custom {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
