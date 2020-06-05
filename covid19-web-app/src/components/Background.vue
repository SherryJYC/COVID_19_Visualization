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
          <div id="origin-map"></div>
        </b-card>
        <!-- Description of Origin Map-->
        <b-card class="black-content">
          <v-img src="@/assets/img/wuhan_market.jpg"
            height="200"
          ></v-img>
          <br/>
          The first case of COVID-19 in China was reported in Wuhan, Hubei. The origin of this virus is traced to Wuhan
          Huanan Wholesale Market, which is close to a busy train station.
          <br/>
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
import mapboxgl from "mapbox-gl";

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
    },
    token:
      "pk.eyJ1Ijoic2hlcnJ5anljIiwiYSI6ImNrYWhuNnUyaDBpMW8yeHQ5YmU5bjRxbmYifQ.rTKiRvlmkUa2IfJl9ToD9g",
  }),
  created(){
    this.map = null;
  },
  methods:{
     initMap: function() {
      mapboxgl.accessToken = this.token;

      this.map = new mapboxgl.Map({
        container: "origin-map",
        style: "mapbox://styles/mapbox/dark-v10?optimize=true", //"mapbox://styles/mapbox/light-v10",
        center: [114.261704,30.618000], // use long, lat of Wuhan Huanan Market
        minZoom: 4,
        maxZoom: 8,
        zoom: 4,
        pitch: 45,
        antialias: true
      });
     }
  },
  mounted() {
    this.initMap();
    var ref = this;
    ref.map.on('load', function() {
      ref.map.loadImage(
        require('@/assets/img/coronavirus.png') ,
        function(error, image) {
          if (error) throw error;
          ref.map.addImage('cat', image);
          ref.map.addSource('point', {
          'type': 'geojson',
          'data': {
          'type': 'FeatureCollection',
          'features': [
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [112, 29]
          }
          }
          ]
          }
      });
      ref.map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point',
        'layout': {
          'icon-image': 'cat',
          'icon-size': 0.4
        }
      });
      }
      );
    });
  }
};
</script>
<style scoped>
#origin-map{
  height: 400px;
}
.black-content {
  background-color: #121212;
}

</style>
