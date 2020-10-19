<template>
  <v-container>
    <v-row v-for="(kid, index) in kidList" :key="index">
      <v-card class="ma-5" elevation="4" outlined>
        <v-card-title>{{ kid.name }}</v-card-title>
        <v-card-text>{{ kid.institution }}</v-card-text>
        <v-card-actions>
          <v-btn link :to="'list/' + kid.id" color="secondary" text>
            Lista zamówień
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    kidList: Array,
  },
  beforeMount() {
    console.log(this.orderList);
  },
};
</script>
