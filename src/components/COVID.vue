<template>
  <div>
    <v-container>
      <div class="py-12"></div>
      <h2 class="display-3 font-weight-bold mb-3">COVID-19 Status in China</h2>
    </v-container>

    <base-banner v-bind="covidStats"></base-banner>

    <v-container>
      <div class="py-5"></div>
      <b-card class="black-content">
        In this global emergency, China is the first country to report and exprience the ourburst of COVID-19.
        Since January 2020, more and more cases were reported in Wuhan and nearby cities. In a short time, this disease has spread
        all over China, which required immediate actions. After serveral months of the fighting with this disease, in May 2020,
        China is recovering from the disease: schools are reopened and flights are rescheduled...
        <br />
        <br />To have a closer look of the dynamic change of COVID-19 in China from January to May, we provide the the following map
        and chart.
      </b-card>
      <!-- COVID China Map -->
      <b-card-group deck>
        <b-card class="card-content black-content">
          <div>
            <b-button :pressed="true" class="btn-tab" @click="setField(0)">Confirmed</b-button>
            <b-button class="btn-tab" @click="setField(1)">Recovered</b-button>
            <b-button class="btn-tab" @click="setField(2)">Dead</b-button>
          </div>
          <div id="china-map" ref="map"></div>

          <!-- Timeline -->
          <div class="time-container">
            <div class="time">
              <v-btn :color="playcolor" dark depressed fab class="play" @click="toggle">
                <v-icon large>{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
              </v-btn>

              <input type="text" id="date" readonly />
              <input class="slider" type="range" min="1" max="95" step="1" value="1" />
            </div>
          </div>

          <!-- legend -->
          <div class="legend-container">
            <div class="legend" id="legend">
              <h2 class="legend" id="legend-title">Confirmed</h2>
              <hr />

              <!-- Div where the dynamic legend is created  -->
              <div class="legend" id="cd-legend"></div>
            </div>
          </div>
        </b-card>
        <!-- Description of COVID China Map -->
        <b-card class="card-text black-content">
          <br />
          <br />From January to May of 2020, the cumulative count of confirmed, recovered and dead cases in China are provided.
          <br />
          <br />Based on the dynamic change shown on map, the spread of this disease was very fast in January and February, but became slowly
          after March. In April, this growth of disease already achieved plateau and only a few new confirmed cases are observed.
          <br />
          <br />Among those districts, Wuhan suffered the most: over 60% of the confirmed cases are clustered in Wuhan. This can be caused
          by the blockdown action taken by the government.
        </b-card>
      </b-card-group>

      <!-- COVID China Chart -->
      <b-card-group deck>
        <b-card class="card-content black-content">
          <!-- line chart race -->
          <Chart v-bind="chart_data" />
        </b-card>
        <!-- Description of COVID China Chart -->
        <b-card class="card-text black-content">
          <br />
          <br />This chart shows detailed growth of confirmed, recovered and dead cases in China.
          <br />
          <br />The most rapid growth is observed during the first 30 days since the first day with over 1000 confirmed cases.
          This rapid growth is related to the outburst of virus and the poor time. During the first 30 days, it is exactly in the Chinese
          Spring Festival, the largest annual migration. According to report,
          <b>
            <i>
              'Over 300 million train tickets have been sold for the Spring
              Festival travel rush after the presale started on Dec 12, 2019'
            </i>
          </b>. This busy human migration
          increased the convinience for virus spreading.
        </b-card>
      </b-card-group>
    </v-container>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { covid_dates } from "../assets/json/dates";
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
  name: "China",
  components: {
    Chart,
    BaseBanner
  },
  data: () => ({
    covidStats: {
      confirmed: "84,641",
      recovered: "4,645",
      dead: "79,883",
      source: "DXY",
      link:
        "https://ncov.dxy.cn/ncovh5/view/pneumonia?from=dxy&source=&link=&share=",
      lastUpdate: "June 10, 2020, 23:52 GMT+8"
    },
    isPlaying: false,
    playcolor: "#A8322D",
    token:
      "pk.eyJ1Ijoic2hlcnJ5anljIiwiYSI6ImNrYWhuNnUyaDBpMW8yeHQ5YmU5bjRxbmYifQ.rTKiRvlmkUa2IfJl9ToD9g",
    all_url: [
      "mapbox://sherryjyc.7aotoxrd",
      "mapbox://sherryjyc.5z7vqhli",
      "mapbox://sherryjyc.1399awho"
    ],
    dates: covid_dates,
    breaks: [
      [10, "#ffffb2"],
      [50, "#fecc5c"],
      [200, "#fd8d3c"],
      [1000, "#f03b20"],
      [10000, "#bd0026"]
    ],
    optionalTitles: ["Confirmed", "Recovered", "Dead"],
    optionalFields: [
      ["dxy_confirmed", "DXYcity_confirmed_polygon4-a1tfez"],
      ["dxy_cured", "DXYcity_cured_polygon4-7b7exw"],
      ["dxy_dead", "DXYcity_dead_polygon4-90rj8p"]
    ],
    chart_id: 0,
    chart: [
      {
        name: "confirmed",
        race_data: "visualisation/2675634",
        line_data: "visualisation/2675521",
        race_url: "https://flo.uri.sh/visualisation/2675634/embed",
        line_url: "https://flo.uri.sh/visualisation/2675521/embed"
      },
      {
        name: "cured",
        race_data: "visualisation/2677731",
        line_data: "visualisation/2677626",
        race_url: "https://flo.uri.sh/visualisation/2677731/embed",
        line_url: "https://flo.uri.sh/visualisation/2677626/embed"
      },
      {
        name: "dead",
        race_data: "visualisation/2677808",
        line_data: "visualisation/2677780",
        race_url: "https://flo.uri.sh/visualisation/2677808/embed",
        line_url: "https://flo.uri.sh/visualisation/2677780/embed"
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
        container: document.getElementById("china-map"),
        style: "mapbox://styles/mapbox/dark-v10?optimize=true",
        center: [112, 29], // use long, lat of Wuhan
        minZoom: 4,
        maxZoom: 8,
        zoom: 4,
        pitch: 45,
        antialias: true
      });
    },
    setExtrusion: function(chosenDate, layerName) {
      $("#date").val(chosenDate + "-2020");
      this.map.setPaintProperty(layerName, "fill-extrusion-height", [
        "*",
        ["get", chosenDate],
        10
      ]);
      this.map.setPaintProperty(layerName, "fill-extrusion-color", [
        "interpolate",
        ["linear"],
        ["get", chosenDate],
        10,
        this.breaks[0][1],
        50,
        this.breaks[1][1],
        200,
        this.breaks[2][1],
        1000,
        this.breaks[3][1],
        10000,
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
      document.getElementById("legend-title").textContent = this.optionalTitles[
        this.currentLayer
      ];
      this.chart_id = chosenField;
    },
    autoPlay: function(playSpeed) {
      this.animation = setInterval(this.moveTime, playSpeed);
    },
    toggle: function() {
      this.isPlaying = !this.isPlaying;
    },
    moveTime: function() {
      var currentDate = parseInt($(".slider").val());
      currentDate += 1;
      // if already at latest date, start from beginning
      if (currentDate == 96) {
        currentDate = 1;
      }
      $(".slider").val(currentDate);
      $(".slider").trigger("change");
    }
  },
  mounted() {
    this.initMap();

    var legendLabels = [
      // Label text that will appear in the legend [0]
      ["< 50"],
      ["50 - 200"],
      ["200 - 1000"],
      ["1000 - 10000"],
      ["> 10000"]
    ];
    var breaksRev = this.breaks.slice().reverse();
    var legendLabelsRev = legendLabels.slice().reverse();
    var legend = document.getElementById("cd-legend");

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
              propObj.city +
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

      $(".slider").change(function(e) {
        popup.remove();
        var date = parseInt(e.target.value) - 1;
        ref.currentDate = ref.dates[date];
        ref.setExtrusion(
          ref.currentDate,
          ref.optionalFields[ref.currentLayer][0]
        );
      });

      $(".play").click(function() {
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
        value.id = "legend-value-" + i;

        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
      });

      legendLabelsRev.forEach(function(layer, i) {
        //as we iterate through the arrays get the correct row, and add the appropriate text
        document.getElementById("legend-value-" + i).textContent = layer[0];
      });
    });
    // change color for buttons
    $(".btn-tab").click(function() {
      $(".btn-tab").removeClass("active");
      $(this).addClass("active");
    });
  }
};
</script>

<style scoped>
#china-map {
  height: 600px;
  max-width: 100%;
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
.btn-tab {
  margin-right: 2.3%;
  margin-left: 1%;
  width: 30%;
  margin-bottom: 1%;
}

.play {
  margin-right: 10px;
  margin-bottom: 5px;
  width: 20%;
  background-color: #a8322d;
}
/* time slider */
.slider {
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
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #a8322d;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}
.time-container {
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
.time {
  background-color: white;
  opacity: 0.8;
  padding: 5px;
}
/* Mapbox Legend */
.legend {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  background-color: white;
  padding: 5px;
  opacity: 0.8;
  color: black;
}

#cd-legend {
  text-align: left;
}
.legend-container {
  position: absolute;
  margin: 5px;
  top: 58px;
  left: 5px;
  padding: 0px 10px;
  margin-bottom: 30px;
  z-index: 1;
  max-width: 200px;
}

/* Legend title */
.legend h2 {
  padding-top: 8px;
  margin: 0;
  text-align: center;
}

.legend hr {
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
