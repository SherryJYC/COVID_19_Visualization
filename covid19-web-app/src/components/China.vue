<template>
  <div>
    <v-container>
      <div class="py-12"></div>

      <h2 class="display-3 font-weight-bold mb-3">COVID-19 Status in China</h2>
      <div class="py-5"></div>
      

      <v-row>
        <v-col>
         <h2>show deck</h2>
         <div class="deck-container">
          <div id="china-map" ref="map"></div>
          <canvas id="deck-canvas" ref="canvas"></canvas>
        </div>


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
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import {MapboxLayer} from '@deck.gl/mapbox';
import * as d3 from "d3";

// var csv2geojson = require('csv2geojson');

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
    csv_url: // trial of deck.gl example
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv',
    covid_url: // data of COVID19 updated in 7 May
    'data/DXYcity0507.csv',

    COLOR_RANGE:
    [
            [1, 152, 189],
            [73, 227, 206],
            [216, 254, 181],
            [254, 237, 177],
            [254, 173, 84],
            [209, 55, 78]
        ],
    LIGHT_SETTINGS:{
            lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
            ambientRatio: 0.4,
            diffuseRatio: 0.6,
            specularRatio: 0.2,
            lightsStrength: [0.8, 0.0, 0.8, 0.0],
            numberOfLights: 2
        },
  }),
  created() {
    this.map = null;
    this.deck = null;
  },
  methods: {
    // initMap: function() {
    //   mapboxgl.accessToken = this.token;

    //   this.map = new mapboxgl.Map({
    //     container: "china-map",
    //     style: "mapbox://styles/mapbox/light-v10",
    //     center: [-1.4157, 52.2324],
    //     zoom: 6
    //   });

  },
  mounted() {
        mapboxgl.accessToken = this.token;
         this.map = new mapboxgl.Map({
            container: document.getElementById("china-map"),
            style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
            center: [114.299935,30.595105], // use long, lat of Wuhan
            zoom: 4,
            pitch: 40.5,
            antialias: true
        });

        var hexagonLayer;
        //Add the deck.gl Custom Layer to the map once the Mapbox map loads
        this.map.on('style.load', () => {

            // this.map.addSource('dxy0507', {
            //             'type': 'geojson',
            //              'data': data
            // });
            // this.map.addLayer({
            //             'id': 'covid',
            //             'minzoom': 0,
            //             'type': 'fill',
            //             'source': 'dxy0507',
            //             'source-layer': 'DXYcity0507',
            //             // 'filter': ['==', 'Time', set_year],
            // });      

            hexagonLayer = new MapboxLayer({
                type: HexagonLayer,
                id: 'covid',
                data: d3.csv(this.covid_url),
                radius: 1000,
                coverage: 1,
                upperPercentile: 100,
                colorRange: this.COLOR_RANGE,
                // elevationRange: [0, 1000],
                elevationScale: 1000,
                extruded: true,
                getPosition: d => [Number(d.Longitude), Number(d.Latitude)],
                getElevation: d => {
                    return Number(d.city_confirmedCount);
                },
                lightSettings: this.LIGHT_SETTINGS,
                opacity: 1
            });
            // Add the deck.gl hex layer below labels in the Mapbox map
            this.map.addLayer(hexagonLayer, 'waterway-label');
            // var filters = ['==', 'cityEnglishName', "Chongqing"];
            // this.map.setFilter('covid',filters);
        });
        
    }
};
</script>

<style scoped>
#china-map {
  height: 600px;
}
</style>
