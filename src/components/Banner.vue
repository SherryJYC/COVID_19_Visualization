<template>
  <v-parallax :src="require('../assets/img/mask.jpg')" style="height:100%">
    <v-container style="margin-top:50px; margin-bottom:50px">
      <v-row>
        <v-col class="text-center" cols="12" lg="4" md="4">
          <span
            class="display-2 red--text font-weight-regular"
            :class="[$vuetify.breakpoint.smAndDown ? 'display-1': 'display-2']"
          >Confirmed</span>
          <div class="py-3"></div>
          <span
            class="display-3 red--text font-weight-bold"
            :class="[$vuetify.breakpoint.smAndDown ? 'display-2': 'display-3']"
          >{{confirmed}}</span>
        </v-col>
        <v-col class="text-center" cols="12" lg="4" md="4">
          <span
            class="display-2 white--text font-weight-regular"
            :class="[$vuetify.breakpoint.smAndDown ? 'display-1': 'display-2']"
          >Dead</span>
          <div class="py-3"></div>
          <span
            class="display-3 white--text font-weight-bold"
            :class="[$vuetify.breakpoint.smAndDown ? 'display-2': 'display-3']"
          >{{dead}}</span>
        </v-col>
        <v-col class="text-center" cols="12" lg="4" md="4">
          <span
            class="display-2 green--text font-weight-regular"
            :class="[$vuetify.breakpoint.smAndDown ? 'display-1': 'display-2']"
          >Recovered</span>
          <div class="py-3"></div>
          <span
            class="display-3 green--text font-weight-bold"
            :class="[$vuetify.breakpoint.smAndDown ? 'display-2': 'display-3']"
          >{{recovered}}</span>
        </v-col>
      </v-row>
      <span class="white--text font-weight-bold">
        Statistics from
        <a
          href="link"
          class="light-blue--text text--lighten-3 font-weight-bold"
        >{{source}}</a>
        . Last updated: {{lastUpdate}}
      </span>
    </v-container>
  </v-parallax>
</template>

<script>
export default {
  name: "BaseBanner",
  props: {
    confirmed: String,
    recovered: String,
    dead: String,
    source: String,
    link: {
      type: String,
      default: "/"
    },
    lastUpdate: String
  }
};
</script>
<style scoped>
</style>
