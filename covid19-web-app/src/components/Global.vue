<template>
  <div>
    <v-container>
      <div class="py-12"></div>

      <h2 class="display-3 font-weight-bold mb-3">Global COVID-19</h2>
      <div class="py-5"></div>
      <v-row>
        <v-col>
          <div>HERE GOES THE BAR CHART RACE</div>
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
export default {
  name: "Global",

  data: () => ({
    stats: [
      { title: "Total Confirmed", value: 3524429 },
      { title: "Total Deaths", value: 247838 },
      { title: "Total Recovered", value: 1132553 }
    ]
  })
};
</script>
