<template>
  <div>
    <v-container>
      <div class="py-12"></div>

      <h2 class="display-3 font-weight-bold mb-3">COVID-19 Status in China</h2>
      <div class="py-5"></div>
      

      <v-row>
        <v-col>

         <b-tabs>
          <b-tab title="Confirmed" active @click="setExtrusion(optionalFields[0])"></b-tab>
          <b-tab title="Cured" @click="setExtrusion(optionalFields[1])"></b-tab>
          <b-tab title="Dead" @click="setExtrusion(optionalFields[2])"></b-tab>
        </b-tabs>

         <div class="deck-container">
            <div id="china-map" ref="map"></div>
            
            <div>
              <!-- Timeline -->
              <label id="month"></label>
              <b-btn class="play">
                <BIconPlayFill id="playicon"/>
                <BIconPauseFill id="stopicon"/>
              </b-btn>
              
              <input class="slider" type="range" min="1" max="95" step="1" value="1" />
            </div>
              <!-- legend -->
            <div class='legend-container'>
            <div class='legend' id='legend' >
                <h2 class="legend">Confirmed</h2> 
                <hr/>
                
                <!-- Div where the dynamic legend is created  -->	
                <div class='legend' id='cd-legend' >
                </div>
            
            </div>
          </div>
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
import {dates} from "../assets/json/dates"
import JQuery from 'jquery';

let $ = JQuery;
var playSpeed = 200;

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
    // csv_url: // trial of deck.gl example
    // 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv',
    // covid_url: // data of COVID19 updated in 7 May
    // 'data/DXYcity0507.csv',
    data_url:'mapbox://sherryjyc.7xgdtkm5',
    dates,
    breaks: [
      [10,"#007A96"],
      [50, "#72791C"],
      [200, "#485A2C"],
      [ 1000,"#956013"],
       [10000,"#A8322D"],
    ],
    optionalFields: ['city_confirmedCount', 'city_curedCount', 'city_deadCount']
  }),
  created() {
    this.map = null;
    this.animation = null;
    this.play = true;
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
            pitch: 45,
            antialias: true
        });
    },
    filterBy: function(date) {
      var filters = ['==', 'Date', date];
      this.map.setFilter('covid', filters);
      
      // TODO: Set the label 
      
    },
    setExtrusion: function(chosenField){
      this.map.setPaintProperty('covid', 'fill-extrusion-height', ['*',['get', chosenField],10])

       this.map.setPaintProperty('covid', 'fill-extrusion-color', [
                "interpolate",
                ["linear"],
                [
                  "get",
                  chosenField
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
        ])

    },
    autoPlay: function(playSpeed){
      this.animation = setInterval(this.moveTime,playSpeed);

    },
    moveTime: function(){
      var currentDate = parseInt($('.slider').val());   
      currentDate+=1;
      // if already at latest date, start from beginning 
      if (currentDate == 96){
        currentDate = 1;
      }  
      $('.slider').val(currentDate);
      $('.slider').trigger('change');
    }


  },
  mounted() {
        this.initMap();

        var legendLabels = [
                        // Label text that will appear in the legend [0]
                                ['< 50'],
                                ['50 - 200'],
                                ['200 - 1000'],
                                ['1000 - 10000'],
                                ['> 10000'],
            ];	
        var breaksRev = this.breaks.slice().reverse();
        var legendLabelsRev = legendLabels.slice().reverse();
        var legend = document.getElementById('cd-legend'); 

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
              'type': 'fill-extrusion',
              'minzoom': 4,
              'paint': {
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': 0.6
              }
            });     
            // set initial filed to confirmed
            this.setExtrusion(this.optionalFields[0]);
           
            // set filter
            this.filterBy(this.dates[0]); 
            // help call 'this' when out of scope
            var ref = this;

            $('.slider').change(function(e) {
                var date = parseInt(e.target.value)-1;
                ref.filterBy(ref.dates[date]);
            });
            // set auto play of slider

            var stopicon = document.getElementById("stopicon")
            var playicon = document.getElementById("playicon");
            
            $('.play').click(function () {
              if (ref.play == true){
                  ref.autoPlay(playSpeed);
                  ref.play = false;
                  stopicon.style.visibility = "visible";
                  playicon.style.visibility = "hidden";
              }
              else {
                clearInterval(ref.animation);
                ref.play = true;
                stopicon.style.visibility = "hidden";
                playicon.style.visibility = "visible";
              }
          });
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
              value.id = 'legend-value-' + i;
                          
              item.appendChild(key); 
              item.appendChild(value);
              legend.appendChild(item);        
          });
                
          legendLabelsRev.forEach(function(layer, i){
            //as we iterate through the arrays get the correct row, and add the appropriate text 
            document.getElementById('legend-value-' + i).textContent = layer[0];             
           });  

        });

        
    }
};
</script>

<style scoped>
#china-map {
  height: 600px;
}
#stopicon{
  visibility:hidden;
}
.slider {
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

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #A8322D;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}
/* Mapbox Legend */
    .legend {
        font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
        background-color: white; 
        padding: 5px;
        opacity: 0.8;
    }

    #cd-legend {
        text-align: left;
    }
    
    /* legend test */
    .legend-container {
        position: absolute;
        margin: 5px;
        top: 120px;
        left: 5px;
        padding: 0px 10px;
        margin-bottom: 30px;
        z-index: 1;
        max-width: 200px
    }
    
    /* Legend title */
    .legend h2 {
        padding-top: 8px;
        margin:0;
        text-align: center;
    }

    .legend hr {
        color: #123455; 
        border: 0; 
        border-top: 1px solid #ccc; 
        padding: 0; 
        margin-top:5px;
        margin-bottom:5px
    }
        
    
</style>
