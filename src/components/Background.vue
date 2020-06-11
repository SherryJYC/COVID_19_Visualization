<template>
  <div>
    <v-container>
      <div class="py-12"></div>
      <h2 class="display-3 font-weight-bold mb-3">Background</h2>
    </v-container>

    <base-banner v-bind="globalStats"></base-banner>

    <v-container>
      <b-card class="black-content title font-weight-regular">
        In December 2019, multiple “pneumonia of unknown cause” cases were reported to several hospitals in Wuhan, China. By the end of the year, an outbreak of the disease was confirmed and reported to WHO.
        The disease was later named as Coronavirus disease (COVID-19) by WHO.
        In March 11, 2020, COVID-19 has been identified as a pandemic.
        With more than 7 million confirmed cases and over 200 countries affected, COVID-19 is one of the most threatening global health emergencies now.
      </b-card>

      <!-- Origin -->
      <h3 class="display-2 font-weight-bold mb-3">The first case reported</h3>
      <b-card-group deck>
        <b-card class="black-content">
          <div id="origin-map"></div>
        </b-card>
        <!-- Description of Origin Map-->
        <b-card class="black-content">
          <v-img src="@/assets/img/wuhan_market.jpg" height="200"></v-img>
          <br />The first case of COVID-19 in China was reported in December 1, 2019 in Wuhan, Hubei.
          Among 41 early confirmed cases, 27 cases have reported previous exposures to
          <b>
            Wuhan
            Huanan Wholesale Market
          </b>, the biggest seafood wholesale market in central China.
          <br />
          <br />The market locates close to Hankou Railway Station, one of the central hubs for railway in Wuhan.
          The passenger volume of the station reached 5,500,000 during the 40 days of the Spring Festival transport season in 2019.
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
          <figure class="figure">
            <img src="../assets/img/reopen.png" class="figure-img img-fluid rounded" alt="..." />
            <figcaption class="figure-caption">Credits: Getty Images</figcaption>
          </figure>
        </b-card>
        <b-card class="black-content">
          Right now, most of the countries are slowly recovering from COVID-19 and gradually loosening their restrictions. As the country where the first COVID-19 case was reported, China has been through significant challenges in combating the disease.
          Nevertheless, with timely iron fist measures, China is able to control the situation and is now slowly approaching to reopen.
          By May 2, 2020, all the 31 provinces of China have been released from the highest level response to public health emergencies.
        </b-card>
      </b-card-group>
      <!-- Description of Next Section-->
      <b-card class="black-content title font-weight-regular">
        In the following sections, we will walk you through the COVID-19 status in China throughout the time and also review the outbreak of SARS in 2003, another
        big epidemic in Chinese history to discuss the implication of SARS on COVID-19.
      </b-card>
    </v-container>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import BaseBanner from "./Banner";

export default {
  name: "Global",
  components: {
    BaseBanner
  },

  data: () => ({
    globalStats: {
      confirmed: "7,387,808",
      recovered: "3,640,834",
      dead: "415,787",
      source: "worldometer",
      link: "https://www.worldometers.info/coronavirus/?",
      lastUpdate: "June 10, 2020, 17:07 GMT"
    },
    chart: {
      race_data: "visualisation/2647201",
      race_url: "https://flo.uri.sh/visualisation/2647201/embed"
    },
    token:
      "pk.eyJ1Ijoic2hlcnJ5anljIiwiYSI6ImNrYWhuNnUyaDBpMW8yeHQ5YmU5bjRxbmYifQ.rTKiRvlmkUa2IfJl9ToD9g"
  }),
  created() {
    this.map = null;
  },
  methods: {
    initMap: function() {
      mapboxgl.accessToken = this.token;

      this.map = new mapboxgl.Map({
        container: "origin-map",
        style: "mapbox://styles/mapbox/dark-v10?optimize=true", //"mapbox://styles/mapbox/light-v10",
        center: [114.261704, 30.618], // use long, lat of Wuhan Huanan Market
        minZoom: 3,
        maxZoom: 7,
        zoom: 3,
        pitch: 45,
        antialias: true
      });
    }
  },
  mounted() {
    this.initMap();
    var ref = this;
    ref.map.on("load", function() {
      ref.map.loadImage(require("@/assets/img/coronavirus.png"), function(
        error,
        image
      ) {
        if (error) throw error;
        ref.map.addImage("cat", image);
        ref.map.addSource("point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [112, 29]
                }
              }
            ]
          }
        });
        ref.map.addLayer({
          id: "points",
          type: "symbol",
          source: "point",
          layout: {
            "icon-image": "cat",
            "icon-size": 0.4
          }
        });
      });
    });
  }
};
</script>
<style scoped>
#origin-map {
  height: 400px;
}
.black-content {
  background-color: #121212;
}
</style>
