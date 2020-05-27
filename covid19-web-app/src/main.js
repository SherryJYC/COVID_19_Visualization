import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { BootstrapVue, IconsPlugin, BIconPlayFill, BIconPauseFill } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('BIconPlayFill',BIconPlayFill)
Vue.component('BIconPauseFill',BIconPauseFill)

export const mapboxgl = window.mapboxgl;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
