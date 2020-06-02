<template>
  <div>
    <v-container>
      <div class="py-12"></div>

      <h2 class="display-3 font-weight-bold mb-3">SARS Status in China</h2>
      <div class="py-5"></div>
           <v-row>
        <v-col lg="8">
        <div>
          <b-button :pressed="true" class="btn-tab2" @click="setField(0)">Confirmed</b-button>
          <b-button class="btn-tab2" @click="setField(1)">Cured</b-button>
          <b-button class="btn-tab2" @click="setField(2)">Dead</b-button>
        </div>

         <div class="deck-container2">
            <div id="sars-map" ref="map"></div>

              <!-- Timeline -->
            <div class="time-container2">
              <div class="time2">
                <v-btn
                  :color="playcolor"
                  dark
                  depressed
                  fab
                  class="play2"
                  @click="toggle"
                >
                <v-icon large>
                  {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}
                </v-icon>
              </v-btn>

                <input type="text"  id="date2" readonly>         
                <input class="slider2" type="range" min="1" max="92" step="1" value="1" />
              </div>
            </div>

              <!-- legend -->
            <div class='legend-container2'>
            <div class='legend2' id='legend2' >
                <h2 class="legend2">Confirmed</h2> 
                <hr/>
                
                <!-- Div where the dynamic legend is created  -->	
                <div class='legend2' id='cd-legend2' >
                </div>
            
            </div>
          </div>
        </div>

        </v-col>
        <v-col md="auto">
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
import mapboxgl from "mapbox-gl";
import {sars_dates} from "../assets/json/dates"
import JQuery from 'jquery';

let $ = JQuery;
var playSpeed = 200;
let popup = new mapboxgl.Popup({
                        closeButton: false,
                        closeOnClick: false
                    });

export default {
  name: "SARS",

  data: () => ({
    map: null,
    stats: [
      { title: "Total Confirmed", value: 8096 },
      { title: "Total Deaths", value: 774 },
      { title: "Total Recovered", value: "?" }
    ],
    isPlaying: false,
    playcolor: "#A8322D",
    token:
    "pk.eyJ1Ijoic2hlcnJ5anljIiwiYSI6ImNrYWhuNnUyaDBpMW8yeHQ5YmU5bjRxbmYifQ.rTKiRvlmkUa2IfJl9ToD9g",
    // data_url:'mapbox://sherryjyc.7xgdtkm5',
    all_url: ['mapbox://sherryjyc.4oxtpi5r','mapbox://sherryjyc.0eelmzqd','mapbox://sherryjyc.21ovjk24'],
    dates: sars_dates,
    breaks: [
      [10,"#007A96"],
      [50, "#72791C"],
      [500, "#485A2C"],
      [1000,"#956013"],
       [2000,"#A8322D"],
    ],
    optionalFields: [['sars_confirmed','SARS_confirmed2_polygon4-6khqbr'],
    ['sars_cured','SARS_cured2_polygon4-d9om1c'],['sars_dead','SARS_dead2_polygon4-4kmjni']]
  }),
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
        style: "mapbox://styles/mapbox/light-v10",
        center: [112,29], // use long, lat of Wuhan
            minZoom:4,
            maxZoom:8,
            zoom: 4,
            pitch: 45,
            antialias: true
      });
    },
 setExtrusion: function(chosenDate, layerName){
      $('#date2').val(chosenDate);
      this.map.setPaintProperty(layerName, 'fill-extrusion-height', ['*',['get', chosenDate],100])
      this.map.setPaintProperty(layerName, 'fill-extrusion-color', [
                "interpolate",
                ["linear"],
                [
                  "get",
                  chosenDate
                ],
                10,
                "#007A96",
                50,
                "#72791C",
                500,
                "#485A2C",
                1000,
                "#956013",
                2000,
                "#A8322D",
        ])

    },
    setField: function(chosenField){
      // clear previous popup before changing field
      popup.remove();
      // chosenField = 0, 1, 2
      // make current layer unvisible
      this.map.setLayoutProperty(this.optionalFields[this.currentLayer][0], 'visibility', 'none');
      // change current layer
      this.currentLayer = chosenField; 
      this.map.setLayoutProperty(this.optionalFields[this.currentLayer][0], 'visibility', 'visible');
      this.setExtrusion(this.currentDate,this.optionalFields[this.currentLayer][0]);

    },
    autoPlay: function(playSpeed){
      this.animation = setInterval(this.moveTime,playSpeed);
    },
    toggle: function(){
      this.isPlaying = !this.isPlaying;
    },
    moveTime: function(){
      var currentDate = parseInt($('.slider2').val());   
      currentDate+=1;
      // if already at latest date, start from beginning 
      if (currentDate == 93){
        currentDate = 1;
      }  
      $('.slider2').val(currentDate);
      $('.slider2').trigger('change');
    }
  },
  mounted() {
        this.initMap();

        var legendLabels = [
                        // Label text that will appear in the legend [0]
                                ['< 10'],
                                ['10 - 50'],
                                ['50 - 500'],
                                ['500 - 1000'],
                                ['> 1000'],
            ];	
        var breaksRev = this.breaks.slice().reverse();
        var legendLabelsRev = legendLabels.slice().reverse();
        var legend = document.getElementById('cd-legend2'); 

        this.map.on('style.load', () => {
            // add source and layer
            for (var i=0; i<3; i++){
               this.map.addSource(this.optionalFields[i][0], {
                        'type': 'vector',
                        'url': this.all_url[i],
                        'minzoom': 4,
              });
              this.map.addLayer({
                'id': this.optionalFields[i][0],
                'source': this.optionalFields[i][0],
                'source-layer':this.optionalFields[i][1],
                'type': 'fill-extrusion',
                'minzoom': 4,
                'paint': {
                'fill-extrusion-base': 0,
                'fill-extrusion-opacity': 0.6
                }
              });    
               // show popup window when clicked
              // when user click layer, show info window
              this.map.on('click', this.optionalFields[i][0], function(e) {
                          if (e.features.length > 0) {
                              var propObj = e.features[0].properties;
                              var line1 = '<strong>'+propObj.province+'</strong><br/>';
                              popup.remove();
                              // show popup
                              popup
                              .setLngLat(e.lngLat)
                              .setHTML(line1)
                              .addTo(ref.map);
                          }
                      });
              this.map.on('mouseenter', this.optionalFields[i][0], function() {
                ref.map.getCanvas().style.cursor = 'pointer';
              });
              
              // Change it back to a pointer when it leaves.
              this.map.on('mouseleave', this.optionalFields[i][0], function() {
                ref.map.getCanvas().style.cursor = '';
              });
            }
            // initial state: only confirmed layer is visible
            this.map.setLayoutProperty(this.optionalFields[1][0], 'visibility', 'none');
            this.map.setLayoutProperty(this.optionalFields[2][0], 'visibility', 'none');
            // initial date is the first date: 01-24
            this.setExtrusion(this.currentDate,this.optionalFields[0][0]);

            var ref = this;

            // timeline and legend

            $('.slider2').change(function(e) {
                var date = parseInt(e.target.value)-1;
                ref.currentDate = ref.dates[date];
                ref.setExtrusion(ref.currentDate,ref.optionalFields[ref.currentLayer][0]);
            });
            
            $('.play2').click(function () {
              if (ref.play == true){
                  ref.autoPlay(playSpeed);
                  ref.play = false;
              }
              else {
                clearInterval(ref.animation);
                ref.play = true;
              }
          });
          // set legend inside map
          breaksRev.forEach(function(layer, i){
              var item = document.createElement('div');
              var key = document.createElement('span');
              var value = document.createElement('span');
                            
              key.style.backgroundColor = layer[1]; 
              key.style.width = "50px";
              key.style.display = "inline-block";
              key.style.margin = "10px";
              key.textContent = "|";

              // give the value variable a placeholder id that we can access and update with custom labels
              value.id = '2legend-value-' + i;
                          
              item.appendChild(key); 
              item.appendChild(value);
              legend.appendChild(item);        
          });
                
          legendLabelsRev.forEach(function(layer, i){
            //as we iterate through the arrays get the correct row, and add the appropriate text 
            document.getElementById('2legend-value-' + i).textContent = layer[0];             
           });  

        });
        // change color for buttons
        $(".btn-tab2").click(function(){
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
.btn-tab2{
  margin-right: 2.3%;
  margin-left: 1%;
  width: 30%;
  margin-bottom: 1%;
}

.play2{
  margin-right:10px;
  margin-bottom: 5px;
  width: 20%;
  background-color: #A8322D
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
  -webkit-transition: .2s;
  transition: opacity .2s;
}
.slider2::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #A8322D;
  cursor: pointer;
}

.slider2::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4CAF50;
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
}
.time2{
 background-color: white; 
  opacity: 0.8;
  padding: 5px;
}
/* Mapbox Legend */
    .legend2 {
        font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
        background-color: white; 
        padding: 5px;
        opacity: 0.8;
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
        max-width: 200px
    }
    
    /* Legend title */
    .legend2 h2 {
        padding-top: 8px;
        margin:0;
        text-align: center;
    }

    .legend2 hr {
        color: #123455; 
        border: 0; 
        border-top: 1px solid #ccc; 
        padding: 0; 
        margin-top:5px;
        margin-bottom:5px
    }
    /* Button style */
   .active {
  background-color: #A8322D !important;
}     
    
</style>
