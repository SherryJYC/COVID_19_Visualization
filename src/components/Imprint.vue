<template>
  <div>
    <v-container>
      <b-card-group deck></b-card-group>
      <b-card class="black-content" text-variant="white" header="Sources">
        <b>References</b>
        <br />
        <v-row class="source">[1] "Origin of SARS-CoV-2", 26-Mar-2020.</v-row>
        <v-row
          class="source"
        >[2] "During the 40 day spring festival, the three railway stations in Wuhan sent 11.57 million passengers", 02-Mar-2019.</v-row>
        <v-row
          class="source"
        >[3] “China's mass transit in high gear as Spring Festival travel rush starts”, 10-Jan-2020.</v-row>
        <v-row
          class="source"
        >[4] "Consensus document on the epidemiology of severe acute respiratory syndrome (SARS)", 16-May-2003.</v-row>
        <v-row class="source">[5] "Coronavirus timeline", 10-June-2020.</v-row>
        <v-row class="source">[6] "Coronavirus", 14-June-2020.</v-row>
        <v-row class="source">[7] "Beijing permanently ban all live poultry market", 26-Jan-2014.</v-row>

        <br />

        <b>Data sources</b>
        <br />(Date of Latest Check: 18-June-2020)
        <br />
        <v-row>
          <b-button class="source" variant="dark">
            <a
              href="https://www.worldometers.info/coronavirus/?"
              target="_blank"
              class="white--text text--lighten-3"
            >Worldometer COVID-19 Statistics</a>
          </b-button>

          <b-button class="source" variant="dark">
            <a
              href="https://github.com/owid/covid-19-data/tree/master/public/data"
              target="_blank"
              class="white--text text--lighten-3"
            >Data on COVID-19 (coronavirus) by Our World in Data</a>
          </b-button>
        </v-row>

        <v-row>
          <b-button class="source" variant="dark">
            <a
              href="https://github.com/BlankerL/DXY-COVID-19-Data"
              target="_blank"
              class="white--text text--lighten-3"
            >COVID-19/2019-nCoV Infection Time Series Data Warehouse</a>
          </b-button>

          <b-button class="source" variant="dark">
            <a
              href="https://ncov.dxy.cn/ncovh5/view/pneumonia?from=dxy&source=&link=&share="
              target="_blank"
              class="white--text text--lighten-3"
            >DXY COVID-19 Statistics in China</a>
          </b-button>
        </v-row>

        <v-row>
          <b-button class="source" variant="dark">
            <a
              href="http://www.nhc.gov.cn/wjw/zcjd/201304/a0d4975881e44d389195779773afaabc.shtml"
              target="_blank"
              class="white--text text--lighten-3"
            >SARS Daily Report by NHC, China</a>
          </b-button>
        </v-row>

        <br />
        <b>Image sources</b>
        <br />(Date of Latest Check: 18-June-2020)
        <br />
        <v-row>
          <b-button class="source" variant="dark">
            <a
              href="https://www.google.com/search?q=virus+icon+png+rounded&tbm=isch&ved=2ahUKEwj98o-x4unpAhUXMRoKHT5wA84Q2-cCegQIABAA&oq=virus+icon+png+rounded&gs_lcp=CgNpbWcQAzoGCAAQCBAeUIicIFjfpSBgi6ggaABwAHgAgAHIBogBhA6SAQczLTMuNi0xmAEAoAEBqgELZ3dzLXdpei1pbWc&sclient=img&ei=zMDZXv3cLJfiaL7gjfAM&bih=798&biw=1387#imgrc=vV9hQoyVxxqWkM"
              target="_blank"
              class="white--text text--lighten-3"
            >Icon of Virus</a>
          </b-button>

          <b-button class="source" variant="dark">
            <a
              href="https://unsplash.com/photos/EAgGqOiDDMg"
              target="_blank"
              class="white--text text--lighten-3"
            >Image of Landing Page</a>
          </b-button>

          <b-button class="source" variant="dark">
            <a
              href="https://unsplash.com/photos/Lhb-zwQ-QGI"
              target="_blank"
              class="white--text text--lighten-3"
            >Image of Banner</a>
          </b-button>

          <b-button class="source" variant="dark">
            <a
              href="https://www.google.com/search?q=wuhan+huanan+market&sxsrf=ALeKk01rbok8TltNZg0UyRvQUDqdGIlqQQ:1591330387102&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj95sXT5-npAhUKDuwKHXb1AdEQ_AUoAXoECBUQAw&biw=1387&bih=798#imgrc=bKBhC7tnbnfZuM"
              target="_blank"
              class="white--text text--lighten-3"
            >Image of Huanan Market</a>
          </b-button>

          <b-button class="source" variant="dark">
            <a
              href="https://www.who.int/health-topics/coronavirus#tab=tab_1"
              target="_blank"
              class="white--text text--lighten-3"
            >Image of Current status</a>
          </b-button>
        </v-row>
        <br />
        <b>Main Software Dependencies</b>
        <br />(Date of Latest Check: 18-June-2020)
        <br />
        <v-row class="source">Vue, Vuetify, Bootstrap, Flourish, Apex, Mapbox, QGIS, Python</v-row>
      </b-card>
      <br />
      <b-card class="black-content" text-variant="white" header="Team">
        <v-row>
          <v-col cols="12" lg="6">
            <b class="source">Yuchang Jiang, Tianyu Wu</b>

            <br />
            <br />
            <v-row
              class="source"
            >We are master students of Geomatics Engineering at ETH Zurich. This project is the main deliverable for Cartography Lab, 2020 FS, under the supervision of Dr. Christian Häberling, Dr. Hans-Rudolf Bär, and Prof. Dr. Lorenz Hurni.</v-row>
          </v-col>

          <v-col cols="12" lg="6">
            <v-divider class="hidden-md-and-up"></v-divider>

            <v-row class="source">
              Institute of Cartography and Geoinformation (IKG)
              <br />
              <br />ETH Zürich
              <br />
              <br />Cartography Lab
              <br />
              <br />Spring Semester 2020
            </v-row>
          </v-col>
        </v-row>
      </b-card>
    </v-container>

    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Cartography Lab</strong> ETH Zurich
      </v-col>
    </v-footer>
  </div>
</template>
<script>
export default {
  data: () => ({})
};
</script>
<style scoped>
.source {
  color: white;
  margin-left: 8px;
  margin-bottom: 2px;
}
.black-content {
  background-color: #5e5e5e;
}
</style>