<template>
  <v-app>
    <v-app-bar app height="80">
      <div class="d-flex align-center">
        <v-img
          class="shrink mr-3"
          contain
          :src="require('./assets/img/coronavirus.png')"
          transition="scale-transition"
          width="60"
        />

        <v-toolbar-title
          :class="$vuetify.breakpoint.smAndDown ? 'title':'headline'"
          class="font-weight-black"
        >COVID-19 in China</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item,i) in items" :key="i" @click="$vuetify.goTo(`${item.id}`)" text>
          <span class="mr-2">{{item.title}}</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item v-for="(item,i) in items" :key="i" @click="$vuetify.goTo(`${item.id}`)">
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content fluid>
      <!-- <v-theme-provider dark> -->
      <section id="landing">
        <v-parallax
          :height="$vuetify.breakpoint.smAndDown ? '500': '700'"
          :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
          :src="require('./assets/img/corona-black.jpg')"
        >
          <v-overlay absolute opacity="0.4">
            <v-row no-gutters align="center">
              <!-- <v-container fill-height> -->
              <v-row
                no-gutters
                align="center"
                class="white--text"
                :justify="$vuetify.breakpoint.mdAndDown ? 'center': 'end'"
              >
                <v-col class="white--text text-center" cols="8" tag="h1">
                  <span
                    :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'display-2'
                          : 'display-4'
                      ]"
                    class="font-weight-black"
                  >COVID-19 in China</span>
                  <br />

                  <p
                    :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'subtitle-1'
                          : 'title'
                      ]"
                    class="mx-auto title font-weight-light mb-8"
                  >COVID-19 is a newly disease caused by the novel coronavirus. By far, the outbreak of COVID-19 has spread all over the world</p>
                  <v-btn class="align-self-end" fab outlined @click="$vuetify.goTo('#background')">
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <!-- </v-container> -->
            </v-row>
          </v-overlay>
        </v-parallax>
      </section>
      <section id="background">
        <Background />
      </section>
      <section id="covid">
        <COVID />
      </section>
      <section id="sars">
        <SARS />
      </section>
      <section id="compare">
        <Comparison />
      </section>
      <section id="imprint">
        <Imprint />
      </section>
      <!-- </v-theme-provider> -->
    </v-content>
  </v-app>
</template>

<script>
import Background from "./components/Background";
import COVID from "./components/COVID"; // China COVID-19
import SARS from "./components/SARS"; // China SARS
import Comparison from "./components/Comparison";
import Imprint from "./components/Imprint";

export default {
  name: "App",

  components: {
    Background,
    COVID,
    SARS,
    Comparison,
    Imprint
  },

  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: "Background",
        id: "#background"
      },
      { title: "China COVID-19", id: "#covid" },
      {
        title: "China SARS",
        id: "#sars"
      },
      {
        title: "Comparison",
        id: "#compare"
      }
    ]
  }),
  watch: {
    group() {
      this.drawer = false;
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

