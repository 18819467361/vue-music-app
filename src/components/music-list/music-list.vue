<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back" @click="returnDetail">&lt;</i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0">
          <i class="icon-play iconfont">&#xe680;</i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
        <div ref="fixScroll"></div>
      </div>
    </scroll>
    <div class="loading-container" v-show="!songs.length">
      <loading title="正在加载中..."></loading>
    </div>
  </div>
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
import {prefixStyle} from '@/api/dom'
import Loading from '@/base/loading/loading'
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
export default {
  data () {
    return {
      scrollY: 0
    }
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      defalut: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgStyle () {
      console.log(this.bgImage, 'bgimage')
      return `background-image:url(${this.bgImage})`
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  components: {
    Scroll,
    SongList,
    Loading
  },
  mounted () {
    this.imgHeight = this.$refs.bgImg.clientHeight
    let padTop = this.imgHeight - 45
    let fixBot = padTop + this.imgHeight
    this.$refs.list.$el.style.paddingTop = `${padTop}px`
    this.$refs.list.$el.style.top = `45px`
    this.$refs.fixScroll.style.height = `${fixBot}px`
  },
  methods: {
    returnDetail () {
      this.$router.back()
    },
    scroll (pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY (newY) {
      this.imgHeight = this.$refs.bgImg.clientHeight
      let scale = 1
      let blur = 0
      if (newY > 0) {
        scale = 1 + newY / this.imgHeight
      } else {
        scale = 1
        blur = Math.min(20 * newY / this.imgHeight, 20)
      }
      this.$refs.filter.style[backdrop] = `blur({$blur}px)`
      this.$refs.bgImg.style[transform] = `scale(${scale})`
    }
  }
}
</script>
<style scoped>
  .music-list{
  }
  .back{
    position: absolute;
    padding:0 5px;
    top:2vh;
    left:4vw;
  }
  .icon-back{
    font-size:25px;
    color: #d8cd00;
  }
  .title{
    color: #ebebeb;
    position: absolute;
    margin-top: 2vh;
    width: 100vw;
    font:normal 20px/20px "Microsoft YaHei UI",sans-serif;
    pointer-events: none;
    text-shadow: 1px 1px 2px #2e2e2e;
  }
.bg-image{
  width:100vw;
  padding-top: 70%;
  position: relative;
  top: 0;
  left:0;
  background-size: cover;
  z-index:-1;
  pointer-events: none;
  transform-origin: top;

}
  .play-wrapper{
    position: absolute;
    bottom: 4vh;
    left:50%;
    width:150px;
    height:25px;
    font:normal 20px/25px "Microsoft YaHei UI",sans-serif;
    margin-left: -75px;
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid #bc2f2e;
    color: #c7c7c7;
    text-shadow: 1px 1px 1px #bdbdbd;
  }
  .icon-play{
    color: #bc2f2e;
    font-size:20px;
  }
  .filter{
    width:100%;
    height:100%;
    background-color: rgba(169, 217, 255, 0.14);
  }
  .scroll-wrapper{
    overflow: visible;
  }
  .list{
    position: fixed;
    top: 0;
    left: 0;
    z-index:20;
  }
  .song-list-wrapper{
    background-color: #ffffff;
  }
  .loading-container{
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    background-color: transparent;
  }

</style>
