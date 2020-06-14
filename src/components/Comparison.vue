<template>
  <div>
    <v-container>
      <div class="py-12"></div>
      <h2 class="display-3 font-weight-bold mb-3">Comparison of COVID-19 &amp; SARS</h2>

      <b-card class="black-content title font-weight-regular">
        Both COVID-19 and SARS come from a large family of Coronaviruses that causes respiratory diseases in humans.
        Understanding the commons and differences in the two severe diseases give us hints on how we can prepare better to such pandemic next time.
        In this section, we compare COVID-19 and SARS from the two main perspectives: the diseases themself, and the government actions in response to such diseases.
      </b-card>

      <!-- Comparison -->
      <b-card-group deck>
        <b-card class="black-content">
          <div class="align-middle">
            <b>Comparison of Cumulative Confirmed, Recovered and Dead Count</b>
          </div>
          <apexchart
            class="apexchart"
            type="bar"
            height="350"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </b-card>
        <!-- Description of Comparison-->
        <b-card class="black-content">
          <div class="align-middle">
            <b>Comparison of Death Rate</b>
          </div>
          <v-row>
            <v-col class="align-middle">
              COVID-19 in China
              <h3>
                <b-badge variant="danger">5.5%</b-badge>
              </h3>
            </v-col>
            <v-col class="align-middle">
              SARS in China
              <h3>
                <b-badge variant="danger">7.4%</b-badge>
              </h3>
            </v-col>
          </v-row>From the cumulative count for confirmed, recovered, and dead casese in China, the number of COVID-19 cases is significantly higher than that of SARS, around 10 times the SARS cases.
          Based on the existing numbers, the case fatality ratio of the two diseases are estimated. Although more people infected by COVID-19, the death rate is lower that SARS.
        </b-card>
      </b-card-group>

      <!-- Discussion -->
      <!-- <b-card-group deck> -->
      <b-card class="black-content">
        <h3 class="display-2 font-weight-bold mb-3">Diseases</h3>
        <table class="table">
          <thead>
            <tr class="bg-dark text-white">
              <th scope="col"></th>
              <th scope="col">SARS</th>
              <th scope="col">COVID-19</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-warning">
              <th scope="row">Initial reported time</th>
              <td>Early December, 2002</td>
              <td>December 1, 2019</td>
            </tr>
            <tr class="table-warning">
              <th scope="row">Average incubation time</th>
              <td>4-6 days</td>
              <td>4-6 days</td>
            </tr>
            <tr class="table-warning">
              <th scope="row">Special treatement</th>
              <td>Supplemental oxygen or a ventilator</td>
              <td>Mostly recover without requiring special treatment. Some cases with rapid deterioration requires vantilatory support</td>
            </tr>
            <tr class="table-secondary">
              <th scope="row text--black">Initial reported place</th>
              <td>Guangdong</td>
              <td>Wuhan Huanan Wholesale Market, Hubei</td>
            </tr>
            <tr class="table-secondary">
              <th scope="row">Most common symptoms</th>
              <td>Severe headache, dizziness and myalgia</td>
              <td>Fever, dry cough, tiredness</td>
            </tr>

            <tr class="table-secondary">
              <th scope="row">Areas</th>
              <td>32 countries, areas or territories with cases. Most in South-East Asia</td>
              <td>216 countries, areas or territories with cases. Most in America and Europe</td>
            </tr>
            <tr class="table-secondary">
              <th scope="row">Zoonotic source</th>
              <td>Bats</td>
              <td>Unknown</td>
            </tr>
            <tr class="table-secondary">
              <th scope="row">Vaccine</th>
              <td></td>
              <td>In testing</td>
            </tr>
          </tbody>
        </table>Note: information summarized based on [2,3]
      </b-card>
      <b-card class="black-content">
        <h3 class="display-2 font-weight-bold mb-3">Government Actions</h3>
        <table class="table table-hover">
          <thead>
            <tr class="bg-dark text-white">
              <th scope="col"></th>
              <th scope="col">SARS</th>
              <th scope="col">COVID-19</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-warning">
              <th scope="row">Closedown of market</th>
              <td>All live markets are banned in Beijing</td>
              <td>January 3, 2020 - Hunan Wholesale market</td>
            </tr>
            <tr class="table-warning">
              <th scope="row">Shelter hospital</th>
              <td>April, 2003 - Beijing Xiaotangshan Hospital</td>
              <td>Feburary, 2020 - Huoshenshan Hospital, Heishenshan Hospital</td>
            </tr>
            <tr class="table-secondary">
              <th scope="row">Lockdown</th>
              <td>No official lockdown</td>
              <td>January 7, 2020 - Lockdown of Wuhan</td>
            </tr>
            <tr class="table-secondary">
              <th scope="row text--black">Travel restrictions</th>
              <td>Travel restrictions to Beijing later in time</td>
              <td>Travel pass indicating health status</td>
            </tr>
          </tbody>
        </table>
      </b-card>
      <b-card
        class="black-content title font-weight-regular"
      >The early lockdown of Wuhan during COVID-19 spread has been proved to be a wise decision. The timely iron fist measure has saved lifes, indicated by the low proportion of confirmed cases in other provinces. In Wuhan, two shelter hospitals were built for emergency response with vantilatory supports. This is a learnt experience from Beijing Xiaotangshan Hospital back in 2003. The planning and construction of Huoshenshan and Leishenshan Hosipital were based on archive of Beijing Xiaotangshan Hospital.</b-card>
    </v-container>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts
  },
  data: () => ({
    series: [
      {
        name: "COVID-19",
        data: [84641, 79883, 4645]
      },
      {
        name: "SARS",
        data: [5327, 4959, 394]
      }
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
        },
        offsetY: 20
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"]
      },
      colors: ["#A8322D", "#FFC300"],
      xaxis: {
        categories: ["Confirmed", "Recovered", "Dead"],
        labels: {
          style: {
            colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
          }
        }
      },
      yaxis: {
        title: {
          text: "people",
          style: {
            color: "#FFFFFF"
          }
        },
        labels: {
          style: {
            colors: [
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF"
            ]
          },
          formatter: function(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        }
      },
      legend: {
        labels: {
          colors: "#FFFFFF"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return (
              val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " people"
            );
          }
        }
      }
    }
  })
};
</script>

<style scoped>
.black-content {
  background-color: #121212;
}
.apexchart {
  color: black;
}
.align-middle {
  text-align: center;
}
</style>>

