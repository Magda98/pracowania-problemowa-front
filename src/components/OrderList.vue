<template
  ><v-container>
    <v-row v-for="(order, index) in orderList" :key="index">
      <v-card>
        <v-card-title>{{ order.name }}</v-card-title>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    orderList: Array
  },
  beforeMount() {
    console.log(this.orderList);
  }
};
</script>
