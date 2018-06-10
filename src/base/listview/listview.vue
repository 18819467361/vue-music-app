<template>
  <div v-if="fixedData" class="contain">
    <scroll class="singer-list-wrapper" :data="data" ref="listView"
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scroll="scroll"
    >
      <ul class="list-content">
        <li v-for="(group, index) in fixedData" :key="index" ref="listGroup">
          <h2 class="list-title">{{group.name}}</h2>
          <ul>
            <li v-for="(item, index1) in group.data" @click="selectItem(item)" :key="index1">
              <div class="singer-list">
              <div v-if="index ===0" class="img-wrapper">
              <img class="singer-img" v-lazy="item.singer_pic"/>
              </div>
              <h3 :class="[{'singer-name':index === 0},{'small':index !==0}]">{{item.singer_name}}</h3>
              </div>
            </li>
          </ul>
        </li>
        <li ref="fixHeight"></li>
      </ul>
      <div class="list-fixed">
      </div>
      <h1 class="fixed-title" ref="fixed" v-show="fixedTitle">{{fixedTitle}}</h1>
    </scroll>
    <div class="side-nav-wrapper">
      <ul class="side-nav">
        <li v-for="(item, index3) in singersIndex" @touchstart="onShortcutTouchStart"
            @touchmove.stop.prevent="onShortcutTouchMove" @click="getIndex(item)" :data-index="index3"
            :key="index3" :class="['side-nav-bar',{'active-side-list':index3===currentIndex}]">{{item.name.substring(0,1)}}</li>
      </ul>
    </div>
    <div v-if="!data.length" class="loading-container">
      <loading title="正在载入..."></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
import { singersNav } from '@/api/config'
import { getData } from '@/api/dom'
import Loading from '@/base/loading/loading'
import {playlistMixin} from '@/common/js/mixin'

const ANCHOR_HEIGHT = 14
const TITLE_HEIGHT = 24
export default {
  mixins: [playlistMixin],
  created () {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  data () {
    return {
      singersIndex: singersNav.index,
      indexId: -100,
      scrollY: -1,
      currentIndex: 0,
      diff: ''
    }
  },
  props: {
    data: {
      type: Array,
      defalut: []
    }
  },
  computed: {
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].name : ''
    },
    fixedData () {
      if (!this.data) {
        return false
      }
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i] === undefined) {
          return false
        }
      }
      return this.data
    }
  },
  components: {
    Scroll,
    Loading
  },
  watch: {
    render (newRender) {
      console.log(newRender, 'render')
    },
    fixedData () {
      setTimeout(() => {
        this._calculateHeight()// data变化导致dom变化，实时更新高度，数据变化到dom变化有延时，因此延时20ms调用。
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 当在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      /* 减少dom操作频率 */
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  methods: {
    handlePlaylist (playlist) {
      console.log('inhandle')
      setTimeout(() => {
        const fixHeight = playlist.length > 0 ? 60 : ''
        this.$refs.fixHeight.style.height = `${fixHeight}px`
        this.$refs.listView.refresh()
      }, 70)
    },
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
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup// 获取所有listGroup的dom
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.scrollHeight
        this.listHeight.push(height)
      }
    },
    selectItem (item) {
      this.$emit('select', item)
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
   margin:0 3vh 6px 4px;
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
    height:84vh;
    background-color: #eaeaea;
    border-radius: 5px;
    box-shadow: 1px 1px 4px #9c9c9c;
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
  .fixed-title{
    position: absolute;
    top: 0;
    left:0;
    width: 94vw;
    text-align: left;
    padding:4px 0 4px 10px;
    margin:0 3vh 6px 4px;
    background-color: #ca7374;
    font:bold 16px/16px sans-serif;
    color: #fff;
  }
  .loading-container {
    width:100px;
    height:200px;
    background-color: red;
  }
  .loading-container{
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    /*background-color: transparent;*/
  }
</style>
