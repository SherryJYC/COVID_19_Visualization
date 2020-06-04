<template>
    <div>
        <v-container>
            <div class="py-12"></div>
            <h2 class="display-3 font-weight-bold mb-3">Comparison of COVID-19 &amp; SARS</h2>
        
            <b-card class="black-content">
                Compare them based on disease and actions...
                <b>Placeholder for Text</b>
            </b-card>

            <!-- Comparison -->
            <b-card-group deck>
                <b-card class="black-content">
                <div class="align-middle"><b>Comparison of Cumulative Confirmed, Recovered and Dead Count</b></div>
                    <apexchart class="apexchart" type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
                </b-card>
                <!-- Description of Comparison-->
                <b-card class="black-content">
                <div class="align-middle"><b>Comparison of Death Rate</b></div>
                <v-row>
                    <v-col class="align-middle">COVID-19 in China <h3><b-badge variant="danger">5.50%</b-badge></h3></v-col>
                    <v-col class="align-middle">SARS in China <h3> <b-badge variant="danger">9.56%</b-badge></h3></v-col>
                </v-row>
                Although more people infected by COVID-19, the death rate is lower that SARS...
                <b>Placeholder for text</b>
                </b-card>
            </b-card-group>

            <!-- Discussion -->
            <b-card-group deck>
                <b-card class="black-content">
                    <h3 class="display-2 font-weight-bold mb-3">Diseases</h3>
                    Characteristics of COVID-19:
                    <br/>
                    Characteristics of SARS:
                    <br/>
                    commons: start from end of December, from bats, 
                </b-card>
                <b-card class="black-content">
                    <h3 class="display-2 font-weight-bold mb-3">Government Actions</h3>
                    Difference in government actions:
                    <br/>
                    The blockdown of Wuhan in COVID-19 case...<br/>
                    Build up new hospitals more quickly...
                    <br/>
                    Commons:
                    close down animal market, 
                    build hospitals
                <b>Placeholder for text</b>
                </b-card>
            </b-card-group>

      </v-container>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
    components:{
        apexchart: VueApexCharts,
    },
    data: () => ({
          series: [{
            name: 'COVID-19',
            data: [84402, 79077, 4643]
          }, {
            name: 'SARS',
            data: [8096, 7000, 774]
          }],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 350,
               toolbar: {
                show: false,
                },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
              },
            },
            dataLabels: {
              enabled: true,
              style: {
                    colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF']
                },
                offsetY: 20,
            },
            stroke: {
              show: true,
              width: 1,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Confirmed','Recovered', 'Dead'],
              labels:{
                  style:{
                      colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF']
                  }

              }
            },
            yaxis: {
              title: {
                text: 'people',
                style:{
                      color: '#FFFFFF', 
                }
              },
              labels:{
                  style:{
                      colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF','#FFFFFF', '#FFFFFF', '#FFFFFF']
                  }
              }
       
            },
            legend:{
                labels:{
                    colors: '#FFFFFF',
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " people"
                }
              }
            }
          }
          
    }),

}
</script>

<style scoped>
.black-content {
  background-color: #121212;
}
.apexchart{
    color:black;
}
.align-middle{
    text-align: center;
}
</style>>

