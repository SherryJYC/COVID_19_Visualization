<template>
  <v-app>
    <v-app-bar app color="white" height="80">
      <div class="d-flex align-center">
        <v-img
          class="shrink mr-3"
          contain
          :src="require('./assets/logo.svg')"
          transition="scale-transition"
          width="60"
        />

        <v-toolbar-title class="font-weight-black headline">COVID-19 Dashboard</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="$vuetify.goTo('#global')" text>
        <span class="mr-2">Global</span>
      </v-btn>
      <v-btn @click="$vuetify.goTo('#china')" text>
        <span class="mr-2">China</span>
      </v-btn>
      <v-btn @click="$vuetify.goTo('#sars')" text>
        <span class="mr-2">SARS</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <section id="landing">
        <v-parallax
          height="700"
          :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
          :src="require('./assets/corona-black.jpg')"
        >
          <v-row no-gutters align="center">
            <v-theme-provider dark>
              <v-container fill-height>
                <v-row align="center" class="white--text" justify="end">
                  <v-col class="white--text text-center" cols="8" tag="h1">
                    <span
                      :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'display-3'
                          : 'display-4'
                      ]"
                      class="font-weight-black"
                    >COVID-19</span>
                    <br />

                    <p class="mx-auto title font-weight-light mb-8">Some dummy text here.</p>
                    <v-btn class="align-self-end" fab outlined @click="$vuetify.goTo('#global')">
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-row>
        </v-parallax>
      </section>
      <section id="global">
        <Global />
      </section>
      <section id="china">
        <China />
      </section>
      <section id="sars">
        <SARS />
      </section>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Global from "./components/Global";
import China from "./components/China";
import SARS from "./components/SARS";

export default {
  name: "App",

  components: {
    // HelloWorld,
    Global,
    China,
    SARS,
  },

  data: () => ({
    //
  })
};
</script>

