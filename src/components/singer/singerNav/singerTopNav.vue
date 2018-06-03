<template>
  <div class="top-nav-wrapper">
    <ul class="top-nav">
      <li v-for="(item, index) in singersIndex" @click="getArea(item)" :key="index" :class="['top-nav-list',{'active':item.id===areaId}]">{{item.name}}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import {singersNav} from '@/api/config.js'
export default {
  data () {
    return {
      singersIndex: singersNav.area,
      areaId: 2
    }
  },
  methods: {
    getArea (item) {
      this.areaId = item.id
      this.$emit('change-area', item.id)
    }
  }
}
</script>
<style scoped>
  .top-nav{
    display: flex;
    margin:2px 4vh 6px 4px;
  }

  .top-nav-list{
    flex-grow: 1;
    margin:4px 0 4px 0;
    padding:2px 2px;
    font-size: 14px;
  }
  .active{
    border-bottom: 1px solid #bc2f2e;
    border-right: 1px solid #bc2f2e;
  }
</style>
