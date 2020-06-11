<template>
  <div>
    <v-container>
      <div class="py-12"></div>
      <h2 class="display-3 font-weight-bold mb-3">Comparison of COVID-19 &amp; SARS</h2>

      <b-card class="black-content title font-weight-regular">
        Both COVID-19 and SARS come from a large family of Coronaviruses that causes cause respiratory diseases in humans.
        Understanding the commons and differences in the two severe diseases give us hints on how we can prepare better to such a pandemic next time.
        In this section, we compare COVID-19 and SARS from two main perspectives: the diseases themself, and the government actions in response to such diseases.
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
                <b-badge variant="danger">5.50%</b-badge>
              </h3>
            </v-col>
            <v-col class="align-middle">
              SARS in China
              <h3>
                <b-badge variant="danger">9.56%</b-badge>
              </h3>
            </v-col>
          </v-row>From the cumulative count for confirmed, recovered, and dead casese in China, the number of COVID-19 cases is significantly higher than that of SARS, around 10 times of SARS cases.
          Based on the existing counts, the case fatality ratio of the two diseases are estimated. Although more people infected by COVID-19, the death rate is lower that SARS, accounting for half of SARS.
          <b>Placeholder for text</b>
        </b-card>
      </b-card-group>

      <!-- Discussion -->
      <b-card-group deck>
        <b-card class="black-content">
          <h3 class="display-2 font-weight-bold mb-3">Diseases</h3>Characteristics of COVID-19:
          <br />- Most cases will experience mild to moderate respiratory illness and recover without requiring special treatment.
          <br />- Mean incubation time of 4-6 days.
          <br />Characteristics of SARS:
          <br />- Most cases first presented with severe headache, dizziness and myalgia.
          <br />- Mean incubation time of 6 days with the minimum of 1 day and the maximum of 14 days.
          <br />commons:
          <br />- for some cases, rapid deterioration with low oxygen saturation and acute respiratory distress requiring vantilatory support.
          <br />- initial cases reported in December
          <br />- initially started from animal-to-human transmission. The latest study shows, the origin of SARS comes from bats, while the zoonotic source of SARS-CoV-2 is unknown.
        </b-card>
        <b-card class="black-content">
          <h3 class="display-2 font-weight-bold mb-3">Government Actions</h3>Difference in government actions:
          <br />The early lockdown of Wuhan during COVID-19 spread has been proved to be a wise decision. The timely iron fist measure has saved lifes, indicated by the low proportion of confirmed cases in other provinces.
          <br />Shelter hospitals were built for emergency response with vantilatory supports.
          <br />Commons:
          <br />- Close down of animal markets: starting from 2003, all live animal markets in Beijing are perminently banned; Huanan Seafood Market was closed on January 3, 2020.
          <br />- Shelter hospitals were built: in April 2003, Beijing Xiaotangshan Hospital was reformed in reponse to severe cases of SARS; Huoshenshan Hospital and Heishenshan Hospital were constructed in Feburary 2020.
        </b-card>
      </b-card-group>
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
        data: [84402, 79077, 4643]
      },
      {
        name: "SARS",
        data: [8096, 7000, 774]
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

