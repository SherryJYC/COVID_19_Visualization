<template>
  <div>
    <v-container>
      <div class="py-12"></div>
      <h2
        :class="[$vuetify.breakpoint.smAndDown ? 'display-2' : 'display-3']"
        class="font-weight-bold mb-3"
      >Comparison of COVID-19 &amp; SARS</h2>

      <b-card class="black-content title font-weight-regular">
        Both COVID-19 and SARS come from a large family of Coronaviruses that causes respiratory diseases in humans.
        Understanding the commons and differences in the two severe diseases give us hints on how we can prepare better to such pandemic next time.
        In this section, we compare COVID-19 and SARS from the two main perspectives: the diseases themself, and the government actions in response to such diseases.
      </b-card>

      <!-- Comparison -->
      <v-row>
        <v-col cols="12" lg="6">
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
        </v-col>
        <v-col cols="12" lg="6">
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
            </v-row>From the cumulative count for confirmed, recovered, and dead cases in China, the number of COVID-19 cases is significantly higher than that of SARS, around 10 times the SARS cases.
            Based on the existing numbers, the case fatality ratio of the two diseases are estimated. Although more people infected by COVID-19, the death rate is lower that SARS.
          </b-card>
        </v-col>
      </v-row>

      <!-- Discussion -->
      <v-row>
        <v-col cols="12">
          <h3 class="display-2 font-weight-bold mb-3">Diseases</h3>
          <v-simple-table light>
            <!-- <table class="table table-hover"> -->
            <thead>
              <tr class="bg-dark">
                <th scope="col" class="text-white subtitle-1 font-weight-bold"></th>
                <th scope="col" class="text-white subtitle-1 font-weight-bold">SARS</th>
                <th scope="col" class="text-white subtitle-1 font-weight-bold">COVID-19</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="{title,common,sars,covid} in diseases"
                :key="title"
                :class="common ? 'table-warning' : 'table-secondary'"
              >
                <th class="subtitle-1 font-weight-bold" scope="row">{{title}}</th>
                <td class="subtitle-1 font-weight-regular">{{sars}}</td>
                <td class="subtitle-1 font-weight-regular">{{covid}}</td>
              </tr>
            </tbody>
            <!-- </table> -->
          </v-simple-table>
          <div class="py-1"></div>
          <span>Note: information summarized based on [4,5,6]</span>
        </v-col>
        <v-col cols="12">
          <h3 class="display-2 font-weight-bold mb-3">Government Actions</h3>
          <v-simple-table light>
            <!-- <table class="table table-hover"> -->
            <thead>
              <tr class="bg-dark">
                <th scope="col" class="text-white subtitle-1 font-weight-bold"></th>
                <th scope="col" class="text-white subtitle-1 font-weight-bold">SARS</th>
                <th scope="col" class="text-white subtitle-1 font-weight-bold">COVID-19</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="{title,common,sars,covid} in actions"
                :key="title"
                :class="common ? 'table-warning' : 'table-secondary'"
              >
                <th class="subtitle-1 font-weight-bold" scope="row">{{title}}</th>
                <td class="subtitle-1 font-weight-regular">{{sars}}</td>
                <td class="subtitle-1 font-weight-regular">{{covid}}</td>
              </tr>
            </tbody>
            <!-- </table> -->
          </v-simple-table>
          <div class="py-1"></div>
          <span>Note: information summarized based on [5,7]</span>
        </v-col>
        <v-col cols="12">
          <b-card class="black-content title font-weight-regular">
            In conclusion, the early lockdown of Wuhan during COVID-19 spread has been proved to be a wise decision. The timely iron fist measure has saved lives,
            indicated by the low proportion of confirmed cases in other provinces. In Wuhan, two shelter hospitals were built
            for emergency response with ventilatory supports. This is a learnt experience from Beijing Xiaotangshan Hospital back
            in 2003. The planning and construction of Huoshenshan and Leishenshan Hospital were based on archive of Beijing Xiaotangshan
            Hospital.
          </b-card>
        </v-col>
      </v-row>
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
    },
    diseases: [
      {
        title: "Initial reported time",
        common: true,
        sars: "Early December, 2002",
        covid: "December 1, 2019"
      },
      {
        title: "Average incubation time",
        common: true,
        sars: "4-6 days",
        covid: "4-6 days"
      },
      {
        title: "Special treatment",
        common: true,
        sars: "Supplemental oxygen or a ventilator",
        covid:
          "Mostly recover without requiring special treatment. Some cases with rapid deterioration requires vantilatory support"
      },
      {
        title: "Initial reported place",
        common: false,
        sars: "Guangdong",
        covid: "Wuhan Huanan Wholesale Market, Hubei"
      },
      {
        title: "Most common symptoms",
        common: false,
        sars: "Severe headache, dizziness and myalgia",
        covid: "Fever, dry cough, tiredness"
      },
      {
        title: "Areas",
        common: false,
        sars:
          "32 countries, areas or territories with cases. Most in South-East Asia",
        covid: "216 countries, areas or territories with cases. Most in America"
      },
      {
        title: "Zoonotic source",
        common: false,
        sars: "Bats",
        covid: "Unknown"
      },
      {
        title: "Vaccine",
        common: false,
        sars: "",
        covid: "In testing"
      }
    ],
    actions: [
      {
        title: "Closedown of market",
        common: true,
        sars: "Early 2004 - All live markets are permanently banned in Beijing",
        covid: "January 3, 2020 - Hunan Wholesale market was closed"
      },
      {
        title: "Shelter hospital",
        common: true,
        sars: "April, 2003 - Beijing Xiaotangshan Hospital",
        covid: "February, 2020 - Huoshenshan Hospital, Heishenshan Hospital"
      },
      {
        title: "Lockdown",
        common: false,
        sars: "No official lockdown",
        covid: "January 7, 2020 - Lockdown of Wuhan"
      },
      {
        title: "Travel restrictions",
        common: false,
        sars: "Travel restrictions to Beijing later in time",
        covid:
          "Travel pass indicating health status is checked at borders and public entrances"
      }
    ]
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
.v-data-table th {
  padding: 10px 16px;
}
</style>>

