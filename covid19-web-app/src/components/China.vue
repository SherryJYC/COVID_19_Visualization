<template>
  <div>
    <v-container>
      <div class="py-12"></div>

      <h2 class="display-3 font-weight-bold mb-3">COVID-19 Status in China</h2>
      <div class="py-5"></div>
      <h2>show deck</h2>

      <div class="deck-container">
        <div id="china-map" ref="map"></div>
        <canvas id="deck-canvas" ref="canvas"></canvas>
      </div>

      <v-row>
        <v-col>
          <!-- <div id="china-map">Map</div> -->
        </v-col>
        <v-col>
          <div id="china-chart">Chart</div>
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
import { Deck } from "@deck.gl/core";
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import {ScatterplotLayer} from '@deck.gl/layers';
import * as d3 from "d3";

export default {
  name: "China",

  data: () => ({
    stats: [
      { title: "Total Confirmed", value: 84402 },
      { title: "Total Deaths", value: 4643 },
      { title: "Total Recovered", value: 79077 }
    ],
    token:
      "pk.eyJ1IjoibW1jYXJ0b2cwMSIsImEiOiJjazk2bHZlbW8wOW5xM250Y2ZkbXNnZGdjIn0.QS71DsIq1oSDNUgEmfA3kg",
    csv_url:
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv',
  }),
  created() {
    this.map = null;
    this.deck = null;
  },
  methods: {
    initMap: function() {
      mapboxgl.accessToken = this.token;

      this.map = new mapboxgl.Map({
        container: "china-map",
        style: "mapbox://styles/mapbox/light-v10",
        center: [-1.4157, 52.2324],
        zoom: 6
      });
      
      this.deck = new Deck({
        canvas: this.$refs.canvas,
        width: "100%",
        height: "100%",
        initialViewState: {
          longitude: -1.4157,
          latitude: 52.2324,
          zoom: 6,
          minZoom: 5,
          maxZoom: 15,
          pitch: 40.5
        },
        controller: true,
        layers: [
          // add scatter plot layer, source:
          new ScatterplotLayer({
            data: [
              {position: [-1.4157, 52.2324], color: [255, 0, 0], radius: 1000}
            ],
            getPosition: d => d.position,
            getRadius: d => d.radius,
            getFillColor: d => d.color,
            opacity: 0.3
          }),
  ]
      });
  }

  },
  mounted() {
    this.initMap();
    const data = d3.csv(this.csv_url);

    const COLOR_RANGE = [
      [1, 152, 189],
      [73, 227, 206],
      [216, 254, 181],
      [254, 237, 177],
      [254, 173, 84],
      [209, 55, 78]
    ];

    const hexagonLayer = new HexagonLayer({
      id: 'heatmap',
      data,
      colorRange: COLOR_RANGE,
      elevationRange: [0, 1000],
      elevationScale: 250,
      extruded: true,
      pickable: true,
      radius: 200,
      getPosition: d => d.COORDINATES,
      opacity: 1,
    });
    // add hexagon layer 
    // source: https://codepen.io/vis-gl/pen/NYYeNj
    this.deck.setProps({
      layers: [hexagonLayer]
    });

  }
};
</script>

<style scoped>
#china-map {
  height: 600px;
}
</style>
