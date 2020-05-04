<template>
  <div>
    <v-container>
      <div class="py-12"></div>

      <h2 class="display-3 font-weight-bold mb-3">SARS Status in China</h2>
      <div class="py-5"></div>
      <v-row>
        <v-col>
          <div id="sars-map">Map</div>
        </v-col>
        <v-col>
          <div id="sars-chart">Chart</div>
        </v-col>
      </v-row>
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
  </div>
</template>

<script>
import { mapboxgl } from "@/main";

export default {
  name: "SARS",

  data: () => ({
    map: null,
    stats: [
      { title: "Total Confirmed", value: 8096 },
      { title: "Total Deaths", value: 774 },
      { title: "Total Recovered", value: "?" }
    ],
    token:
      "pk.eyJ1IjoibW1jYXJ0b2cwMSIsImEiOiJjazk2bHZlbW8wOW5xM250Y2ZkbXNnZGdjIn0.QS71DsIq1oSDNUgEmfA3kg"
  }),
  methods: {
    initMap: function() {
      mapboxgl.accessToken = this.token;

      this.map = new mapboxgl.Map({
        container: "sars-map",
        style: "mapbox://styles/mapbox/light-v10",
        center: [-77.034084, 38.909671],
        zoom: 2
      });
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style scoped>
#sars-map {
  height: 600px;
}
</style>