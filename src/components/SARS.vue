<template>
  <div>
    <v-container>
      <div class="py-12"></div>
      <h2 class="display-3 font-weight-bold mb-3">SARS Status in China</h2>
    </v-container>

    <base-banner v-bind="sarsStats"></base-banner>

    <v-container>
      <div class="py-5"></div>
      <b-card class="black-content title font-weight-regular">
        The last time for China to experience such a serious pandemic disease is in 2003:
        Severe Acute Respiratory Syndrome (SARS). It was firstly reported in the December of 2002 in Guangdong, China
        and then spreaded to nearby cities. Considering the simliarity between COVID-19 and SARS, the dynamic change of
        SARS is discussed.
        <br />
        <br />To check more details of the dynamic change of SARS in China from March to Auguest, we provide the the following map
        and chart.
      </b-card>

      <!-- SARS China Map -->
      <b-card-group deck>
        <b-card class="card-content black-content">
          <div>
            <b-button :pressed="true" class="btn-tab2" @click="setField(0)">Confirmed</b-button>
            <b-button class="btn-tab2" @click="setField(1)">Recovered</b-button>
            <b-button class="btn-tab2" @click="setField(2)">Dead</b-button>
          </div>

          <div id="sars-map" ref="map"></div>

          <!-- Timeline -->
          <div class="time-container2">
            <div class="time2">
              <v-btn :color="playcolor" dark depressed fab class="play2" @click="toggle">
                <v-icon large>{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
              </v-btn>

              <input type="text" id="date2" readonly />
              <input class="slider2" type="range" min="1" max="92" step="1" value="1" />
            </div>
          </div>

          <!-- legend -->
          <div class="legend-container2">
            <div class="legend2" id="legend2">
              <h2 class="legend2" id="legend-title2">Confirmed</h2>
              <hr />

              <!-- Div where the dynamic legend is created  -->
              <div class="legend2" id="cd-legend2"></div>
            </div>
          </div>
        </b-card>

        <!-- Description of SARS China Map -->
        <b-card class="card-text black-content">
          <br />
          <br />From March to August of 2003, the cumulative count of confirmed, recovered and dead cases in China are provided.
          <br />
          <br />Based on the growth of confirmed cases, the spread of virus was very quick in April and May but slowed down after
          June.
          <br />
          <br />Unlike the map of COVID-19 (the district reported firstly is the district with the most cases), Guangdong is the district
          with the first reported case but in the end, Beijing has around 50% of total cases. As Beijing is among the most busiest cities in
          world, the heavy transportation and huge human migration gave advantages to virus spreading.
        </b-card>
      </b-card-group>
      <!-- SARS China Chart -->
      <b-card-group deck>
        <b-card class="card-content black-content">
          <Chart v-bind="chart_data" />
        </b-card>
        <!-- Description of SARS China Chart -->
        <b-card class="card-text black-content">
          <br />
          <br />This chart shows detailed growth of confirmed, recovered and dead cases in China.
          <br />
          <br />Similar to the chart of COVID-19, SARS virus spread quickly in the first 30 days and then slowed down.
          In the beginning, Guangdong had most cases but the growth rate was not as high as that of Beijing. In the
          end, Beijing is the district with most confirmed cases.
        </b-card>
      </b-card-group>
    </v-container>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { sars_dates } from "../assets/json/dates";
import JQuery from "jquery";
import Chart from "./Chart";
import BaseBanner from "./Banner";

let $ = JQuery;
var playSpeed = 200;
let popup = new mapboxgl.Popup({
  closeButton: true,
  closeOnClick: true
});

export default {
  name: "SARS",
  components: {
    Chart,
    BaseBanner
  },
  data: () => ({
    map: null,
    sarsStats: {
      confirmed: "5,327",
      recovered: "4,959",
      dead: "394",
      source: "National Health Commission of the People's Republic of China",
      link:
        "http://www.nhc.gov.cn/wjw/zcjd/201304/a0d4975881e44d389195779773afaabc.shtml",
      lastUpdate: "August 16, 2003, 10:00 GMT+8"
    },
    isPlaying: false,
    playcolor: "#A8322D",
    token:
      "pk.eyJ1Ijoic2hlcnJ5anljIiwiYSI6ImNrYWhuNnUyaDBpMW8yeHQ5YmU5bjRxbmYifQ.rTKiRvlmkUa2IfJl9ToD9g",
    // data_url:'mapbox://sherryjyc.7xgdtkm5',
    all_url: [
      "mapbox://sherryjyc.4oxtpi5r",
      "mapbox://sherryjyc.0eelmzqd",
      "mapbox://sherryjyc.21ovjk24"
    ],
    dates: sars_dates,
    breaks: [
      [10, "#ffffb2"],
      [50, "#fecc5c"],
      [500, "#fd8d3c"],
      [1000, "#f03b20"],
      [2000, "#bd0026"]
    ],
    optionalTitles: ["Confirmed", "Recovered", "Dead"],
    optionalFields: [
      ["sars_confirmed", "SARS_confirmed2_polygon4-6khqbr"],
      ["sars_cured", "SARS_cured2_polygon4-d9om1c"],
      ["sars_dead", "SARS_dead2_polygon4-4kmjni"]
    ],
    chart_id: 0,
    chart: [
      {
        name: "confirmed",
        race_data: "visualisation/2694256",
        line_data: "visualisation/2680563",
        race_url: "https://flo.uri.sh/visualisation/2694256/embed",
        line_url: "https://flo.uri.sh/visualisation/2680563/embed"
      },
      {
        name: "cured",
        race_data: "visualisation/2680497",
        line_data: "visualisation/2680587",
        race_url: "https://flo.uri.sh/visualisation/2680497/embed",
        line_url: "https://flo.uri.sh/visualisation/2680587/embed"
      },
      {
        name: "dead",
        race_data: "visualisation/2680536",
        line_data: "visualisation/2680617",
        race_url: "https://flo.uri.sh/visualisation/2680536/embed",
        line_url: "https://flo.uri.sh/visualisation/2680617/embed"
      }
    ]
  }),
  computed: {
    chart_data: function() {
      return this.chart[this.chart_id];
    }
  },
  created() {
    this.map = null;
    this.animation = null;
    this.play = true;
    this.currentLayer = 0;
    this.currentDate = this.dates[0];
  },
  methods: {
    initMap: function() {
      mapboxgl.accessToken = this.token;

      this.map = new mapboxgl.Map({
        container: "sars-map",
        style: "mapbox://styles/mapbox/dark-v10?optimize=true", //"mapbox://styles/mapbox/light-v10",
        center: [112, 29], // use long, lat of Wuhan
        minZoom: 4,
        maxZoom: 8,
        zoom: 4,
        pitch: 45,
        antialias: true
      });
    },
    setExtrusion: function(chosenDate, layerName) {
      $("#date2").val(chosenDate);
      this.map.setPaintProperty(layerName, "fill-extrusion-height", [
        "*",
        ["get", chosenDate],
        100
      ]);
      this.map.setPaintProperty(layerName, "fill-extrusion-color", [
        "interpolate",
        ["linear"],
        ["get", chosenDate],
        10,
        this.breaks[0][1],
        50,
        this.breaks[1][1],
        500,
        this.breaks[2][1],
        1000,
        this.breaks[3][1],
        2000,
        this.breaks[4][1]
      ]);
    },
    setField: function(chosenField) {
      // clear previous popup before changing field
      popup.remove();
      // chosenField = 0, 1, 2
      // make current layer unvisible
      this.map.setLayoutProperty(
        this.optionalFields[this.currentLayer][0],
        "visibility",
        "none"
      );
      // change current layer
      this.currentLayer = chosenField;
      this.map.setLayoutProperty(
        this.optionalFields[this.currentLayer][0],
        "visibility",
        "visible"
      );
      this.setExtrusion(
        this.currentDate,
        this.optionalFields[this.currentLayer][0]
      );
      // change title of legend
      document.getElementById(
        "legend-title2"
      ).textContent = this.optionalTitles[this.currentLayer];
      this.chart_id = chosenField;
    },
    autoPlay: function(playSpeed) {
      this.animation = setInterval(this.moveTime, playSpeed);
    },
    toggle: function() {
      this.isPlaying = !this.isPlaying;
    },
    moveTime: function() {
      var currentDate = parseInt($(".slider2").val());
      currentDate += 1;
      // if already at latest date, start from beginning
      if (currentDate == 93) {
        currentDate = 1;
      }
      $(".slider2").val(currentDate);
      $(".slider2").trigger("change");
    }
  },
  mounted() {
    this.initMap();

    var legendLabels = [
      // Label text that will appear in the legend [0]
      ["< 10"],
      ["10 - 50"],
      ["50 - 500"],
      ["500 - 1000"],
      ["> 1000"]
    ];
    var breaksRev = this.breaks.slice().reverse();
    var legendLabelsRev = legendLabels.slice().reverse();
    var legend = document.getElementById("cd-legend2");

    this.map.on("style.load", () => {
      // add source and layer
      for (var i = 0; i < 3; i++) {
        this.map.addSource(this.optionalFields[i][0], {
          type: "vector",
          url: this.all_url[i],
          minzoom: 4
        });
        this.map.addLayer({
          id: this.optionalFields[i][0],
          source: this.optionalFields[i][0],
          "source-layer": this.optionalFields[i][1],
          type: "fill-extrusion",
          minzoom: 4,
          paint: {
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.6
          }
        });
        // show popup window when clicked
        // when user click layer, show info window
        this.map.on("click", this.optionalFields[i][0], function(e) {
          if (e.features.length > 0) {
            var propObj = e.features[0].properties;
            var line1 =
              '<div style="color:black;"><strong>' +
              propObj.province +
              "</strong><br/>";
            var line2 =
              "<strong>" +
              Math.round(propObj[ref.currentDate]) +
              "</strong><br/></div>";
            popup.remove();
            // show popup
            popup
              .setLngLat(e.lngLat)
              .setHTML(line1 + line2)
              .addTo(ref.map);
          }
        });
        this.map.on("mouseenter", this.optionalFields[i][0], function() {
          ref.map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        this.map.on("mouseleave", this.optionalFields[i][0], function() {
          ref.map.getCanvas().style.cursor = "";
        });
      }
      // initial state: only confirmed layer is visible
      this.map.setLayoutProperty(
        this.optionalFields[1][0],
        "visibility",
        "none"
      );
      this.map.setLayoutProperty(
        this.optionalFields[2][0],
        "visibility",
        "none"
      );
      // initial date is the first date: 01-24
      this.setExtrusion(this.currentDate, this.optionalFields[0][0]);

      var ref = this;

      // timeline and legend

      $(".slider2").change(function(e) {
        popup.remove();
        var date = parseInt(e.target.value) - 1;
        ref.currentDate = ref.dates[date];
        ref.setExtrusion(
          ref.currentDate,
          ref.optionalFields[ref.currentLayer][0]
        );
      });

      $(".play2").click(function() {
        if (ref.play == true) {
          ref.autoPlay(playSpeed);
          ref.play = false;
        } else {
          clearInterval(ref.animation);
          ref.play = true;
        }
      });
      // set legend inside map
      breaksRev.forEach(function(layer, i) {
        var item = document.createElement("div");
        var key = document.createElement("span");
        var value = document.createElement("span");

        key.style.backgroundColor = layer[1];
        key.style.width = "50px";
        key.style.display = "inline-block";
        key.style.margin = "10px";
        key.textContent = "|";

        // give the value variable a placeholder id that we can access and update with custom labels
        value.id = "2legend-value-" + i;

        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
      });

      legendLabelsRev.forEach(function(layer, i) {
        //as we iterate through the arrays get the correct row, and add the appropriate text
        document.getElementById("2legend-value-" + i).textContent = layer[0];
      });
    });
    // change color for buttons
    $(".btn-tab2").click(function() {
      $(".btn-tab2").removeClass("active");
      $(this).addClass("active");
    });
  }
};
</script>

<style scoped>
#sars-map {
  height: 600px;
  width: 100%;
}
.black-content {
  background-color: #121212;
}
.card-content {
  max-width: 650%;
}
.card-text {
  max-width: 35%;
}
.btn-tab2 {
  margin-right: 2.3%;
  margin-left: 1%;
  width: 30%;
  margin-bottom: 1%;
}

.play2 {
  margin-right: 10px;
  margin-bottom: 5px;
  width: 20%;
  background-color: #a8322d;
}
/* time slider */
.slider2 {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}
.slider2::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #a8322d;
  cursor: pointer;
}

.slider2::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}
.time-container2 {
  position: absolute;
  margin: 5px;
  top: 536px;
  right: 5px;
  padding: 0px 8px;
  margin-bottom: 30px;
  z-index: 1;
  max-width: 500px;
  color: black;
}
.time2 {
  background-color: white;
  opacity: 0.8;
  padding: 5px;
}
/* Mapbox Legend */
.legend2 {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  background-color: white;
  padding: 5px;
  opacity: 0.8;
  color: black;
}

#cd-legend2 {
  text-align: left;
}
.legend-container2 {
  position: absolute;
  margin: 5px;
  top: 60px;
  left: 5px;
  padding: 0px 10px;
  margin-bottom: 30px;
  z-index: 1;
  max-width: 200px;
}

/* Legend title */
.legend2 h2 {
  padding-top: 8px;
  margin: 0;
  text-align: center;
}

.legend2 hr {
  color: #123455;
  border: 0;
  border-top: 1px solid #ccc;
  padding: 0;
  margin-top: 5px;
  margin-bottom: 5px;
}
/* Button style */
.active {
  background-color: #a8322d !important;
}
</style>
