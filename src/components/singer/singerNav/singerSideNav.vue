<template>
  <div class="side-nav-wrapper">
    <ul class="side-nav">
      <li v-for="(item, index) in singersIndex" @click="getIndex(item)" :key="index" :class="['side-nav-bar',{'active':item.id===indexId}]">{{item.name}}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import {singersNav} from '@/api/config.js'
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
