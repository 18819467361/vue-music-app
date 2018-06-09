<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1"
         xmls="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50"
              fill="transparent" />
      <circle class="progress-bar" r="50" cx="50"  cy="50" fill="transparent"
              :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffest"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    radius: {
      type: Number,
      default: 32
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dashArray: Math.PI * 100
    }
  },
  computed: {
    dashOffest () {
      return this.dashArray * (1 - this.percent)
    }
  }

}
</script>
<style scoped>
  .progress-circle{
    position: relative;
  }
    circle{
      stroke-width: 8px;
      transform-origin:center;
    }
      .progress-background{
        transform: scale(0.9);
        stroke: #ffe900;
      }
      .progress-bar{
        transform: scale(0.9) rotate(-90deg);
        stroke: #ff2400;
      }
</style>
