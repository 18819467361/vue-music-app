<template>
  <div class="side-nav-wrapper">
    <ul class="side-nav">
      <li v-for="(item, index) in singersIndex" @touchstart="onShortcutTouchStart" @click="getIndex(item)" :data-index="index" :key="index" :class="['side-nav-bar',{'active':item.id===indexId}]">{{item.name.substring(0,1)}}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import { singersNav } from '@/api/config.js'
import { getData } from '@/api/dom'
export default {
  data () {
    return {
      singersIndex: singersNav.index,
      indexId: -100
    }
  },
  methods: {
    getIndex (item) {
      this.indexId = item.id
      this.$emit('change-index', item.id)
    },
    onShortcutTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      this.$emit('scroll', anchorIndex)
    }

  }
}
</script>
<style scoped>
.side-nav{
  width:4vw;
  position: fixed;
  top:14vh;
  right:5px;
}
.side-nav-bar{
  margin:2px 0;
  border-radius: 10px;
  font-size: 10px;
}
  .active{
    background-color: brown;
    color: #fff;
  }
</style>
