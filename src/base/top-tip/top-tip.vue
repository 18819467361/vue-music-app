<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot>木有内容</slot>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    delay: {
      type: Number,
      default: 1200
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide () {
      this.showFlag = false
    }
  }
}
</script>
<style scoped>
  .top-tip{
    position: fixed;
    top:0;
    width:100%;
    z-index:500;
    background: #bc2f2e;
  }
  .drop-enter-active, .drop-leave-active{
    transition: all .3s;
  }
  .drop-enter, .drop-leave-to{
    transform: translate3d(0, -100%, 0);
  }
</style>
