<template>
  <div>
    <v-container>
      <div class="py-12"></div>
      <h2 class="display-3 font-weight-bold mb-3">Background</h2>
    </v-container>

      <v-parallax height="300" :src="require('../assets/mask.jpg')">
      <v-container>
        <v-row>
          <v-col class="text-center" v-for="stat in stats" :key="stat.title">
            <span class="display-2 white--text font-weight-regular">{{stat.title}}</span>
            <div class="py-3"></div>
            <span class="display-3 white--text font-weight-bold">{{stat.value}}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <v-container>
      <b-card class="black-content">
        COVID19 is a global disease ....
        <b>Placeholder for Text</b>
      </b-card>

      <!-- Origin -->
      <h3 class="display-2 font-weight-bold mb-3">Origin</h3>
      <b-card-group deck>
        <b-card class="black-content">
          Map of origin
        </b-card>
        <!-- Description of Origin Map-->
        <b-card class="black-content">
          Based on this map...
          <b>Placeholder for text</b>
        </b-card>
      </b-card-group>

      <!-- Global Status -->
      <h3 class="display-2 font-weight-bold mb-3">Global Status of COVID-19</h3>
      <v-row>
        <v-col class="black-content">
          <div
            class="flourish-embed flourish-bar-chart-race"
            data-src="visualisation/2647201"
            data-url="https://flo.uri.sh/visualisation/2647201/embed"
          ></div>
          <!-- <Chart v-bind="chart" /> -->
        </v-col>
      </v-row>

      <!-- Current Status -->
      <h3 class="display-2 font-weight-bold mb-3">Current Status</h3>
      <b-card-group deck>
        <b-card class="black-content">
          Right now, most of countries are recovering from COVID-19...
        </b-card>
        <!-- Description of Next Section-->
        <b-card class="black-content">
          In the next sections, we would like to discuss COVID-19 in China and compare it with SARS...
          <b>Placeholder for text</b>
        </b-card>
      </b-card-group>

    </v-container>
    
  </div>
</template>

<script>
// import Chart from "./Chart";

export default {
  name: "Global",
  components: {
    // Chart
  },

  data: () => ({
    stats: [
      { title: "Total Confirmed", value: 3524429 },
      { title: "Total Deaths", value: 247838 },
      { title: "Total Recovered", value: 1132553 }
    ],
    chart: {
      race_data: "visualisation/2647201",
      race_url: "https://flo.uri.sh/visualisation/2647201/embed"
    }
  })
};
</script>
<style scoped>
.black-content {
  background-color: #121212;
}
</style>
