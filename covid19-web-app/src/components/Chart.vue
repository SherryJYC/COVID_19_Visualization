<template>
  <!-- <div class="flourish-embed flourish-chart" :data-src="race_data" :data-url="race_url">{{race_url}}</div> -->
  <iframe scrolling="no" frameborder="0" :src="url" style="width: 100%; height: 400.047px;"></iframe>
</template>

<script>
export default {
  name: "Chart",
  props: {
    race_data: String,
    race_url: String,
    line_data: String,
    line_url: String
  },
  computed: {
    url: function() {
      return this.race_url + "?auto=1";
      //   return this.line_url + "?auto=1";
    }
  }
};
</script>