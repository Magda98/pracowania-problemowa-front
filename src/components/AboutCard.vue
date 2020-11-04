<template>
  <v-col md="2">
    <v-card elevation="10">
      <v-img
        :src="'@/assets/' + person.logo"
        contain
        max-height="150px"
        gradient="to bottom, rgba(255,255,255,.5), rgba(255,255,255,.5)"
      >
        <v-card-title>{{ person.surname }} {{ person.name }}</v-card-title>
        <v-card-subtitle>{{ person.description }}</v-card-subtitle>
        <v-card-actions>
          <v-btn
            :href="person.link"
            color="deep-purple lighten-2"
            text
            target="_blank"
            >GITHUB
          </v-btn>
        </v-card-actions>
      </v-img>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "AboutCard",
  props: {
    person: Object
  }
};
</script>
