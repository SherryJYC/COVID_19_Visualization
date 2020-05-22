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
// import {HexagonLayer} from '@deck.gl/aggregation-layers';
// import {MapboxLayer} from '@deck.gl/mapbox';
// import * as d3 from "d3";

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
    "pk.eyJ1Ijoic2hlcnJ5anljIiwiYSI6ImNrYWhuNnUyaDBpMW8yeHQ5YmU5bjRxbmYifQ.rTKiRvlmkUa2IfJl9ToD9g",
    csv_url: // trial of deck.gl example
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv',
    covid_url: // data of COVID19 updated in 7 May
    'data/DXYcity0507.csv',
    data_url:'mapbox://sherryjyc.7xgdtkm5'
  }),
  created() {
    this.map = null;
    // this.deck = null;
  },
  methods: {
    initMap: function() {
       mapboxgl.accessToken = this.token;
         this.map = new mapboxgl.Map({
            container: document.getElementById("china-map"),
            style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
            center: [114.299935,30.595105], // use long, lat of Wuhan
            minZoom:4,
            maxZoom:10,
            zoom: 4,
            pitch: 40.5,
            antialias: true
        });
    }

  },
  mounted() {
        this.initMap();

        this.map.on('style.load', () => {

           this.map.addSource('dxy0507', {
                        'type': 'vector',
                        'url': 'mapbox://sherryjyc.7xgdtkm5',
                        'minzoom': 4,
            });
            this.map.addLayer({
              'id': 'covid',
              'source': 'dxy0507',
              'source-layer': 'DXY0507_Polygon5-3e9elo',
              'filter': ['==', 'Date', '04-27'], // 04-27 for wuhan
              'type': 'fill-extrusion',
              'minzoom': 4,
              'paint': {
              'fill-extrusion-color': [
                "interpolate",
                ["linear"],
                [
                  "get",
                  "city_confirmedCount"
                ],
                10,
                "#007A96",
                50,
                "#72791C",
                200,
                "#485A2C",
                1000,
                "#956013",
                10000,
                "#A8322D",
              ],
              
              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              'fill-extrusion-height': [
                '*',
                ['get', 'city_confirmedCount'],
                10
              ],
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': 0.6
              }
            });      

            // hexagonLayer = new MapboxLayer({
            //     type: HexagonLayer,
            //     id: 'covid',
            //     data: d3.csv(this.covid_url),
            //     radius: 1000,
            //     coverage: 1,
            //     upperPercentile: 100,
            //     colorRange: this.COLOR_RANGE,
            //     // elevationRange: [0, 1000],
            //     elevationScale: 1000,
            //     extruded: true,
            //     getPosition: d => [Number(d.Longitude), Number(d.Latitude)],
            //     getElevation: d => {
            //         return Number(d.city_confirmedCount);
            //     },
            //     lightSettings: this.LIGHT_SETTINGS,
            //     opacity: 1
            // });
            // Add the deck.gl hex layer below labels in the Mapbox map
            // this.map.addLayer(hexagonLayer, 'waterway-label');
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
