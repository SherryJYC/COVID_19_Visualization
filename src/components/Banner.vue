<template>
  <v-parallax height="300" :src="require('../assets/img/mask.jpg')">
    <v-container>
      <v-row>
        <v-col class="text-center">
          <span class="display-2 red--text font-weight-regular">Total Confirmed</span>
          <div class="py-3"></div>
          <span class="display-3 red--text font-weight-bold">{{confirmed}}</span>
        </v-col>
        <v-col class="text-center">
          <span class="display-2 white--text font-weight-regular">Total Dead</span>
          <div class="py-3"></div>
          <span class="display-3 white--text font-weight-bold">{{dead}}</span>
        </v-col>
        <v-col class="text-center">
          <span class="display-2 green--text font-weight-regular">Total Recovered</span>
          <div class="py-3"></div>
          <span class="display-3 green--text font-weight-bold">{{recovered}}</span>
        </v-col>
      </v-row>
      <span class="white--text font-weight-bold">
        Statistics from
        <a
          href="link"
          class="light-blue--text text--lighten-3 font-weight-bold"
        >{{source}}</a>
        . Last updated: {{lastUpdate}}
      </span>
    </v-container>
  </v-parallax>
</template>

<script>
export default {
  name: "BaseBanner",
  props: {
    confirmed: String,
    recovered: String,
    dead: String,
    source: String,
    link: {
      type: String,
      default: "/"
    },
    lastUpdate: String
  }
};
</script>
<style scoped>
</style>
