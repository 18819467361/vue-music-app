<template>
  <div class="contain">
    <scroll class="singer-list-wrapper" :data="data" ref="listView">
      <ul class="list-content">
        <li v-for="(group, index) in data" :key="index" ref="listGroup">
          <h2 class="list-title">{{group.name}}</h2>
          <ul>
            <li v-for="(item, index1) in group.data" :key="index1">
              <div class="singer-list">
              <div v-if="index ===0" class="img-wrapper">
              <img class="singer-img" :src="item.singer_pic"/>
              </div>
              <h3 :class="[{'singer-name':index === 0},{'small':index !==0}]">{{item.singer_name}}</h3>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <div class="side-nav-wrapper">
      <ul class="side-nav">
        <li v-for="(item, index3) in singersIndex" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @click="getIndex(item)" :data-index="index3" :key="index3" :class="['side-nav-bar',{'active-side-list':item.id===indexId}]">{{item.name.substring(0,1)}}</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import { singersNav } from '@/api/config'
import { getData } from '@/api/dom'
const ANCHOR_HEIGHT = 14
export default {
  created () {
    this.touch = {}
  },
  data () {
    return {
      singersIndex: singersNav.index,
      indexId: -100
    }
  },
  props: {
    data: {
      type: Array,
      defalut: []
    }
  },
  components: {
    Scroll
  },
  methods: {
    getIndex (item) {
      this.indexId = item.id
    },
    onShortcutTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      console.log(this.touch.anchorIndex + delta,'string')
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    _scrollTo (index) {
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    }
  }
}
</script>
<style>
  .contain{
    position: relative;
    height:78vh;
    width: 100vw;
  }
 .singer-list-wrapper{
   width: 100vw;
 }
 .list-title{
   text-align: left;
   padding:4px 0 4px 10px;
   margin:2px 0vh 6px 4px;
   background-color: #ca7374;
   font:bold 16px/16px sans-serif;
   color: #fff;
 }
  .singer-list{
    display: flex;
    background-color: #f9f9f9;
    margin:2px 4vh 6px 4px;
    padding: 4px;
    box-shadow: 1px 1px 2px #b6b6b6;
  }
  .img-wrapper{
    width:80px;
    height:80px;
    border-radius: 80px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .singer-img{
    width: 80px;
  }
  .singer-name{
    flex-grow: 1;
    height:80px;
    font: normal 16px/80px "Microsoft YaHei UI",sans-serif;
  }
  .small{
    flex-grow: 1;
    font: normal 16px/16px "Microsoft YaHei UI",sans-serif;
  }
  .side-nav{
    width:4vw;
    position: fixed;
    top:14vh;
    right:5px;
  }
  .side-nav-bar{
    margin:2px 0;
    border-radius: 10px;
    font-size: 12px;
  }
  .active-side-list{
    background-color: brown;
    color: #fff;
  }
</style>
