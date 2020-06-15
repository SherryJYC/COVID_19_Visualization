<template>
  <div>
    <div :style="yaxis">Cases</div>
    <div
      ref="caseStudyMap"
      class="text-center"
    >No. of days since the 1st day over 1k confirmed cases</div>
    <iframe
      v-resize="updateYShift"
      scrolling="no"
      frameborder="0"
      :src="url"
      style="width: 100%; height: 400.047px;"
    ></iframe>
    <div
      class="flourish-credit"
      style="width:100%!important;margin:0 0 4px!important;text-align:right!important;font-family:Helvetica,sans-serif!important;color:#888!important;font-size:11px!important;font-weight:bold!important;font-style:normal!important;-webkit-font-smoothing:antialiased!important;box-shadow:none!important;"
    >
      <a
        href="https://public.flourish.studio/visualisation/2647201/?utm_source=showcase&amp;utm_campaign=visualisation/2647201"
        target="_top"
        style="display:inline-block!important;text-decoration:none!important;font:inherit!important;color:inherit!important;border:none!important;margin:0 5px!important;box-shadow:none!important;"
      >
        <img
          alt="Flourish logo"
          src="https://public.flourish.rocks/resources/bosh.svg"
          style="font:inherit!important;width:auto!important;height:12px!important;border:none!important;margin:0 2px 0!important;vertical-align:middle!important;display:inline-block!important;box-shadow:none!important;"
        />
        <span
          style="font:inherit!important;color:#888!important;vertical-align:middle!important;display:inline-block!important;box-shadow:none!important;"
        >A Flourish data visualisation</span>
      </a>
    </div>
  </div>
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
  data: () => ({
    yaxis: "transform: rotate(-90deg) translateX(100px) translateY(-320px)"
  }),
  computed: {
    url: function() {
      return this.race_url + "?auto=1";
      // return this.line_url + "?auto=1";
    }
  },
  methods: {
    updateYShift: function() {
      // let self = this;
      var yshift = this.$refs.caseStudyMap.clientWidth * 0.5;
      var xshift = 100;
      if (
        this.$vuetify.breakpoint.mdAndDown &&
        this.$vuetify.breakpoint.smAndDown
      ) {
        xshift = 0;
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        xshift = 40;
      }
      this.yaxis =
        "transform: rotate(-90deg) translateX(" +
        xshift +
        "px) translateY(-" +
        yshift +
        "px)";
    }
  }
};
</script>